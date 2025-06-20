import { createStudent } from "../services/dbServices/studentServices.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const handles = [
  "tourist", "Benq", "Um_nik", "KAN", "mystery", "Radewoosh", "rajat376", "Gennady Korotkevich",
  "unhindered", "newmoto", "Sidd_Rai", "dush1729", "varun312", "PulkitGarg01", "adarsh.kumariitbhu",
  "code_ninja_7711", "unbased", "yashcoder07", "im_verite", "M_mittal", "banna_3108", "sanjuguptasbg264",
  "amrutenac4", "PythonBetter", "maroonrk", "Dominater069", "jtnydv25", "MridulAhi", "IceKnight1093",
  "arnabmanna", "cerberus97", "invertedwinger", "_runtimeTerror_", "SmolBrain", "socho", "anaswarkb013",
  "shiven", "Rodger2041", "Divine_Spark", "RahulChugh", "aryanc403", "apgpsoop", "TyroWhizz",
  "rehan_amaan_how_so_good", "tsunk", "sai-17", "nishkarsh"
];

function generateRandomEmail(domain = "example.com") {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `user_${randomString}@${domain}`;
}

function generateRandomPhone() {
  return `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`; // Always 10 digits
}

async function getName(handles) {
  try {
    const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${handles.join(";")}`);
    if (data.status === "OK") {
      return data.result.map(user => ({
        handle: user.handle,
        name: user.firstName || user.lastName
          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
          : user.handle
      }));
    }
    return [];
  } catch (error) {
    console.error("❌ Error fetching names from Codeforces API:", error.message);
    return [];
  }
}

async function seedStudents() {
  try {
    const handlesWithName = await getName(handles);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    if (!handlesWithName.length) {
      console.error("❌ No student data fetched from Codeforces.");
      return;
    }

      await Promise.all(
          handlesWithName.map(async (user) => {
              try {
                  await createStudent({
                      handle: user.handle,
                      name: user.name,
                      email: generateRandomEmail(),
                      phone: generateRandomPhone()
                  });
                  console.log(`✅ Student ${user.handle} seeded`);
              } catch (error) {
                  console.error(`❌ Error creating student ${user.handle}:`, error.message);
              }
          })
      );

    console.log("🎉 All students seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding students:", error.message);
  } finally
    {
      await mongoose.disconnect();
    }
}


await seedStudents();

