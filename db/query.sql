CREATE TABLE `games` (
  `id` int NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `board` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`id`)
)