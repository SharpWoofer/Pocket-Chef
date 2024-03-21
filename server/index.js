import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import recipeRoutes from "./routes/recipeRoutes.js";
import authRouter from "./routes/auth.js";
//import userRoutes from "./routes/user.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, "public/assets"))); // Serve static files stored locally

/* FILE STORAGES */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});
const upload = multer({storage: storage}); //when using upload.single("file") in the route, the file will be stored in the public/assets folder

/* ROUTES  WITH FILES */
//app.post("/auth/register", upload.single("picture"),register);

/* ROUTES */
app.use("/auth", authRouter);
//app.use("/user", userRoutes);

/* INTEGRATING SPOONACULAR ROUTES */
app.use("/searchRecipe", recipeRoutes); // Use the spoonacular routes here

/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
