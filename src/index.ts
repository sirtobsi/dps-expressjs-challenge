import express, { Express } from 'express'
import dotenv from 'dotenv'
import logger from './middleware/logger/logger'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
