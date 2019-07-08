import mongoose from 'mongoose'
import config from '../config'

export function initConnection () {
  return new Promise((resolve, reject) => {
    // Do not connect to database when running test
    if (process.env.NODE_ENV === 'test') return resolve()

    // Set native promise
    mongoose.Promise = global.Promise

    // # Open the mongoDB connection ##
    mongoose.connect(config.mongoDBUrl, { useNewUrlParser: true })

    mongoose.set('useCreateIndex', true)

    mongoose.connection.once('connected', () => resolve())

    mongoose.connection.on('error', e => reject(e))
  })
}
