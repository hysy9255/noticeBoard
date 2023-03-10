const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, unique: true, require: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = { categorySchema };
