const express = require('express');
const dbconnection = require('../db/dbconfig');
const router = express.Router();

// Create the answers table
router.get("/install", async (req, res) => {
const users = `CREATE TABLE users (
  userid int(20) NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  firstname varchar(20) NOT NULL,
  lastname varchar(20) NOT NULL,
  email varchar(40) NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY (userid)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const questionTable = `CREATE TABLE questions (
  id int(20) NOT NULL AUTO_INCREMENT,
  questionid varchar(100) NOT NULL,
  userid int(20) NOT NULL,
  title varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  tag varchar(20) DEFAULT NULL,
  PRIMARY KEY (id,questionid),
  UNIQUE KEY questionid (questionid),
  KEY userid (userid),
  CONSTRAINT questions_ibfk_1 FOREIGN KEY (userid) REFERENCES users (userid)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

    const answerTable = `CREATE TABLE answers (
  answerid int(11) NOT NULL AUTO_INCREMENT,
  userid int(11) NOT NULL,
  questionid varchar(100) NOT NULL,
  answer varchar(200) NOT NULL,
  PRIMARY KEY (answerid),
  KEY questionid (questionid),
  KEY userid (userid),
  CONSTRAINT answers_ibfk_1 FOREIGN KEY (questionid) REFERENCES questions (questionid),
  CONSTRAINT answers_ibfk_2 FOREIGN KEY (userid) REFERENCES users (userid)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
     

    try {
        await dbconnection.query(answerTable);
        res.status(200).send('Answers table created successfully.');
    } catch (error) {
        console.error('Error creating answers table:', error);
        res.status(500).send('Failed to create answers table.');
    }
});

module.exports = router;
