const http = require('http');
const socketIo = require('socket.io');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req: Request, res: Response) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on('connection', (socket: any) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('message', (msg: any) => {
      console.log('Message received: ' + msg);
      io.emit('message', msg);
    });
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
