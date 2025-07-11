import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/web.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

// Serve static files from public directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});