import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer = new MongoMemoryServer()

// Extend the default timeout so MongoDB binaries can download
jest.setTimeout(60000)

export default {
  initConnection () {
    return new Promise((resolve, reject) => {
      // Connect
      mongoose.Promise = Promise
      mongoServer.getConnectionString().then(mongoUri => {
        const mongooseOpts = {
          useNewUrlParser: true,
          useCreateIndex: true
        }

        mongoose.connect(mongoUri, mongooseOpts)

        mongoose.connection.on('error', e => {
          if (e.message.code === 'ETIMEDOUT') {
            mongoose.connect(mongoUri, mongooseOpts)
          }
        })

        mongoose.connection.once('open', () => {
          resolve()
        })
      })
    })
  },
  dump () {
    return mongoose.connection.db.dropDatabase()
  },
  close () {
    mongoose.disconnect()
    mongoServer.stop()
  }
}
