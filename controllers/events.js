const { response } = require("express");
const Event = require("../models/Event");

// get events
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  console.log(events);
  res.json({
    ok: true,
    events,
  });
};

// create event
const createEvent = async (req, res = response) => {
  // verify event
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const storedEvent = await event.save();
    res.json({
      ok: true,
      event: storedEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Talk to admin",
    });
  }
};

// update event
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event doesn't exist",
      });
    }

    if (String(event.user) !== uid) {
      return res.status(403).json({
        ok: false,
        msg: "Forbiden",
      });
    }

    const newEvent = { ...req.body, user: uid };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk to admin",
    });
  }
};

// delete event
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event doesn't exist",
      });
    }

    if (String(event.user) !== uid) {
      return res.status(403).json({
        ok: false,
        msg: "Forbiden",
      });
    }

    await Event.findOneAndDelete(eventId);

    return res.json({ ok: true });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk to admin",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
