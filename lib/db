const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",      // <-- DB username
  host: "postgresql://postgres:AXnTsXNiPoGRodzaEuNBcHCxrkLNWdSS@yamanote.proxy.rlwy.net:16928/railway",      // VPS/PC එකේ DB host
  database: "railway",      // <-- Database name
  password: "AXnTsXNiPoGRodzaEuNBcHCxrkLNWdSS", // <-- DB password
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = pool;
