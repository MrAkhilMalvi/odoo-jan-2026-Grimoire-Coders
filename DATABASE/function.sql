CREATE OR REPLACE FUNCTION public.auth_signin_by_login_id(
	p_identifier character varying)
    RETURNS TABLE(id integer, login_id character varying, company_id integer, emp_name character varying, email character varying, password_hash character varying, role_type character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        um.id,
        um.login_id,
        um.company_id,
        um.emp_name,
        um.email,
        um.password_hash,
        um.role_type
    FROM user_master um
    WHERE
        um.login_id = p_identifier
        OR um.email = p_identifier;
END;
$BODY$;



-----------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.generate_company_code(
	p_company_name character varying)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_words TEXT[];
    v_code TEXT := '';
    v_word TEXT;
    i INT := 1;
BEGIN
    v_words := regexp_split_to_array(UPPER(TRIM(p_company_name)), '\s+');
    FOREACH v_word IN ARRAY v_words LOOP
        EXIT WHEN i > 3;
        v_code := v_code || SUBSTRING(v_word, 1, 1);
        i := i + 1;
    END LOOP;

    IF LENGTH(v_code) = 1 THEN
        v_code := SUBSTRING(v_words[1], 1, 2);
    END IF;

    RETURN v_code;
END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	
CREATE OR REPLACE FUNCTION public.generate_login_id(
	p_company_code character varying,
	p_emp_name character varying,
	p_current_emp integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_year TEXT := EXTRACT(YEAR FROM NOW())::TEXT;
    v_emp_code VARCHAR;
    v_next_seq INT;
BEGIN
    -- Employee code: YAGO
    v_emp_code := UPPER(
        SUBSTRING(split_part(p_emp_name, ' ', 1), 1, 2) ||
        SUBSTRING(split_part(p_emp_name, ' ', 2), 1, 2)
    );

    -- Next sequence
    v_next_seq := p_current_emp + 1;

    -- Final login_id
    RETURN
        p_company_code ||
        v_emp_code ||
        v_year ||
        LPAD(v_next_seq::TEXT, 4, '0');
END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	
CREATE OR REPLACE FUNCTION public.get_basic_salary_info(
	in_company_id integer)
    RETURNS TABLE(basic_salary integer, house_rent_allowanace integer, standard_allowanace integer, performance_bonus integer, leave_travel_allowanace integer, fixed_allowanace integer, employee_pf integer, employer_pf integer, professional_tax integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

 RETURN QUERY
  select 
  basic_salary,
  houst_rent_allowanace,
  standard_allowanace,
  performance_bonus,
  leave_travel_allowanace,
  fixed_allowanace,
  employee_pf,
  employer_pf,
  professional_tax
  FROM salary_details_master
  where company_id = in_company_id;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_company_code(
	in_company_id integer)
    RETURNS TABLE(company_code character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

  RETURN QUERY
  SELECT companymaster.company_code FROM companymaster where id = in_company_id;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	
CREATE OR REPLACE FUNCTION public.get_company_employee_count(
	in_company_id integer)
    RETURNS TABLE(total_employee bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

 RETURN QUERY
   SELECT COUNT(*) AS total_employee
   from usermaster
   where company_id = in_company_id;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_employe_salary_details(
	in_login_id character varying)
    RETURNS TABLE(monthly_wage integer, yearly_wage integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

 RETURN QUERY
  select monthly_wage , yearly_wage
  FROM employee_salary_master
  where login_id = in_login_id;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	
CREATE OR REPLACE FUNCTION public.get_employee_list(
	in_company_id integer)
    RETURNS TABLE(login_id character varying, emp_name character varying, path character varying, attendance_status character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT
        u.login_id,
        u.emp_name,
		pm.path,
        CASE
            -- 1️⃣ Employee is on leave
            WHEN EXISTS (
                SELECT 1
                FROM employee_timeoff_master etm
                WHERE etm.login_id = u.login_id
                  AND etm.status = 'SUCCESS'
                  AND CURRENT_DATE BETWEEN etm.from_date AND etm.to_date
            ) THEN 'ON_LEAVE'

            -- 2️⃣ Employee has checked in today
            WHEN EXISTS (
                SELECT 1
                FROM checkinout c
                WHERE c.login_id = u.login_id
                  AND DATE(c.check_in) = CURRENT_DATE
            ) THEN 'CHECKED_IN'

            -- 3️⃣ Otherwise
            ELSE 'NOT_CHECKED_IN'
        END AS attendance_status
    FROM user_master u
	JOIN profile_master pm ON pm.id = u.profile_id
    WHERE u.company_id = in_company_id ;
END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_employee_profile_data(
	in_login_id character varying)
    RETURNS TABLE(login_id character varying, company_name character varying, department character varying, emp_name character varying, email character varying, mobile_no character varying, user_position character varying, user_location character varying, maratial_status boolean, gender character varying, about_description character varying, job_description character varying, hobbie_description character varying, dob date, address character varying, bank_account_number character varying, bank_name character varying, ifsc_code character varying, pan_no character varying, uan_no character varying, path character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

RETURN QUERY
  select 
    u.login_id,
	c.company_name,
	u.department,
	u.emp_name,
	u.email,
	u.mobile_no,
	u.user_position,
	u.user_location,
	u.maratial_status,
	u.gender,
	eim.about_description,
	eim.job_description,
	eim.hobbie_description,
	eim.dob,
	eim.address,
	eim.bank_account_number,
	eim.bank_name,
	eim.ifsc_code,
	eim.pan_no,
	eim.uan_no,
	pm.path
	from usermaster u
	JOIN companymaster c ON c.id = u.company_id
	JOIN employee_info_master eim ON eim.login_id = u.login_id
	JOIN profile_master pm on pm.id = u.profile_id;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	
CREATE OR REPLACE FUNCTION public.last_user_check_in(
	in_loginid character varying)
    RETURNS TABLE(check_in timestamp without time zone, is_checkin boolean) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

  select check_in, 
  CASE
            WHEN c.check_out IS NULL THEN TRUE
            ELSE FALSE
        END AS is_checkin
   from chechinout
  where login_id = in_loginid
  order by created_at DESC
  limit 1;

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------	

CREATE OR REPLACE FUNCTION public.store_new_employee_data(
	in_company_id character varying,
	in_emp_name character varying,
	in_emp_email character varying,
	in_emp_password character varying,
	in_emp_mobileno character varying,
	in_create_by character varying,
	in_role_type character varying,
	in_department character varying,
	in_position character varying,
	in_nationality character varying,
	in_maratial_status boolean,
	in_month_salary integer,
	in_profile_id integer,
	in_login_id character varying,
	in_gender character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

   -- insert first employee salaray details
   INSERT INTO employee_salary_master(login_id, monthly_wage, yearly_wage) values
   (in_login_id, in_month_salary, 12*in_month_salary);

--    insert user details
INSERT INTO user_master(login_id, company_id, emp_name,
email, password_hash, mobile_no, created_by, role_type, department,
user_position, user_location, profile_id, maratial_status, gender)
values(
    in_login_id, in_company_id, 
    in_emp_name,in_emp_email,in_emp_password,in_emp_mobileno,in_create_by,in_role_type,in_department,in_position,in_nationality,
    in_profile_id, in_maratial_status, in_gender
);
 

END;
$BODY$;

-----------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.store_profile_path(
	in_path character varying)
    RETURNS TABLE(profile_id integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

 -- select * from store_profile_path('/home')

 RETURN QUERY
 INSERT INTO profile_master(path)
 values (in_path)
 RETURNING id AS profile_id;

END ;
$BODY$;

-----------------------------------------------------------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION public.store_user_check_in(
	in_loginid character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

  INSERT INTO checkinout(login_id, check_in)
  values(
    in_loginid, now()
  );

END;
$BODY$;
-----------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.store_user_check_out(
	in_loginid character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

   WITH latest_checkin AS (
    SELECT id
    FROM checkinout
    WHERE login_id = in_loginid
      AND check_out IS NULL
    ORDER BY created_at DESC
    LIMIT 1
  )
  UPDATE checkinout
  SET check_out = NOW()
  WHERE id IN (SELECT id FROM latest_checkin);

END;
$BODY$;


-----------------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.superadmin_signup_insert(
	p_company_name character varying,
	p_company_profile_id character varying,
	p_company_code character varying,
	p_emp_name character varying,
	p_email character varying,
	p_password_hash text,
	p_mobile_no character varying,
	p_user_position character varying,
	p_department character varying,
	p_user_location character varying,
	p_user_profile_id character varying,
	p_maratial_status boolean,
	p_gender character varying,
	p_basic_salary integer,
	p_house_rent_allowance integer,
	p_standard_allowance integer,
	p_performance_bonus integer,
	p_leave_travel_allowance integer,
	p_fixed_allowance integer,
	p_employee_pf integer,
	p_employer_pf integer,
	p_professional_tax integer,
	p_total_working_hours integer,
	p_total_sick_leave integer,
	p_total_paid_leave integer)
    RETURNS TABLE(login_id character varying, emp_name character varying, company_id integer, role_type character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
    v_company_id INT;
    v_login_id VARCHAR;
    v_role_type VARCHAR := 'SUPERADMIN';
    v_current_emp INT;
BEGIN
    -- 1️⃣ Insert company
    INSERT INTO companymaster (company_name, company_code, profile_id)
    VALUES (p_company_name, p_company_code, p_company_profile_id)
    RETURNING id INTO v_company_id;

    -- 2️⃣ Count employees (company-wise)
    SELECT COUNT(*)
    INTO v_current_emp
    FROM user_master um
    WHERE um.company_id = v_company_id;

    -- 3️⃣ Generate login_id
    v_login_id := generate_login_id(
        p_company_code,
        p_emp_name,
        v_current_emp
    );

    -- 4️⃣ Insert user
    INSERT INTO user_master (
        login_id,
        company_id,
        emp_name,
        email,
        password_hash,
        mobile_no,
        role_type,
        department,
        user_position,
        user_location,
        profile_id,
        created_by,
        maratial_status,
        gender
    )
    VALUES (
        v_login_id,
        v_company_id,
        p_emp_name,
        p_email,
        p_password_hash,
        p_mobile_no,
        v_role_type,
        p_department,
        p_user_position,
        p_user_location,
        p_user_profile_id,
        NULL,
        p_maratial_status,
        p_gender
    );

    -- 5️⃣ Salary details
    INSERT INTO salary_details_master (
        company_id,
        basic_salary,
        house_rent_allowanace,
        standard_allowanace,
        perforamance_bonus,
        leave_travel_allowanace,
        fixed_allowanace,
        employee_pf,
        employer_pf,
        professional_tax
    )
    VALUES (
        v_company_id,
        p_basic_salary,
        p_house_rent_allowance,
        p_standard_allowance,
        p_performance_bonus,
        p_leave_travel_allowance,
        p_fixed_allowance,
        p_employee_pf,
        p_employer_pf,
        p_professional_tax
    );

    -- 6️⃣ Working details
    INSERT INTO working_master (
        company_id,
        total_working_hours,
        total_sick_leave,
        total_paid_leave
    )
    VALUES (
        v_company_id,
        p_total_working_hours,
        p_total_sick_leave,
        p_total_paid_leave
    );

    -- 7️⃣ Return values
    RETURN QUERY
    SELECT
        v_login_id,
        p_emp_name,
        v_company_id,
        v_role_type;

END;
$BODY$;


---------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_employee_info(
	in_about_description character varying,
	in_job_description character varying,
	in_hobbie_description character varying,
	in_login_id character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

 IF in_about_description IS NOT NULL THEN
  update employee_info_master
  set about_description = in_about_description
  where login_id = in_login_id;
 END IF;

 
 IF in_job_description IS NOT NULL THEN
  update employee_info_master
  set job_description = in_job_description
  where login_id = in_login_id;
 END IF;

 IF in_hobbie_description IS NOT NULL THEN
  update employee_info_master
  set hobbie_description = in_hobbie_description
  where login_id = in_login_id;
 END IF;
 
END;
$BODY$;

