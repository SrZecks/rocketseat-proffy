import express from "express";
import cors from "cors";

const app = express();

const port = process.env.port || 5000

// middlewares
app.use(cors());
app.use(express.json());
// Use routes
app.use("/users", require("./routes/users"));
app.use("/classes", require("./routes/classes"));
app.use("/connections", require("./routes/connections"));

app.listen(port);