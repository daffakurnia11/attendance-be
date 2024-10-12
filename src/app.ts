import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "./config/passport";

import AuthRoute from "./routes/AuthRoute";
import UserRoute from "./routes/UserRoute";
import { errorHandler } from "./middlewares/errorHandler";
import { responseHandler } from "./middlewares/responseHandler";

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport setup
app.use(passport.initialize());

// Import routes here
app.use(responseHandler);
app.use("/api/auth", AuthRoute.router);
app.use("/api/user", UserRoute.router);
app.use(errorHandler);

export default app;
