CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  route_id VARCHAR(50) NOT NULL,
  vessel_type VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  ghg_intensity NUMERIC NOT NULL,
  fuel_consumption_t NUMERIC NOT NULL,
  distance_km NUMERIC NOT NULL,
  total_emissions_t NUMERIC NOT NULL,
  is_baseline BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ship_compliance (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  cb_gco2eq NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS bank_entries (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  amount_gco2eq NUMERIC NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pools (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pool_members (
  pool_id INT REFERENCES pools(id),
  ship_id VARCHAR(50) NOT NULL,
  cb_before NUMERIC NOT NULL,
  cb_after NUMERIC NOT NULL
);
