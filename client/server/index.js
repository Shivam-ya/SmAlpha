import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Login route (mock – frontend focused)
app.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  res.json({
    token: "fake-jwt-token",
    user: {
      name: email.split("@")[0],
      email,
      role: "Frontend Intern",
      status: "Active"
    }
  });
});

// Signup route (mock)
app.post("/signup", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  res.json({
    message: "User registered successfully",
    user: {
      name,
      email,
      role: "Frontend Intern",
      status: "Active"
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
