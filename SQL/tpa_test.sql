--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-05-26 16:27:01



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

--
-- TOC entry 203 (class 1259 OID 16397)
-- Name: role; Type: TABLE; Schema: public; Owner: Jorik
--

CREATE UNLOGGED TABLE public.role (
    "ID" integer NOT NULL,
    name character varying(32) NOT NULL
);



--
-- TOC entry 202 (class 1259 OID 16395)
-- Name: role_ID_seq; Type: SEQUENCE; Schema: public; Owner: Jorik
--

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


--
-- TOC entry 205 (class 1259 OID 16407)
-- Name: user; Type: TABLE; Schema: public; Owner: Jorik
--

CREATE UNLOGGED TABLE public."user" (
    "ID" integer NOT NULL,
    "First_Name" character varying(32) NOT NULL,
    "Last_Name" character varying(32) NOT NULL,
    "Email" character varying(32) NOT NULL,
    "Password" character varying(192) NOT NULL,
    "RoleID" integer NOT NULL
);



--
-- TOC entry 204 (class 1259 OID 16405)
-- Name: user_ID_seq; Type: SEQUENCE; Schema: public; Owner: Jorik
--

CREATE SEQUENCE public."user_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 2839 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Jorik
--

ALTER SEQUENCE public."user_ID_seq" OWNED BY public."user"."ID";


--
-- TOC entry 2693 (class 2604 OID 16400)
-- Name: role ID; Type: DEFAULT; Schema: public; Owner: Jorik
--

ALTER TABLE ONLY public.role ALTER COLUMN "ID" SET DEFAULT nextval('public."role_ID_seq"'::regclass);


--
-- TOC entry 2694 (class 2604 OID 16410)
-- Name: user ID; Type: DEFAULT; Schema: public; Owner: Jorik
--

ALTER TABLE ONLY public."user" ALTER COLUMN "ID" SET DEFAULT nextval('public."user_ID_seq"'::regclass);


--
-- TOC entry 2830 (class 0 OID 16397)
-- Dependencies: 203
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: Jorik
--

INSERT INTO public.role ("ID", "name") VALUES
(1,	'Beheerder'),
(2,	'Gebruiker');



--
-- TOC entry 2832 (class 0 OID 16407)
-- Dependencies: 205
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: Jorik
--

INSERT INTO public."user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES 
(10, 'Elco', 'Mussert', 'elcomussert@gmail.com', 1234,	1),
(11, 'Jorik', 'Leemans', 'jorik@gmail.com', 123,	1),
(12, 'Piet', 'Van der Velden', 'piet@gmail.com', 1234,	2);



--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 202
-- Name: role_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: Jorik
--

SELECT pg_catalog.setval('public."role_ID_seq"', 3, false);


--
-- TOC entry 2841 (class 0 OID 0)
-- Dependencies: 204
-- Name: user_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: Jorik
--

SELECT pg_catalog.setval('public."user_ID_seq"', 13, false);


--
-- TOC entry 2696 (class 2606 OID 16403)
-- Name: role PRIMARY; Type: CONSTRAINT; Schema: public; Owner: Jorik
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PRIMARY" PRIMARY KEY ("ID");


--
-- TOC entry 2700 (class 2606 OID 16413)
-- Name: user PRIMARY00000; Type: CONSTRAINT; Schema: public; Owner: Jorik
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY ("ID");


--
-- TOC entry 2698 (class 1259 OID 16414)
-- Name: Email00000; Type: INDEX; Schema: public; Owner: Jorik
--

CREATE UNIQUE INDEX "Email00000" ON public."user" USING btree ("Email");


--
-- TOC entry 2701 (class 1259 OID 16415)
-- Name: RoleID00000; Type: INDEX; Schema: public; Owner: Jorik
--

CREATE INDEX "RoleID00000" ON public."user" USING btree ("RoleID");


--
-- TOC entry 2697 (class 1259 OID 16404)
-- Name: name00000; Type: INDEX; Schema: public; Owner: Jorik
--

CREATE UNIQUE INDEX name00000 ON public.role USING btree (name);


--
-- TOC entry 2702 (class 2606 OID 16417)
-- Name: user constraint_fk; Type: FK CONSTRAINT; Schema: public; Owner: Jorik
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT constraint_fk FOREIGN KEY ("RoleID") REFERENCES public.role("ID");


-- Completed on 2020-05-26 16:27:02

--
-- PostgreSQL database dump complete
--

