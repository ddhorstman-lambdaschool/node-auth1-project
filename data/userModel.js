const knex = require("./dbConfig");

function addUser(user) {
  return knex("users")
    .insert(user, ["id"])
    .then(([id]) =>
      knex("users")
        .where({ id })
        .first()
        .then(user => ({ ...user, password: "••••••••••" }))
    );
}

function getUsers() {
  return knex("users");
}

function getUser(id) {
  return knex("users").where({ id });
}

module.exports = { addUser, getUsers, getUser };
