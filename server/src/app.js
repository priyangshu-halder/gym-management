import express from 'express'
import router from './routes/v1/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
// basic configuration
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())
// CORS basic configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', router)
export default app
