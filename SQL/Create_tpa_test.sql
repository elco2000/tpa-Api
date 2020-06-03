
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE DATABASE tpa_test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
-- Table: public.role

--DROP TABLE public.role;

CREATE TABLE public.role
(
    "ID" integer NOT NULL,
    "Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PRIMARY" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

CREATE SEQUENCE public."role_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- TOC entry 2838 (class 0 OID 0)
-- Dependencies: 202
-- Name: role_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Jorik
--

ALTER SEQUENCE public."role_ID_seq" OWNED BY public.role."ID";


ALTER TABLE ONLY public.role ALTER COLUMN "ID" SET DEFAULT nextval('public."role_ID_seq"'::regclass);


--ALTER TABLE public.role
--    OWNER to "Jorik";
-- Index: name00000

-- DROP INDEX public.name00000;

CREATE UNIQUE INDEX name00000
    ON public.role USING btree
    ("Name" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
	
INSERT INTO public.role ("ID", "Name") VALUES
('1', 'Beheerder'),
('2', 'Gebruiker');


SELECT pg_catalog.setval('public."role_ID_seq"', 3, false);

------------------------------------------------------------------------------------------------

-- Table: public.user

--DROP TABLE public."user";




CREATE TABLE public."user"
(
    "ID" integer NOT NULL,
    "First_Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Last_Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(192) COLLATE pg_catalog."default" NOT NULL,
    "RoleID" integer NOT NULL,
	"Job" character varying(55) COLLATE pg_catalog."default",
    "Sector" character varying(55) COLLATE pg_catalog."default",
    CONSTRAINT "PRIMARY00000" PRIMARY KEY ("ID"),
    CONSTRAINT constraint_fk_userrole FOREIGN KEY ("RoleID")
        REFERENCES public.role ("ID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

--ALTER TABLE public."user"
--    OWNER to "Jorik";
-- Index: Email00000

-- DROP INDEX public."Email00000";




CREATE SEQUENCE public."user_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."user_ID_seq" OWNED BY public."user"."ID";


ALTER TABLE ONLY public."user" ALTER COLUMN "ID" SET DEFAULT nextval('public."user_ID_seq"'::regclass);




INSERT INTO public."user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID", "Job", "Sector") VALUES 
(10, 'Elco', 'Mussert', 'elcomussert@gmail.com', 1234,	1, 'Psychiater', 'Verslaving'),
(11, 'Jorik', 'Leemans', 'jorik@gmail.com', 123,	1, 'Manager', 'Gehandicapte zorg'),
(12, 'Piet', 'Van der Velden', 'piet@gmail.com', 1234,	2, 'Customer service', 'Verstandelijke beperking');

SELECT pg_catalog.setval('public."user_ID_seq"', 13, false);

CREATE UNIQUE INDEX "Email00000"
    ON public."user" USING btree
    ("Email" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: RoleID00000

-- DROP INDEX public."RoleID00000";

CREATE INDEX "RoleID00000"
    ON public."user" USING btree
    ("RoleID" ASC NULLS LAST)
    TABLESPACE pg_default;
	
	
---------------------------------------------------------------------------------------

-- Table: public.type

-- DROP TABLE public.type;

CREATE TABLE public.type
(
    "ID" integer NOT NULL,
    "Name" character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT "PRIMARYtype" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

CREATE SEQUENCE public."type_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."type_ID_seq" OWNED BY public."type"."ID";


ALTER TABLE ONLY public."type" ALTER COLUMN "ID" SET DEFAULT nextval('public."type_ID_seq"'::regclass);

INSERT INTO public."type" ("ID", "Name") VALUES 
(1, 'informatie'),
(2, 'richtlijnen'),
(3, 'tips'),
(4, 'verwijzingen'),
(5, 'stappenplannen');


SELECT pg_catalog.setval('public."type_ID_seq"', 6, false);


--ALTER TABLE public.type
--    OWNER to postgres;

----------------------------------------------------------------------------------------------

-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    "ID" integer NOT NULL,
    "Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PRIMARYcategory" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

CREATE SEQUENCE public."category_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."category_ID_seq" OWNED BY public."category"."ID";


ALTER TABLE ONLY public."category" ALTER COLUMN "ID" SET DEFAULT nextval('public."category_ID_seq"'::regclass);

INSERT INTO public."category" ("ID", "Name") VALUES 
(1, 'signaleren'),
(2, 'diagnostiek'),
(3, 'begeleiding'),
(4, 'behandeling'),
(5, 'verwijzing');

SELECT pg_catalog.setval('public."category_ID_seq"', 6, false);


--ALTER TABLE public.category


-----------------------------------------------------------------------------------

-- Table: public.article

-- DROP TABLE public.article;

CREATE TABLE public.article
(
    "ID" integer NOT NULL,
    "Name" character varying(80) COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying(255) COLLATE pg_catalog."default",
    "Date" date,
    "CategoryID" integer,
    "Body" text COLLATE pg_catalog."default",
    "UserID" integer,
	"TypeID" integer,
    CONSTRAINT "PRIMARYarticle" PRIMARY KEY ("ID"),
    CONSTRAINT "constraint_FK_articleuser" FOREIGN KEY ("UserID")
        REFERENCES public."user" ("ID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
	CONSTRAINT "constrain_FK_articlecategory" FOREIGN KEY ("CategoryID")
        REFERENCES public.category ("ID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT "constraint_FK_articletype" FOREIGN KEY ("TypeID")
        REFERENCES public.type ("ID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

TABLESPACE pg_default;


CREATE SEQUENCE public."article_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."article_ID_seq" OWNED BY public.article."ID";


ALTER TABLE ONLY public.article ALTER COLUMN "ID" SET DEFAULT nextval('public."article_ID_seq"'::regclass);
--ALTER TABLE public.article
--    OWNER to "Jorik";
-- Index: Email00001

-- DROP INDEX public."Email00001";
-- Index: fki_constraint_FK

-- DROP INDEX public."fki_constraint_FK";

-----------------------------------------------------------------------------------------
 --   OWNER to postgres;
	
	
