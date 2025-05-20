import express from 'express'
import { cancel, getByEventId, registerParticipant } from '../controllers/participant.controller.js';

const participantRouter = express.Router();

participantRouter.post('/register', registerParticipant)
participantRouter.get('/:eventId', getByEventId)

export default participantRouter