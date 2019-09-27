const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);
const isDev = require('electron-is-dev');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');
const expressApp = require('express')();
const server = require('http').Server(expressApp);
const io = require('socket.io')(server);
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');


if (isDev) {
  console.log('Running in development');
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

    installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
} else {
  console.log('Running in production');
}

let mainWindow;

function createWindow() {
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());

  server.listen(3002);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: './icon_png.png'
  });

  mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${__dirname}/../dist/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const handleRequest = (request, response, socket) => {
    try {
      if (request.headers['content-type'].includes('json')
        || request.headers['content-type'].includes('xml')) {
        socket.emit('post_received', request.body);
        response.status(200);
        response.end();
      } else {
        response.status(400);
        response.end();
      }
    } catch {
      response.status(500);
      response.end();
    }
  };

  const poster = io.on('connection', (socket) => {
    console.log('a user connected');

    expressApp.post('/posturl', (request, response) => {
      handleRequest(request, response, socket);
    });

    expressApp.patch('/posturl', (request, response) => {
      handleRequest(request, response, socket);
    });

    expressApp.put('/posturl', (request, response) => {
      handleRequest(request, response, socket);
    });

    expressApp.delete('/posturl', (request, response) => {
      handleRequest(request, response, socket);
    });
  });

  io.on('disconnect', () => {
    console.log('a user disconnected');
  });
}

app.on('ready', createWindow);
