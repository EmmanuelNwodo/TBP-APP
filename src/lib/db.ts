import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tbp_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let schemaPromise: Promise<unknown> | undefined;

export function getPool() {
  return pool;
}

export function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = pool.query(`CREATE TABLE IF NOT EXISTS career_applications (
      id VARCHAR(64) NOT NULL,
      submitted_at DATETIME NOT NULL,
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      email VARCHAR(255) NOT NULL DEFAULT '',
      phone VARCHAR(100) NOT NULL DEFAULT '',
      linkedin VARCHAR(255) NOT NULL DEFAULT '',
      portfolio VARCHAR(255) NOT NULL DEFAULT '',
      role VARCHAR(255) NOT NULL DEFAULT '',
      cover_letter TEXT,
      resume_original_name VARCHAR(255) DEFAULT NULL,
      resume_url VARCHAR(500) DEFAULT NULL,
      resume_mime_type VARCHAR(150) DEFAULT NULL,
      resume_size BIGINT DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  }
  return schemaPromise;
}
