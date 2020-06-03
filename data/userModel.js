const knex = require("./dbConfig");

function addUser(user) {
  return knex("users")
    .insert(user, ["id"])
    .then(([id]) => getUser({ id }));
}

function getUsers() {
  return knex("users");
}

function getUser(user) {
  return knex("users")
    .where(user)
    .first();
}

module.exports = { addUser, getUsers, getUser };
