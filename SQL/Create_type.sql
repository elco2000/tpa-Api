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