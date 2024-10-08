const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database");
const Cars = require("./routes/carsRoute.js");
const Login = require("./routes/auth.js");
const Register = require("./routes/register.js");
const Admin = require("./routes/admin.js");

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://quadiro-assignment-two.vercel.app"],
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  })
);

// app.use(cors());

app.options("*", cors()); // Pre-flight requests for all routes

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <html>
        <title>Server</title>
        <h1>Hello!!!</h1>
      </html>
    `);
});

connectDB();

app.use("/api/v1/cars", Cars);
app.use("/api/v1/login", Login);
app.use("/api/v1/register", Register);
app.use("/api/v1/admin_login", Admin);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running: ${port}`);
});
