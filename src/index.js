import app from "./app";
import connectDB from "./db/db";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 8000;

connectDB()
    .then(
        app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)})
    )
    .catch((err) => {
        console.log("Connection error: ", err);
        process.exit(1);
        // for now we will never get into this catch becasuse I am not throwing anyhing form db.js
    })