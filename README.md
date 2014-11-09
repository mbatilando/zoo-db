zoo-db
======

Installation Instructions
=====================
- Need to install npm, Grunt, Sass, Bower, Postgres
- 'sudo npm install' on root project directory
- 'bower install' on root project directory
- 'grunt' on root project directory
- App should be live on localhost:3000

Compiling SCSS Files
=====================
- Pull all SCSS files in sass directory
- 'grunt sass' on root project directory
- Compiled CSS files should now be in public/css

PSQL
=====================
INSERT INTO "Species" ("scientific_name", "common_name", "description", "createdAt", "updatedAt")
	VALUES ('Lepomis macrochirus', 'Bluegill Sunfish', 'A fish found in the Pacific Ocean', (NOW()), (NOW()));