const usersInRoom = {};

function noteSocket(io) {
  io.on("connection", (socket) => {
    socket.on("join_note", (noteId) => {
      socket.join(noteId);

      if (!usersInRoom[noteId]) usersInRoom[noteId] = new Set();
      usersInRoom[noteId].add(socket.id);
      io.to(noteId).emit("active_users", usersInRoom[noteId].size);

      socket.on("note_update", ({ noteId, content }) => {
        socket.to(noteId).emit("note_update", content);
      });

      socket.on("disconnect", () => {
        for (const room in usersInRoom) {
          if (usersInRoom[room].has(socket.id)) {
            usersInRoom[room].delete(socket.id);
            io.to(room).emit("active_users", usersInRoom[room].size);
          }
        }
      });
    });
  });
}

module.exports = noteSocket;
