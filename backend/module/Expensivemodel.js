const mongoose = require('mongoose')

const todoschema = new mongoose.Schema({
  name: { type: String, required: true },
  categary: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
})

// model name = "details", schema = todoschema
const todomodel = mongoose.model("details", todoschema)

module.exports = todomodel
