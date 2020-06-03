const knex = require("./dbConfig");

function addUser(user) {
  return knex("users").insert(user);
}

function getUsers() {
  return knex("users");
}

function getUser(id) {
  return knex("users").where({ id });
}

module.exports = { addUser, getUsers, getUser };
