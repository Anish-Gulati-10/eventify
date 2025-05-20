import db from "../db.js";
import bcrypt from "bcrypt";

const usersModel = {
  create: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email
    `;
    return result[0];
  },

  findByEmail: async (email) => {
    const result = await db`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result[0];
  },

  findByUsername: async (username) => {
    const result = await db`
      SELECT * FROM users WHERE username = ${username}
    `;
    return result[0];
  },

  comparePasswords: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};

export default usersModel;
