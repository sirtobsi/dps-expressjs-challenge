import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import logger from './middleware/logger/logger'
import requestLogger from './middleware/logger/httplogger'
import { HelloWorldResponseDto } from '../api/generated'
import reportRouter from './routes/reportRouter'
import projectRouter from './routes/projectRouter'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerDocument = YAML.load('./api/src/api-spec.yaml')
app.use('/api-spec', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors())

app.use(requestLogger)

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ msg: 'Hello World!' } as HelloWorldResponseDto)
})

app.use('/reports', [reportRouter()])
app.use('/projects', [projectRouter()])

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`)
})
