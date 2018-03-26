const router = require("express").Router();
const userService = require("./../services/users.service");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);


async function getAll(req, res) {
  try {
    const users = await userService.getAll();
    if (users.length) {
      res.status(200).send(users);
    } else {
      res.sendStatus(404);
    }
  } catch (err){
    res.status(500).send(err);
  }
};

async function create(req, res) {
  try {
    const user = await userService.create(req.body);
      res.status(201).send(user);
  } catch (err) {
    if(err.status===409) {
      res.status(409).send(err);
    }else {
      res.status(500).send(err);
    }
  }
};

async function getById(req, res) {
  try {
    const user = await userService.getById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err){
    res.status(500).send(err);
  }
};

async function update(req, res) {
  try {
    const user = await userService.update(req.params.id, req.body);
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err){
    res.status(500).send(err);
  }
};

async function _delete(req, res) {
  try {
    const deleted = await userService._delete(req.params.id);
      res.status(200).send(deleted);
  } catch (err){
    res.status(500).send(err);
  }
};

module.exports = router;
