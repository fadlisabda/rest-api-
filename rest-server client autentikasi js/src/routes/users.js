const express = require("express");
const router = express.Router();
const UserController = require("../controller/users");
router.get("/", UserController.getAllUsers);

router.post("/", UserController.createNewUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
module.exports = router;
