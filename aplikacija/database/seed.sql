INSERT INTO users (
    name, surname, email, username, password, role,
    points, status, email_verified, verification_token,
    high_spend_months, low_spend_months, bronze_recovery_months
)
VALUES
('Admin', 'User', 'admin@email.com', 'admin', 'admin123', 'ADMIN', 0, 'osnovni', TRUE, NULL, 0, 0, 0),
('Ana', 'Novak', 'ana@email.com', 'user', 'user123', 'USER', 0, 'osnovni', TRUE, NULL, 0, 0, 0),
('Marko', 'Kovac', 'marko@email.com', 'marko', 'marko123', 'USER', 0, 'osnovni', TRUE, NULL, 0, 0, 0),
('Sara', 'Horvat', 'sara@email.com', 'sara', 'sara123', 'USER', 20, 'srebrni', TRUE, NULL, 1, 0, 0),
('Luka', 'Zupan', 'luka@email.com', 'luka', 'luka123', 'USER', 50, 'zlati', TRUE, NULL, 3, 0, 0),
('Maja', 'Kos', 'maja@email.com', 'maja', 'maja123', 'USER', 10, 'bronasti', TRUE, NULL, 0, 2, 0);

INSERT INTO loyalty_points_rules (status, min_amount, max_amount, points, active)
VALUES
('osnovni', 0.00, 200.00, 5.00, TRUE),
('srebrni', 0.00, 200.00, 7.50, TRUE),
('zlati', 0.00, 200.00, 10.00, TRUE),
('bronasti', 0.00, 200.00, 0.00, TRUE),

('osnovni', 200.00, 1000.00, 10.00, TRUE),
('srebrni', 200.00, 1000.00, 15.00, TRUE),
('zlati', 200.00, 1000.00, 20.00, TRUE),
('bronasti', 200.00, 1000.00, 5.00, TRUE),

('osnovni', 1000.00, NULL, 20.00, TRUE),
('srebrni', 1000.00, NULL, 30.00, TRUE),
('zlati', 1000.00, NULL, 40.00, TRUE),
('bronasti', 1000.00, NULL, 10.00, TRUE);

INSERT INTO loyalty_status_rules (rule_key, rule_value, description, active)
VALUES
('silver_entry_amount', 499.00, 'Ko stranka prvic preseze 499 EUR mesecnih nakupov, pridobi srebrni status.', TRUE),
('gold_entry_amount', 500.00, 'Ce stranka se dvakrat preseze 500 EUR mesecnih nakupov, pridobi zlati status.', TRUE),
('silver_maintenance_amount', 200.00, 'Za ohranjanje srebrnega statusa mora imeti stranka vsaj 200 EUR mesecnih nakupov.', TRUE),
('gold_maintenance_amount', 500.00, 'Za ohranjanje zlatega statusa mora imeti stranka vsaj 500 EUR mesecnih nakupov.', TRUE),
('bronze_recovery_amount', 200.00, 'Bronasti status se izboljsa po dveh zaporednih mesecih z vsaj 200 EUR nakupov.', TRUE),
('basic_return_amount', 50.00, 'Ce bronasti uporabnik opravi nakup pod 50 EUR, se vrne v osnovni status.', TRUE);

INSERT INTO rewards (title, description, points_required, active)
VALUES
('Popust 5%', 'Popust pri naslednjem nakupu', 5.00, TRUE),
('Popust 10%', 'Vecji popust pri naslednjem nakupu', 10.00, TRUE),
('Popust 20%', 'Popust za vecji nakup', 20.00, TRUE),

('Brezplacna kava', 'Brezplacna kava v poslovalnici', 7.50, TRUE),
('Brezplacen caj', 'Brezplacen caj v poslovalnici', 6.00, TRUE),
('Brezplacen rogljicek', 'Brezplacen rogljicek ob nakupu', 8.00, TRUE),

('Darilna kartica 10 EUR', 'Darilna kartica v vrednosti 10 EUR', 15.00, TRUE),
('Darilna kartica 20 EUR', 'Darilna kartica v vrednosti 20 EUR', 30.00, TRUE),
('Darilna kartica 50 EUR', 'Darilna kartica v vrednosti 50 EUR', 70.00, TRUE),

('Kupon za sadje', 'Kupon za nakup sadja in zelenjave', 12.00, TRUE),
('Kupon za pekarno', 'Kupon za izdelke iz pekarne', 10.00, TRUE),
('Kupon za gospodinjstvo', 'Kupon za gospodinjske izdelke', 25.00, TRUE),

('Posebna ponudba Silver', 'Nagrada za zveste stranke', 35.00, TRUE),
('Posebna ponudba Gold', 'Ekskluzivna nagrada za najbolj zveste stranke', 50.00, TRUE),
('Premium paket', 'Vecja nagrada za uporabnike z veliko tockami', 100.00, TRUE);

INSERT INTO transactions (user_id, amount, points, transaction_date, processed)
VALUES
((SELECT id FROM users WHERE username = 'user'), 150.00, 0, '2026-03-10 10:00:00', FALSE),
((SELECT id FROM users WHERE username = 'user'), 420.00, 0, '2026-03-20 14:00:00', FALSE),

((SELECT id FROM users WHERE username = 'marko'), 80.00, 0, '2026-03-12 09:30:00', FALSE),

((SELECT id FROM users WHERE username = 'sara'), 250.00, 0, '2026-03-15 12:00:00', FALSE),

((SELECT id FROM users WHERE username = 'luka'), 650.00, 0, '2026-03-18 16:00:00', FALSE),

((SELECT id FROM users WHERE username = 'maja'), 45.00, 0, '2026-03-22 11:15:00', FALSE);