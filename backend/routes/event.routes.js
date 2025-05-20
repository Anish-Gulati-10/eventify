import express from 'express'
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js'
import verifyToken from '../middleware/verifyToken.js'


const eventRouter = express.Router()

eventRouter.post('/',verifyToken, createEvent)
eventRouter.get('/', getAllEvents)
eventRouter.get('/:id', getEventById)
eventRouter.put('/:id',verifyToken, updateEvent)
eventRouter.delete('/:id',verifyToken, deleteEvent)

export default eventRouter
