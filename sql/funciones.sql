CREATE OR REPLACE FUNCTION buscar_pacientes(p_texto TEXT)
RETURNS SETOF pacientes AS $$
  SELECT *
  FROM pacientes
  WHERE nombre ILIKE '%' || p_texto || '%'
     OR especie ILIKE '%' || p_texto || '%'
  ORDER BY nombre;
$$ LANGUAGE sql STABLE;


CREATE SEQUENCE IF NOT EXISTS numero_atencion_seq
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE FUNCTION generar_numero_atencion()
RETURNS TEXT AS $$
DECLARE
    nuevo_numero BIGINT;
    anio_actual TEXT;
BEGIN
    nuevo_numero := nextval('numero_atencion_seq');

    anio_actual := TO_CHAR(CURRENT_DATE, 'YYYY');

    RETURN anio_actual || '-' ||
           LPAD(nuevo_numero::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION registrar_paciente(
    p_nombre TEXT,
    p_especie TEXT,
    p_edad TEXT,
    p_diagnostico TEXT,
    p_foto TEXT
)
RETURNS pacientes AS $$
DECLARE
    nuevo_paciente pacientes;
BEGIN
    INSERT INTO pacientes (
        nombre,
        numero_atencion,
        especie,
        edad,
        diagnostico,
        foto
    )
    VALUES (
        p_nombre,
        generar_numero_atencion(),
        p_especie,
        p_edad,
        p_diagnostico,
        p_foto
    )
    RETURNING * INTO nuevo_paciente;

    RETURN nuevo_paciente;
END;
$$ LANGUAGE plpgsql;
