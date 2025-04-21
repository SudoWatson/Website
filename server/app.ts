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
app.get('/localbusinesssurvey', (_: Request, res: Response) => {
  console.log("Test");
  res.redirect(303, "https://tally.so/r/wvdvMA");
})

app.post('/email', (req: Request, res: Response) => {
  // TODO Handle email
})

// Needs to be last route for some reason
if (process.env.NODE_ENV === "development") {
  console.log("Running in DEVELOPMENT mode");
  
  // If in development, proxy '/' to the hosted React server
  let proxy = require("http-proxy-middleware");

  app.use('/', proxy.createProxyMiddleware({
    target:"http://127.0.0.1:3000",
    changeOrigin: true
  }));
} else {
  console.log("Running in PRODUCTION mode");
  // If in production, serve build path
  let reactPath = path.join("..", process.env.CLIENT_BUILD_PATH);
  app.use('/', express.static(reactPath));
}


// ---===  END   ===--- \\



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});