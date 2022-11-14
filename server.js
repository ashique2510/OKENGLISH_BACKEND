const express=require('express')
const colors=require('colors')
const cors = require('cors')
const dotevn=require('dotenv').config()
const {errorHandler} =require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
const socket = require('socket.io')
const port=process.env.PORT || 8000

connectDB()

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/messages',require('./routes/messagesRoutes'))
app.use('/api/tutor',require('./routes/tutorRoutes'))
app.use('/api/article',require('./routes/articleRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/payment' ,require('./routes/paymentRoute'))



app.use(errorHandler)

const server = app.listen(port,()=>console.log( `Server started on port ${port}` ))

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

