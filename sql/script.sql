CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);

CREATE TABLE IF NOT EXISTS phones (
  id SERIAL PRIMARY KEY,
  number VARCHAR(11) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  carrier_id INTEGER NOT NULL REFERENCES carriers(id)
);

CREATE TABLE IF NOT EXISTS recharges (
  id SERIAL PRIMARY KEY,
  phone_id INTEGER NOT NULL REFERENCES phones(id),
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 10 AND amount <= 1000),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);