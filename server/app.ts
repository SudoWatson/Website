import express, { Request, Response, NextFunction } from 'express';

// Load .env
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: '../.env'});

// Create Server
const app = express();
const port = process.env.PORT;

// ---===  USES  ===--- \\


// ---===  END   ===--- \\


// ---=== ROUTES ===--- \\

if (process.env.NODE_ENV === "development") {
  // If in development, proxy '/' to the hosted React server
  let proxy = require("http-proxy-middleware");

  app.use('/', proxy.createProxyMiddleware({
    target:"http://127.0.0.1:3000",
    changeOrigin: true
  }));
  
} else {
  // If in production, serve build path
  let reactPath = path.join("..", process.env.CLIENT_BUILD_PATH);
  app.use(express.static(reactPath));
}

app.post('/email', (req: Request, res: Response) => {
  // TODO Handle email
})

// ---===  END   ===--- \\



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});