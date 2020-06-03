-- Table: public.role

--DROP TABLE public.role;

CREATE TABLE public.role
(
    "ID" integer NOT NULL,
    name character varying(32) COLLATE pg_catalog."default" NOT NULL,
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
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
	
INSERT INTO public.role ("ID", "name") VALUES
('1', 'Beheerder'),
('2', 'Gebruiker');


SELECT pg_catalog.setval('public."role_ID_seq"', 3, false);
