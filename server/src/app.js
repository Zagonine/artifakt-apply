import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import * as mongooseUtils from './utils/mongoose'
import logger from './utils/logger'

const app = express()

// Do not log endpoints when running tests
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())
app.use(cors())

// Load routing
routes(app)

// Connect to MongoDB
mongooseUtils
  .initConnection()
  .then(() => {
    logger.info('MongoDB', 'Connected to MongoDB')
  })
  .catch(err => {
    logger.error(err)
  })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info('Server', `App listening on port ${PORT}`)
})

export default app
