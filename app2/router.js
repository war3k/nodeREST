const router = require("express").Router();
const User = require("./models/user");

router.get("/", (req, res) => res.status(200).send({ message: "Hooray! Api works!" }));

router.get("/users", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }else if(!users.length){
      res.sendStatus(404);
    }else {
      res.status(200).send(users);
    }
  });
});

router.post("/users", (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    }
    console.log(JSON.stringify(user));
    res.status(201).send({ message: "User created!", _id: user._id, location: `/api/users/${user.id}` });
  });
});

router.get("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).send({user: user});
    }
  });
});

router.put("/users/:id", (req, res) => {
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
});

router.delete("/users/:id", (req, res) => {
  User.remove({_id: req.params.id}, function(err) {
    if (err) {
      res.send(err);
    }else {
      res.status(200).send({message: 'Successfully deleted'});
    }
  });
});


module.exports = router;
