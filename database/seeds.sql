USE quiz_journey;

INSERT INTO Users (name, token, createdAt, updatedAt) VALUES
('Anya', '3d938b36f06e6c3fd40bf2db50705dd4fa421b32', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Characters (name, points, user_id, createdAt, updatedAt) VALUES
('Brad', 30, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
