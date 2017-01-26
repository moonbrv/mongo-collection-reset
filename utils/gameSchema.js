import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  matchtag: {
    type: String,
    lowercase: true,
    trim: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10
  },
  genres: [String],
  price: {
    type:Number,
    requred: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: [{
    type: String,
    required: true
  }],
  avgtime: String,
  minage: {
    type: Number,
    min: 3
  },
  cover: String,
  images: [String],
  description: String,
  contain: [String],
  company: String,
  homepage: String
})

export default schema
