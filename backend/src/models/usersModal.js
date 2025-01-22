import db from "../config/db.js";

export const getUserByname = async (username) =>
  db.execute(`select * from users where name=?`, [username]);

export const addNewUser = async (username, password) =>
  db.execute(
    `insert into users (name, password) values ('${username}', '${password}')`
  );

export const updateTokenAndLastlogin = async (username, token, lastLogin) =>
  db.execute(`update users set access_token=?, last_login=? where name=?`, [
    token,
    lastLogin,
    username,
  ]);
