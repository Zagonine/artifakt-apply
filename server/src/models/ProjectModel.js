import mongoose from 'mongoose'
import config from '../config'
import stringUtils from '../utils/string'

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
    unique: true,
    index: true,
    validate: {
      validator: (v) => {
        return stringUtils.isAlphaNumeric(v)
      },
      message: 'Code must be an alphanumeric value'
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      ret.created_at = ret.created_at.getTime()
      delete ret._id
      delete ret.__v
    }
  }
})

export default mongoose.model('projects', projetSchema)
