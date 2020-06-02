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
 --   OWNER to postgres;