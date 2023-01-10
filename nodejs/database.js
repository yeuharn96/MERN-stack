
import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();


export async function listEmails() {
  const [rows] = await pool.query('SELECT * FROM emails');
  return rows;
}

export async function getEmail(id) {
  const [rows] = await pool.query('SELECT * FROM emails WHERE id = ?', [id]);
  return rows[0];
}

export async function createEmail(email, firstName, lastName) {
  const [res] = await pool.query(`
    INSERT INTO emails (email, first_name, last_name)
    VALUES (?, ?, ?)
  `, [email, firstName, lastName]);

  return { id: res.insertId };
}

export async function updateEmail(id, email, firstName, lastName) {
  await pool.query(`
    UPDATE emails
    SET email = ?, first_name = ?, last_name = ?
    WHERE id = ?
  `, [email, firstName, lastName, id]);

  return { id, email, firstName, lastName };
}

export async function deleteEmail(id) {
  const [res] = await pool.query(`DELETE FROM emails WHERE id = ?`, [id]);
  return { id };
}

//https://www.youtube.com/watch?v=Hej48pi_lOc&ab_channel=SamMeech-Ward