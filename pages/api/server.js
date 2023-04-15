const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  // Add middleware to set expires headers for image files
  server.use('/static/images', (req, res, next) => {
    if (req.url.match(/\.(jpe?g|png|gif|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
    }
    next();
  });

  // Add a catch-all route to handle all other requests
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
