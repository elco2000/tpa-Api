-- Table: public.user

--DROP TABLE public."user";

CREATE TABLE public."user"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "First_Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Last_Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(32) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(192) COLLATE pg_catalog."default" NOT NULL,
    "RoleID" integer NOT NULL,
    CONSTRAINT "PRIMARY00000" PRIMARY KEY ("ID"),
    CONSTRAINT constraint_fk_user FOREIGN KEY ("RoleID")
        REFERENCES public.role ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

--ALTER TABLE public."user"
--    OWNER to "Jorik";
-- Index: Email00000

-- DROP INDEX public."Email00000";

INSERT INTO public."user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES 
(10, 'Elco', 'Mussert', 'elcomussert@gmail.com', 1234,	1),
(11, 'Jorik', 'Leemans', 'jorik@gmail.com', 123,	1),
(12, 'Piet', 'Van der Velden', 'piet@gmail.com', 1234,	2);

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
	
	
	