-- Table: public.article

-- DROP TABLE public.article;

CREATE TABLE public.article
(
    "ID" integer NOT NULL,
    "Name" character varying(32) COLLATE pg_catalog."default" NOT NULL,
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

