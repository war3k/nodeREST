const router = require("express").Router();
const User = require("./../models/user");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);


function getAll(req, res) {
  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else if (!users.length) {
      res.sendStatus(404);
    } else {
      res.status(200).send(users);
    }
  });
};

function create(req, res) {
  let user = new User(req.body);
  // validation for unique email
  User.findOne({email: req.body.email}, (err, user) => {
    if(user) res.status(409).send({error: `Email '${req.body.email}' already exists!`})
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(JSON.stringify(user));
    res.status(201).send({ message: "User created!", user:user, location: `/api/users/${user.id}` });
  });
};

function getById(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).send({user: user});
    }
  });
};

function update(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      user = Object.assign(user,req.body);
      user.save((err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        console.log(JSON.stringify(user));
        res.status(200).send({ message: "User updated!", user:user, location: `/api/users/${user.id}` });
      });
    }
  });
};

function _delete(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) {
      res.send(err);
    }else {
      res.status(200).send({message: 'Successfully deleted'});
    }
  });
};

module.exports = router;
