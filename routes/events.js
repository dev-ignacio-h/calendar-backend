/**
 * Events routes
 * host + /api/events
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateFields } = require("../middlewares/validateFields");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = Router();
router.use(validateJWT);

// get events
router.get("/", getEvents);

// create new event
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

// update event
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
