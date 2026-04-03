const Database = require('better-sqlite3');
const db = new Database('/database/dbautoprova.db');

const auto = db.prepare('SELECT * FROM Auto');
console.log(auto);

