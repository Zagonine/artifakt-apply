import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

routes(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
