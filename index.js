// Import required modules
import * as Sentry from "npm:@sentry/node@^7.64.0";
import express from "npm:express@^4.18.2";
import cors from 'npm:cors@^2.8.5';
import dotenv from "npm:dotenv@^16.3.1";
import mongoose from "npm:mongoose@^7.4.5";
// import cookieParser from "cookie-parser";

// Import route modules
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import shortyRoutes from "./routes/shorties.js";

// Create an Express application
const app = express();


// Use CORS middleware for handling cross-origin requests
app.use(cors());

// Load environment variables from a .env file
dotenv.config();

// Function to connect to the MongoDB database
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO) // Connect to the MongoDB database using the MONGO URL from environment variables
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((err) => {
      throw err;
    });
};

// Use cookie parser middleware to handle cookies in requests
// app.use(cookieParser());

// Use JSON parsing middleware to handle JSON data in requests
app.use(express.json());



Sentry.init({
    dsn: "https://a42930e5c92325730b9c6f2b5cd6bbe3@o449576.ingest.sentry.io/4505777327374336",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({
        tracing: true
      }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({
        app
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
  });
  
// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


// Set up routes
app.use("/api/users", userRoutes); // Mount the userRoutes at /api/users
app.use("/api/auth", authRoutes); // Mount the authRoutes at /api/auth
app.use("/api/shorties", shortyRoutes); // Mount the shortyRoutes at /api/shorties

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
  });

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Start the server and listen on port 8000
app.listen(8000, () => {
  connect(); // Connect to the MongoDB database
  console.log("Listening on port 8000");
});



// Export the Express API
// export default app;