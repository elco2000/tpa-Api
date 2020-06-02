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




INSERT INTO public."user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES 
(10, 'Elco', 'Mussert', 'elcomussert@gmail.com', 1234,	1),
(11, 'Jorik', 'Leemans', 'jorik@gmail.com', 123,	1),
(12, 'Piet', 'Van der Velden', 'piet@gmail.com', 1234,	2);

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
	
	
	