import db from "../db.js";

const participantsModel = {
  create: async ({ name, email, event_id }) => {
    const [registeredParticipant] = await db`
      INSERT INTO participants (name, email, event_id)
      VALUES (${name}, ${email}, ${event_id})
      RETURNING *
    `
    return registeredParticipant
  },

  getByEventId: async (eventId) => {
    const result = await db`
      SELECT * FROM participants
      WHERE event_id = ${eventId}
      ORDER BY registered_at DESC
    `
    return result
  },

  //add cancel_reason
  cancel: async (id, reason) => {
    const [result] = await db`
      UPDATE participants
      SET cancel_reason = ${reason}
      WHERE id = ${id}
      RETURNING *
    `
    return result
  }
}

export default participantsModel
