import eventModel from "../models/event.model.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body || {};
    const { uid, username } = req.user || {};

    if (!name || !date || !location) {
      return res
        .status(400)
        .json({ error: "Name, date, and location are required." });
    }
    if (new Date(date) < new Date()) {
      return res.status(400).json({ error: "Date must be in the future." });
    }

    const newEvent = await eventModel.create({
      name,
      description: description || "",
      date,
      location,
      ownerId: uid,
      ownerName: username,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all events
export const getAllEvents = async (_req, res) => {
  try {
    const events = await eventModel.getAll();
    if (!events || events.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.getById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, location } = req.body;
    const { uid } = req.user || {};
    const event = await eventModel.getById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.owner_id !== uid) {
      return res.status(403).json({ error: "You are not authorized to update this event" });
    }

    const updated = await eventModel.update(id, {
      name,
      description: description || "",
      date,
      location,
    });

    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user || {};
    const event = await eventModel.getById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.owner_id !== uid) {
      return res.status(403).json({ error: "You are not authorized to delete this event" });
    }
    const success = await eventModel.delete(id);

    if (!success) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

