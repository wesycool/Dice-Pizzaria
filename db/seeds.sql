USE dice_pizzaria;;

-- client ( id, email, password, firt_name, last_name, address, address_2, city, province, postal_code, phone, createdAt )
-- INSERT INTO client VALUES(0, email, password, first_name, last_name, address, city, province, postal_code, phone, default);
INSERT INTO client VALUES(0, "fil@asdsa.com", "password", "Fil", "L", "509 Gayton Crescent", "", "Canada", "ON", "Toronto", "A1B2C3", "(123) 123-1234", default);
INSERT INTO client VALUES(0, "daniel@asdsa.com", "password", "Daniel", "C", "287 Rosehill Fields", "", "Canada", "ON", "Toronto", "A1B2C3", "(123) 123-1234", default);
INSERT INTO client VALUES(0, "holly@asdsa.com", "password", "Holly", "A", "769 Hall Farm Row", "", "Canada", "ON", "Toronto", "A1B2C3", "(123) 123-1234", default);
INSERT INTO client VALUES(0, "jolly@asdsa.com", "password", "Jolly", "B", "839 Andrew Pleasant", "", "Canada", "ON", "Toronto", "A1B2C3", "(123) 123-1234", default);
INSERT INTO client VALUES(0, "roger@asdsa.com", "password", "Roger", "C", "137 Barton View", "", "Canada", "ON", "Toronto", "A1B2C3", "(123) 123-1234", default);

-- department ( id, name, createdAt )
-- INSERT INTO department VALUES(0, "name", default);
INSERT INTO department VALUES(0, "Main Location 1", default);

-- order_info ( id, status, transaction_id, product_id, ingredient, quantity, price, createdAt )
-- INSERT INTO order_info VALUES(0, "status", transaction_id, product_id, "addinfo", quantity, price, default);
INSERT INTO order_info VALUES(0, 1, 1, "Additional information", 1, 5.99, default);
INSERT INTO order_info VALUES(0, 1, 2, "Additional information", 2, 7.99, default);
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

-- products ( id, description, size, price, createdAt )
-- INSERT INTO products VALUES(0, "description", "size", price, archive, default);
INSERT INTO products VALUES(0, "Pepperoni Pizza", "Small", 5.99, false, default);
INSERT INTO products VALUES(0, "Pepperoni Pizza", "Medium", 7.99, false, default);
INSERT INTO products VALUES(0, "Pepperoni Pizza", "Large", 10.99, false, default);
INSERT INTO products VALUES(0, "All Dressed Pizza", "Small", 6.99, false, default);
INSERT INTO products VALUES(0, "All Dressed Pizza", "Medium", 8.99, false, default);
INSERT INTO products VALUES(0, "All Dressed Pizza", "Large", 11.99, false, default);
INSERT INTO products VALUES(0, "Veggie Pizza", "Medium", 9.99, false, default);
INSERT INTO products VALUES(0, "Custom Pizza", "Special", 12.99, false, default);

-- role ( id, title, salary, department_id, createdAt )
-- INSERT INTO role VALUES(0, "title", salary, department_id, default);
INSERT INTO role VALUES(0, "Manager", 120000, 1, default);
INSERT INTO role VALUES(0, "Chef", 60000, 1, default);
INSERT INTO role VALUES(0, "Staff", 40000, 1, default);
INSERT INTO role VALUES(0, "Delivery", 30000, 1, default);
INSERT INTO role VALUES(0, "Part Time", 20000, 1, default);

-- staff ( id, email, password, first_name, last_name, address, city, province,  postal_code, phone, role_id, manager_id, createdAt )
-- INSERT INTO staff VALUES(0, "email", "password", "first_name", "last_name", "address", "city", "province",  "postal_code", "phone", role_id, manager_id, theme, units, default);
INSERT INTO staff VALUES(0, "edmund@asdsa.com", "password", "Edmund", "A", "733 Stephenson Brook", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 1, NULL, "default", "metric", default);
INSERT INTO staff VALUES(0, "anna@asdsa.com", "password", "Anna", "A", "662 King Edward Lawn", "Vancouver", "BC",  "A1B2C3", "(123) 123-1234", 2, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "avi@asdsa.com", "password", "Avi", "B", "61 Allison Brambles", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "chet@asdsa.com", "password", "Chet", "C", "759 Lion Hollow", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 5, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "christine@asdsa.com", "password", "Christine", "A", "247 Cole Royd", "Toronto", "ON",  "A1B2C3", "(123) 6-1234", 2, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "doug@asdsa.com", "password", "Doug", "B", "772 Lucerne Heights", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "eddi@asdsa.com", "password", "Eddi", "C", "895 Halstead Edge", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 4, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "etam@asdsa.com", "password", "Etam", "B", "334 Holborn Park", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "haley@asdsa.com", "password", "Haley", "C", "862 Eagles Close", "Vancouver", "BC",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "james@asdsa.com", "password", "James", "A", "586 Tamworth Parade", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 2, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "marcel@asdsa.com", "password", "Marcel", "B", "660 Bradford Gardens", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "moni@asdsa.com", "password", "Moni", "C", "649 Bath Springs", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "pat@asdsa.com", "password", "Pat", "A", "780 Bath Chase", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "sadia@asdsa.com", "password", "Sadia", "B", "711 Carleton Warren", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "samuel@asdsa.com", "password", "Samuel", "C", "596 Tylden Way", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 2, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "saquib@asdsa.com", "password", "Saquib", "A", "806 Tumbling Lane", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 3, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "shayanne@asdsa.com", "password", "Shayanne", "B", "97 Morton Dale", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 4, 7, "default", "metric", default);
INSERT INTO staff VALUES(0, "damon@asdsa.com", "password", "Damon", "C", "369 Southwell Parc", "Toronto", "ON",  "A1B2C3", "(123) 123-1234", 5, 7, "default", "metric", default);

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
INSERT INTO transactions VALUES(0, 1, "Received Order",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 2, "Received Order",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 3, "Received Order",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 4, "Received Order",TRUE, TRUE, 21.97, 9, 13, 24.83, default);
INSERT INTO transactions VALUES(0, 5, "Received Order",TRUE, TRUE, 21.97, 9, 13, 24.83, default);