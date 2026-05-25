require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const otpStore = {};

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
  const {
    email,
    password,
    turnstileToken,
  } = req.body;

  const verifyURL =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const cloudflareResponse = await fetch(
    verifyURL,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret:
          process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    }
  );

  const data =
    await cloudflareResponse.json();

  if (!data.success) {
    return res.status(400).json({
      success: false,
      message:
        "Robot verification failed",
    });
  }

  if (
    email !== "mohamad.jamal@isae.edu.lb" ||
    password !== "123456"
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  otpStore[email] = otp;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your OTP Code",
    html: `
      <h1>Your OTP Code</h1>
      <p>Your verification code is:</p>
      <h2>${otp}</h2>
    `,
  });

  return res.json({
    success: true,
    message: "OTP sent to your email",
    email,
  });
});

app.post("/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  if (storedOtp !== otp) {
    return res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  delete otpStore[email];

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