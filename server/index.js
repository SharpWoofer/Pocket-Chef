import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import recipeRoutes from "./routes/recipeRoutes.js";
import authRouter from "./routes/auth.js";
import calorieTrackerRouter from "./routes/calorieRoutes.js";
import gymRouter from "./routes/gymRoutes.js";
import workoutRouter from "./routes/workoutRoutes.js";
//import userRoutes from "./routes/user.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import CommonRouter from "./routes/common.js";

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
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static files stored locally
// app.use('/api', userRoutes);

/* FILE STORAGES */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/assets");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.originalname}`);
//     }
// });
// const upload = multer({storage: storage}); //when using upload.single("file") in the route, the file will be stored in the public/assets folder

/* ROUTES  WITH FILES */
//app.post("/auth/register", upload.single("picture"),register);

/* ROUTES */
app.use("/auth", authRouter);
//app.use("/user", userRoutes);

/* INTEGRATING SPOONACULAR ROUTES */
app.use("/recipes", recipeRoutes); // Use the spoonacular routes here

app.use("/ingredients", calorieTrackerRouter);

app.use("/workout", workoutRouter);

app.use('/recipes/favorites', favoriteRoutes);

app.use('/gyms', gymRouter);
app.use("/common", CommonRouter);

// Add a root route handler
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Status</title>
            <style>
                body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0; }
                .status { text-align: center; }
                .message { font-size: 24px; color: #333; }
                .footer { margin-top: 20px; font-size: 16px; color: #666; }
            </style>
        </head>
        <body>
            <div class="status">
                <p class="message">Server is running!</p>
                <p class="footer">Welcome to our service.</p>
            </div>
        </body>
        </html>
    `);
});


/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 5001;
const PORT = 5001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
