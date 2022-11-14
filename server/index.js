const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const seed = require('../script/seed');
require("dotenv").config();
// const cors = require('cors');
// app.use(cors());
const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    // app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
      console.log(`User Connected: ${socket.id}`);

      socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
      });

      socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
