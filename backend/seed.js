import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import doctorModel from './models/doctorModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDoctors = async () => {
  try {
    console.log("Connecting to database and Cloudinary...");
    await connectDB();
    await connectCloudinary();

    // Read and parse assets.js to extract the doctors array
    const assetsPath = path.join(__dirname, '../frontend/src/assets/assets.js');
    console.log(`Reading assets from: ${assetsPath}`);
    const fileContent = fs.readFileSync(assetsPath, 'utf8');

    const doctorsIndex = fileContent.indexOf('export const doctors =');
    if (doctorsIndex === -1) {
      throw new Error("Could not find 'export const doctors =' in assets.js");
    }

    let doctorsPart = fileContent.slice(doctorsIndex);
    // Replace variable references like 'image: doc1' with strings like 'image: "doc1.png"'
    doctorsPart = doctorsPart.replace(/image:\s*(doc\d+)/g, 'image: "$1.png"');
    // Strip export
    doctorsPart = doctorsPart.replace('export const doctors =', 'const doctors =');

    // Evaluate the code to get the doctors array
    const executableCode = doctorsPart + '\n;global.doctorsArray = doctors;';
    eval(executableCode);

    const doctors = global.doctorsArray;
    if (!Array.isArray(doctors) || doctors.length === 0) {
      throw new Error("Parsed doctors is not a valid non-empty array");
    }

    console.log(`Successfully parsed ${doctors.length} doctors from assets.js.`);

    // Clear existing doctors to ensure fresh seed
    console.log("Clearing existing doctors collection...");
    await doctorModel.deleteMany({});
    console.log("Database cleared.");

    // Generate static salt for password hashing
    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('doctor123', salt);

    for (const doc of doctors) {
      const imageName = doc.image;
      const imagePath = path.join(__dirname, '../frontend/src/assets', imageName);

      console.log(`Uploading image for ${doc.name} (${imageName})...`);
      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file does not exist: ${imagePath}`);
      }

      // Upload to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imagePath, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;
      console.log(`Uploaded successfully. Cloudinary URL: ${imageUrl}`);

      // Construct doctor data
      // Generate clean email based on name
      const email = doc.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@prescripto.com';

      const doctorData = {
        name: doc.name,
        email: email,
        password: defaultPasswordHash,
        image: imageUrl,
        speciality: doc.speciality,
        degree: doc.degree,
        experience: doc.experience,
        about: doc.about,
        fees: doc.fees,
        address: doc.address,
        date: Date.now(),
        available: true,
        slots_booked: {}
      };

      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
      console.log(`Saved doctor to DB: ${doc.name} with email ${email}`);
    }

    console.log("All doctors successfully seeded!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDoctors();
