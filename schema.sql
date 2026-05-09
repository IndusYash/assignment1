-- We skip the CREATE DATABASE step because Clever Cloud already made one for us!

CREATE TABLE IF NOT EXISTS schools (
  id        INT           NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
