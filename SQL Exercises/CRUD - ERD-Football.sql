  PRAGMA foreign_keys = ON;
  CREATE TABLE TypeOfTournament (
  	type_of_tournament TEXT NOT NULL PRIMARY KEY
  );
  
  CREATE TABLE Tournament (
  	tournament_name TEXT NOT NULL PRIMARY KEY,
  	nation TEXT,
   	type_of_tournament TEXT NOT NULL,
    FOREIGN KEY(type_of_tournament) REFERENCES TypeOfTournament(type_of_tournament)
  );
  
  CREATE TABLE TypeOfTeam (
  	type_of_team TEXT NOT NULL PRIMARY KEY
  );
  
  CREATE TABLE Team (
  	team_id INTEGER NOT NULL PRIMARY KEY,
  	name TEXT,
   	tournament_name TEXT NOT NULL,
    type_of_team TEXT NOT NULL,
      
    FOREIGN KEY(tournament_name) REFERENCES Tournament(tournament_name)
    FOREIGN KEY(type_of_team) REFERENCES TypeOfTeam(type_of_team)      
  );
  
  CREATE TABLE Player (
  	player_id INTEGER NOT NULL PRIMARY KEY,
  	name TEXT,
    lastName TEXT,
   	team_id INTEGER NOT NULL,
      
    FOREIGN KEY(team_id) REFERENCES Team(team_id) 
  ); 
  
  CREATE TABLE Coach (
  	coach_id INTEGER NOT NULL PRIMARY KEY,
  	name TEXT,
    lastName TEXT,
   	team_id INTEGER NOT NULL,
      
    FOREIGN KEY(team_id) REFERENCES Team(team_id) 
  );  

  ---------------

  INSERT INTO TypeOfTournament(type_of_tournament) VALUES
("National");
INSERT INTO TypeOfTournament(type_of_tournament) VALUES
("International");
SELECT * FROM TypeOfTournament;

INSERT INTO Tournament(
  tournament_name,
  nation,
  type_of_tournament) VALUES
("Premier League", "England", "National");
SELECT * FROM Tournament;

INSERT INTO TypeOfTeam(type_of_team) VALUES
("Domestic");
INSERT INTO TypeOfTeam(type_of_team) VALUES
("International");
SELECT * FROM TypeOfTeam;

INSERT INTO Team(
  team_id,
  name,
  tournament_name, 
  type_of_team) VALUES
  

(1, "Any team name", "Premier League", "Domestic");
SELECT * FROM Team;

INSERT INTO Player(
  player_id,
  name,
  lastName, 
  team_id) VALUES
(1, "Pla", "yer", 1);
SELECT * FROM Player;

INSERT INTO Coach(
  coach_id,
  name,
  lastName, 
  team_id) VALUES
(1, "Co", "ach", 1);
SELECT * FROM Coach;

SELECT team_id FROM Coach
WHERE team_id = 1;

UPDATE Coach SET
name = "2nd Co"
WHERE coach_id = 1;
SELECT * FROM Coach;