USE the_crashers_db;

-- client ( id, email, password, firt_name, last_name, address, city, province, postal_code, phone, createdAt )
-- INSERT INTO client VALUES(0, email, password, first_name, last_name, address, city, province, postal_code, phone, default);
INSERT INTO client VALUES(0, "fil@asdsa.com", "password", "Fil", "L", "123 Streetname", "Toronto", "ON", "A1B2C3", "(123) 123-1234", default);
INSERT INTO client VALUES(0, "daniel@asdsa.com", "password", "Daniel", "C", "123 Streetname", "Toronto", "ON", "A1B2C3", "(123) 123-1234", default);

-- department ( id, name, createdAt )
-- INSERT INTO department VALUES(0, "name", default);
INSERT INTO department VALUES(0, "Main Location 1", default);

-- order_info ( id, status, transaction_id, product_id, ingredient, quantity, price, createdAt )
-- INSERT INTO order_info VALUES(0, "status", transaction_id, product_id, "addinfo", quantity, price, default);
INSERT INTO order_info VALUES(0, 1, 1, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 1, 2, "Additional information", 2, 7.99, default);

-- products ( id, description, size, price, createdAt )
-- INSERT INTO products VALUES(0, "description", "size", price, default);
INSERT INTO products VALUES(0, "Product A", "Small", 5.99, default);
INSERT INTO products VALUES(0, "Product B", "Medium", 7.99, default);
INSERT INTO products VALUES(0, "Product C", "Large", 10.99, default);
INSERT INTO products VALUES(0, "Product D", "Small", 5.99, default);
INSERT INTO products VALUES(0, "Product E", "Medium", 8.99, default);
INSERT INTO products VALUES(0, "Product F", "Large", 10.99, default);
INSERT INTO products VALUES(0, "Product G", "Medium", 9.99, default);
INSERT INTO products VALUES(0, "Custom", "Special", 12.99, default);

-- role ( id, title, salary, department_id, createdAt )
-- INSERT INTO role VALUES(0, "title", salary, department_id, default);
INSERT INTO role VALUES(0, "Manager", 120000, 1, default);
INSERT INTO role VALUES(0, "Chef", 60000, 1, default);
INSERT INTO role VALUES(0, "Staff", 40000, 1, default);
INSERT INTO role VALUES(0, "Delivery", 30000, 1, default);
INSERT INTO role VALUES(0, "PartTime", 20000, 1, default);

-- staff ( id, email, password, first_name, last_name, address, city, province,  postal_code, phone, role_id, manager_id, createdAt )
-- INSERT INTO staff VALUES(0, "email", "password", "first_name", "last_name", "address", "city", "province",  "postal_code", "phone", role_id, manager_id, theme, units, default);
INSERT INTO staff VALUES(0, "anna@asdsa.com", "password", "Anna", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "avi@asdsa.com", "password", "Avi", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "chet@asdsa.com", "password", "Chet", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "christine@asdsa.com", "password", "Christine", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 6-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "doug@asdsa.com", "password", "Doug", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "eddi@asdsa.com", "password", "Eddi", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "edmund@asdsa.com", "password", "Edmund", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, NULL, "default", "metric", default);
INSERT INTO staff VALUES(0, "etam@asdsa.com", "password", "Etam", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "haley@asdsa.com", "password", "Haley", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "james@asdsa.com", "password", "James", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "marcel@asdsa.com", "password", "Marcel", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "moni@asdsa.com", "password", "Moni", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "pat@asdsa.com", "password", "Pat", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "sadia@asdsa.com", "password", "Sadia", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "samuel@asdsa.com", "password", "Samuel", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "saquib@asdsa.com", "password", "Saquib", "A", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "shayanne@asdsa.com", "password", "Shayanne", "B", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "damon@asdsa.com", "password", "Damon", "C", "123 Streetname", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);

-- tax ( id, province, tax_rate, createdAt )
INSERT INTO tax VALUES(0, "AB", 5, default);
INSERT INTO tax VALUES(0, "BC", 12, default);
INSERT INTO tax VALUES(0, "MN", 12, default);
INSERT INTO tax VALUES(0, "BC", 15, default);
INSERT INTO tax VALUES(0, "NL", 15, default);
INSERT INTO tax VALUES(0, "NT", 5, default);
INSERT INTO tax VALUES(0, "NS", 15, default);
INSERT INTO tax VALUES(0, "NU", 5, default);
INSERT INTO tax VALUES(0, "ON", 13, default);
INSERT INTO tax VALUES(0, "PE", 15, default);
INSERT INTO tax VALUES(0, "QC", 14.975, default);
INSERT INTO tax VALUES(0, "SK", 11, default);
INSERT INTO tax VALUES(0, "YT", 5, default);

-- timesheet ( id, staff_id, start_time, end_time, createdAt )
-- INSERT INTO timesheet VALUES(0, staff_id, start_time, end_time, default);

-- timestamp ( id, staff_id, checknum, createdAt )
-- INSERT INTO timestamp VALUES(0, staff_id, checknum, default);

-- transactions ( id, client_id, isDelivery, isPaid, gross_total, tax_id, tax_amount, net_total, createdAt )
-- INSERT INTO transactions VALUES(0, client_id, isDelivery, isPaid, gross_total, tax_id, tax_amount, net_total, default);
INSERT INTO transactions VALUES(0, 1, "Pending",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 2, "Pending",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 3, "Pending",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 4, "Pending",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 5, "Pending",TRUE, TRUE, 21.97, 9, 13, 24.83, default);


-- more test data
INSERT INTO order_info VALUES(0, 2, 1, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 2, 2, "Additional information", 2, 7.99, default);

INSERT INTO order_info VALUES(0, 3, 1, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 3, 2, "Additional information", 2, 7.99, default);
INSERT INTO order_info VALUES(0, 3, 3, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 3, 4, "Additional information", 2, 7.99, default);

INSERT INTO order_info VALUES(0, 4, 5, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 4, 6, "Additional information", 2, 7.99, default);

INSERT INTO order_info VALUES(0, 5, 1, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 5, 4, "Additional information", 2, 7.99, default); 