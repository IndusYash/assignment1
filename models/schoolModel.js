const { pool } = require('../config/db');

/**
 * Insert a new school into the database.
 * @param {Object} schoolData - { name, address, latitude, longitude }
 * @returns {Object} Inserted school record
 */
const createSchool = async ({ name, address, latitude, longitude }) => {
  const [result] = await pool.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );

  const [rows] = await pool.execute('SELECT * FROM schools WHERE id = ?', [result.insertId]);
  return rows[0];
};

/**
 * Fetch all schools from the database.
 * @returns {Array} List of school records
 */
const getAllSchools = async () => {
  const [rows] = await pool.execute('SELECT * FROM schools');
  return rows;
};

module.exports = { createSchool, getAllSchools };
