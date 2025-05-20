import db from "../db.js";
import participantsModel from "../models/participants.model.js";

// Register a new participant
export const registerParticipant = async (req, res) => {
  try {
    const { name, email, event_id } = req.body || {};

    if (!name || !email || !event_id) {
      return res
        .status(400)
        .json({ error: "Name, email, and event_id are required" });
    }

    const existing = await db`
      SELECT * FROM participants WHERE email = ${email} AND event_id = ${event_id}
    `;
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ error: "This email is already registered for this event" });
    }

    const participant = await participantsModel.create({
      name,
      email,
      event_id,
    });
    res.status(201).json(participant);
  } catch (err) {
    console.error("Error creating participant:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get participants for a specific event
export const getByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const participants = await participantsModel.getByEventId(eventId);
    if (!participants || participants.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(participants);
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ error: "Server error while fetching participants" });
  }
};

// Cancel a participant's registration
export const cancel = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { reason } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: "Participant ID is required" });
    }
    if (!reason) {
      return res.status(400).json({ error: "Cancellation reason is required" });
    }

    const existing = await db`
      SELECT * FROM participants WHERE id = ${id}
    `;
    if (existing.length === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }

    const cancelled = await participantsModel.cancel(id, reason);
    if (!cancelled) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.status(200).json(cancelled);
  } catch (err) {
    console.error("Error cancelling participant:", err);
    res
      .status(500)
      .json({ error: "Server error while cancelling registration" });
  }
};
