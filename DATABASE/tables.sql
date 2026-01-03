CREATE TABLE IF NOT EXISTS public.checkinout
(
    id integer NOT NULL DEFAULT nextval('checkinout_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    check_in timestamp without time zone,
    check_out timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT checkinout_pkey PRIMARY KEY (id)
)
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companymaster
(
    id integer NOT NULL DEFAULT nextval('companymaster_id_seq'::regclass),
    company_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    profile_id character varying(100) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT now(),
    company_code character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT companymaster_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.employee_certificate_master
(
    id integer NOT NULL DEFAULT nextval('employee_certificate_master_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    certificate_name character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_certificate_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employee_info_master
(
    id integer NOT NULL DEFAULT nextval('employee_info_master_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    about_description character varying COLLATE pg_catalog."default",
    job_description character varying COLLATE pg_catalog."default",
    hobbie_description character varying COLLATE pg_catalog."default",
    dob date,
    address character varying COLLATE pg_catalog."default",
    bank_account_number character varying COLLATE pg_catalog."default",
    bank_name character varying COLLATE pg_catalog."default",
    ifsc_code character varying COLLATE pg_catalog."default",
    pan_no character varying COLLATE pg_catalog."default",
    uan_no character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_info_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employee_salary_master
(
    id integer NOT NULL DEFAULT nextval('employee_salary_master_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    monthly_wage integer,
    yearly_wage integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_salary_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employee_skill_master
(
    id integer NOT NULL DEFAULT nextval('employee_skill_master_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    skill_name character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_skill_master_pkey PRIMARY KEY (id)
)
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employee_timeoff_master
(
    id integer NOT NULL DEFAULT nextval('employee_timeoff_master_id_seq'::regclass),
    login_id character varying COLLATE pg_catalog."default",
    start_data timestamp without time zone,
    end_data timestamp without time zone,
    type_of_leave character varying COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default",
    sick_leave_certificate_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_timeoff_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile_master
(
    id integer NOT NULL DEFAULT nextval('profile_master_id_seq'::regclass),
    path character varying COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT profile_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.salary_details_master
(
    id integer NOT NULL DEFAULT nextval('salary_details_master_id_seq'::regclass),
    company_id integer,
    basic_salary integer,
    house_rent_allowanace integer,
    standard_allowanace integer,
    perforamance_bonus integer,
    leave_travel_allowanace integer,
    fixed_allowanace integer,
    employee_pf integer,
    employer_pf integer,
    professional_tax integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT salary_details_master_pkey PRIMARY KEY (id)
)

------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_master
(
    id integer NOT NULL DEFAULT nextval('user_master_id_seq'::regclass),
    login_id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    company_id integer NOT NULL,
    emp_name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default",
    password_hash character varying COLLATE pg_catalog."default" NOT NULL,
    mobile_no character varying(20) COLLATE pg_catalog."default",
    created_by integer,
    role_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    department character varying(100) COLLATE pg_catalog."default",
    user_position character varying(100) COLLATE pg_catalog."default",
    user_location character varying(100) COLLATE pg_catalog."default",
    profile_id character varying(100) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT now(),
    maratial_status boolean DEFAULT false,
    gender character varying COLLATE pg_catalog."default",
    CONSTRAINT user_master_pkey PRIMARY KEY (id),
    CONSTRAINT user_master_email_key UNIQUE (email),
    CONSTRAINT user_master_login_id_key UNIQUE (login_id),
    CONSTRAINT user_master_role_type_check CHECK (role_type::text = ANY (ARRAY['ADMIN'::character varying, 'SUPERADMIN'::character varying, 'HR'::character varying]::text[]))
)
------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.working_master
(
    id integer NOT NULL DEFAULT nextval('working_master_id_seq'::regclass),
    company_id integer,
    total_working_hours integer,
    total_sick_leave integer,
    total_paid_leave integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT working_master_pkey PRIMARY KEY (id)
)
------------------------------------------------------------------------------
