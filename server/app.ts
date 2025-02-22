import express, { Request, Response, NextFunction } from 'express';
import favicon from 'serve-favicon';

// Load .env
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: '../.env' });

// Create Server
const app = express();

const port = process.env.PORT;

// ---===  USES  ===--- \\


// ---===  END   ===--- \\


let publicImagePath: string;
// ---=== ROUTES ===--- \\

if (process.env.NODE_ENV === "development") {
  console.log("Running in DEVELOPMENT mode");
  publicImagePath = path.join(__dirname, '..', 'client', 'public', 'imgs', 'logos', 'AustinIcon-02.png');

  // If in development, proxy '/' to the hosted React server
  let proxy = require("http-proxy-middleware");

  app.use('/', proxy.createProxyMiddleware({
    target: "http://127.0.0.1:3000",
    changeOrigin: true
  }));
} else {
  console.log("Running in PRODUCTION mode");
  // If in production, serve build path
  let reactPath = path.join("..", process.env.CLIENT_BUILD_PATH);
  app.use('/', express.static(reactPath));
}
app.use(favicon(publicImagePath));

app.post('/email', (req: Request, res: Response) => {
  // TODO Handle email
})

// ---===  END   ===--- \\



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});