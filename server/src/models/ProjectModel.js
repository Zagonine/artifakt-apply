import mongoose from 'mongoose'
import config from '../config'

const projetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: config.projectSchemaRestrictions.name.maxlength
  },
  code: {
    type: String,
    required: true,
    maxlength: config.projectSchemaRestrictions.code.maxlength,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('projects', projetSchema)
