DROP DATABASE IF EXISTS word_db;
CREATE DATABASE word_db;

USE word_db;

CREATE TABLE words (
    id INTEGER(20) AUTO_INCREMENT NOT NULL,
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    figureOfSpeeck VARCHAR(255) NOT NULL,
    article VARCHAR(255),
    plural VARCHAR(255),
    gender VARCHAR(255),
    thirdPersPresent VARCHAR(255),
    thirdPersonPast VARCHAR(255),
    thirdPersonPerfect VARCHAR(255),
    example VARCHAR(255),
    PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
