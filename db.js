const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

// Admin Schema
const adminSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hospital Schema
const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  services: {
    type: [String],
    required: true,
    validate: [services => services.length > 0, 'At least one service is required']
  },
});

// Appointment Schema
const appointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  hospitalId: { type: Schema.Types.ObjectId, ref: "hospital", required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
}, { timestamps: true });

// Models
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const hospitalModel = mongoose.model("hospital", hospitalSchema);
const appointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = {
  userModel,
  adminModel,
  hospitalModel,
  appointmentModel,
};
