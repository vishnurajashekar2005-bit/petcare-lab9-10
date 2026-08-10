import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const client = new MongoClient("mongodb://127.0.0.1:27017");

const db = client.db("PetCareDB");
const pets = db.collection("pets");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get("/api", async (req, res) => {
  try {
    const filteredData = await pets.find().toArray();
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
});

app.get("/api/:field/:term", async (req, res) => {
  try {
    const { field, term } = req.params;

    const allowedFields = ["owner", "pet", "type"];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        message: "Search field is not allowed. Use owner, pet, or type"
      });
    }

    const filteredData = await pets
      .find({
        [field]: {
          $regex: `^${term}$`,
          $options: "i"
        }
      })
      .toArray();

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Error searching pets" });
  }
});

app.post("/api", async (req, res) => {
  try {
    const newPet = req.body;

    const result = await pets.insertOne(newPet);

    if (newPet.email) {
      await transporter.sendMail({
        from: `"PetCare" <${process.env.EMAIL_USER}>`,
        to: newPet.email,
        subject: `Pet Registration Confirmation - ${newPet.pet}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #2563eb;">Pet Registration Confirmation</h2>
            <p>Dear Pet Owner,</p>
            <p>Your pet has been successfully registered.</p>
            <p><strong>Owner:</strong> ${newPet.owner}</p>
            <p><strong>Pet:</strong> ${newPet.pet}</p>
            <p><strong>Type:</strong> ${newPet.type}</p>
            <p>Thank you for using PetCare!</p>
          </div>
        `
      });
    }

    res.status(201).json({
      message: "Pet added successfully",
      id: result.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding pet"
    });
  }
});

app.put("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pets.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Pet not found"
      });
    }

    if (req.body.email) {
      await transporter.sendMail({
        from: `"PetCare" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: `Pet Details Updated - ${req.body.pet}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #2563eb;">Pet Details Updated</h2>
            <p>Dear Pet Owner,</p>
            <p>Your pet details have been successfully updated.</p>
            <p><strong>Owner:</strong> ${req.body.owner}</p>
            <p><strong>Pet:</strong> ${req.body.pet}</p>
            <p><strong>Type:</strong> ${req.body.type}</p>
            <p>Thank you for using PetCare!</p>
          </div>
        `
      });
    }

    res.json({
      message: "Pet updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating pet"
    });
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await pets.findOne({
      _id: new ObjectId(id)
    });

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found"
      });
    }

    const result = await pets.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Pet not found"
      });
    }

    if (pet.email) {
      await transporter.sendMail({
        from: `"PetCare" <${process.env.EMAIL_USER}>`,
        to: pet.email,
        subject: `Pet Registration Deleted - ${pet.pet}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #dc2626;">Pet Registration Deleted</h2>
            <p>Dear Pet Owner,</p>
            <p>Your pet registration has been deleted.</p>
            <p><strong>Owner:</strong> ${pet.owner}</p>
            <p><strong>Pet:</strong> ${pet.pet}</p>
            <p><strong>Type:</strong> ${pet.type}</p>
          </div>
        `
      });
    }

    res.json({
      message: "Pet deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting pet"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});