import db from "../db.js";

const eventModel = {
  create: async (event) => {
    const { name, description, date, location, ownerId, ownerName } = event;

    const [createdEvent] = await db`
      INSERT INTO events (name, description, date, location, owner_id, owner_name)
      VALUES (${name}, ${description}, ${date}, ${location}, ${ownerId}, ${ownerName})
      RETURNING *
    `;
    return createdEvent;
  },

  getAll: async () => {
    const events = await db`
      SELECT * FROM events
      ORDER BY date ASC
    `;
    return events;
  },

  getById: async (id) => {
    const [event] = await db`
      SELECT * FROM events
      WHERE id = ${id}
    `;
    return event;
  },

  update: async (id, event) => {
    const { name, description, date, location } = event;

    const [updatedEvent] = await db`
      UPDATE events
      SET name = ${name}, description = ${description}, date = ${date}, location = ${location}
      WHERE id = ${id}
      RETURNING *
    `;
    return updatedEvent;
  },

  delete: async (id) => {
    // Delete participants first (optional)
    /* await db`
      DELETE FROM participants WHERE event_id = ${id}
    `; */

    const result = await db`
      DELETE FROM events WHERE id = ${id}
    `;
    return result.count > 0;
  },
};

export default eventModel;
