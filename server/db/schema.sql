DROP TABLE IF EXISTS adventures;

CREATE TABLE adventures (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);
