import express, { Request, Response, NextFunction } from 'express';

// Load .env
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

// Create Server
const app = express();
const port = process.env.PORT;

// ---===  USES  ===--- \\


// ---===  END   ===--- \\


// ---=== ROUTES ===--- \\

if (process.env.NODE_ENV === "development") {
  let proxy = require("http-proxy-middleware");

  app.use('/', proxy.createProxyMiddleware({
    target:"http://localhost:3000",
    changeOrigin: true
  }));
  
} else {
  // TODO Direct to build path
  app.get('/', (req, res) => {
    res.send('<h1>Not in dev mode</h1>')
  })
}

app.post('/email', (req: Request, res: Response) => {
  // TODO Handle email
})

// ---===  END   ===--- \\



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});