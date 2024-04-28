const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://bespoke-churros-13e845.netlify.app",
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection URL
// { useNewUrlParser: true, useUnifiedTopology: true } removed from client to prevent warnings
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("assignment");
    const collection = db.collection("users");
    const donationCollection = db.collection("donationCol");
    const donationWithDonarCollection = db.collection("donationWithDonar");
    const testimonialCollection = db.collection("testimonial");
    const communityCollection = db.collection("community");
    const volunteerCollection = db.collection("volunteer");

    // User Registration
    app.post("/api/v1/register", async (req, res) => {
      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      await collection.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    });

    // User Login
    app.post("/api/v1/login", async (req, res) => {
      const { email, password } = req.body;

      // Find user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });

      res.cookie("refreshToken", token, {
        //secure: config.NODE_ENV === "production",
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });

      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    });

    // ==============================================================
    // WRITE YOUR CODE HERE

    // -----------------  add donation post   ------------------
    app.post("/api/v1/add-donation-post", async (req, res) => {
      const donationData = req.body;

      const returnInfo = await donationCollection.insertOne(donationData);

      res.status(201).json(returnInfo);
    });

    // ------------------  get all donations   -----------------------
    app.get("/api/v1/all-donations", async (req, res) => {
      const returnInfo = await donationCollection.find().toArray();

      res.status(201).json(returnInfo);
    });

    // -----------------------  delete donations  ----------------------------
    app.delete("/api/v1/delete-donation/:id", async (req, res) => {
      const id = req.params.id;

      const returnInfo = await donationCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.status(201).json(returnInfo);
    });

    // -------------------  update donations  --------------------------
    app.put("/api/v1/update-donation/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;

      const returnInfo = await donationCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: body.title,
            category: body.category,
            amount: body.amount,
            description: body.description,
          },
        }
      );

      res.status(201).json(returnInfo);
    });

    // -------------------  get single donation  --------------------------
    app.get("/api/v1/donation/:id", async (req, res) => {
      const id = req.params.id;

      //console.log("id", id);

      const result = await donationCollection.findOne({
        _id: new ObjectId(id),
      });
      //console.log(id, result);

      res.status(201).json(result);
    });

    // -----------------  add donation with user info  ------------------
    app.post("/api/v1/add-donation", async (req, res) => {
      const donationData = req.body;

      const returnInfo = await donationWithDonarCollection.insertOne(
        donationData
      );

      res.status(201).json(returnInfo);
    });

    // -----------------  add testimonial post   ------------------
    app.post("/api/v1/create-testimonial", async (req, res) => {
      const testimonial = req.body;

      const returnInfo = await testimonialCollection.insertOne(testimonial);

      res.status(201).json(returnInfo);
    });

    // ------------------  get all testimonial   -----------------------
    app.get("/api/v1/all-testimonial", async (req, res) => {
      const returnInfo = await testimonialCollection.find().toArray();

      res.status(201).json(returnInfo);
    });

    // -----------------  add community comment   ------------------
    app.post("/api/v1/create-community", async (req, res) => {
      const community = req.body;

      const returnInfo = await communityCollection.insertOne(community);

      res.status(201).json(returnInfo);
    });

    // ------------------  get all community comment   -----------------------
    app.get("/api/v1/all-community", async (req, res) => {
      const returnInfo = await communityCollection.find().toArray();

      res.status(201).json(returnInfo);
    });

    // -----------------  add volunteer   ------------------
    app.post("/api/v1/create-volunteer", async (req, res) => {
      const volunteer = req.body;

      const returnInfo = await volunteerCollection.insertOne(volunteer);

      res.status(201).json(returnInfo);
    });

    // ------------------  get all community comment   -----------------------
    app.get("/api/v1/all-volunteer", async (req, res) => {
      const returnInfo = await volunteerCollection.find().toArray();

      res.status(201).json(returnInfo);
    });

    // ==============================================================

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
