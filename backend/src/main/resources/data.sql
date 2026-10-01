INSERT INTO products (name, price)
SELECT 'Mechanical Keyboard', 4500.00
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Mechanical Keyboard'
);

INSERT INTO products (name, price)
SELECT 'Wireless Mouse', 1800.00
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Wireless Mouse'
);

INSERT INTO products (name, price)
SELECT 'USB-C Hub', 2500.00
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'USB-C Hub'
);
