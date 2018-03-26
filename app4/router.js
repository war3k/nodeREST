const router = require("express").Router();
const usersRouter = require("./controllers/users.controller");

router.get("/", (req, res) => res.status(200).send({ message: "Hooray! Api works!" }));
router.use("/users",usersRouter);

module.exports = router;
