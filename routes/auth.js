/**
 * User routes
 * host + /api/auth
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { createUser, login, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "The password is required").not().isEmpty(),

    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ],
  login
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
