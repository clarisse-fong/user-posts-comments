const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .select("u.user_email as commenter_email")
    .count("u.user_email")
    .groupBy("u.user_email")
    .orderBy("u.user_email");
}

function read(commentId) {
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .select(
      "c.comment_id",
      "c.comment",
      "u.user_email AS commenter_email",
      "p.post_body AS commented_post"
    )
    .where("c.comment_id", commentId)
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
