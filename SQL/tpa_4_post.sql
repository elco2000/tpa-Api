/*
File name: F:\ICT\Project Periode4\tpa_4_post.sql
Creation date: 05/26/2020
Created by MySQL to PostgreSQL 5.1 [Demo]
--------------------------------------------------
More conversion tools at http://www.convert-in.com
*/
set client_encoding to 'UTF8';

/*
Table structure for table 'public.role'
*/

DROP TABLE IF EXISTS "public"."role" CASCADE;
CREATE UNLOGGED TABLE "public"."role" ("ID" SERIAL NOT NULL, "name" VARCHAR(32)  NOT NULL) ;
ALTER SEQUENCE "public"."role_ID_seq" RESTART WITH 3 INCREMENT BY 1;
DROP INDEX IF EXISTS "PRIMARY";
ALTER TABLE "public"."role" ADD CONSTRAINT "PRIMARY" PRIMARY KEY ("ID");
DROP INDEX IF EXISTS "name";
CREATE UNIQUE INDEX "name00000" ON "public"."role" ("name");

/*
Dumping data for table 'public.role'
*/

INSERT INTO "public"."role"("ID", "name") VALUES (1, 'Beheerder');
INSERT INTO "public"."role"("ID", "name") VALUES (2, 'Gebruiker');

/*
Table structure for table 'public.user'
*/

DROP TABLE IF EXISTS "public"."user" CASCADE;
CREATE UNLOGGED TABLE "public"."user" ("ID" SERIAL NOT NULL, "First_Name" VARCHAR(32)  NOT NULL, "Last_Name" VARCHAR(32)  NOT NULL, "Email" VARCHAR(32)  NOT NULL, "Password" VARCHAR(192)  NOT NULL, "RoleID" INTEGER NOT NULL) ;
ALTER SEQUENCE "public"."user_ID_seq" RESTART WITH 13 INCREMENT BY 1;
DROP INDEX IF EXISTS "PRIMARY00000";
ALTER TABLE "public"."user" ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY ("ID");
DROP INDEX IF EXISTS "Email";
CREATE UNIQUE INDEX "Email00000" ON "public"."user" ("Email");
DROP INDEX IF EXISTS "RoleID";
CREATE INDEX "RoleID00000" ON "public"."user" ("RoleID");

/*
Dumping data for table 'public.user'
*/

INSERT INTO "public"."user"("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES (10, 'Elco', 'Mussert', 'elcomussert@gmail.com', '1234', 1);
INSERT INTO "public"."user"("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES (11, 'Jorik', 'Leemans', 'jorik@gmail.com', '123', 1);
INSERT INTO "public"."user"("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES (12, 'Piet', 'Van der Velden', 'piet@gmail.com', '1234', 2);
