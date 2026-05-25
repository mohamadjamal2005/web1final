const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== "admin@test.com" ||
    password !== "123456"
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({
    success: true,
    message: "Login successful",
  });
});

app.get("/auth/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return res.json({
      authenticated: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
    });
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logged out",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});