import mongoose from 'mongoose'
import config from '../config'

export function initConnection () {
  return new Promise((resolve, reject) => {
    // Set native promise
    mongoose.Promise = global.Promise

    // # Open the mongoDB connection ##
    mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true })

    mongoose.set('useCreateIndex', true)

    mongoose.connection.once('connected', () => resolve())

    mongoose.connection.on('error', e => reject(e))
  })
}
