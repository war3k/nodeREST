const router = require("express").Router();
const User = require("./../models/user");

function getAll() {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) {
        reject(err);
      } else if (!users.length) {
        resolve();
      } else {
        resolve(users);
      }
    });
  });
}

function create(userParams) {
  let newUser = new User(userParams);
  return new Promise((resolve, reject) => {
    User.findOne({ email: userParams.email }, (err, user) => {
      if (user) {
        reject({ status: 409, error: `Email '${userParams.email}' already exists!` });
      } else {
        newUser.save((err, user) => {
          if (err) {
            reject(err);
          }
          resolve({ message: "User created!", user: user, location: `/api/users/${user.id}` });
        });
      }
    });
  });
}

function getById(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        resolve();
      } else {
        resolve({ user: user });
      }
    });
  });
}

function update(userId, userParams) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err) {
        reject(err);
      } else {
        user = Object.assign(user, userParams);
        user.save((err, user) => {
          if (err) {
            reject(err);
          }
          resolve({ message: "User updated!", user: user, location: `/api/users/${user.id}` });
        });
      }
    });
  });
}

function _delete(userId) {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Successfully deleted" });
      }
    });
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  _delete
};
