CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"gender" VARCHAR(1) NOT NULL,
	"age" SMALLINT NOT NULL,
	"ready_to_transfer" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(60) DEFAULT ''
);

INSERT INTO "koalas" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Doug', 'M', 3, false, 'Stoic'),
('Chad', 'F', 19, true, "Conspiracy theorist"),
('Patty Wagstaff', 'M', 1, false, 'Eucalyptus addiction'),
('Nemoy', 'F', 9, false, 'Always happy');