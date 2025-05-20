import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import eventRouter from './routes/event.routes.js'
import participantRouter from './routes/participant.routes.js'
import authRouter from './routes/auth.routes.js'


const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors()) // Allow requests from frontend
app.use(express.json()) // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Eventify Backend is running 🚀')
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/events', eventRouter)
app.use('/api/participants', participantRouter)


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
