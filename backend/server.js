const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Fix 9: CORS origins configurable via .env
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001,https://min-gle.vercel.app')
  .split(',').map(s => s.trim());

const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: '🚀 abudme Server Online',
    users: io.engine.clientsCount,
    timestamp: new Date().toISOString(),
  });
});

// ── State ────────────────────────────────────────────────────────────────────
// Fix 2: queue stores { socket, interests } objects instead of raw sockets
const queues = { text: [], video: [] };
const activePairs = new Map();   // socketId → partnerId

// Fix 7: report + ban state
const reportCounts = new Map();  // socketId → count
const bannedSockets = new Set(); // socketId

// ── Helpers ──────────────────────────────────────────────────────────────────
function broadcastOnlineCount() {
  io.emit('online-count', io.engine.clientsCount);
}

// Fix 2 + 3: cleanupSocket now filters by item.socket.id
function cleanupSocket(socketId) {
  queues.text  = queues.text.filter(item => item.socket.id !== socketId);
  queues.video = queues.video.filter(item => item.socket.id !== socketId);
  activePairs.delete(socketId);
}

// Fix 3: Periodic cleanup of dead sockets from queues
setInterval(() => {
  queues.text  = queues.text.filter(item => item.socket.connected);
  queues.video = queues.video.filter(item => item.socket.connected);
}, 10000);

// Fix 2: notifyPartnerLeft uses activePairs (socketId → partnerId)
function notifyPartnerLeft(socketId) {
  const partnerId = activePairs.get(socketId);
  if (partnerId) {
    io.to(partnerId).emit('partner-left');
    activePairs.delete(partnerId);
  }
}

// Fix 2: parse interests string into array
function parseInterests(raw) {
  if (!raw || typeof raw !== 'string') return [];
  return raw.split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
}

// Fix 2: find overlapping interests count
function interestOverlap(a, b) {
  if (!a.length || !b.length) return 0;
  return a.filter(i => b.includes(i)).length;
}

// ── Connection Handler ────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] ${socket.id} connected | total: ${io.engine.clientsCount}`);
  broadcastOnlineCount();

  // ── Matchmaking ─────────────────────────────────────────────────────────
  // Fix 2: accept interests param; Fix 3: skip dead/self sockets
  socket.on('find-match', ({ mode = 'video', interests = '' } = {}) => {
    // Clean up any existing session
    notifyPartnerLeft(socket.id);
    cleanupSocket(socket.id);

    // Fix 7: reject banned sockets
    if (bannedSockets.has(socket.id)) {
      socket.emit('banned');
      return;
    }

    const queue = queues[mode] ?? queues.video;
    const myInterests = parseInterests(interests);

    // Fix 3: Remove dead/self sockets before searching
    queues[mode] = (queues[mode] ?? []).filter(
      item => item.socket.connected && item.socket.id !== socket.id
    );

    const currentQueue = queues[mode] ?? queues.video;

    if (currentQueue.length > 0) {
      // Fix 2: prefer partner with overlapping interests, fall back to any
      let bestIdx = -1;
      let bestScore = -1;

      for (let i = 0; i < currentQueue.length; i++) {
        const item = currentQueue[i];
        // Fix 3: skip dead sockets and self
        if (!item.socket.connected || item.socket.id === socket.id) continue;
        const score = interestOverlap(myInterests, item.interests);
        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
        // If we found a perfect match (any overlap), stop early
        if (score > 0) break;
      }

      // Fall back to first valid if no interest match found
      if (bestIdx === -1) {
        for (let i = 0; i < currentQueue.length; i++) {
          if (currentQueue[i].socket.connected && currentQueue[i].socket.id !== socket.id) {
            bestIdx = i;
            break;
          }
        }
      }

      if (bestIdx !== -1) {
        const partnerItem = currentQueue.splice(bestIdx, 1)[0];
        const partner = partnerItem.socket;

        activePairs.set(socket.id, partner.id);
        activePairs.set(partner.id, socket.id);

        console.log(`[MATCH] ${socket.id} ↔ ${partner.id} [${mode}]`);

        socket.emit('match', { role: 'initiator', partnerId: partner.id, mode });
        partner.emit('match', { role: 'receiver',  partnerId: socket.id,  mode });
      } else {
        // No valid partner found — go to queue
        currentQueue.push({ socket, interests: myInterests });
        socket.emit('waiting');
        console.log(`[WAIT] ${socket.id} waiting [${mode}] queue size: ${currentQueue.length}`);
      }
    } else {
      queue.push({ socket, interests: myInterests });
      socket.emit('waiting');
      console.log(`[WAIT] ${socket.id} waiting [${mode}] queue size: ${queue.length}`);
    }
  });

  // ── WebRTC Signaling ─────────────────────────────────────────────────────
  socket.on('offer', ({ offer, to }) => {
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ answer, to }) => {
    socket.to(to).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ candidate, to }) => {
    socket.to(to).emit('ice-candidate', { candidate, from: socket.id });
  });

  // ── Text Chat ────────────────────────────────────────────────────────────
  socket.on('chat-message', ({ message }) => {
    const partnerId = activePairs.get(socket.id);
    if (partnerId && message?.trim()) {
      io.to(partnerId).emit('chat-message', {
        message: message.trim(),
        from: 'stranger',
        timestamp: Date.now(),
      });
    }
  });

  // ── Leave / Skip ─────────────────────────────────────────────────────────
  socket.on('leave', () => {
    notifyPartnerLeft(socket.id);
    cleanupSocket(socket.id);
    console.log(`[LEAVE] ${socket.id}`);
  });

  // ── Fix 7: Report ────────────────────────────────────────────────────────
  socket.on('report', () => {
    const partnerId = activePairs.get(socket.id);
    if (!partnerId) return;

    const count = (reportCounts.get(partnerId) || 0) + 1;
    reportCounts.set(partnerId, count);
    console.log(`[REPORT] ${partnerId} reported, count: ${count}`);

    if (count >= 3) {
      bannedSockets.add(partnerId);
      io.to(partnerId).emit('banned');
      const partnerSocket = io.sockets.sockets.get(partnerId);
      if (partnerSocket) {
        notifyPartnerLeft(partnerId);
        cleanupSocket(partnerId);
        partnerSocket.disconnect(true);
      }
      console.log(`[BAN] ${partnerId} banned`);
    }

    // End session and re-queue reporter
    notifyPartnerLeft(socket.id);
    cleanupSocket(socket.id);
    setTimeout(() => socket.emit('find-match'), 300);
  });

  // ── Disconnect ───────────────────────────────────────────────────────────
  socket.on('disconnect', (reason) => {
    notifyPartnerLeft(socket.id);
    cleanupSocket(socket.id);
    setTimeout(broadcastOnlineCount, 300);
    console.log(`[-] ${socket.id} disconnected (${reason}) | total: ${io.engine.clientsCount}`);
  });
});

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 abudme Backend running on port ${PORT}\n`);
});
