-- Seed data for Planco
-- Insert sample projects and approvals

-- Ensure extension (exists already from schema.sql)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Sample projects
INSERT INTO projects (name, location, status, budget_total, budget_spent, created_at) VALUES
('Condomínio Mar Azul', 'Maputo - Costa do Sol', 'active', 5000000, 125000, now()),
('Edifício Sol Nascente', 'Beira - Bairro Central', 'on_hold', 3000000, 1500000, now()),
('Residencial Nova Vida', 'Nampula - Zona Norte', 'active', 2000000, 400000, now()),
('Ponte do Rio Verde', 'Tete - Rio Verde', 'completed', 8000000, 8000000, now());

-- Insert approvals referencing the projects by name
INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'João Encarregado', 'Cimento - 50 sacos', 25000, 'pending', 'normal', now() FROM projects WHERE name = 'Condomínio Mar Azul';

INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'Maria Obras', 'Aço - 20 barras', 120000, 'approved', 'high', now() FROM projects WHERE name = 'Edifício Sol Nascente';

INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'José Operador', 'Areia - 10 m3', 15000, 'rejected', 'normal', now() FROM projects WHERE name = 'Residencial Nova Vida';

INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'Equipa Ponte', 'Betão Pré-misturado - 200m3', 400000, 'approved', 'high', now() FROM projects WHERE name = 'Ponte do Rio Verde';

-- Add a few more pending requests for testing
INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'Encarregado A', 'Parafusos - 500 unid', 5000, 'pending', 'low', now() FROM projects WHERE name = 'Condomínio Mar Azul';

INSERT INTO approvals (project_id, requester_name, item_name, amount, status, priority, created_at)
SELECT id, 'Encarregado B', 'Telha - 200 unid', 45000, 'pending', 'normal', now() FROM projects WHERE name = 'Residencial Nova Vida';

-- Verify counts (optional, these SELECTs will return results in SQL editor)
SELECT count(*) AS projects_count FROM projects;
SELECT count(*) AS approvals_count FROM approvals;
