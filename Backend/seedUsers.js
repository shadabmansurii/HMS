const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/admin");
const Staff = require("./models/staff");
const Patient = require("./models/patient");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart-hospital";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old users
    await Admin.deleteMany({});
    await Staff.deleteMany({});
    await Patient.deleteMany({});

    // Create admin
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const admin = new Admin({
      name: "Super Admin",
      username: "admin1",
      email: "admin@hospitaladmin.com",
      password: adminPassword,
    });
    await admin.save();
    console.log("Admin created");

    // Create staff
    const staffPassword = await bcrypt.hash("Staff@123", 10);
    const staff = new Staff({
      name: "Staff User",
      username: "staff1",
      email: "staff1@hospital.com",
      password: staffPassword,
      role: "doctor",
      department: "General",
    });
    await staff.save();
    console.log("Staff created");

    // Create patient
    const patientPassword = await bcrypt.hash("Patient@123", 10);
    const patient = new Patient({
      name: "John Doe",
      username: "patient1",
      email: "patient1@gmail.com",
      password: patientPassword,
    });
    await patient.save();
    console.log("Patient created");

    console.log("All users seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
