/* Lessons for CompTIA Data+ (DA0-002): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("data-plus", [
 {
  t: "Structured, semi-structured and unstructured data, with examples of each",
  body: [
   "Every data project starts with a simple question: what shape is this data in? The answer decides where you can store it, which tools can read it and how much work it takes before you can analyze it. Data+ groups data into three shapes: structured, semi-structured and unstructured.",
   "Structured data follows a fixed schema: every record has the same fields, each field has a defined type, and the data fits naturally into rows and columns. A table of orders in a relational database, with OrderID, CustomerID, OrderDate and Amount columns, is the classic example. Spreadsheets laid out as clean tables are structured too. Because the shape is known in advance, you can query structured data directly with SQL, and it is the easiest kind to aggregate, join and chart.",
   "Semi-structured data carries its own labels but does not force every record into the same shape. JSON and XML are the common examples: each value sits next to a key or inside a tag that says what it is, but one record can have fields another lacks, and values can be nested (an order containing a list of line items). Log files with key=value pairs, email headers and many API responses are semi-structured. You usually parse or flatten this data into tables before analysis, and modern databases and tools such as pandas can read it directly.",
   "Unstructured data has no data model that a query can use. Free text in emails, chat messages and documents, PDFs, images, audio and video all fall here. Most of the world's data is unstructured, and it often holds valuable information, such as the reason a customer is unhappy, but you need extra processing to turn it into analyzable fields. Examples include natural language processing to score sentiment, optical character recognition to pull text from scanned forms, or tags assigned by a person or a model.",
   "Watch for mixed cases. An email is semi-structured in its headers (From, To, Date) and unstructured in its body. A CSV file is structured if every row has the same columns, even though it is just a text file. A database table can hold an unstructured column, such as a comments field. When a question asks you to classify data, look at whether a consistent schema describes it, whether it is self-describing with keys or tags, or whether it has no model at all."
  ],
  terms: [
   ["Structured data", "Data that follows a fixed schema of fields and types, such as rows in a relational table."],
   ["Semi-structured data", "Self-describing data with keys or tags but a flexible shape, such as JSON or XML."],
   ["Unstructured data", "Data with no predefined model that queries can use, such as free text, images, audio and video."],
   ["Schema", "The definition of the fields, types and relationships that data is expected to follow."]
  ],
  example: "A support team wants to know why customers cancel. Account details and cancellation dates sit in a structured CRM table, ticket metadata arrives as JSON from the helpdesk API, and the real reasons are in free-text chat transcripts. The analyst joins the structured and JSON data on customer ID, then uses a text classification step to tag each transcript with a reason, turning unstructured text into a column that can be counted.",
  tip: "JSON and XML are the go-to examples of semi-structured data. If a question mentions nested fields, optional keys or tags, choose semi-structured; if it mentions photos, recordings or free text, choose unstructured.",
  check: [
   ["A web API returns records where some objects contain an optional 'discount' key and a nested list of items. How is this data classified?", "Semi-structured. It is self-describing with keys, but records do not all share one fixed schema."],
   ["Why does unstructured data usually need extra processing before analysis?", "It has no fields that queries can filter or aggregate, so you must first extract features such as sentiment, keywords or text from images."]
  ]
 },
 {
  t: "Relational databases: tables, primary and foreign keys, normalization and relationships",
  body: [
   "A relational database stores data in tables, also called relations. Each table describes one kind of thing, such as customers, products or orders. Each row is one instance of that thing, and each column is an attribute with a defined data type. Most business systems, including sales, finance and HR applications, keep their data in relational databases such as PostgreSQL, MySQL, SQL Server or Oracle, and you query them with SQL.",
   "A primary key is the column, or combination of columns, that uniquely identifies each row. It cannot be null and cannot repeat. CustomerID in a Customers table is a typical primary key. A key built from two or more columns is a composite key, for example OrderID plus LineNumber in an order-lines table. A natural key comes from the business (a tax ID); a surrogate key is an artificial number the database generates, which stays stable even if business values change.",
   "A foreign key is a column in one table that refers to the primary key of another table. Orders.CustomerID points to Customers.CustomerID. The database can enforce referential integrity: it refuses an order for a customer who does not exist and can block deleting a customer who still has orders. Relationships have a cardinality. One-to-many is the most common (one customer, many orders). One-to-one is rarer (a person and a passport record). Many-to-many (students and courses) needs a junction table that holds both keys.",
   "Normalization is the process of organizing tables to reduce redundancy and update problems. In first normal form (1NF), each column holds one atomic value, with no lists in a cell and no repeating column groups. In second normal form (2NF), every non-key column depends on the whole primary key, not part of a composite key. In third normal form (3NF), non-key columns depend only on the key, not on other non-key columns. A customer's city should not be stored on every order row; it belongs in the Customers table once.",
   "Normalized designs suit transactional systems because each fact is stored once, so updates are fast and consistent. The cost is that analysis needs many joins. That is why reporting systems often denormalize, copying descriptive attributes into wider tables to make queries simpler and faster. Neither is wrong: the right design depends on whether the workload is writing transactions or reading for analysis."
  ],
  terms: [
   ["Primary key", "A column or set of columns whose values uniquely identify each row and are never null."],
   ["Foreign key", "A column that refers to another table's primary key, linking the tables and enforcing referential integrity."],
   ["Normalization", "Organizing tables into normal forms (1NF, 2NF, 3NF) so each fact is stored once, reducing redundancy and update anomalies."],
   ["Junction table", "A table holding pairs of foreign keys that resolves a many-to-many relationship."]
  ],
  example: "A small shop kept orders in one spreadsheet with the customer's name, email and address repeated on every row. When a customer changed email, some rows were updated and others were not. Moving to a Customers table (CustomerID primary key) and an Orders table with a CustomerID foreign key means the email is stored once and every order links to the current value.",
  tip: "If a question asks which column links two tables, the answer is the foreign key in the 'many' table. If it asks what removes repeated customer details from every order row, the answer is normalization.",
  check: [
   ["How do you model a many-to-many relationship between students and courses?", "Create a junction table such as Enrollments with StudentID and CourseID foreign keys (together often forming a composite primary key)."],
   ["Why might a reporting database deliberately denormalize data?", "Fewer joins make analytic queries simpler and faster, and reporting systems are read-heavy, so the redundancy is an acceptable trade-off."]
  ]
 },
 {
  t: "Non-relational databases: document, key-value, column-family and graph stores",
  body: [
   "Non-relational databases, often called NoSQL databases, store data in models other than related tables. They became popular for workloads that need a flexible schema, huge scale across many servers or a data model that tables handle awkwardly. As an analyst you may not design them, but you need to recognize each type and know which problem it fits, because data you analyze may come from one.",
   "A document store keeps each record as a self-contained document, usually JSON or a binary form of it. One customer document can hold the customer's details plus a nested array of addresses and preferences, and different documents in the same collection can have different fields. Document stores suit product catalogs, content management and application back ends where the shape changes often. MongoDB is a well-known example.",
   "A key-value store is the simplest model: you store a value under a unique key and fetch it by that key, very quickly. The database does not care what is inside the value. Session data, shopping carts, user preferences and caches are typical uses. The trade-off is that you cannot easily query by anything other than the key, so it is a poor fit for ad hoc analysis.",
   "A column-family (wide-column) store organizes data into rows that can each have a large, varying set of columns grouped into families, and it spreads data across many nodes. It suits very high write volumes such as sensor readings, event logs and time series at scale. Apache Cassandra and HBase are examples. Do not confuse this with columnar storage in analytic warehouses and Parquet files, which store each column together to speed up aggregate queries.",
   "A graph database stores nodes (entities such as people or accounts) and edges (relationships such as follows, paid or knows), each with properties. Queries that follow relationships several hops deep, such as friends of friends, fraud rings or recommendation paths, are fast in a graph but need many self-joins in SQL. When an exam scenario emphasizes relationships between entities, think graph.",
   "Non-relational systems often trade strict consistency and fixed schemas for flexibility and scale. When you extract data from them for analysis, expect to flatten nested structures and handle missing fields before loading into tables."
  ],
  terms: [
   ["Document store", "A NoSQL database that stores self-contained, often nested JSON-like documents with flexible fields."],
   ["Key-value store", "A NoSQL database that stores and retrieves values by a unique key, optimized for fast lookups."],
   ["Column-family store", "A distributed NoSQL database whose rows hold varying sets of columns grouped into families, suited to heavy write loads."],
   ["Graph database", "A database that stores nodes and relationships as first-class data, optimized for traversing connections."]
  ],
  example: "An online retailer keeps its product catalog in a document store because each product type has different attributes, shopping carts in a key-value store for millisecond lookups, and a graph database that links customers, devices and payment cards so the fraud team can spot one card used across many unrelated accounts.",
  tip: "Match the keyword to the type: flexible JSON records means document; lookup by ID only means key-value; massive time-series writes means column-family; relationships and hops means graph.",
  check: [
   ["A team needs to find accounts connected to a known fraudster through shared devices up to three steps away. Which database type fits?", "A graph database, because it stores relationships directly and traverses multiple hops efficiently."],
   ["Why is a key-value store a poor source for ad hoc analysis?", "You can only retrieve values by key, so filtering or aggregating by the contents of the values requires extracting all the data first."]
  ]
 },
 {
  t: "Data types: strings, integers, decimals, dates and times, Booleans and type conversion",
  body: [
   "Every column has a data type, and choosing or recognizing the right one prevents a surprising number of analysis errors. The type decides which operations make sense: you can add numbers, compare dates and search text, but adding two ZIP codes or averaging phone numbers is meaningless.",
   "Strings (text, char, varchar) hold letters, digits and symbols as characters. Use text for identifiers that look numeric but are not quantities: ZIP codes, phone numbers, account numbers and product codes. Stored as numbers, they lose leading zeros and may be shown in scientific notation. Fixed-length char pads values to a set length, while varchar stores what is there up to a maximum.",
   "Integers hold whole numbers such as counts and quantities. Decimals (numeric, decimal) hold exact values with a set number of digits after the point, which is what you want for money. Floating-point types (float, double, real) store approximations in binary, so 0.1 + 0.2 may come out as 0.30000000000000004. That is fine for scientific measurements but can make currency totals drift by a cent.",
   "Dates and times deserve care. A date type stores a calendar date, a datetime or timestamp adds a time of day, and some systems store a time zone or an offset from UTC. Text that merely looks like a date ('03/04/2025') is ambiguous: it is March 4 in the US convention and 3 April in much of the world. Converting text to a real date type, ideally in ISO 8601 format (YYYY-MM-DD), lets you sort correctly, calculate durations and group by month. Store times in UTC and convert for display when data spans time zones.",
   "Booleans hold true or false (sometimes 1/0 or Y/N), which suits flags like is_active or opted_in. Categorical data is text with a limited set of values, such as a region or status, and may be stored as codes.",
   "Type conversion (casting) changes a value from one type to another, for example `CAST(order_total AS DECIMAL(10,2))` in SQL or `pd.to_numeric(df['amount'], errors='coerce')` in pandas. Implicit conversion happens automatically and can hide problems, such as text '10' sorting before '9'. Explicit conversion is clearer, and values that fail to convert should be investigated, not silently dropped."
  ],
  terms: [
   ["String", "A text data type that stores characters; used for names and for numeric-looking identifiers such as ZIP codes."],
   ["Decimal (numeric)", "An exact numeric type with fixed precision and scale, suited to currency."],
   ["Floating point", "An approximate numeric type stored in binary that can introduce small rounding errors."],
   ["Casting", "Explicitly converting a value from one data type to another, such as text to date."]
  ],
  example: "An analyst imports a customer file and sees New England ZIP codes such as 02134 shown as 2134, and order dates sorting as text so that '10/01' comes before '9/30'. Re-importing ZIP codes as text and casting the date column to a real date type fixes both problems before any analysis begins.",
  tip: "Numbers you never do math on (ZIP codes, phone numbers, IDs) should be text. For money, choose decimal over float.",
  check: [
   ["Why can text dates cause wrong results in a monthly trend chart?", "Text sorts character by character, so months sort alphabetically or by the first digit, and ambiguous formats may be misread. Converting to a date type fixes ordering and grouping."],
   ["What happens with pandas to_numeric(errors='coerce') when a value cannot be converted?", "It becomes NaN (missing), so you should check how many values were coerced rather than assume the conversion was clean."]
  ]
 },
 {
  t: "File formats: CSV, TSV, JSON, XML, Parquet, spreadsheets and flat files",
  body: [
   "Data moves between systems in files more often than you might expect, and each format has habits you need to know. Picking the right one, or reading one correctly, avoids broken columns, lost precision and slow queries.",
   "A flat file is any plain file that holds records without the relationships and indexes of a database, usually one record per line. CSV (comma-separated values) is the most common flat file: each line is a row and commas separate fields. Fields that contain commas are wrapped in double quotes, and a quote inside a field is doubled. TSV uses tab characters instead, which avoids clashes with commas in text. Both are human-readable and supported everywhere, but they carry no data types. Every value is text until the reading tool guesses, which is how leading zeros and dates get mangled. Watch for the character encoding (UTF-8 is the safe default), the delimiter, and whether the first row is a header.",
   "Fixed-width files are another flat format, where each field occupies set character positions. Older mainframe and banking systems still produce them, and you need a layout document to parse them.",
   "JSON (JavaScript Object Notation) represents objects as key-value pairs and arrays in braces and brackets. It is the usual format for web APIs and supports nesting, so one order can hold a list of items. XML uses opening and closing tags with optional attributes. It is more verbose than JSON but still common in enterprise integrations and configuration, and it can be validated against a schema (XSD). Both are semi-structured and usually need flattening for tabular analysis.",
   "Parquet is a columnar, compressed binary format designed for analytics. It stores each column's values together with their data types, so a query that needs three of fifty columns reads only those three, and similar values compress well. Parquet is common in data lakes and cloud warehouses. You cannot read it in a text editor, but tools such as pandas, Spark and warehouse engines read it natively.",
   "Spreadsheets (XLSX) can hold multiple sheets, formulas and formatting. They are convenient for sharing and small analyses but have row limits, and merged cells, notes in the data area and inconsistent types make them unreliable as a data source. Export or clean them into a tidy table before serious work."
  ],
  terms: [
   ["CSV", "Comma-separated values: a plain-text flat file with one record per line and comma-delimited fields."],
   ["JSON", "A text format of key-value pairs and arrays that supports nesting; common in APIs."],
   ["Parquet", "A compressed, columnar binary file format with stored types, built for analytic queries."],
   ["Delimiter", "The character that separates fields in a flat file, such as a comma, tab or pipe."]
  ],
  example: "A data engineer receives a daily 5 GB CSV export that takes a long time to scan. Converting it to Parquet in the data lake cuts the file size sharply, keeps the column types, and lets analysts' queries read only the columns they use, so a monthly revenue query finishes in seconds.",
  tip: "Columnar plus compressed plus analytics means Parquet. Nested data from an API means JSON. Plain, universal, typeless tabular exchange means CSV.",
  check: [
   ["A CSV field contains the text 'Portland, OR'. How must it be written so it is not split into two fields?", "Wrap the field in double quotes: \"Portland, OR\"."],
   ["Why is Parquet faster than CSV for a query that sums one column?", "Parquet stores each column separately and compressed, so the engine reads only that column; CSV must be read row by row in full."]
  ]
 },
 {
  t: "Data warehouses, data marts, data lakes and lakehouses; OLTP vs OLAP",
  body: [
   "Organizations keep data in different kinds of stores depending on what the data is for. Data+ expects you to tell them apart and pick the right one for a scenario.",
   "OLTP (online transaction processing) systems run day-to-day operations: taking orders, updating inventory, recording payments. They handle many small, concurrent reads and writes, and each must be fast and reliable. They are usually normalized relational databases. OLAP (online analytical processing) systems exist to analyze the business: fewer users running large, read-heavy queries that aggregate history, such as revenue by region by quarter. Running heavy analysis on an OLTP system can slow down the business, which is one reason analytic data is copied elsewhere.",
   "A data warehouse is a central store of integrated, cleaned and structured data from many source systems, organized for reporting and analysis. Data is transformed to a defined schema before or as it is loaded (schema on write), history is kept, and the design is often a star schema. A data mart is a smaller, subject-focused subset, such as a sales mart or a finance mart, built for one department's needs. It may be carved out of the warehouse or built separately.",
   "A data lake stores large volumes of raw data in its native format, structured, semi-structured and unstructured, usually on cheap object storage. Structure is applied only when the data is read (schema on read). Lakes suit data science and exploration, keeping data you have not yet decided how to use, and storing logs, images and JSON. Without governance they can become a data swamp that nobody trusts or can navigate.",
   "A data lakehouse combines the two ideas. Data lives in open file formats such as Parquet on lake storage, but a table layer adds warehouse features: schemas, transactions, versioning and fast SQL. The goal is one copy of the data serving both BI reporting and data science.",
   "When you read a scenario, look for the clues. Raw files of many types kept cheaply for later points to a lake. Clean, integrated history for enterprise reporting points to a warehouse. One department's reporting points to a data mart. Recording transactions as they happen points to OLTP."
  ],
  terms: [
   ["OLTP", "Online transaction processing: systems optimized for many fast, small reads and writes that run the business."],
   ["OLAP", "Online analytical processing: systems optimized for complex, read-heavy analytic queries over historical data."],
   ["Data warehouse", "A central repository of integrated, cleaned, structured historical data modeled for reporting (schema on write)."],
   ["Data lake", "A repository of raw data in native formats where structure is applied when read (schema on read)."],
   ["Data mart", "A subject-specific subset of warehouse-style data for one team or function."]
  ],
  example: "A hospital group runs admissions and billing on OLTP databases. Each night, cleaned data flows into a warehouse used for enterprise reports, with a finance data mart for the CFO's team. Raw device telemetry and scanned documents land in a data lake, where the data science team explores them before deciding what is worth modeling.",
  tip: "Schema on write means warehouse; schema on read means lake. Transactions mean OLTP; analysis means OLAP.",
  check: [
   ["Why do organizations avoid running heavy reports directly against OLTP systems?", "Large analytic queries compete for resources with live transactions and can slow down or lock the operational system; normalized OLTP schemas also make analysis queries complex."],
   ["What problem does a lakehouse try to solve?", "It gives lake storage warehouse features such as schemas, transactions and fast SQL, so one copy of data can serve both BI and data science."]
  ]
 },
 {
  t: "Dimensional modeling: fact and dimension tables, star and snowflake schemas, slowly changing dimensions",
  body: [
   "Dimensional modeling is the standard way to organize data in a warehouse so business users can slice measures by descriptive categories. It trades some redundancy for simple, fast queries.",
   "A fact table records measurable business events at a defined grain, meaning the level of detail of one row, such as one line on one sales receipt. It holds numeric measures (quantity, sales amount, discount) and foreign keys to dimension tables. Fact tables are long and narrow and grow constantly. Choosing the grain is the first design decision, because every measure in the table must be true at that grain.",
   "Dimension tables describe the who, what, where and when of each event: Date, Product, Customer, Store, Employee. They hold descriptive attributes used for filtering and grouping, such as product category, customer segment or fiscal quarter. Dimensions are wide and relatively short. A date dimension with one row per day and columns for month, quarter, weekday and holiday flag is almost universal.",
   "In a star schema, the fact table sits in the center with each dimension joined directly to it, and each dimension is a single denormalized table. Product category and subcategory are simply columns on the Product dimension. Star schemas are easy to understand and fast to query. A snowflake schema normalizes dimensions into sub-tables, for example Product linked to Subcategory linked to Category. This saves some storage and keeps hierarchies tidy, but adds joins. A galaxy schema (fact constellation) has several fact tables sharing common dimensions, such as Sales and Inventory both using Date and Product.",
   "Dimension attributes change over time: a customer moves, a product changes category. Slowly changing dimension (SCD) techniques decide how to handle that. Type 1 overwrites the old value, so history is lost and past sales now show the new city. Type 2 adds a new row with a new surrogate key, effective-from and effective-to dates or a current flag, so old facts keep pointing at the old version and history is preserved. Type 3 adds a column for the previous value, keeping limited history. Type 2 is the usual answer when a scenario says reports must reflect the value at the time of the transaction."
  ],
  terms: [
   ["Fact table", "A table of numeric measures for business events at a defined grain, with foreign keys to dimensions."],
   ["Dimension table", "A table of descriptive attributes (such as product, customer or date) used to filter and group facts."],
   ["Star schema", "A design with a central fact table joined directly to denormalized dimension tables."],
   ["Snowflake schema", "A star schema whose dimensions are normalized into related sub-tables."],
   ["Slowly changing dimension (SCD)", "A method for handling changes to dimension attributes; Type 1 overwrites, Type 2 adds a new row to keep history."]
  ],
  example: "A retailer's FactSales table has one row per receipt line with quantity and amount, linked to DimDate, DimProduct, DimStore and DimCustomer. When a loyal customer moves from Denver to Austin, a Type 2 change adds a new DimCustomer row, so last year's Denver sales still count toward the Denver store region and new purchases count toward Austin.",
  tip: "Measures go in facts; descriptions go in dimensions. Keep history means SCD Type 2; overwrite means Type 1. Dimensions split into sub-tables means snowflake.",
  check: [
   ["What is the grain of a fact table and why decide it first?", "The level of detail one row represents, such as one receipt line. Every measure and dimension key must be consistent with it, so it drives the whole design."],
   ["A product moves to a new category and the business wants past sales reported under the old category. Which SCD type?", "Type 2: add a new row for the product with the new category, and leave the old row for historical facts."]
  ]
 },
 {
  t: "Data environments: on-premises vs cloud, and tools such as spreadsheets, SQL clients, notebooks and BI platforms",
  body: [
   "Where data lives and which tools you use to work with it shape how fast you can answer questions, how much it costs and how it is secured. Data+ expects you to know the main environments and when each tool fits.",
   "On-premises environments run on servers the organization owns in its own data center. The organization controls hardware, network and security directly and pays up front for capacity, but scaling up takes time and money. Cloud environments rent storage and compute from a provider on demand. You can scale out for a big job and scale back, pay for what you use, and use managed services such as cloud data warehouses, where the provider runs the infrastructure. Trade-offs include ongoing costs that must be watched, dependence on network connectivity, and data residency questions about which country the data is stored in. Hybrid environments mix both, for example on-premises OLTP systems feeding a cloud warehouse.",
   "Spreadsheets such as Excel, Google Sheets and LibreOffice Calc are the most widely used analysis tool. They are good for small datasets, quick calculations, pivot tables and sharing with non-technical colleagues. They struggle with large data, make it easy to introduce silent formula errors, and are hard to audit or reproduce.",
   "SQL clients and IDEs (integrated development environments) connect to databases so you can write, run and save queries. Examples include the query editors built into cloud warehouses and desktop tools for specific databases. Code editors and IDEs also support Python and R with debugging, version control and extensions.",
   "Notebooks such as Jupyter and Google Colab mix code cells, their output (tables and charts) and narrative text in one document. They are ideal for exploration and for sharing reproducible analyses, though notebooks run out of order can confuse readers, so restart and run all cells before sharing.",
   "BI (business intelligence) platforms such as Power BI, Tableau, Looker and Qlik connect to data sources, model the data, and publish interactive dashboards and reports with scheduled refresh and permissions. They are how most analysis reaches business users. Statistical packages and programming languages cover deeper modeling. A capable analyst chooses the lightest tool that answers the question reliably and can be repeated."
  ],
  terms: [
   ["On-premises", "Infrastructure owned and operated in the organization's own facilities."],
   ["Cloud", "Computing and storage rented on demand from a provider, often as managed services billed by use."],
   ["Notebook", "An interactive document that combines runnable code, output and narrative text, such as Jupyter."],
   ["BI platform", "Software that connects to data, models it and publishes interactive dashboards and reports."]
  ],
  example: "A regional retailer keeps its point-of-sale databases on premises but copies nightly extracts to a cloud warehouse. Analysts explore data in notebooks, build a monthly sales dashboard in a BI platform with scheduled refresh for managers, and finance still receives a small reconciled summary in a spreadsheet.",
  tip: "Reproducible code plus narrative means notebook; interactive dashboards for business users means BI platform; elastic, pay-as-you-go capacity means cloud.",
  check: [
   ["Name two risks of using spreadsheets as the main analysis tool for large, recurring reports.", "Row and performance limits with large data, and manual formula errors that are hard to audit or reproduce each period."],
   ["Why restart and run all cells in a notebook before sharing it?", "Cells may have been run out of order during exploration, so rerunning from the top proves the results reproduce."]
  ]
 },
 {
  t: "Languages for analysis: SQL, Python and R, and when to use each",
  body: [
   "Data+ does not test you as a programmer, but it expects you to know what the main languages are for, to read simple code, and to pick the right one for a task.",
   "SQL (Structured Query Language) is the language of relational databases and most cloud warehouses. It is declarative: you describe the result you want and the database works out how to get it. Data analysts use SQL to select columns, filter rows, join tables, group and aggregate, and increasingly to transform data inside the warehouse. Because the work happens where the data lives, SQL scales to very large tables without moving data to your laptop. Different databases have dialects with small differences, but the core statements are shared.",
   "```sql\nSELECT region, SUM(amount) AS revenue\nFROM sales\nWHERE sale_date >= '2025-01-01'\nGROUP BY region\nORDER BY revenue DESC;\n```",
   "Python is a general-purpose language with a large data ecosystem. pandas handles tables (DataFrames) for cleaning, reshaping and aggregating. NumPy handles fast numeric arrays. Matplotlib and seaborn draw charts. scikit-learn provides machine learning. Python is a strong choice when a task mixes data work with automation, such as calling an API, processing files, scheduling a pipeline or building a model into an application.",
   "R was built by statisticians for statistics. It has deep support for statistical tests, models and publication-quality graphics (ggplot2), and the tidyverse packages make data manipulation readable. R is common in academia, research, healthcare and anywhere rigorous statistical analysis is central.",
   "In practice, the choice depends on the task and the team. Use SQL to get and shape data from databases. Use Python or R when you need logic that SQL expresses poorly: complex cleaning, statistics, machine learning, automation or custom charts. Many analysts pull data with SQL, then analyze it in Python or R. Whatever you use, keep code in version control, comment what is not obvious and avoid hard-coding values such as dates so the analysis can be rerun."
  ],
  terms: [
   ["SQL", "A declarative language for querying and managing data in relational databases."],
   ["pandas", "A Python library for working with tabular data in DataFrames."],
   ["R", "A programming language and environment designed for statistical computing and graphics."],
   ["Declarative language", "A language where you state the result you want rather than the steps to produce it."]
  ],
  example: "An analyst needs to forecast weekly demand. She writes a SQL query to aggregate two years of sales by week in the warehouse, loads the much smaller result into a Python notebook with pandas, fits and checks a forecasting model, and schedules the notebook to refresh weekly.",
  tip: "Querying and aggregating data where it lives points to SQL; automation and machine learning point to Python; heavy statistical analysis points to R. Expect to read short snippets and say what they do.",
  check: [
   ["Why is it usually better to aggregate a billion-row table in SQL than to load it into a notebook?", "The database engine is built to process data where it is stored; moving a billion rows to a local tool is slow and may not fit in memory."],
   ["Which Python library is used for DataFrame-based data cleaning and reshaping?", "pandas."]
  ]
 },
 {
  t: "AI and automation concepts for analysts: machine learning, generative AI, large language models, NLP and RPA",
  body: [
   "AI now touches everyday analytics work, and the DA0-002 objectives expect analysts to understand the main concepts well enough to use them sensibly and explain them to others.",
   "Machine learning (ML) means algorithms that learn patterns from data instead of following hand-written rules. In supervised learning, the training data has known answers (labels) and the model learns to predict them for new cases: classification predicts a category such as churn or no churn, and regression predicts a number such as next month's sales. In unsupervised learning there are no labels; the model finds structure, such as clustering customers into segments. Models are trained on one part of the data and tested on held-out data to check that they generalize rather than memorize (overfitting).",
   "Generative AI creates new content, such as text, images, code or audio, based on patterns learned from huge training datasets. A foundation model is a large model trained on broad data that can be adapted to many tasks. Large language models (LLMs) are foundation models for text: they predict likely next words and can draft summaries, explain results, write SQL or Python and answer questions. They can also produce confident, plausible-sounding output that is wrong, often called hallucination, so anything they produce must be checked. Never paste sensitive or regulated data into a tool unless your organization has approved it for that data.",
   "Natural language processing (NLP) is the broader field of getting computers to work with human language: sentiment analysis, entity extraction (names, places, products), topic classification, translation and speech-to-text. For analysts, NLP turns unstructured text, such as survey comments or support tickets, into structured fields you can count and chart.",
   "Robotic process automation (RPA) uses software bots to mimic the clicks and keystrokes a person makes in applications, following fixed rules: copying invoice values into an ERP screen, downloading a report each morning, moving files. It does not learn; it automates repetitive, predictable tasks, often where systems lack an API. RPA and AI are sometimes combined, for example NLP reading a document and a bot entering the extracted values.",
   "Whatever the tool, the analyst stays responsible for the result. Check model outputs against known figures, watch for bias in training data, and document how AI was used in an analysis."
  ],
  terms: [
   ["Supervised learning", "Machine learning trained on labeled examples to predict a label or value for new data."],
   ["Large language model (LLM)", "A foundation model trained on large amounts of text that generates and interprets language."],
   ["Natural language processing (NLP)", "Techniques that let computers analyze and generate human language, such as sentiment analysis."],
   ["Robotic process automation (RPA)", "Software bots that repeat rule-based user-interface tasks, such as data entry, without learning."]
  ],
  example: "A support manager wants to know what drives complaints. NLP tags 20,000 ticket comments by topic and sentiment, a supervised model predicts which open tickets are likely to escalate, and an RPA bot copies the weekly results into a legacy reporting system that has no API. The analyst spot-checks a sample of tags by hand before presenting the numbers.",
  tip: "Rule-based UI automation is RPA, not machine learning. Predicting a known label is supervised learning; finding groups with no labels is unsupervised. LLM output must always be validated.",
  check: [
   ["What is the difference between classification and clustering?", "Classification is supervised: it predicts known categories learned from labeled data. Clustering is unsupervised: it groups similar records without predefined labels."],
   ["Why must an analyst validate SQL written by an LLM?", "LLMs can generate plausible but incorrect code, such as a wrong join or filter, so results must be tested against known figures before use."]
  ]
 },
 {
  t: "Data acquisition methods: database extracts, APIs, web scraping, file exports, surveys and sampling",
  body: [
   "Before you can analyze data you have to get it, and the method you choose affects how fresh, complete, reliable and legal the data is. Data+ expects you to match a collection method to a scenario.",
   "Database extracts pull data directly from a source system's database with a query, often on a schedule. They are precise and repeatable, but they need access credentials, knowledge of the source schema and care not to overload a production system. Many teams extract from a read replica or during quiet hours for that reason.",
   "APIs (application programming interfaces) are the supported way for one program to request data from another. A typical web API uses HTTPS requests to endpoints and returns JSON. APIs usually require authentication with an API key or OAuth token, limit how many requests you can make (rate limits), and return large results in pages, so your code must loop through pagination. When a provider offers an API, prefer it over scraping: it is stable, documented and permitted.",
   "Web scraping extracts data from web pages by downloading the HTML and parsing out the values. It is useful when no API exists, but it is fragile, because a page redesign breaks the scraper, and it carries legal and ethical questions. Check the site's terms of use and robots.txt, collect only what you need, avoid personal data, and keep request rates gentle so you do not burden the server.",
   "File exports and shared files, such as CSV downloads from a SaaS tool, spreadsheets from a partner or files dropped on a secure file transfer server, are common and simple, but they are snapshots. Check when the file was produced, whether its layout changed, and whether it is complete. Manual exports are also hard to automate reliably.",
   "Surveys and observation collect primary data you generate yourself. Good surveys need clear, unbiased questions and a well-chosen sample. Sampling selects part of a population when measuring everyone is impractical. In a simple random sample, every member has an equal chance of selection. Stratified sampling divides the population into groups, such as regions, and samples randomly within each so every group is represented. Systematic sampling picks every nth item from a list. Cluster sampling randomly chooses whole groups, such as a few stores, and measures everyone in them. Convenience sampling uses whoever is easy to reach, which is quick but prone to bias. Sampling bias occurs when the sample does not represent the population, such as surveying only customers who opted in to email."
  ],
  terms: [
   ["API", "An interface that lets programs request data from a system in a documented, structured way, often over HTTPS returning JSON."],
   ["Web scraping", "Extracting data by downloading and parsing web pages, used when no API is available."],
   ["Stratified sampling", "Dividing a population into groups and randomly sampling within each group."],
   ["Sampling bias", "Systematic error when a sample does not represent the population it is meant to describe."]
  ],
  example: "A travel company wants competitor prices. One competitor publishes a partner API with an API key and rate limit, so the analyst uses it with pagination. Another has no API and its terms forbid automated collection, so the team buys a licensed data feed instead of scraping it.",
  tip: "If an API exists, it is almost always the preferred answer over scraping. For surveys, look for the sampling method that makes sure every subgroup is represented: stratified.",
  check: [
   ["Why is convenience sampling risky?", "People who are easy to reach may differ systematically from the population, so results can be biased and not generalizable."],
   ["An API returns 100 records per call and has 12,000 records. What must your code handle?", "Pagination: repeat requests for each page (using the page number, offset or next-page token) until all records are retrieved, while respecting rate limits."]
  ]
 },
 {
  t: "ETL vs ELT and data pipelines: batch vs streaming, full vs incremental loads",
  body: [
   "A data pipeline is the automated path data takes from its sources to where it is analyzed. Understanding pipeline patterns helps you explain why a dashboard is stale, why numbers changed and how to make loads faster.",
   "ETL stands for extract, transform, load. Data is extracted from sources, transformed in a separate processing layer (cleaned, standardized, joined, aggregated) and then loaded into the target, typically a data warehouse. ETL was the norm when warehouse compute was expensive, and it keeps only clean, conformed data in the target. It is also useful when sensitive fields must be removed or masked before data lands.",
   "ELT reverses the last two steps: extract, load the raw data into the target first, then transform it there using the target's own engine, usually SQL in a cloud warehouse or lakehouse. Because cloud platforms scale compute on demand, ELT is now common. It keeps the raw data available, so you can re-run or change transformations later without re-extracting.",
   "Batch processing moves data in chunks on a schedule: nightly, hourly or every fifteen minutes. It is simpler and cheaper, and it suits most reporting where yesterday's data is good enough. Streaming (real-time) processing handles each event as it arrives, from sources such as message queues, clickstreams or IoT sensors, giving results within seconds. Use streaming when the business must react immediately, such as fraud detection, live operations dashboards or alerts. It is more complex to build and run.",
   "A full load replaces the entire target table with a fresh copy of the source each run. It is simple and self-correcting, but slow and expensive for large tables. An incremental (delta) load processes only rows that are new or changed since the last run, identified by a last-modified timestamp, an increasing ID, or change data capture (CDC), which reads the database's change log. Incremental loads are much faster but need careful handling of updates and deletes, and a periodic full reload may be used to catch drift.",
   "Pipelines also need monitoring: row counts in and out, run duration, failures and data freshness. When a report looks wrong, checking whether the last pipeline run succeeded is one of the first troubleshooting steps."
  ],
  terms: [
   ["ETL", "Extract, transform, load: data is transformed in a separate layer before loading into the target."],
   ["ELT", "Extract, load, transform: raw data is loaded first and transformed inside the target system."],
   ["Incremental load", "A load that processes only new or changed records since the previous run."],
   ["Change data capture (CDC)", "A technique that identifies and delivers changes made in a source database, often from its transaction log."]
  ],
  example: "A retailer's nightly full reload of a 60-million-row order table started running into business hours. The team switched to an incremental load using each row's updated_at timestamp plus CDC for deletes, cutting the run from hours to minutes, and kept a weekly full reload as a safety check.",
  tip: "Transform before load is ETL; transform inside the warehouse after load is ELT. Seconds-level needs mean streaming. Only changed rows means incremental.",
  check: [
   ["What is one advantage of ELT over ETL in a cloud warehouse?", "Raw data is kept in the target, so transformations can be changed and re-run without re-extracting, and the warehouse's scalable compute does the work."],
   ["What is a risk of incremental loads that full loads avoid?", "Missing changes, especially deletes or rows whose timestamps were not updated, which can make the target drift from the source."]
  ]
 },
 {
  t: "Writing SQL queries: SELECT, WHERE, ORDER BY, GROUP BY and HAVING",
  body: [
   "SQL is the most important hands-on skill for Data+. You should be able to read a query, predict its result and spot mistakes. The core clauses are written in one order but processed in another, and that difference explains most errors.",
   "SELECT lists the columns or expressions you want, and FROM names the table. WHERE filters individual rows with conditions such as `amount > 100`, `region = 'West'`, `order_date BETWEEN '2025-01-01' AND '2025-03-31'`, `status IN ('Open','Pending')`, `name LIKE 'Sm%'` and `email IS NULL`. Remember that NULL means unknown: `= NULL` never matches, so you must use `IS NULL` or `IS NOT NULL`. DISTINCT removes duplicate result rows, and AS gives a column an alias.",
   "GROUP BY collapses rows that share values into one row per group, and aggregate functions summarize each group: COUNT, SUM, AVG, MIN and MAX. Every selected column must either be in the GROUP BY or be inside an aggregate. `COUNT(*)` counts rows, while `COUNT(column)` counts non-null values in that column, and `COUNT(DISTINCT column)` counts unique values.",
   "HAVING filters groups after aggregation, so it is where conditions on aggregates go. WHERE cannot use SUM or COUNT because it runs before grouping. ORDER BY sorts the final result, ascending by default or DESC for descending, and many databases let you add LIMIT (or TOP) to return only the first rows.",
   "```sql\nSELECT region, COUNT(*) AS orders, SUM(amount) AS revenue\nFROM orders\nWHERE order_date >= '2025-01-01'\nGROUP BY region\nHAVING SUM(amount) > 100000\nORDER BY revenue DESC;\n```",
   "The logical processing order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. That is why an alias defined in SELECT can usually be used in ORDER BY but not in WHERE. When a query returns something unexpected, walk through it in this order: which rows survive WHERE, how they are grouped, which groups survive HAVING, and how the result is sorted. You will also see CASE expressions, which work like if-then logic inside a query, for example `CASE WHEN amount >= 1000 THEN 'Large' ELSE 'Small' END`."
  ],
  terms: [
   ["WHERE", "A clause that filters individual rows before grouping."],
   ["GROUP BY", "A clause that combines rows with the same values into groups for aggregation."],
   ["HAVING", "A clause that filters groups after aggregation, allowing conditions on aggregate functions."],
   ["Aggregate function", "A function such as COUNT, SUM, AVG, MIN or MAX that summarizes many rows into one value."]
  ],
  example: "A sales manager asks for regions with more than 100,000 in revenue this year, largest first. The analyst's first draft put SUM(amount) > 100000 in the WHERE clause and got an error; moving that condition to HAVING after GROUP BY region returned the three qualifying regions in the right order.",
  tip: "Condition on a single row means WHERE; condition on a total, count or average means HAVING. NULL comparisons need IS NULL, never = NULL.",
  check: [
   ["What is the difference between COUNT(*) and COUNT(email)?", "COUNT(*) counts all rows; COUNT(email) counts only rows where email is not NULL."],
   ["Why can't you write WHERE AVG(score) > 80?", "WHERE is processed before grouping, when aggregates don't exist yet; use HAVING AVG(score) > 80 after GROUP BY."]
  ]
 },
 {
  t: "Combining data: inner, left, right and full joins, unions and appending",
  body: [
   "Real analysis almost always needs data from more than one table or file. You combine data sideways with joins, adding columns by matching keys, or stack it vertically with unions, adding rows. Choosing the wrong one is a leading cause of missing or inflated numbers.",
   "An INNER JOIN returns only rows that have a match in both tables. Joining Orders to Customers on CustomerID with an inner join drops any order whose customer is missing and any customer with no orders. A LEFT (outer) JOIN returns every row from the left table and the matching rows from the right; where there is no match, the right-side columns are NULL. It is the right choice for 'all customers, with their orders if any'. A RIGHT JOIN is the mirror image, keeping every row from the right table. A FULL OUTER JOIN keeps all rows from both sides, filling NULLs wherever there is no match, which is useful for reconciling two lists. A CROSS JOIN pairs every row with every row (a Cartesian product) and is rarely what you want by accident. A self join joins a table to itself, for example employees to their managers.",
   "```sql\nSELECT c.customer_id, c.name, COUNT(o.order_id) AS orders\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.customer_id\nGROUP BY c.customer_id, c.name;\n```",
   "Check the relationship before you join. If the key is unique on one side (one-to-many), row counts behave. If the lookup table has duplicate keys, each matching row is repeated, a fan-out, and sums are inflated. Compare row counts before and after every join, and reconcile totals against a trusted figure.",
   "A UNION stacks the results of two queries with the same number of columns and compatible types, and removes duplicate rows. UNION ALL stacks them and keeps duplicates, and it is faster because it skips the duplicate check. Appending in tools such as Power Query or pandas `concat` is the same idea: adding the rows of one dataset to another with matching columns, such as combining twelve monthly files into one table.",
   "A handy way to find unmatched records is a left join with a filter for NULL on the right side, for example customers with no orders: `WHERE o.order_id IS NULL`. This anti-join pattern shows up in data quality checks all the time."
  ],
  terms: [
   ["Inner join", "Returns only rows with matching keys in both tables."],
   ["Left join", "Returns all rows from the left table plus matches from the right, with NULLs where there is no match."],
   ["UNION ALL", "Stacks rows from two result sets with the same columns, keeping duplicates; UNION removes them."],
   ["Fan-out", "Row duplication caused by joining to a table with repeated key values, which inflates totals."]
  ],
  example: "A marketing analyst joins 10,000 campaign responses to a customer table and gets 10,400 rows. Checking for duplicate customer IDs in the lookup table reveals 400 customers with two records from a CRM migration. Deduplicating the lookup before joining brings the count back to 10,000 and fixes an overstated response revenue.",
  tip: "'Include records even with no match' means an outer join (usually LEFT). 'Stack files with the same columns' means UNION or append. If a join increases the row count unexpectedly, suspect duplicate keys.",
  check: [
   ["You need every product, including those that have never sold, with their total units sold. Which join?", "Products LEFT JOIN Sales on product ID, so unsold products appear with NULL (or zero after COALESCE) units."],
   ["When would you choose UNION instead of UNION ALL?", "When the combined result must not contain duplicate rows; otherwise UNION ALL is faster and keeps every row."]
  ]
 },
 {
  t: "Data quality problems: duplicates, missing values, invalid values, outliers, inconsistent formats and redundancy",
  body: [
   "Analysts often say most of their time goes into cleaning data. That is because raw data from real systems is messy, and conclusions drawn from dirty data are wrong no matter how good the analysis is. Data+ expects you to recognize each common problem and its usual fix.",
   "Duplicates are records that represent the same entity or event more than once. Exact duplicates, where every field matches, often come from loading the same file twice. Near-duplicates, such as 'Jon Smith' and 'John Smith' at the same address, come from manual entry or merging systems and need matching rules. Duplicates inflate counts and sums. Fix them by defining what makes a record unique, then removing or merging the extras.",
   "Missing values are blanks, NULLs or placeholders such as 'N/A', 0 or 9999 used to mean unknown. Placeholders are especially dangerous because they look like real values; a 0 age drags an average down. Find out why data is missing before deciding how to handle it.",
   "Invalid values break the rules a field should follow: an age of 212, a date of February 30, a negative quantity, a state code that does not exist, or letters in a phone number. Validation rules (type, range, allowed list, format) catch them. They usually come from entry errors or faulty integrations and should be corrected at the source where possible.",
   "Outliers are values far from the rest. Some are errors, such as an extra zero typed on a price, and some are real and important, such as a genuinely huge order. Detect them with methods such as the 1.5 × IQR rule, z-scores or simply a box plot, then investigate before removing anything.",
   "Inconsistent formats describe the same thing differently: 'CA', 'Calif.' and 'California'; dates as 03/04/2025 and 2025-04-03; mixed units such as pounds and kilograms; stray spaces and mixed capitalization. Standardize them with trimming, case conversion, lookup tables and unit conversion.",
   "Redundancy means the same data is stored in several places, such as a customer address in three systems. It wastes space and, worse, the copies drift apart, so reports disagree. Normalization within a database and master data management across systems address it. Truncated data is related: values cut off by a field-length limit, such as a 20-character name field chopping longer names."
  ],
  terms: [
   ["Duplicate record", "A record that represents the same entity or event as another record in the dataset."],
   ["Invalid value", "A value that breaks a field's rules for type, range, format or allowed values."],
   ["Outlier", "A value that lies far from most other values; it may be an error or a real extreme."],
   ["Redundancy", "Storing the same data in multiple places, which risks inconsistency between copies."]
  ],
  example: "A sales dataset shows 1,200 orders in a month the order system says had 1,150. Profiling reveals 50 exact duplicates from a file loaded twice, customer states written three different ways, and quantities of 9999 used as a placeholder for unknown. Removing the duplicates, standardizing states and converting 9999 to NULL makes the report match the source.",
  tip: "Know the fix that pairs with each problem: deduplicate duplicates, standardize inconsistent formats, validate invalid values, investigate outliers before removing them, and impute or flag missing values.",
  check: [
   ["Why are placeholder values such as 0 or 9999 more dangerous than blanks?", "They look like real numbers, so they are silently included in calculations and distort results, while blanks are usually excluded or noticed."],
   ["Should outliers always be deleted?", "No. Investigate first: remove or correct those that are errors, and keep real extreme values, perhaps analyzing them separately."]
  ]
 },
 {
  t: "Handling missing data: deletion, imputation and flagging",
  body: [
   "Missing data is almost unavoidable, and how you handle it can change your results. There is no single correct fix; the right choice depends on how much is missing, why it is missing and what the analysis is for.",
   "Start by asking why values are missing. If they are missing completely at random, such as a sensor that occasionally drops a reading, the remaining data is still representative. If missingness depends on something, such as high earners skipping the income question or a form field added only last month, simply ignoring the gaps can bias results. Measure how much is missing per column and per row, and check whether it clusters in particular groups or dates.",
   "Deletion is the simplest approach. Listwise deletion removes any row with a missing value in the fields you need. It is reasonable when only a small share of rows is affected and they are missing at random, but it shrinks the sample and can introduce bias. Pairwise deletion uses all available values for each calculation, so different statistics may be based on different rows. Dropping an entire column makes sense when most of it is empty and it is not essential.",
   "Imputation fills in missing values with estimates. Mean imputation is easy but is pulled by outliers and shrinks the variance. Median imputation is more robust for skewed data such as income. Mode imputation suits categorical fields. More advanced options include imputing within groups (the median for the same region), carrying the last observation forward in time series, interpolating between points, or predicting the value from other fields with a regression model. Every imputation invents data, so it can make relationships look stronger or weaker than they are.",
   "Flagging keeps a record of what you did. Add an indicator column such as `income_imputed = 1`, or keep the value missing and add a category like 'Unknown' for text fields. Flags let later users test whether imputed rows behave differently and exclude them if needed.",
   "```python\nmedian_income = df['income'].median()\ndf['income_imputed'] = df['income'].isna().astype(int)\ndf['income'] = df['income'].fillna(median_income)\n```",
   "Whatever you choose, document it in your methodology notes, apply it consistently and consider fixing the source so future data arrives complete."
  ],
  terms: [
   ["Listwise deletion", "Removing every record that has a missing value in any field used by the analysis."],
   ["Imputation", "Replacing missing values with estimated values such as the mean, median, mode or a model prediction."],
   ["Missing at random", "When the chance that a value is missing is unrelated to the missing value itself, so remaining data stays representative."],
   ["Imputation flag", "An indicator column that marks which values were filled in rather than observed."]
  ],
  example: "In a 50,000-response customer survey, 4% of respondents skipped the household income question. Deleting them would also remove their answers to twenty other questions, so the analyst imputes the median income within each region, adds an income_imputed flag, and reruns the key result without imputed rows to show the conclusion does not change.",
  tip: "For skewed numeric data such as income or house prices, median imputation beats mean imputation. Replacing blanks with zero is almost always wrong unless zero is the true value.",
  check: [
   ["Why can mean imputation be misleading?", "It is pulled by outliers and puts many identical values at the center, which understates variability and can weaken correlations."],
   ["When is deleting rows with missing values reasonable?", "When a small share of rows is affected, the data is missing at random, and the remaining sample is still large enough."]
  ]
 },
 {
  t: "Data transformation: parsing, splitting and concatenating fields, type conversion, recoding and derived variables",
  body: [
   "Transformation turns raw fields into the shape your analysis needs. Most of these operations are simple on their own, but you need to recognize them by name and choose the right one for a scenario.",
   "Parsing means reading a structured string and extracting its parts. Splitting is a common form: separating 'Smith, John' at the comma into last and first name, breaking an address into street, city and postal code, or pulling the domain out of an email address. Parsing also covers extracting fields from JSON or log lines, and reading a date out of text such as '2025-03-14T09:30:00Z'. String functions do the work: LEFT, RIGHT, SUBSTRING (MID), TRIM to remove extra spaces, UPPER and LOWER for case, REPLACE, and position functions that find a delimiter.",
   "Concatenation is the opposite: joining fields into one, such as first and last name into a full name, or year and month into a period key. In SQL you use `CONCAT(first_name, ' ', last_name)` or the `||` operator in many databases; spreadsheets have CONCAT and TEXTJOIN; pandas can add string columns together.",
   "Type conversion changes a field's data type so it behaves correctly: text to date so you can group by month, text to number so you can sum, or number to text for identifiers. Conversions can fail on bad values, so count failures rather than assuming success.",
   "Recoding maps existing values to new ones. You might map 'M', 'Male' and 'male' to a single code, collapse twenty detailed product types into five categories, or convert 'Y'/'N' into true and false. A lookup (mapping) table makes recoding transparent and easy to maintain.",
   "Derived variables, also called calculated fields or feature engineering, are new columns built from existing ones: order total as quantity times unit price, customer age from birth date, days to ship as ship date minus order date, profit margin as profit divided by revenue, or a flag such as is_weekend. Conditional logic creates categories, for example `CASE WHEN days_to_ship > 5 THEN 'Late' ELSE 'On time' END`.",
   "Keep transformations repeatable, in a script, query or Power Query steps rather than manual edits, so the same logic runs every time new data arrives, and keep the original field until you have verified the result."
  ],
  terms: [
   ["Parsing", "Extracting meaningful parts from a structured string or document, such as splitting a name at a comma."],
   ["Concatenation", "Joining two or more values into one string."],
   ["Recoding", "Mapping existing values to new, standardized or grouped values."],
   ["Derived variable", "A new field calculated from existing fields, such as profit margin or days to ship."]
  ],
  example: "A logistics analyst receives shipment data with a single 'City, ST ZIP' field and text timestamps. She parses the location into city, state and ZIP columns, converts the timestamps to datetime, derives days_in_transit from the ship and delivery dates, and recodes carrier names so 'UPS', 'U.P.S.' and 'ups ground' all become one value.",
  tip: "Split one field into several means parsing; join several into one means concatenation; create a new calculated column means a derived variable.",
  check: [
   ["A column holds full emails and you need the company domain. What transformation is this?", "Parsing: find the @ and extract the text after it, for example with SUBSTRING and a position function."],
   ["Why use a mapping table for recoding instead of editing values by hand?", "It documents the rules, is easy to update, and applies the same recoding consistently every time new data is processed."]
  ]
 },
 {
  t: "Scaling and grouping: normalization, standardization, binning and aggregation",
  body: [
   "Many analyses need values on a comparable scale or grouped into meaningful chunks. Four techniques come up repeatedly: normalization, standardization, binning and aggregation. Note that the word normalization also describes database design; here it means rescaling numbers.",
   "Min-max normalization rescales a numeric variable to a fixed range, usually 0 to 1, with the formula (x − min) ÷ (max − min). The smallest value becomes 0 and the largest becomes 1. It is useful when variables with very different ranges, such as income in dollars and age in years, feed an algorithm that compares distances, such as clustering, or when you want to build a simple index. It is sensitive to outliers: one extreme maximum squeezes every other value toward 0.",
   "Standardization converts values to z-scores with the formula (x − mean) ÷ standard deviation. The result has a mean of 0 and a standard deviation of 1, and each value tells you how many standard deviations it is from the mean. Values are not bounded to a range. Standardization is common before many statistical and machine learning methods and for comparing scores measured on different scales, such as two different tests.",
   "Binning (discretization) groups continuous values into ranges or categories: ages into 18–24, 25–34 and so on, order values into small, medium and large, or delivery days into on time and late. Equal-width bins have the same range size; equal-frequency (quantile) bins hold roughly the same number of records each, such as quartiles. Binning makes charts and tables easier to read and can reduce noise, but it throws away detail, and poorly chosen boundaries can hide patterns.",
   "Aggregation summarizes many rows into fewer with functions such as SUM, COUNT, AVG, MIN and MAX, typically grouped by one or more dimensions: daily transactions rolled up to monthly revenue by region. Aggregation reduces data volume and speeds up reports, but you cannot drill back down to detail from an aggregate table, and averaging averages is a classic mistake. The average of store averages is not the overall average unless every store has the same number of transactions; recompute from totals instead.",
   "Choose based on purpose. Comparable scales for algorithms point to normalization or standardization; readable groups for reporting point to binning; summaries at a higher level point to aggregation."
  ],
  terms: [
   ["Min-max normalization", "Rescaling values to a fixed range, usually 0 to 1, using the minimum and maximum."],
   ["Standardization", "Converting values to z-scores with mean 0 and standard deviation 1."],
   ["Binning", "Grouping continuous values into ranges or categories."],
   ["Aggregation", "Summarizing detailed rows into totals or statistics at a higher level, such as monthly by region."]
  ],
  example: "A bank segments customers by balance, age and number of products. Because balances run into the hundreds of thousands while product counts run from 1 to 6, the analyst standardizes all three before clustering. For the executive report, she bins ages into life-stage bands and aggregates balances by segment and month.",
  tip: "0-to-1 range means min-max normalization; mean 0 and standard deviation 1 means standardization. Don't average averages; aggregate from the underlying totals.",
  check: [
   ["A value of 70 in a range from 20 to 120: what is its min-max normalized value?", "(70 − 20) ÷ (120 − 20) = 0.5."],
   ["Two stores average 10 and 20 per sale, with 900 and 100 sales. Is the overall average 15?", "No. Total revenue is 9,000 + 2,000 = 11,000 over 1,000 sales, so the overall average is 11. Averaging the averages ignores the different counts."]
  ]
 },
 {
  t: "Reshaping data: pivoting and unpivoting, wide vs long format, filtering and sorting",
  body: [
   "The same data can be laid out in different shapes, and tools expect particular shapes. Knowing how to reshape data, and which shape a task needs, saves a lot of frustration.",
   "In wide format, each subject has one row and repeated measurements are spread across columns: a product row with columns Jan, Feb, Mar and so on. Wide data is easy for people to read and is how many spreadsheets and reports are laid out. In long (tidy) format, each row is one observation: product, month, sales. Long data has fewer columns and more rows, and it is what databases, BI tools and most analysis libraries prefer, because adding a new month adds rows, not columns, and you can filter and group on the month field.",
   "Pivoting turns long data into wide data: unique values from one column become new column headers, and an aggregate fills the cells. A spreadsheet pivot table does this interactively, with row fields, column fields and a values field that is summed, counted or averaged. In SQL you can pivot with conditional aggregation, such as `SUM(CASE WHEN month = 'Jan' THEN sales END) AS jan`, and pandas has `pivot_table`.",
   "Unpivoting (melting) turns wide data into long data: several columns collapse into an attribute column holding the old header names and a value column holding their values. Power Query has an Unpivot Columns command, and pandas has `melt`. When you receive a spreadsheet with one column per month and need to chart trends in a BI tool, unpivoting is usually the first step. Transposing is different: it swaps all rows and columns, like rotating a table, and is rarely what an analysis needs.",
   "Filtering keeps only the rows that meet conditions, such as a date range, one region or excluding test accounts. Filter early to reduce the data you process, and be clear about what you excluded, because a filter left on is a common reason a report's totals do not match. Sorting orders rows by one or more columns, ascending or descending. It helps people read results, find the top or bottom values, and spot problems such as negative quantities or blank names at the top of a sorted list. Sorting does not change the data itself, but some tools' 'sort this column only' option can scramble rows, so always sort whole records."
  ],
  terms: [
   ["Wide format", "A layout with one row per subject and repeated measures spread across columns."],
   ["Long (tidy) format", "A layout with one row per observation, using attribute and value columns."],
   ["Pivot", "Reshaping long data to wide, turning row values into column headers with aggregated cells."],
   ["Unpivot (melt)", "Reshaping wide data to long, turning column headers into values of a new attribute column."]
  ],
  example: "Finance sends a budget workbook with departments as rows and twelve month columns. To compare budget with actuals in the BI tool, which stores actuals as department, date and amount, the analyst unpivots the budget into department, month and budget amount, then joins it to actuals on department and month.",
  tip: "Columns-to-rows is unpivot; rows-to-columns is pivot. BI tools and databases generally want long format.",
  check: [
   ["Why is long format easier to maintain when new months of data arrive?", "A new month adds rows with the same columns, so queries, joins and visuals keep working; wide format would need a new column and changes to everything that references columns."],
   ["What does a pivot table's values field do?", "It aggregates (sums, counts or averages) the data for each combination of row and column fields."]
  ]
 },
 {
  t: "Query optimization: indexing, filtering early, avoiding SELECT *, subsets and temporary tables",
  body: [
   "A query that returns the right answer too slowly is still a problem. Slow queries hold up reports, compete with other users and, in cloud warehouses that bill by data scanned or compute time, cost money. Data+ expects you to know the common ways to make queries faster.",
   "An index is a separate data structure, much like a book's index, that lets the database find rows matching a value without scanning the whole table. Indexes help most on columns used in WHERE filters, JOIN conditions and ORDER BY, especially when the query selects a small fraction of rows. They are not free: they take storage and slow down inserts and updates, because the index must be maintained too. Wrapping an indexed column in a function, such as `WHERE YEAR(order_date) = 2025`, can stop the database from using the index; `WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01'` can use it.",
   "Filter early and filter in the database. Apply WHERE conditions as soon as possible, including inside subqueries and before joins, so fewer rows flow into the expensive steps. Pulling millions of rows into a BI tool or spreadsheet to filter them there moves far more data than necessary.",
   "Avoid SELECT *. Selecting every column reads and transfers data you do not need. In columnar warehouses, where cost and speed depend on which columns are scanned, this matters a great deal. Listing columns also protects reports from breaking when someone adds or reorders columns in the table.",
   "Work with subsets while developing. Test logic on a sample or a narrow date range, using LIMIT or a filtered extract, then run the full query once it is correct. Partitioned tables, for example partitioned by date, let the engine skip whole partitions when you filter on the partition column.",
   "Temporary tables and common table expressions (CTEs, written with WITH) break a complex query into readable steps. A temporary table stores an intermediate result, such as this quarter's filtered orders, so later steps can reuse it instead of recalculating, and some databases let you index it. CTEs mainly improve readability. Most databases can also show an execution plan, through EXPLAIN or a similar command, that reveals full table scans, missing indexes and expensive joins."
  ],
  terms: [
   ["Index", "A data structure that speeds up finding rows by a column's values, at the cost of storage and slower writes."],
   ["Execution plan", "The database's description of how it will run a query, including scans, joins and index use."],
   ["Temporary table", "A table that holds an intermediate result for the current session so later steps can reuse it."],
   ["Common table expression (CTE)", "A named subquery defined with WITH that makes complex queries easier to read."]
  ],
  example: "A daily report query took eight minutes. Its execution plan showed a full scan of a 300-million-row orders table because the filter used YEAR(order_date). Rewriting the filter as a date range that could use the index on order_date, listing only the six needed columns, and staging the filtered rows in a temporary table cut the runtime to under thirty seconds.",
  tip: "Index the columns you filter and join on, filter as early as possible, and name only the columns you need. Filtering after data reaches the BI tool is the slow answer.",
  check: [
   ["Why can too many indexes hurt a transactional database?", "Every insert, update and delete must also update each index, which slows writes and uses storage."],
   ["How does avoiding SELECT * reduce cost in a columnar cloud warehouse?", "Columnar engines scan only the columns referenced, so naming fewer columns reduces the data read, which drives both speed and scan-based cost."]
  ]
 },
 {
  t: "Measures of central tendency: mean, median and mode, and how skew affects them",
  body: [
   "When someone asks what a typical value is, they are asking for a measure of central tendency. The three you must know are the mean, the median and the mode, and the exam often tests which one fits a given situation.",
   "The mean (arithmetic average) is the sum of the values divided by how many there are. For 3, 5, 5, 8 and 9 the sum is 30 and the mean is 6. The mean uses every value, which makes it efficient for symmetric data, but it is sensitive to outliers: one executive salary of 2 million in a team of twenty can raise the mean far above what anyone typically earns. A weighted mean gives some values more influence, for example averaging prices weighted by units sold.",
   "The median is the middle value when the data is sorted. With an odd count it is the center value; with an even count it is the average of the two center values. For 3, 5, 5, 8, 9 the median is 5; for 3, 5, 8, 9 it is (5 + 8) ÷ 2 = 6.5. Because it depends only on position, the median barely moves when an extreme value is added, which makes it the preferred summary for skewed data such as income, house prices and response times.",
   "The mode is the most frequent value. It is the only measure that works for categorical data, such as the most common product category or payment method. A dataset can have no mode, one mode or several (bimodal or multimodal). For continuous data with many unique values, the mode is less useful unless you bin the data first.",
   "Skew describes asymmetry. In a right-skewed (positively skewed) distribution there is a long tail of high values; the mean is pulled toward the tail, so typically mean > median > mode. Income and time-to-resolve tickets are usually right-skewed. In a left-skewed distribution the tail is on the low side, and the mean usually falls below the median. In a symmetric distribution such as the normal distribution, the mean, median and mode are about equal.",
   "A practical habit: calculate both mean and median. If they are close, the data is roughly symmetric; if the mean is well above the median, look for right skew or outliers, and report the median when describing what is typical. In spreadsheets the functions are AVERAGE, MEDIAN and MODE; in SQL, AVG is standard, while median functions vary by database."
  ],
  terms: [
   ["Mean", "The sum of values divided by their count; sensitive to outliers."],
   ["Median", "The middle value of sorted data; robust to outliers and skew."],
   ["Mode", "The most frequent value; the only central measure for categorical data."],
   ["Right skew", "A distribution with a long tail of high values, where the mean is usually greater than the median."]
  ],
  example: "An HR analyst reports that average pay at a 40-person startup is 142,000, which surprises staff. The median is 78,000; two founders' large salaries pull the mean up. The revised report gives the median as the typical salary and notes the mean and the skew.",
  tip: "Skewed data or outliers mean choose the median. Categorical data means the mode. Right skew means mean greater than median.",
  check: [
   ["What is the median of 4, 7, 1, 10?", "Sort to 1, 4, 7, 10; the two middle values are 4 and 7, so the median is 5.5."],
   ["Which measure would you use to report the most popular shoe size sold?", "The mode, because it identifies the most frequent value; averaging sizes might give a size nobody bought."]
  ]
 },
 {
  t: "Measures of dispersion: range, variance, standard deviation, interquartile range and percentiles",
  body: [
   "Two datasets can have the same average and look completely different. Measures of dispersion describe how spread out values are, which tells you how consistent a process is and how much to trust the average.",
   "The range is the maximum minus the minimum. It is quick to calculate but depends entirely on the two most extreme values, so a single outlier can make it misleading.",
   "Variance measures the average squared distance of each value from the mean. Squaring makes all distances positive and emphasizes large deviations. The standard deviation is the square root of the variance, which puts it back in the original units: if delivery times have a standard deviation of 2 days, a typical delivery is about 2 days from the average. A small standard deviation means values cluster tightly around the mean; a large one means they vary widely. There are two versions. Population formulas divide by N and describe an entire population; sample formulas divide by n − 1 and estimate the population's spread from a sample. In spreadsheets, STDEV.P and VAR.P are population versions and STDEV.S and VAR.S are sample versions, and most real analysis works with samples.",
   "Percentiles tell you the value below which a given percentage of the data falls. The 90th percentile of page load time is the time that 90% of loads beat. Quartiles are the 25th (Q1), 50th (Q2, the median) and 75th (Q3) percentiles. The interquartile range (IQR) is Q3 − Q1, the spread of the middle half of the data. Like the median, it ignores extremes, so it is the robust choice for skewed data.",
   "The IQR also gives a standard outlier rule. Values below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR are flagged as potential outliers. If Q1 is 20 and Q3 is 50, the IQR is 30, 1.5 × IQR is 45, and the fences are −25 and 95. These fences are exactly what the whiskers of a box plot typically show.",
   "The coefficient of variation (standard deviation divided by the mean) compares variability between datasets with different units or scales. When reporting, pair each center with a matching spread: mean with standard deviation for symmetric data, and median with IQR for skewed data."
  ],
  terms: [
   ["Standard deviation", "The square root of the variance; the typical distance of values from the mean, in the data's own units."],
   ["Variance", "The average of squared deviations from the mean."],
   ["Interquartile range (IQR)", "Q3 minus Q1: the spread of the middle 50% of the data."],
   ["Percentile", "The value below which a stated percentage of observations fall."]
  ],
  example: "Two suppliers both deliver in 5 days on average. Supplier A's standard deviation is half a day, while Supplier B's is 3 days, with some orders arriving in 1 day and others in 12. The operations team chooses A because predictable deliveries let them hold less safety stock.",
  tip: "Memorize the IQR outlier fences: Q1 − 1.5 × IQR and Q3 + 1.5 × IQR. Sample standard deviation divides by n − 1; population divides by N.",
  check: [
   ["Why is the IQR more robust than the range?", "It measures the middle 50% of values, so extreme values at either end do not affect it, while the range depends entirely on them."],
   ["What does a 95th percentile response time of 800 ms mean?", "95% of responses were 800 ms or faster; 5% were slower."]
  ]
 },
 {
  t: "Distributions: normal distribution, skewness, the empirical rule and z-scores",
  body: [
   "A distribution describes how often each value, or range of values, occurs. Looking at a distribution with a histogram or box plot, before calculating anything, tells you which statistics and methods are appropriate.",
   "The normal distribution is the symmetric, bell-shaped curve centered on its mean. Many natural measurements are approximately normal, such as heights, measurement errors and test scores in large groups. In a normal distribution the mean, median and mode are equal, and the spread is fully described by the standard deviation. Averages of large samples also tend to be approximately normal even when the underlying data is not, a result called the central limit theorem, which is why normal-based methods are so widely used.",
   "The empirical rule, also called the 68-95-99.7 rule, describes a normal distribution: about 68% of values fall within one standard deviation of the mean, about 95% within two, and about 99.7% within three. If exam scores are normal with mean 70 and standard deviation 5, about 68% of students scored between 65 and 75 and about 95% between 60 and 80. A value more than three standard deviations away is rare and worth investigating.",
   "A z-score (standard score) expresses how many standard deviations a value is from the mean: z = (x − mean) ÷ standard deviation. A score of 80 with mean 70 and standard deviation 5 has z = 2. Positive z is above the mean, negative is below. Z-scores let you compare values on different scales, such as a student's result on two different tests, and they give a simple outlier rule: flag values where the absolute z is greater than 3, or 2 for a looser screen.",
   "Skewness measures asymmetry. Right (positive) skew has a long tail of high values, such as incomes or claim amounts. Left (negative) skew has a long tail of low values, such as exam scores on an easy test where most students score high. The empirical rule and z-score outlier rules assume rough normality, so they are less reliable for heavily skewed data; the IQR rule is safer there. Other shapes you may see include uniform, where all values are equally likely, and bimodal, with two peaks, which often means two different groups are mixed together.",
   "Always plot first. A histogram can reveal skew, multiple peaks, gaps and impossible values that summary numbers hide."
  ],
  terms: [
   ["Normal distribution", "A symmetric bell-shaped distribution where mean, median and mode are equal."],
   ["Empirical rule", "In a normal distribution, about 68%, 95% and 99.7% of values fall within 1, 2 and 3 standard deviations of the mean."],
   ["Z-score", "The number of standard deviations a value lies from the mean: (x − mean) ÷ SD."],
   ["Bimodal distribution", "A distribution with two peaks, often indicating two mixed groups."]
  ],
  example: "A manufacturer's bolt lengths are approximately normal with mean 50.0 mm and standard deviation 0.2 mm. A bolt measured at 50.7 mm has a z-score of 3.5, beyond the three-standard-deviation range that should contain about 99.7% of bolts, so quality control pulls the batch for inspection.",
  tip: "Know 68-95-99.7 and z = (x − mean) ÷ SD cold. A two-peaked histogram suggests two populations that should be analyzed separately.",
  check: [
   ["Heights are normal with mean 170 cm and SD 10 cm. About what share of people are between 150 and 190 cm?", "About 95%, because 150 and 190 are two standard deviations below and above the mean."],
   ["What is the z-score of 55 when the mean is 70 and SD is 5?", "(55 − 70) ÷ 5 = −3, three standard deviations below the mean."]
  ]
 },
 {
  t: "Descriptive statistics in practice: counts, frequencies, percentages, percent change and ratios",
  body: [
   "Most everyday analysis relies on simple descriptive statistics: how many, how often, what share, and how much things changed. They are easy to calculate and surprisingly easy to get wrong, so the exam checks that you use them correctly.",
   "Counts are the number of records or events: orders placed, tickets opened, customers who churned. Be clear about what is being counted. Counting rows is not the same as counting distinct customers, and a report of 1,000 orders may involve only 600 customers. A frequency distribution counts how often each value or category occurs, and relative frequency divides by the total to give a proportion. Cumulative frequency adds the counts up to each value, answering questions such as how many orders shipped within three days.",
   "A percentage is a part divided by the whole, times 100. Always check the denominator: 30 complaints out of 1,000 orders is 3%, but out of 100 orders it is 30%. Percentages of small groups swing wildly, so report the counts alongside them.",
   "Percent change measures relative change over time: (new − old) ÷ old × 100. Sales rising from 80,000 to 92,000 is a 15% increase. A common mistake is dividing by the new value, which gives about 13%. Another is confusing percent change with percentage-point change: a conversion rate going from 4% to 5% is a 1 percentage-point increase but a 25% relative increase. Changes are not symmetric either: a 50% drop followed by a 50% rise leaves you at 75% of where you started.",
   "Ratios compare two quantities: 3 support agents per 1,000 customers, a debt-to-equity ratio, or a current ratio. Rates are ratios over time or exposure, such as 12 defects per 10,000 units or revenue per user per month. Normalizing by a base like this lets you compare groups of different sizes fairly: a large region will always have more sales in total, so compare revenue per store or per customer instead.",
   "Other common descriptive measures include the running (cumulative) total, the year-to-date figure, the moving average that smooths short-term noise, and the compound annual growth rate for multi-year growth. Whatever you report, label the period, the population and the base clearly so readers can interpret it."
  ],
  terms: [
   ["Frequency distribution", "A table or chart showing how often each value or category occurs."],
   ["Percent change", "(new − old) ÷ old × 100: the relative change from the earlier value."],
   ["Percentage point", "The arithmetic difference between two percentages, such as 4% to 5% being 1 point."],
   ["Ratio", "A comparison of two quantities, such as agents per 1,000 customers."]
  ],
  example: "A regional manager says the North region is best because it has the most sales. The analyst shows sales per store instead: North has 40 stores and 8 million in sales (200,000 per store), while West has 15 stores and 4.5 million (300,000 per store). Normalizing by store count reverses the conclusion.",
  tip: "Percent change always divides by the old value. Distinguish percentage points from percent. Compare groups of different sizes with ratios or rates, not raw totals.",
  check: [
   ["A price drops from 50 to 40. What is the percent change?", "(40 − 50) ÷ 50 = −20%, a 20% decrease."],
   ["An email open rate goes from 20% to 25%. Describe the change two ways.", "A 5 percentage-point increase, which is a 25% relative increase (5 ÷ 20)."]
  ]
 },
 {
  t: "Inferential statistics: samples vs populations, confidence intervals, hypothesis testing and p-values",
  body: [
   "Descriptive statistics summarize the data you have. Inferential statistics use a sample to draw conclusions about a larger population, with a measure of how uncertain those conclusions are. Data+ expects you to understand the ideas and interpret results, not to derive formulas.",
   "A population is the entire group you care about, such as all customers. A sample is the subset you actually measure. A parameter is a true population value, such as the true average spend, and a statistic is the value calculated from a sample, which estimates the parameter. Different samples give slightly different statistics; this sampling variability is why we need inference. A random, representative sample is essential, because no statistical method can fix a biased sample.",
   "A confidence interval gives a range of plausible values for a parameter. A 95% confidence interval for average spend of 48 to 52 means the method used produces intervals that capture the true mean about 95% of the time. The interval narrows when the sample is larger or the data is less variable, and widens when you ask for more confidence, such as 99%. The margin of error is half the interval's width, as in poll results reported plus or minus 3 points.",
   "Hypothesis testing is a formal way to decide whether an observed effect is likely real. You state a null hypothesis (H0) of no effect or no difference, such as 'the new page does not change conversion', and an alternative hypothesis (H1) that there is an effect. You choose a significance level, alpha, often 0.05, before looking at results. You then collect data, run an appropriate test, such as a t-test to compare means or a chi-square test for categorical counts, and get a p-value.",
   "The p-value is the probability of seeing a result at least as extreme as the one observed if the null hypothesis were true. If p is less than alpha, you reject the null hypothesis and call the result statistically significant. If p is greater than or equal to alpha, you fail to reject it; you never prove the null true. The p-value is not the probability that the null is true, and it says nothing about how large or important the effect is. A tiny, meaningless difference can be significant in a huge sample, so always report the effect size, such as the actual difference in conversion rate, and a confidence interval alongside the p-value.",
   "A/B tests in marketing and product work are the most common place analysts meet hypothesis testing: users are randomly split between two versions and the outcomes are compared."
  ],
  terms: [
   ["Population vs sample", "The whole group of interest versus the subset actually measured to estimate it."],
   ["Confidence interval", "A range, computed from a sample, that is likely to contain the true population value at a stated confidence level."],
   ["Null hypothesis", "The default claim of no effect or no difference that a test tries to find evidence against."],
   ["p-value", "The probability of results at least as extreme as observed, assuming the null hypothesis is true."]
  ],
  example: "An online store tests a new checkout page on a random half of visitors. The new page converts at 5.4% versus 5.0%, with p = 0.02 at alpha 0.05. The analyst reports a statistically significant 0.4 percentage-point lift, gives the 95% confidence interval for the difference, and notes that the effect is modest but positive.",
  tip: "p < alpha means reject the null hypothesis; otherwise fail to reject it, never 'accept' or 'prove' it. Larger samples mean narrower confidence intervals.",
  check: [
   ["A test gives p = 0.12 with alpha 0.05. What do you conclude?", "Fail to reject the null hypothesis; the data does not provide enough evidence of an effect at the 5% level."],
   ["What two changes make a confidence interval narrower?", "A larger sample size, or a lower confidence level (for example 90% instead of 95%). Less variable data also narrows it."]
  ]
 },
 {
  t: "Type I and Type II errors, statistical significance and sample size",
  body: [
   "Every hypothesis test can reach the wrong conclusion, because it works from a sample rather than the whole population. Understanding the two kinds of error, and how sample size affects them, helps you design sensible tests and explain results honestly.",
   "A Type I error is a false positive: you reject the null hypothesis when it is actually true. You conclude that the new training program improves sales, or that a drug works, when in reality it has no effect. The probability of a Type I error is alpha, the significance level you choose. With alpha = 0.05 you accept a 5% chance of a false positive when there is truly no effect.",
   "A Type II error is a false negative: you fail to reject the null hypothesis when it is actually false. A real improvement exists but your test misses it. Its probability is called beta. Statistical power, 1 − beta, is the probability of detecting an effect that really exists; many studies aim for a power of 80%.",
   "The two errors trade off. Lowering alpha from 0.05 to 0.01 makes false positives less likely but, with everything else unchanged, makes false negatives more likely. Choose based on which mistake is worse. In fraud screening, missing real fraud (Type II) may be worse than investigating some legitimate transactions (Type I). In a drug approval, approving an ineffective drug (Type I) is the serious error.",
   "Sample size is the main lever that reduces both errors at once. Larger samples reduce the standard error, so estimates are more precise, confidence intervals are narrower and the test has more power to detect a given effect. Small samples are noisy: they often miss real effects and can produce dramatic-looking results by chance. Before running an A/B test, analysts do a power analysis to estimate how many observations are needed to detect the smallest effect that would matter to the business.",
   "Two cautions about significance. First, statistical significance is not practical significance: with millions of users, a 0.01% difference can have a tiny p-value but not be worth acting on. Second, running many tests inflates false positives. Test twenty unrelated metrics at alpha 0.05 and you should expect about one significant result by chance alone. Checking results repeatedly and stopping as soon as p dips below 0.05 has the same effect. Decide the metric, sample size and stopping rule in advance."
  ],
  terms: [
   ["Type I error", "A false positive: rejecting a null hypothesis that is actually true; its probability is alpha."],
   ["Type II error", "A false negative: failing to reject a null hypothesis that is actually false; its probability is beta."],
   ["Statistical power", "The probability (1 − beta) that a test detects an effect that really exists."],
   ["Practical significance", "Whether an effect is large enough to matter in the real world, separate from its p-value."]
  ],
  example: "A product team ran a one-week A/B test on 400 users and found no significant difference, then nearly abandoned a promising feature. A power analysis showed they needed about 8,000 users to reliably detect the 1-point lift they cared about. Rerun at that size, the test found a significant and worthwhile improvement; the first result had been a likely Type II error.",
  tip: "False positive is Type I (alpha); false negative is Type II (beta). Bigger samples raise power and reduce both kinds of error.",
  check: [
   ["A spam filter lets a phishing email through because it judges it legitimate. Treating 'legitimate' as the null hypothesis, which error type is this?", "A Type II error (false negative): the filter failed to reject 'legitimate' when the email was actually malicious."],
   ["Why does testing many metrics at once increase the risk of misleading findings?", "Each test has an alpha chance of a false positive, so across many tests some significant results are expected purely by chance."]
  ]
 },
 {
  t: "Correlation vs causation, and simple linear regression",
  body: [
   "Analysts constantly look for relationships between variables: does advertising relate to sales, does price relate to demand? Correlation and regression quantify those relationships, and knowing their limits is just as important as calculating them.",
   "The Pearson correlation coefficient, r, measures the strength and direction of a linear relationship between two numeric variables. It ranges from −1 to +1. Positive values mean both variables tend to rise together; negative values mean one tends to fall as the other rises; values near 0 mean no linear relationship. As a rough guide, magnitudes above about 0.7 are often called strong and below about 0.3 weak, though the thresholds depend on the field. Correlation only captures linear patterns: a strong curved relationship can have r near 0. It is also sensitive to outliers, so always look at a scatter plot, and r itself is not a percentage.",
   "Correlation does not prove causation. Two variables can move together because of a confounding (lurking) variable that drives both, such as hot weather increasing both ice cream sales and swimming accidents; because of reverse causation, where the effect actually drives the supposed cause; or purely by coincidence, especially when you search many variables. Establishing cause usually needs a controlled experiment, such as a randomized A/B test, or careful study designs that account for confounders.",
   "Simple linear regression fits the straight line that best predicts one variable (the dependent or response variable, y) from another (the independent or explanatory variable, x): y = intercept + slope × x. The slope says how much y changes, on average, for a one-unit increase in x; the intercept is the predicted y when x is 0. With sales = 200 + 15 × ad_spend, each extra unit of ad spend is associated with 15 more units of sales, and ad spend of 10 predicts 200 + 150 = 350. The line is usually fitted by least squares, which minimizes the sum of squared residuals, the differences between actual and predicted values.",
   "R-squared (the coefficient of determination) is the share of the variation in y that the model explains, from 0 to 1. For simple linear regression it equals r squared, so r = 0.8 gives R² = 0.64. Be careful extrapolating beyond the range of x in your data, because the relationship may not hold there. Multiple regression extends the idea to several explanatory variables."
  ],
  terms: [
   ["Correlation coefficient (r)", "A value from −1 to +1 that measures the strength and direction of a linear relationship."],
   ["Confounding variable", "A third variable that influences both variables being studied, creating a misleading association."],
   ["Slope", "In regression, the average change in y for a one-unit increase in x."],
   ["R-squared", "The proportion of variation in the dependent variable explained by the model."]
  ],
  example: "A retailer finds a correlation of 0.75 between the number of staff on shift and sales per hour, and a manager proposes adding staff to raise sales. The analyst points out that stores already schedule more staff for busy periods, so busy periods likely drive both. A controlled test in a few stores is proposed before any staffing change.",
  tip: "r is between −1 and 1, and the sign gives direction. Correlation is never proof of causation on the exam. Plug numbers into the regression equation carefully: multiply the slope by x, then add the intercept.",
  check: [
   ["With the model cost = 50 + 4 × units, what is the predicted cost for 25 units?", "50 + 4 × 25 = 150."],
   ["Why might two variables have r close to 0 but still be strongly related?", "The relationship may be non-linear, such as a U-shape, which Pearson's r does not capture."]
  ]
 },
 {
  t: "Types of analysis: exploratory, descriptive, diagnostic, predictive, prescriptive and trend analysis",
  body: [
   "Analytics work is often described by the question it answers. Recognizing the type of analysis a stakeholder is asking for helps you choose the right methods and set expectations about effort and certainty.",
   "Exploratory data analysis (EDA) is the open-ended first pass over a dataset: profiling columns, plotting distributions, checking relationships and spotting missing values and anomalies. You are not testing a specific claim yet; you are learning what the data contains and forming questions and hypotheses. EDA also catches data quality problems before they reach a report.",
   "Descriptive analysis answers 'what happened?' It summarizes past data with counts, totals, averages, percentages and charts: revenue by month, tickets closed last week, top ten products. Most dashboards and recurring reports are descriptive.",
   "Diagnostic analysis answers 'why did it happen?' It drills down, segments and compares to find causes: returns spiked in March, so you break returns down by product, region, reason code and supplier, and discover one supplier's batch was defective. Techniques include drill-down, correlation analysis and comparing against baselines.",
   "Predictive analysis answers 'what is likely to happen?' It uses historical patterns to forecast or score the future: next quarter's demand, the probability that each customer churns, expected call volume by hour. Methods range from trend lines and time-series forecasting to machine learning models. Predictions come with uncertainty and should be monitored against what actually happens.",
   "Prescriptive analysis answers 'what should we do?' It recommends actions, often by combining predictions with optimization, rules or simulation: the reorder quantity that minimizes cost without stockouts, the best discount to offer each customer, or staffing levels for each shift. It builds on the other types and is usually the most complex.",
   "Trend analysis looks at how a measure changes over time to identify direction, seasonality and cycles, for example comparing month over month and year over year, or smoothing with moving averages. Year-over-year comparisons are useful for seasonal businesses because they compare like periods. Related terms include performance analysis against targets, link or network analysis of relationships, and cohort analysis, which follows groups that share a start date over time.",
   "A mature analytics team uses all of these in sequence: explore the data, describe what happened, diagnose why, predict what is next and prescribe what to do."
  ],
  terms: [
   ["Exploratory data analysis", "Initial, open-ended investigation of data to understand its structure, quality and patterns."],
   ["Diagnostic analysis", "Analysis that explains why an outcome occurred, often by drilling down and segmenting."],
   ["Predictive analysis", "Analysis that uses historical data to forecast future outcomes or probabilities."],
   ["Prescriptive analysis", "Analysis that recommends the best action, often using optimization or simulation."]
  ],
  example: "A subscription business asks four questions about churn in one meeting: how many customers left last quarter (descriptive), why cancellations rose among annual plans (diagnostic), which current customers are likely to leave next month (predictive), and which retention offer to give each at-risk customer (prescriptive).",
  tip: "Map the question word: what happened is descriptive, why is diagnostic, what will happen is predictive, what should we do is prescriptive. Open-ended profiling of new data is exploratory.",
  check: [
   ["A manager asks for a forecast of next month's call volume by hour. Which analysis type?", "Predictive, because it estimates a future outcome from historical patterns."],
   ["Why are year-over-year comparisons useful for a retailer?", "They compare the same season in each year, so seasonal peaks like holidays don't get mistaken for real growth or decline."]
  ]
 },
 {
  t: "Performance analysis: KPIs, metrics, targets and variance to plan",
  body: [
   "Much of an analyst's job is telling the business how it is performing against its goals. That means choosing the right measures, comparing them with targets and explaining the gaps.",
   "A metric is any quantitative measure: page views, tickets closed, average handle time. A key performance indicator (KPI) is a metric the organization has chosen because it reflects progress toward a strategic objective, and it comes with a target. Revenue growth, customer retention rate, on-time delivery rate and net promoter score are common KPIs. Every KPI is a metric, but most metrics are not KPIs. Keep the set of KPIs small; if everything is key, nothing is.",
   "Good KPIs are often described as SMART: specific, measurable, achievable, relevant and time-bound. 'Improve customer happiness' is a goal, not a KPI. 'Resolve 90% of support tickets within 24 hours each month' is a KPI: it is defined precisely, can be measured from ticket data, and has a target and a time frame. Each KPI needs a written definition, including the formula, data source, filters, owner and refresh frequency, so everyone calculates it the same way.",
   "Leading indicators move before an outcome and help predict it, such as sales pipeline value or website trial sign-ups. Lagging indicators confirm what already happened, such as quarterly revenue or annual churn. A balanced set includes both. Also watch for vanity metrics that look impressive but do not drive decisions, such as total registered users when most are inactive.",
   "A target is the value you aim for, and a benchmark is a reference point, such as last year's result, an industry average or another region. Variance to plan (budget variance) is actual minus target. If the budget was 50,000 and actual spending was 56,000, the variance is 6,000 over budget, or 12% of the budget. Always divide by the plan, not the actual, when stating the percentage. Whether a variance is favorable depends on the measure: revenue above plan is favorable, while costs above plan are unfavorable.",
   "Presenting performance clearly usually means showing actual, target, variance and trend together, often with status indicators such as on track, at risk and off track. Explain significant variances instead of just reporting them; that is where diagnostic analysis comes in."
  ],
  terms: [
   ["KPI", "A key performance indicator: a metric tied to a strategic objective, with a defined target."],
   ["Leading indicator", "A measure that changes before an outcome and helps predict it."],
   ["Lagging indicator", "A measure that reflects outcomes that have already happened."],
   ["Variance to plan", "The difference between actual results and the target or budget, often also stated as a percentage of plan."]
  ],
  example: "A regional sales dashboard shows each region's quarterly revenue against target. The West is at 1.08 million against a 1.2 million target, an unfavorable variance of 120,000 (10%). The analyst adds the leading indicator of pipeline value, which has doubled in the last month, and notes the West is likely to recover next quarter.",
  tip: "A KPI needs a measurable definition and a target. Variance percentage divides by the plan. Know leading versus lagging with an example of each.",
  check: [
   ["Is 'number of app downloads' a good KPI for a subscription business? Why or why not?", "Usually not on its own; it can be a vanity metric. Active subscribers or retention relate more directly to revenue."],
   ["Actual revenue is 460,000 against a plan of 400,000. State the variance.", "60,000 favorable, or 15% above plan (60,000 ÷ 400,000)."]
  ]
 },
 {
  t: "Choosing analysis tools and functions: spreadsheet formulas, SQL aggregates and window functions, Python and R libraries",
  body: [
   "Knowing statistics is not enough; you have to carry out the work in real tools. Data+ expects you to recognize common functions and pick a sensible tool for the job.",
   "Spreadsheets cover a lot of everyday analysis. Aggregation functions include SUM, AVERAGE, COUNT (numbers), COUNTA (non-empty cells), MIN and MAX, and conditional versions such as SUMIF, COUNTIF and AVERAGEIF (or SUMIFS for several conditions). Statistical functions include MEDIAN, MODE, STDEV.S, PERCENTILE and CORREL. Lookup functions such as XLOOKUP, VLOOKUP and INDEX with MATCH pull values from another table by a key. IF builds conditional logic, and text functions such as LEFT, TRIM and CONCAT clean strings. Pivot tables summarize data by categories without formulas.",
   "SQL aggregate functions (COUNT, SUM, AVG, MIN, MAX) collapse rows into one per group with GROUP BY. Window functions calculate across related rows without collapsing them, using OVER. A running total is `SUM(amount) OVER (ORDER BY sale_date)`. A ranking within each region is `RANK() OVER (PARTITION BY region ORDER BY revenue DESC)`. LAG and LEAD fetch the previous or next row's value, which makes period-over-period change easy, and a moving average uses a frame such as `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`.",
   "```sql\nSELECT sale_date, amount,\n       SUM(amount) OVER (ORDER BY sale_date) AS running_total,\n       amount - LAG(amount) OVER (ORDER BY sale_date) AS change_vs_prior_day\nFROM daily_sales;\n```",
   "In Python, pandas handles most analysis: `groupby().agg()` for grouped summaries, `describe()` for quick statistics, `merge` for joins, `pivot_table` and `melt` for reshaping, and `rolling()` for moving windows. NumPy and SciPy add numerical and statistical functions, including common hypothesis tests. Matplotlib and seaborn draw charts. In R, dplyr verbs (filter, select, mutate, group_by, summarise) handle data manipulation, ggplot2 handles charts, and base R has statistical tests and linear models built in.",
   "Choose by data size, repeatability and audience. A one-off look at a few thousand rows fits a spreadsheet. Anything large or recurring belongs in SQL close to the data. Complex statistics, modeling or automation fits Python or R. Whatever the tool, avoid hard-coded numbers buried in formulas, and keep the logic where someone else can review and rerun it."
  ],
  terms: [
   ["Window function", "A SQL function that calculates across a set of related rows using OVER, without collapsing them into groups."],
   ["PARTITION BY", "The part of a window definition that restarts the calculation for each group, such as each region."],
   ["XLOOKUP", "A spreadsheet function that finds a key in one range and returns the matching value from another range."],
   ["LAG", "A window function that returns a value from a previous row, used for period-over-period comparisons."]
  ],
  example: "A finance analyst needs each store's monthly revenue, its rank within its region and its change from the prior month. Instead of exporting to a spreadsheet and writing hundreds of formulas, she writes one SQL query with SUM for monthly totals, RANK() OVER (PARTITION BY region ...) for the rank and LAG for the prior month, and connects the result to the dashboard.",
  tip: "GROUP BY collapses rows; window functions keep every row. Running totals, rankings and prior-period comparisons point to window functions.",
  check: [
   ["Which spreadsheet function counts cells in a range that meet a single condition?", "COUNTIF (COUNTIFS for multiple conditions)."],
   ["What does PARTITION BY region do in RANK() OVER (PARTITION BY region ORDER BY sales DESC)?", "It restarts the ranking for each region, so every region has its own rank 1, 2, 3 and so on."]
  ]
 },
 {
  t: "Checking and troubleshooting results: sanity checks, reconciliation, and common calculation errors",
  body: [
   "An analysis is only valuable if people can trust it, and one wrong number presented to leadership can damage trust in everything else you produce. Build checking into your workflow rather than hoping errors will not happen.",
   "Sanity checks ask whether a result is plausible. Is total revenue in the right order of magnitude compared with last month? Are there negative quantities, percentages above 100%, dates in the future, or more active customers than total customers? Do the parts add up to the whole? A quick glance at minimums, maximums, counts and nulls after each major step catches many problems early.",
   "Reconciliation compares your figures with a trusted independent source, such as totals from the finance system, the source application's own report or last period's published numbers. Reconcile row counts after each load and join, and control totals, such as the sum of amounts, at each stage of a pipeline. If a dashboard shows revenue of 2.4 million and the general ledger says 1.2 million, you know something is wrong before anyone else sees it.",
   "Common calculation errors show up again and again. Join fan-out duplicates rows when a lookup key is not unique, doubling sums. An inner join silently drops unmatched records. Filters are left on from testing, or applied to only part of the data. Nulls are handled inconsistently, since AVG ignores nulls but a zero placeholder does not. Someone averages averages instead of recalculating from totals. Percent change is divided by the wrong base. Units or currencies are mixed. Date boundaries go wrong, with time zones shifting records into the wrong day or a BETWEEN filter missing the final day's timestamps. Integer division truncates results in some SQL dialects. Spreadsheet ranges miss newly added rows, and relative references shift when formulas are copied.",
   "When something looks wrong, troubleshoot systematically. Reproduce the problem, then narrow it down: check the source data, then each transformation step, comparing counts and totals as you go until you find where the number diverges. Test with a small example you can verify by hand. Document the fix and add an automated check so it cannot recur silently.",
   "Peer review helps too. A colleague reading your query or workbook often spots an assumption you did not realize you made. Before publishing, state your assumptions and known limitations with the result."
  ],
  terms: [
   ["Sanity check", "A quick test of whether a result is plausible, such as comparing its magnitude with expectations."],
   ["Reconciliation", "Comparing results with an independent trusted source to confirm they agree."],
   ["Control total", "A known sum or count used to verify that data was processed completely and correctly."],
   ["Integer division", "Division of whole numbers that discards the remainder, such as 7 / 2 returning 3 in some SQL dialects."]
  ],
  example: "Before a quarterly review, an analyst notices the new margin report shows 64% while finance reports 41%. Tracing step by step, she finds a filter left over from testing that excludes returns, and an inner join that dropped products missing a cost record. Fixing both and reconciling to the ledger brings the figure to 41.3%, and she adds automated row-count and total checks to the pipeline.",
  tip: "If a total is exactly double or suspiciously high after a join, suspect fan-out from duplicate keys. If records vanished, suspect an inner join or a leftover filter.",
  check: [
   ["A report's row count drops from 10,000 to 9,200 after a join. What should you check?", "Whether an inner join dropped rows without a match, for example records with missing or mismatched keys; a left join may be needed."],
   ["Why reconcile against an independent source rather than rerunning your own query?", "Rerunning your query repeats the same logic and errors; an independent source can reveal them."]
  ]
 },
 {
  t: "Choosing a chart: bar, line, pie, scatter, histogram, box plot, heat map, map and table",
  body: [
   "The right chart makes a pattern obvious in seconds; the wrong one hides it or misleads. Start by asking what the reader needs to see, whether that is a comparison, a trend, a composition, a distribution or a relationship, and pick the chart built for that job.",
   "Bar and column charts compare values across categories: revenue by region, tickets by priority. People judge lengths accurately, which makes bars the safest default. Use horizontal bars for long category names or many categories, sort bars by value unless the categories have a natural order, and start the value axis at zero. Stacked bars show composition within each category, and clustered bars compare subgroups side by side.",
   "Line charts show change over a continuous dimension, almost always time: monthly revenue over three years, daily active users. They reveal trends, seasonality and turning points. Several lines can compare a few series, but more than four or five becomes a tangle. An area chart is a line chart with the space below filled, often stacked to show composition over time.",
   "Pie and donut charts show parts of a whole at a single point in time. They work only with a few categories, around five at most, that add to 100%. People compare angles poorly, so a bar chart is usually clearer when slices are similar in size. Never use 3D pies, which distort slice sizes.",
   "Scatter plots show the relationship between two numeric variables, with one point per record: ad spend against sales for each store. They reveal correlation, clusters and outliers, and a trend line can be added. A bubble chart adds a third variable as point size.",
   "Histograms show the distribution of one numeric variable by counting values in bins: delivery times, order sizes, ages. Unlike a bar chart, the x-axis is a continuous numeric scale and the bars touch. Box plots (box-and-whisker) summarize a distribution with the median, quartiles, whiskers and outlier points, and are excellent for comparing distributions across groups.",
   "Heat maps use color intensity in a grid to show values across two dimensions, such as sales by day of week and hour, or a correlation matrix. Maps, whether filled (choropleth) maps shading regions or point and bubble maps, suit data where geography matters; normalize by population or area so large regions do not dominate. Tables are right when readers need exact values or will look up specific items; conditional formatting can highlight what matters. Gauges, KPI cards and bullet charts show a single measure against a target. Waterfall charts show how a starting value moves to an ending value through positive and negative steps, such as a profit bridge.",
   "When in doubt, choose the simplest chart that answers the question, and test it on someone who has not seen the data."
  ],
  terms: [
   ["Histogram", "A chart of a numeric variable's distribution, with adjacent bars showing counts in each value range (bin)."],
   ["Box plot", "A chart summarizing a distribution with its median, quartiles, whiskers and outliers."],
   ["Choropleth map", "A map that shades geographic areas by the value of a measure."],
   ["Scatter plot", "A chart plotting two numeric variables against each other, one point per record."]
  ],
  example: "An operations analyst has four questions: how on-time rates changed over the year (line chart), which warehouses handle the most orders (sorted bar chart), how shipping times are distributed (histogram), and whether distance relates to delay (scatter plot). One dashboard page holds all four, each chart matched to its question.",
  tip: "Trend over time means line; category comparison means bar; relationship means scatter; distribution means histogram or box plot; part of a whole with few categories means pie or 100% stacked bar.",
  check: [
   ["Why is a bar chart often better than a pie chart for eight categories?", "People compare lengths more accurately than angles, and eight slices are hard to read or label; sorted bars make the ranking obvious."],
   ["What is the key difference between a histogram and a bar chart?", "A histogram's x-axis is a continuous numeric scale divided into bins, so the bars touch; a bar chart compares separate categories."]
  ]
 },
 {
  t: "Dashboard design: layout, audience, KPIs, filters, drill-down and interactivity",
  body: [
   "A dashboard is a visual display of the most important information needed to monitor something, arranged so it can be understood at a glance. A good one answers its audience's recurring questions quickly; a bad one is a crowded page of charts that nobody opens after launch week.",
   "Start with the audience and purpose. Executives usually want a strategic view: a handful of KPIs, trends and exceptions, updated daily or weekly. Managers need tactical dashboards to track their team's performance and spot problems. Front-line staff need operational dashboards showing what is happening now, such as open tickets or inventory levels, often refreshed in near real time. Interview users about the decisions they make and the questions they ask, and design for those, not for every metric available.",
   "Layout follows how people read. In left-to-right languages, eyes land at the top left first, so put the most important KPIs there, often as large KPI cards showing the value, a comparison to target or the prior period, and a trend indicator. Supporting charts go below, moving from summary to detail. Group related visuals together, align them to a grid, use white space, and keep to roughly five to nine visuals per page. If you need more, create additional pages or tabs by topic.",
   "Filters and slicers let users focus on a date range, region or product line without a separate report for each. Put global filters in a consistent, visible place and show which filters are active so users do not misread a filtered view as the total. Cross-filtering, where clicking a bar filters the other visuals, is powerful but should behave predictably.",
   "Drill-down lets a user move from summary to detail along a hierarchy: from year to quarter to month, or from region to store. Drill-through jumps from a data point to a separate detail page for that item, such as from a customer in a list to a page of that customer's orders. Tooltips add context on hover without cluttering the page.",
   "Before publishing, check performance, since visuals should load in seconds, and test with real users. Also decide the refresh schedule, who owns the dashboard, and who can see which data, for example row-level security so each regional manager sees only their region. Keep a mockup or wireframe stage early; sketching the layout with stakeholders before building saves rework."
  ],
  terms: [
   ["KPI card", "A dashboard visual showing a single key measure, usually with a comparison to target or a prior period."],
   ["Drill-down", "Navigating from summary data to more detailed levels of a hierarchy within a visual."],
   ["Slicer (filter)", "An interactive control that limits the data shown in a dashboard's visuals."],
   ["Wireframe", "A simple sketch of a dashboard's layout used to agree on content before building."]
  ],
  example: "A hospital's operations director wants to track bed capacity. The analyst sketches a wireframe with her: current occupancy KPI cards at the top left, occupancy trend by day below, a ward-level bar chart that drills down to individual units, and a date and campus slicer. Row-level security limits each ward manager to their own ward's detail.",
  tip: "Match the dashboard type to the audience: strategic for executives, tactical for managers, operational for real-time staff. Put the key KPIs at the top left.",
  check: [
   ["What is the difference between drill-down and drill-through?", "Drill-down moves to a more detailed level within the same visual's hierarchy; drill-through navigates to a separate detail page for the selected item."],
   ["Why should active filters be clearly visible on a dashboard?", "Users might otherwise mistake filtered figures for overall totals and make wrong decisions."]
  ]
 },
 {
  t: "Design principles: color, labels, titles, scales and axes, accessibility and avoiding misleading charts",
  body: [
   "Good design is not decoration; it is what makes a chart readable and honest. Small choices about color, labels and axes can change what a reader concludes.",
   "Use color with purpose. Keep most elements in neutral grays and use one strong accent color to highlight what matters, such as the current year or the region that missed target. Use a sequential palette (light to dark in one hue) for ordered values, a diverging palette (two hues around a neutral midpoint) for values above and below a reference such as target or zero, and distinct hues for unrelated categories, keeping it to a handful. Use colors consistently across a report, so if West is blue on one page it is blue everywhere.",
   "Titles and labels should make the message clear. An informative title states the takeaway, 'Online sales passed in-store sales in Q3', rather than just 'Sales by channel'. Label axes with units, label data directly where possible instead of relying on a distant legend, round numbers sensibly, and include the time period and data source. Remove chart junk such as heavy gridlines, 3D effects, shadows and unnecessary decorations that add ink without information.",
   "Scales and axes must be honest. Bar charts should start their value axis at zero, because the length of the bar is the value; truncating the axis makes small differences look huge. Line charts can use a non-zero baseline to show variation, but should say so. Use consistent scales when placing charts side by side for comparison. Logarithmic scales are useful for data spanning several orders of magnitude but must be clearly labeled. Dual axes can suggest relationships that do not exist, so use them sparingly.",
   "Other ways charts mislead include cherry-picking a date range that supports a story, using areas or 3D volumes where perceived size does not match the value, showing percentages without the underlying counts, and uneven time intervals on an axis.",
   "Accessibility means everyone can read your work. Roughly one in twelve men has some form of color vision deficiency, most often red-green, so never rely on color alone: add labels, icons, patterns or position. Choose color-blind-safe palettes, ensure strong contrast between text and background, use readable font sizes, and add alternative text or a text summary for screen reader users. Accessible design is usually clearer for everyone."
  ],
  terms: [
   ["Sequential palette", "Shades of one hue from light to dark, used for ordered values from low to high."],
   ["Diverging palette", "Two contrasting hues around a neutral midpoint, used for values above and below a reference."],
   ["Truncated axis", "A value axis that does not start at zero, which exaggerates differences in bar charts."],
   ["Chart junk", "Visual elements such as 3D effects and heavy gridlines that add no information and distract from the data."]
  ],
  example: "A draft slide showed customer satisfaction rising from 92% to 94% as bars towering over each other, on an axis starting at 91%, in red and green only. The revised version starts the axis at zero with the values labeled, titles the chart 'Satisfaction up 2 points year over year', and uses blue and orange with text labels so every reader sees the same, accurate message.",
  tip: "Bars start at zero. Don't encode meaning with color alone. A diverging palette fits above and below target; a sequential palette fits low to high.",
  check: [
   ["When is a non-zero axis acceptable?", "On line charts showing change or variation over time, where the position of the line rather than bar length carries the meaning, as long as the axis is clearly labeled."],
   ["Give two ways to make a red/green status indicator accessible.", "Add icons or text labels (such as 'On track'), and use a color-blind-safe palette such as blue and orange with strong contrast."]
  ]
 },
 {
  t: "Report types: static vs dynamic, ad hoc vs recurring, self-service and executive summaries",
  body: [
   "Not every request needs a dashboard. Choosing the right kind of report for the audience and purpose saves effort and makes it more likely your work is used.",
   "A static report presents fixed content: a PDF, a slide deck or a printed page capturing data as of a certain point. Static reports are good for formal records, such as month-end financial results, regulatory submissions and board packs, because the numbers will not change after distribution. They are easy to share with anyone, but readers cannot filter or explore them, and they go out of date.",
   "A dynamic report, such as an interactive dashboard or a live report in a BI platform, connects to data sources, refreshes on a schedule or in real time, and lets users filter, drill down and explore. Dynamic reports suit ongoing monitoring. Their numbers change as data updates, so they need clear as-of dates, and a screenshot taken on Monday may not match the same view on Friday.",
   "An ad hoc report answers a one-time question: a list of customers affected by a recall, or sales for a specific promotion. Speed matters more than polish, and it may never be repeated. A recurring report is produced on a regular schedule, daily, weekly, monthly or quarterly, with a consistent format so readers can compare periods. If the same ad hoc request keeps arriving, turn it into a recurring or self-service report.",
   "Self-service reporting gives business users governed data models and tools so they can build their own views and answer their own questions without waiting for an analyst. It works well when the underlying data is clean, well documented and secured, often through certified datasets with agreed definitions. Without that governance, self-service can produce many conflicting versions of the truth.",
   "An executive summary condenses an analysis for senior decision makers, usually on a single page or slide at the front of a report. It states the key findings, why they matter, and the recommendation or decision needed, with a few supporting numbers. Details, methods and full tables go later or in an appendix. Other formats you may meet include operational reports for front-line teams, compliance reports with a mandated structure, and research reports that document a full study."
  ],
  terms: [
   ["Static report", "A fixed report, such as a PDF, that captures data at a point in time and does not change."],
   ["Dynamic report", "A report connected to data that refreshes and allows interaction such as filtering and drill-down."],
   ["Ad hoc report", "A one-time report created to answer a specific question."],
   ["Self-service reporting", "Letting business users build their own reports from governed, trusted data sources."]
  ],
  example: "A CFO needs month-end results for the board: the analyst produces a static PDF, since the board needs a fixed record. The sales operations team gets a dynamic dashboard refreshed each morning. When a regional VP asks once for last quarter's top accounts in her territory, the analyst runs an ad hoc query and emails a short table.",
  tip: "A formal record that must not change means static. Ongoing monitoring with interaction means dynamic. A one-time question means ad hoc. Business users building their own views means self-service.",
  check: [
   ["What must be in place for self-service reporting to succeed?", "Clean, well-documented and secured data models with agreed definitions, often certified datasets, plus user training, so users do not build conflicting numbers."],
   ["Why do dynamic reports need a clearly displayed refresh date?", "Their numbers change as data updates, so readers need to know how current the figures are and why two views may differ."]
  ]
 },
 {
  t: "Communicating findings: knowing the audience, storytelling with data and stating limitations",
  body: [
   "An analysis only creates value when someone understands it and acts on it. Communicating findings is a core skill on the exam and in the job, and it starts before you open a slide tool.",
   "Know your audience. Executives want the conclusion, its impact and the decision needed, in business terms and briefly. Managers want enough detail to act, with results for their own area. Technical peers want methods, assumptions and data sources so they can check your work. Ask what the audience already knows, what they care about, and what decision they face. Avoid jargon, or define it, for non-technical listeners: say 'the difference is unlikely to be chance' rather than quoting a p-value alone.",
   "Storytelling with data gives findings a structure people remember. A simple arc works well: the context (what we looked at and why), the insight or conflict (what we found, especially anything surprising), and the resolution (what we recommend and the expected impact). Lead with the main point rather than building up to it. Pick the few charts that support the story, give each a title that states its takeaway, and highlight the part of the chart that matters. Move supporting detail to an appendix.",
   "Make recommendations concrete: who should do what by when, and what result to expect. Tie numbers to impact the audience cares about, such as revenue, cost, risk or customer experience.",
   "State limitations and assumptions honestly. Every analysis has them: a short time window, missing data from one region, a sample that underrepresents new customers, a correlation that cannot prove cause, a forecast with a wide range. Saying so builds trust and prevents your results from being stretched beyond what they support. Present uncertainty clearly, with ranges or confidence intervals, rather than false precision such as revenue forecast to the dollar.",
   "Choose the right channel and format: a short email with one chart for a quick update, a meeting with slides for a decision, a dashboard for ongoing monitoring. Anticipate questions, keep a backup slide with the details, and follow up with the report and data sources afterward. Finally, ask for feedback; the most useful analysts learn what their stakeholders actually need."
  ],
  terms: [
   ["Data storytelling", "Presenting data findings as a structured narrative of context, insight and recommendation."],
   ["Limitation", "A known weakness or constraint of an analysis, such as missing data or a small sample."],
   ["Assumption", "A condition taken as true for an analysis, such as stable prices, that readers should know about."],
   ["Actionable insight", "A finding specific enough that a stakeholder can decide or act on it."]
  ],
  example: "An analyst presenting churn findings to the leadership team opens with one sentence: 'Customers who don't use feature X in their first two weeks are three times as likely to cancel; we recommend an onboarding email campaign, which we estimate could save 400 accounts a quarter.' Two charts support it, and a closing slide notes that the pattern is correlational and proposes an A/B test to confirm it.",
  tip: "Lead with the conclusion for executives, tailor detail to the audience, and always state limitations. Correlational findings should be presented as associations, not proven causes.",
  check: [
   ["How would you adapt the same analysis for an executive and for a data engineering peer?", "Executive: headline finding, impact and recommendation with few charts. Peer: methods, data sources, assumptions and code or queries so they can validate it."],
   ["Why state limitations if they might weaken your recommendation?", "They build credibility, stop results being overstated, and help decision makers judge risk; hidden limitations that surface later damage trust more."]
  ]
 },
 {
  t: "Report elements: cover information, methodology, data sources, refresh dates, disclaimers and appendices",
  body: [
   "Beyond the charts and findings, a professional report contains standard elements that tell readers what they are looking at, how current and reliable it is, and where to find more detail. Missing these elements is a common cause of misinterpretation.",
   "Cover or header information identifies the report: a clear title, the subject and time period covered (for example 'Q3 2025, all regions'), the author or owning team, the date prepared, a version number and the intended audience or distribution. For recurring reports, keep the layout consistent so readers can find things quickly each period.",
   "An executive summary usually comes first after the cover, giving the key findings and recommendations for readers who will go no further.",
   "The methodology section explains how the analysis was done: the question being answered, the data used, how it was cleaned and filtered (for example, test accounts and refunds excluded), how metrics were calculated, which statistical methods were applied and why. It lets others judge and reproduce the work. Keep it concise in the main body and put full detail in an appendix if needed.",
   "Data sources name where the data came from, such as systems, files, surveys and third-party providers, along with the extraction date. When sources conflict, readers need to know which one you used. Refresh dates tell readers how current the data is. A dashboard should show 'Data as of' or 'Last refreshed' prominently, and a static report should state the data cut-off date. Without it, readers assume the data is current and may act on stale numbers.",
   "Disclaimers and notes set the boundaries of use: preliminary or unaudited figures, known data gaps, estimates or forecasts with uncertainty, confidentiality labels such as 'Internal' or 'Confidential', and restrictions on distribution. Definitions or a glossary explain metrics and terms, such as exactly how 'active customer' is counted.",
   "Appendices hold supporting material that would clutter the main body: detailed tables, full methodology, data dictionaries, additional charts, query logic and assumptions. They let technical readers verify the work while keeping the main story short. Page numbers, a table of contents for long reports, and consistent chart numbering help readers navigate and refer to specific items in discussion."
  ],
  terms: [
   ["Methodology", "The description of how the analysis was carried out, including data preparation and calculations."],
   ["Data as-of date", "The point in time the report's data reflects, shown so readers know how current it is."],
   ["Disclaimer", "A note limiting how the report should be interpreted or used, such as 'preliminary, unaudited figures'."],
   ["Appendix", "A section at the end of a report holding supporting detail such as full tables and definitions."]
  ],
  example: "A monthly customer report went to 200 managers without a data as-of date. When a pipeline failure left it showing the previous month's data, several managers acted on stale numbers. The redesigned template adds a cover block with period, version and owner, a prominent 'Data as of' timestamp, a data sources note and a disclaimer when figures are preliminary.",
  tip: "Detail that supports but clutters goes in an appendix. How current the data is means the refresh or as-of date. How the numbers were produced means the methodology.",
  check: [
   ["Where should full field definitions and detailed query logic go in an executive report?", "In an appendix, keeping the main body focused on findings while making the detail available for verification."],
   ["What should a disclaimer on a preliminary sales report say?", "That the figures are preliminary or unaudited and may change after final reconciliation, possibly with the expected date of final numbers."]
  ]
 },
 {
  t: "Delivery and refresh: scheduled refresh, real-time vs snapshot data, subscriptions and distribution",
  body: [
   "Building a report is only part of the job; it also has to reach the right people with the right data at the right time. Data+ covers how reports are kept up to date and delivered.",
   "Data in a report can be connected in different ways. Imported (cached or extract) data is copied into the report or BI model and refreshed on a schedule. Queries are fast because the data is local to the tool, but the data is only as current as the last refresh. A live or direct connection queries the source every time a user interacts, so data is always current, but performance depends on the source and every click adds load to it.",
   "Scheduled refresh updates imported data at set times, such as every morning at 6:00 after the nightly pipeline finishes. Align the refresh with upstream loads: refreshing before the pipeline completes shows yesterday's data. Monitor refresh failures, which are often caused by expired credentials, changed source schemas, gateway issues for on-premises sources or timeouts, and alert the owner. Incremental refresh reloads only recent data, such as the last few days, which is faster for large models.",
   "Real-time data suits operational monitoring where people must react immediately, such as call center queues, production lines, fraud alerts and inventory on a warehouse floor. It is more expensive and complex, and it is unnecessary for most strategic reporting. Snapshot data captures values at a point in time and keeps them, such as month-end balances or headcount on the first of each month. Snapshots are essential when you need to report history as it was, because live source systems usually show only the current state.",
   "Distribution methods include publishing to a BI portal or workspace with access controls, embedding reports in an intranet or application, email subscriptions that send a report or a link on a schedule, data-driven alerts that notify users when a value crosses a threshold, exports to PDF or Excel for offline use, and printed packs for formal meetings. Prefer sending links to a secured, governed report over emailing attachments, which create uncontrolled copies that can be forwarded, go stale and may leak sensitive data.",
   "Match distribution to audience and sensitivity: restrict who can view, share and export; use row-level security so users see only their data; and review distribution lists when people change roles."
  ],
  terms: [
   ["Scheduled refresh", "An automated update of a report's imported data at set times."],
   ["Live (direct) connection", "A report connection that queries the source whenever users interact, so data is always current."],
   ["Snapshot", "A stored copy of data values at a point in time, used to report history as it was."],
   ["Subscription", "A scheduled delivery of a report or link to users, often by email."]
  ],
  example: "A retail chain's store dashboard refreshed at 5:00, but the nightly sales pipeline often finished at 5:30, so managers saw yesterday's figures. The analyst moved the refresh to 6:30, added an alert for failures, and set up a data-driven alert that emails district managers when a store's daily sales fall more than 20% below forecast.",
  tip: "Operational, react-now needs mean real-time; formal month-end history means snapshot. If a scheduled report shows old data, check whether the refresh ran after the upstream load, and whether it failed.",
  check: [
   ["Why keep month-end snapshots of inventory instead of querying the live system later?", "Live systems show current values; once stock moves, you cannot reconstruct the month-end state, so snapshots preserve history for trend and audit reporting."],
   ["Name two common causes of scheduled refresh failures.", "Expired or changed credentials, source schema changes (renamed or removed columns), gateway or network issues for on-premises sources, and timeouts."]
  ]
 },
 {
  t: "Report versioning, style guides and corporate branding",
  body: [
   "As reports multiply and change over time, consistency and control become as important as the analysis itself. Versioning, style guides and branding keep reports trustworthy, recognizable and easy to maintain.",
   "Versioning tracks changes to a report so everyone knows which copy is current and what changed. Good practice includes a clear version number or date in the report and file name (for example v1.2 or 2025-10-01 rather than 'final_FINAL2'), a change log recording what changed, when, why and by whom, and a single published location that is the authoritative copy. When metric definitions or calculations change, note it prominently, because a jump in a KPI might be a definition change rather than a real change in the business. Store report definitions, queries and scripts in version control, such as Git, so you can compare versions and roll back mistakes.",
   "Many BI platforms separate development, test and production workspaces, so changes are built and checked before users see them. Retire old reports deliberately and redirect users instead of leaving outdated copies accessible.",
   "A style guide is a documented set of design and writing rules for reports: approved fonts and sizes, color palettes including specific colors for key categories and for good and bad status, chart conventions such as always starting bar axes at zero, number formats (thousands separators, decimal places, currency symbols, date format), terminology and metric names, title style, and accessibility requirements. A style guide makes reports consistent across different authors, speeds up building, and makes it easier for readers to move between reports because the same things always look the same.",
   "Corporate branding applies the organization's visual identity: logo placement, brand colors, templates and approved language. Branded templates for dashboards and slide decks give reports a professional look and signal that they are official. Branding should not override readability: if brand colors fail contrast or color-blind checks, use them for accents and choose accessible colors for the data.",
   "Templates tie all of this together. A report template with the cover block, standard headers and footers, confidentiality label, as-of date placeholder, predefined color theme and page layout means every new report starts compliant. Themes in BI tools can store palettes and fonts so they apply automatically."
  ],
  terms: [
   ["Version control", "Tracking and managing changes to files or reports over time, with the ability to compare and restore versions."],
   ["Change log", "A record of what changed in each version, when, why and by whom."],
   ["Style guide", "A documented set of rules for fonts, colors, formats, terminology and chart conventions."],
   ["Template", "A predefined layout and theme that new reports start from to ensure consistency."]
  ],
  example: "After two conflicting versions of the quarterly revenue deck reached the board, the analytics team introduced a template with version and as-of fields, a change log slide, and a rule that only the copy in the official reporting workspace counts. A shared style guide fixed each region's color and the number formats, so every author's charts now look the same.",
  tip: "Conflicting copies point to versioning with numbers, dates and a change log, plus one authoritative location. Consistent fonts, colors and formats point to a style guide.",
  check: [
   ["A KPI jumps 10% between versions of a report without any business change. What should the change log reveal?", "Whether the metric's definition or calculation changed; such changes must be documented and flagged so readers do not misread them."],
   ["What should you do if brand colors fail accessibility contrast checks for chart data?", "Use brand colors for accents such as headers and the logo, and choose accessible, color-blind-safe colors for data encoding."]
  ]
 },
 {
  t: "Troubleshooting reports and dashboards: stale data, broken filters, wrong totals and slow performance",
  body: [
   "When a dashboard is wrong or slow, users lose trust quickly. A systematic approach helps you find the cause fast: confirm the symptom, check the data path from source to visual, and change one thing at a time.",
   "Stale data shows old numbers. Check the report's last refresh time and whether the scheduled refresh ran and succeeded. If it failed, look at credentials, which expire and cause many failures, the connection or gateway, and source changes such as a renamed column. If the refresh succeeded but data is still old, the upstream pipeline may have failed or finished late, so the refresh loaded yesterday's data. Browser or tool caching and a hard-coded date filter are other suspects.",
   "Broken filters either do nothing or filter unexpectedly. Common causes are a slicer not connected to some visuals, a missing or inactive relationship between the filter's table and the fact table in the data model, relationships with the wrong direction, mismatched data types or formats between key columns (text '001' versus number 1), and visual-level filters that override page filters. Blank values in a filter list often mean unmatched keys, such as sales rows with product IDs missing from the product table.",
   "Wrong totals are the most damaging problem. Check for many-to-many or duplicate-key relationships that double-count, an inner join dropping records, leftover filters, measures that sum a ratio instead of calculating it from totals (averaging percentages), inconsistent time zones or date boundaries, currency or unit mixing, and nulls. Total rows in tables can differ from the sum of visible rows when a measure is calculated at the total level, such as a distinct count, which is correct behavior that users should have explained to them. Reconcile against the source system to find where the numbers diverge.",
   "Slow performance has several usual causes. Visuals query very large detailed tables when an aggregated table would do. Too many visuals sit on one page. Complex calculated measures are evaluated row by row. Live connections hit a busy source. Unnecessary columns are loaded, especially high-cardinality text or timestamp columns. Fixes include pre-aggregating data, importing instead of querying live where freshness allows, removing unused columns, reducing visuals per page, adding indexes or partitions in the source, and using incremental refresh.",
   "After fixing, communicate: tell users what was wrong, which numbers were affected and for how long, and what prevents recurrence, such as refresh-failure alerts or automated reconciliation checks."
  ],
  terms: [
   ["Stale data", "Data in a report that is older than expected because of a failed or mistimed refresh or pipeline."],
   ["Data model relationship", "A link between tables in a BI model that lets filters and calculations flow between them."],
   ["Cardinality", "The number of distinct values in a column, or the one-to-one, one-to-many or many-to-many nature of a relationship."],
   ["Pre-aggregation", "Summarizing detailed data in advance to the level visuals need, to speed up queries."]
  ],
  example: "Users report that a sales dashboard's region filter changes the map but not the revenue trend chart, and the page takes 40 seconds to load. The analyst finds the trend chart uses a second fact table with no relationship to the Region table, adds the relationship, and replaces the 400-million-row transaction query behind the page with a daily summary table. Filtering now works and the page loads in four seconds.",
  tip: "Old data means check refresh history, credentials and upstream loads. A filter that doesn't affect a visual means check relationships and slicer connections. Doubled totals mean suspect duplicate keys or many-to-many joins.",
  check: [
   ["A scheduled refresh shows 'succeeded' but the dashboard has yesterday's data. What is a likely cause?", "The refresh ran before the upstream pipeline finished loading today's data, or the pipeline itself failed, so the refresh loaded unchanged data."],
   ["Why might a filter list show a '(Blank)' value?", "Some fact rows have keys that do not match any row in the dimension table, for example missing or mistyped product IDs."]
  ]
 },
 {
  t: "Data governance roles: data owner, data steward, data custodian and data consumer",
  body: [
   "Data governance is the set of policies, roles, standards and processes that make sure data is accurate, secure, usable and handled lawfully. It answers questions such as who decides who can see this data, who fixes it when it is wrong and who keeps it safe. Clear roles are the foundation, and Data+ expects you to tell them apart.",
   "The data owner is a senior business leader who is accountable for a data domain, such as the VP of HR for employee data or the CFO for financial data. The owner decides how the data is classified, who may access it and for what purposes, and approves policies such as retention. Ownership is about accountability, not technical work: the owner usually does not configure databases.",
   "The data steward manages the data day to day on the business side. Stewards maintain definitions in the data dictionary and business glossary, set and monitor quality rules, resolve data issues and conflicting definitions, and make sure the data is used according to policy. They are usually subject-matter experts, such as a sales operations specialist who knows exactly what counts as a closed deal. Stewards act as the bridge between business users and IT.",
   "The data custodian (sometimes called the technical steward) is responsible for the technical environment where data lives. Custodians, typically database administrators, data engineers or IT operations, implement the controls the owner decides on: storage, backups and recovery, access permissions, encryption, and running pipelines. They protect and operate the data, but they do not decide who should have access.",
   "The data consumer (data user) uses the data for their work: analysts, report readers and applications. Consumers must follow policies on appropriate use, keep data within its approved purpose and report quality problems they find. Analysts are often both consumers and informal stewards of the datasets they know best.",
   "Other roles you may meet include a chief data officer who leads data strategy and governance across the organization, a data governance council or committee that sets policy and resolves cross-department disputes, a data protection officer, required in some cases under GDPR, who oversees privacy compliance, and the data subject, the person the personal data is about. A RACI chart (responsible, accountable, consulted, informed) is a common way to document who does what."
  ],
  terms: [
   ["Data owner", "The accountable business leader who decides a data domain's classification, access and use."],
   ["Data steward", "The business-side role that manages data definitions, quality and proper use day to day."],
   ["Data custodian", "The technical role that stores, secures and maintains data according to the owner's decisions."],
   ["Data consumer", "Anyone who uses data for their work and must follow the policies on its use."]
  ],
  example: "A new analyst needs access to salary data. She requests it through the governance process; the VP of HR, as data owner, approves read access to aggregated salary bands only. The database administrator, as custodian, grants the permission on a view that hides individual names, and the HR data steward updates the data dictionary to document the view.",
  tip: "Decides and is accountable means owner. Defines and maintains quality means steward. Implements technical controls such as backups, permissions and encryption means custodian.",
  check: [
   ["Who should approve a request for access to customer payment data: the DBA or the data owner?", "The data owner approves; the DBA as custodian then implements the approved access."],
   ["Two departments disagree about how 'active customer' is defined. Which role typically resolves it?", "Data stewards, escalating to the data governance council or the data owners if they cannot agree, and then recording the definition in the glossary."]
  ]
 },
 {
  t: "Metadata, data dictionaries, data catalogs and data lineage",
  body: [
   "Data is only useful if people can find it, understand it and trust where it came from. Metadata, meaning data about data, makes that possible, and several governance tools are built around it.",
   "Metadata comes in several kinds. Technical metadata describes structure: table and column names, data types, lengths, keys, indexes and file formats. Business metadata describes meaning: definitions, calculation rules, owners, stewards and sensitivity classification. Operational metadata describes processing: when data was loaded, how many rows, how long jobs ran and whether they succeeded. A photo's metadata includes its date, camera and location; a table's metadata includes its schema, owner and last refresh.",
   "A data dictionary documents the fields in a dataset or database: each column's name, definition, data type, format, allowed values or range, whether it can be null, the source, and sensitivity. Analysts use it to understand what a column really means before using it. For example, does 'revenue' include tax? Is 'order_date' the date placed or the date shipped? A business glossary is related but broader: it defines business terms and metrics, such as 'active customer' or 'churn rate', independent of any single table, so everyone uses the same definition.",
   "A data catalog is a searchable inventory of an organization's data assets, including databases, tables, files, reports and dashboards, with their metadata. Users can search for data, see descriptions, owners, quality scores and sensitivity labels, and request access. Catalogs often harvest technical metadata automatically and let stewards add business context. They reduce the time analysts spend hunting for data and the risk of using the wrong source.",
   "Data lineage traces data's journey from its origin through every transformation to where it is used: from the source system, through the pipeline steps and warehouse tables, to a dashboard KPI. Lineage answers two important questions. Looking backward, where did this number come from and what was done to it? That matters for trust, troubleshooting and audits. Looking forward, if we change this source column, which reports will be affected? That is impact analysis. Many modern tools capture lineage automatically from pipeline code and queries.",
   "Keeping metadata current is a governance responsibility. An outdated dictionary is almost worse than none, because people trust it. Assign stewards to maintain it, and update it as part of every change."
  ],
  terms: [
   ["Metadata", "Data that describes other data, such as its structure, meaning, owner and processing history."],
   ["Data dictionary", "Documentation of each field's name, definition, type, format, allowed values and source."],
   ["Data catalog", "A searchable inventory of data assets and their metadata that helps users find and understand data."],
   ["Data lineage", "A record of where data came from and every transformation it passed through to reach its destination."]
  ],
  example: "Auditors question a customer retention figure in the annual report. Using the lineage view in the company's data catalog, the analyst shows the KPI's path from the billing system, through the pipeline that excludes trial accounts, to the warehouse table and dashboard measure, and the data dictionary entry that defines a retained customer. The auditors accept the figure without a manual investigation.",
  tip: "Where data came from and what transformed it means lineage. What a column means means data dictionary. A searchable inventory of datasets means data catalog.",
  check: [
   ["A team plans to rename a column in the source CRM. How does lineage help?", "Forward lineage (impact analysis) shows every pipeline, table and report that depends on the column, so they can be updated before the change."],
   ["What is the difference between technical and business metadata?", "Technical metadata describes structure such as types and keys; business metadata describes meaning such as definitions, owners and sensitivity."]
  ]
 },
 {
  t: "Data quality dimensions: accuracy, completeness, consistency, validity, timeliness and uniqueness",
  body: [
   "'The data is bad' is not specific enough to fix. Data quality dimensions give you a vocabulary for describing exactly what is wrong, which rules to check and which metrics to track. The exam presents a problem and asks which dimension it affects.",
   "Accuracy means data correctly reflects the real-world thing it describes. A customer's recorded address is where they actually live, and the price in the system is the price charged. Accuracy is the hardest dimension to measure because you need a trusted reference, such as a verified source, a physical count or confirmation from the customer.",
   "Completeness means required data is present. Blank email addresses, missing postal codes, or orders without a customer ID are completeness failures. Measure it as the percentage of records with a value in each required field. Not every blank is a failure; an optional middle name can be empty.",
   "Consistency means data agrees across systems and within a dataset. A customer marked as closed in the CRM but active in billing, or an order total that does not equal the sum of its lines, is inconsistent. Consistent formats, such as the same date format and state codes everywhere, are part of this dimension too.",
   "Validity means values conform to defined rules: correct data type, format, range and allowed values. An email without an @, a date of February 30, an age of 212 or a status code not in the approved list are invalid. A value can be valid but inaccurate: a correctly formatted phone number that belongs to someone else.",
   "Timeliness means data is available and current enough for its use. A dashboard showing last week's inventory to warehouse staff who need today's is not timely, even if every value is accurate. Related ideas are currency (how up to date the data is) and latency (the delay between an event and its availability).",
   "Uniqueness means each real-world entity or event is recorded once. Duplicate customer records, or the same transaction loaded twice, break uniqueness and inflate counts.",
   "Some frameworks add integrity (relationships between tables are intact, such as every order pointing to an existing customer) and reasonableness. Each dimension maps to measurable metrics, such as percentage complete, percentage valid, duplicate rate or hours since the last update, which can be tracked on a data quality scorecard."
  ],
  terms: [
   ["Completeness", "The degree to which required data values are present."],
   ["Validity", "The degree to which values conform to rules for type, format, range and allowed values."],
   ["Consistency", "The degree to which data agrees across systems and within a dataset."],
   ["Timeliness", "The degree to which data is current and available when needed."]
  ],
  example: "A data quality review of a customer table finds 8% of phone numbers missing (completeness), 3% with too few digits (validity), 2% of customers listed twice (uniqueness), region codes that differ from the billing system for 5% of accounts (consistency) and a load that runs two days behind (timeliness). Each issue gets its own rule, owner and target.",
  tip: "Missing means completeness; wrong format or impossible value means validity; disagreement between systems means consistency; duplicates mean uniqueness; out of date means timeliness; not matching reality means accuracy.",
  check: [
   ["A correctly formatted email address belongs to a previous customer who moved away. Which dimension fails?", "Accuracy. The value is valid in format but does not reflect the current real-world fact."],
   ["An order's line items sum to 120 but its stored total is 100. Which dimension?", "Consistency (internal consistency within the dataset)."]
  ]
 },
 {
  t: "Data quality control: validation rules, profiling, quality metrics and monitoring",
  body: [
   "Knowing the dimensions of data quality is the theory; quality control is the practice of finding problems, preventing them and proving that data is fit for use. It works best as a continuous process, not a one-time cleanup.",
   "Data profiling is the systematic examination of a dataset to understand its structure and content. For each column you calculate counts, null counts and percentages, distinct values, minimum and maximum, most frequent values, patterns and formats, and length distributions. Across columns you look for relationships and orphaned keys. Profiling reveals surprises, such as a 'country' field with 240 spellings or a date column with values in 1900, and is the first step before cleaning or building rules. Tools range from pandas `describe()` and `value_counts()` to profiling features in BI and data quality platforms.",
   "Validation rules check data against expectations. Type checks confirm a field is a number or a date. Range checks require values within limits, such as quantity between 1 and 1,000. Format checks match a pattern, such as a postal code or email. Allowed-value (domain) checks restrict a field to a list. Required-field (presence) checks catch blanks. Uniqueness checks catch duplicate keys. Referential integrity checks confirm foreign keys match existing records. Cross-field checks test logic, such as a ship date not earlier than the order date. Apply validation as early as possible, ideally at entry in forms and applications, then again in pipelines, because preventing bad data is cheaper than cleaning it later.",
   "Quality metrics turn rules into numbers you can track: percentage of records passing each rule, completeness rate per critical field, duplicate rate, number of orphaned records, and data freshness in hours. Set thresholds or targets, such as 99% of orders must have a valid customer ID, agreed with the data owner, and show them on a data quality scorecard or dashboard.",
   "Monitoring runs the checks automatically every time data loads and alerts the right people when a metric breaches its threshold. Pipelines can quarantine failing records, or stop the load entirely for critical failures, instead of letting bad data flow into reports. Track trends: a slow rise in nulls often signals an upstream change. When issues are found, log them, assign them to the steward or source owner, fix the root cause, not just the symptom, and verify the fix.",
   "Other quality control techniques include reconciliation against source totals, sampling records for manual review, and audits of how data is entered and processed."
  ],
  terms: [
   ["Data profiling", "Analyzing a dataset's structure and content, such as nulls, distinct values, ranges and patterns, to understand its quality."],
   ["Validation rule", "A check that data meets an expectation, such as a type, range, format or allowed value."],
   ["Referential integrity check", "A test that every foreign key value matches an existing record in the related table."],
   ["Data quality scorecard", "A report tracking quality metrics against thresholds over time."]
  ],
  example: "An insurer adds validation to its nightly claims pipeline: claim amounts must be positive, claim dates cannot precede policy start dates, and every claim must reference a valid policy. Failing rows go to a quarantine table and the claims data steward gets an alert. Within a month the scorecard shows invalid claims falling from 2.1% to 0.3% after the intake form was fixed.",
  tip: "Profiling discovers what the data looks like; validation rules enforce what it should look like; monitoring runs the rules continuously with alerts. Fix at the source when you can.",
  check: [
   ["Which validation rule catches an order with a ship date before its order date?", "A cross-field (logical consistency) check comparing the two dates."],
   ["Why validate at data entry as well as in the pipeline?", "Preventing bad data at the source is cheaper and more reliable than cleaning it later, and the person entering it can correct it immediately."]
  ]
 },
 {
  t: "Master data management and a single source of truth",
  body: [
   "Master data is the core, shared data about the key entities a business runs on: customers, products, suppliers, employees, locations and accounts. It changes relatively slowly and is used across many systems and processes. Transactional data, such as orders and payments, refers to master data. When master data is inconsistent, every report built on it inherits the problem.",
   "The classic problem is that each system keeps its own copy. The CRM, the billing system, the e-commerce site and the support tool all hold customer records, entered at different times by different people. One customer ends up as 'Acme Corp' in one place and 'ACME Corporation Ltd' in another, with different addresses. Reports disagree, marketing sends duplicate mailings, and nobody can say how many customers the company really has.",
   "Master data management (MDM) is the set of processes, governance and tools that create and maintain one consistent, accurate, authoritative version of each master entity, often called the golden record. Core activities include matching (identifying records across systems that refer to the same real entity, using rules or fuzzy matching on names, addresses and IDs), merging or consolidating them into a golden record using survivorship rules that decide which source wins for each attribute, standardizing formats, and distributing the master data back to the systems that use it. Data stewards review uncertain matches and maintain the rules.",
   "A single source of truth (SSOT) is the principle that each piece of data has one authoritative source that everyone uses, so the same question gets the same answer everywhere. For master data, the MDM hub or a designated system plays that role. For metrics, it means certified datasets and agreed definitions in the warehouse or semantic layer instead of each team calculating revenue its own way in private spreadsheets.",
   "Benefits of MDM include consistent reporting, fewer duplicates, better customer experience, easier compliance (you can find every record about a person when they ask) and simpler integration of new systems or acquired companies. MDM is as much about governance as technology: it needs owners, stewards, agreed definitions and processes for creating and changing master records, or the golden record decays."
  ],
  terms: [
   ["Master data", "Core shared data about key business entities such as customers, products and suppliers."],
   ["Master data management (MDM)", "The processes and tools that create and maintain one consistent, authoritative version of master data."],
   ["Golden record", "The single, trusted, consolidated record for an entity produced by MDM."],
   ["Single source of truth", "The principle that each data element has one authoritative source everyone uses."]
  ],
  example: "After acquiring a competitor, a distributor has two product catalogs with overlapping items under different codes, so inventory reports double-count stock. An MDM project matches products by manufacturer part number and description, builds golden records with survivorship rules that prefer the acquiring company's pricing and the acquired company's newer descriptions, and feeds one product master to both warehouses.",
  tip: "The same customer or product differing across systems points to master data management. One authoritative version everyone uses is the single source of truth.",
  check: [
   ["What are survivorship rules in MDM?", "Rules that decide which source's value is kept for each attribute when records are merged, such as the most recent address or the billing system's legal name."],
   ["Is an order record master data? Why or why not?", "No. An order is transactional data describing an event; it refers to master data such as the customer and products."]
  ]
 },
 {
  t: "Sensitive data: PII, PHI and payment card data; data classification levels",
  body: [
   "Some data can harm people or the organization if it is exposed, so it needs extra protection and often carries legal obligations. Analysts work with this data regularly and must recognize it.",
   "Personally identifiable information (PII) is information that can identify a specific person, either directly or when combined with other data. Direct identifiers include full name, national identification or Social Security number, passport or driver's license number, personal email, phone number, home address and biometric data. Indirect (quasi-) identifiers such as date of birth, postal code, gender and job title may not identify someone alone, but combined they often can, which is why removing names alone is not enough to make data anonymous. Some PII is more sensitive than others: a national ID number or bank account number can enable identity theft and fraud.",
   "Protected health information (PHI) is a term from the US HIPAA rules for individually identifiable health information held by covered entities, such as healthcare providers, health plans and clearinghouses, and their business associates. It covers health conditions, treatments, test results and payment for care when linked to an identifier such as a name, record number or dates. A diagnosis with a patient's name is PHI; an aggregate count of diagnoses across a region with no identifiers is not.",
   "Payment card data includes the primary account number (PAN), cardholder name, expiration date and service code, plus sensitive authentication data such as the full magnetic stripe or chip data, the card verification code and PINs. PCI DSS governs how organizations store, process or transmit it. Sensitive authentication data must not be stored after authorization, and stored PANs must be protected, for example by truncation, tokenization or strong encryption. Analysts rarely need full card numbers; a token or the last four digits usually suffices.",
   "Data classification assigns each dataset a sensitivity level that drives how it is handled. A common scheme has four levels. Public data is approved for anyone, such as published prices. Internal data is for employees only, such as internal procedures. Confidential data would cause harm if disclosed, such as customer lists, contracts and most PII. Restricted (or highly confidential) data would cause severe harm, such as PHI, payment card data, credentials and trade secrets. Government schemes use other labels. Each level maps to controls: who can access it, whether it must be encrypted, whether it may leave the organization, and how it is disposed of. The data owner sets the classification, and it should be recorded in the catalog and on reports."
  ],
  terms: [
   ["PII", "Personally identifiable information: data that can identify a specific individual directly or in combination."],
   ["PHI", "Protected health information: individually identifiable health information covered by HIPAA."],
   ["Quasi-identifier", "An attribute such as birth date or postal code that can identify a person when combined with others."],
   ["Data classification", "Assigning data a sensitivity level (such as public, internal, confidential or restricted) that determines its handling."]
  ],
  example: "An analyst is asked to share a patient satisfaction dataset with an outside survey vendor. She recognizes that names, record numbers and visit dates linked to satisfaction scores make it PHI classified as restricted. She escalates to the data owner and privacy office; a de-identified version with no direct identifiers and dates reduced to year and month is shared under a signed agreement instead.",
  tip: "Health data linked to a person means PHI (HIPAA). Card numbers mean PCI DSS. Removing names alone may still leave quasi-identifiers that re-identify people.",
  check: [
   ["Is a table of ZIP code, birth date and gender, with no names, safe to publish?", "Not necessarily. Those quasi-identifiers combined can uniquely identify many people, so the data may still be personal data and needs further de-identification."],
   ["Which card data elements must never be stored after authorization under PCI DSS?", "Sensitive authentication data, such as full track or chip data, card verification codes and PINs."]
  ]
 },
 {
  t: "Privacy and compliance: GDPR, HIPAA, PCI DSS, data sovereignty and retention policies",
  body: [
   "Analysts must follow laws, regulations and contractual standards on how data is collected, used, stored and shared. You do not need to be a lawyer for Data+, but you should know what the major frameworks cover and how they shape everyday data work.",
   "The General Data Protection Regulation (GDPR) is the European Union's data protection law. It applies to organizations processing personal data of people in the EU, including organizations based outside the EU that offer goods or services to, or monitor, people there. Key principles include lawfulness, fairness and transparency; purpose limitation (use data only for the purposes collected); data minimization (collect only what is needed); accuracy; storage limitation (keep it no longer than necessary); and integrity and confidentiality. Data subjects have rights, including access to their data, correction, erasure (the 'right to be forgotten'), restriction, portability and objection. Processing needs a lawful basis, such as consent, contract or legitimate interest; transfers outside the EU require safeguards; and many breaches must be reported to authorities, generally within 72 hours of becoming aware of them.",
   "The Health Insurance Portability and Accountability Act (HIPAA) is a US law whose Privacy and Security Rules protect PHI held by covered entities and their business associates. It requires safeguards (administrative, physical and technical), limits uses and disclosures, and applies a minimum necessary standard: use only the PHI needed for the task. HIPAA defines de-identification methods, and properly de-identified data is no longer PHI.",
   "PCI DSS (Payment Card Industry Data Security Standard) is an industry standard, not a law, enforced through contracts with card brands and banks. It applies to any organization that stores, processes or transmits cardholder data, and requires controls such as network security, protecting stored card data, encryption in transit, access control, logging and regular testing. Reducing where card data exists shrinks the scope of compliance.",
   "Data sovereignty means data is subject to the laws of the country where it is stored or processed. Data residency (localization) requirements may force certain data to stay within a country or region, which affects cloud region choices and cross-border sharing.",
   "Retention policies define how long each type of data is kept and what happens afterward. Some records must be kept for a minimum period for legal, tax or regulatory reasons, while privacy principles say personal data should not be kept longer than needed. A retention schedule lists each record type, its retention period, the legal basis and the disposal method. Legal holds suspend deletion when data is relevant to litigation or investigation. Other regulations you may meet include CCPA/CPRA in California, SOX for financial reporting controls in US public companies, and FERPA for US student records."
  ],
  terms: [
   ["GDPR", "The EU regulation governing processing of personal data of people in the EU, including data subject rights."],
   ["HIPAA", "The US law protecting individually identifiable health information held by covered entities and business associates."],
   ["Data sovereignty", "The principle that data is subject to the laws of the country where it is located."],
   ["Retention schedule", "A policy listing how long each type of record is kept and how it is disposed of."]
  ],
  example: "A European customer emails a request to delete her data. The analytics team finds her records in the CRM, the warehouse and two marketing extracts. Under GDPR they erase or anonymize her personal data where no other legal basis requires keeping it, retain her invoices because tax law requires them, and document the response, which also exposes the uncontrolled extracts for cleanup.",
  tip: "EU personal data means GDPR; US health data held by providers and insurers means HIPAA; card data means PCI DSS (a standard, not a law). Data location laws mean sovereignty or residency.",
  check: [
   ["What does data minimization require of an analyst building a new dataset?", "Collect and keep only the fields needed for the stated purpose, leaving out unnecessary personal data."],
   ["What is a legal hold?", "A requirement to preserve data relevant to litigation or an investigation, suspending normal deletion under the retention schedule until it is lifted."]
  ]
 },
 {
  t: "Protecting data: access control and least privilege, masking, anonymization, pseudonymization and encryption",
  body: [
   "Governance policies only matter if they are enforced by controls. Data+ expects you to know the main techniques for protecting data and to pick the right one for a scenario.",
   "Access control decides who can see or change which data. The principle of least privilege gives each person or service only the access needed for their job, and no more. Role-based access control (RBAC) assigns permissions to roles, such as sales analyst or HR partner, and users get access by being assigned a role, which is easier to manage and audit than individual grants. Finer-grained controls include row-level security, where a regional manager sees only their region's rows, and column-level security, which hides salary or ID columns from most users. Review access periodically, remove it promptly when people change roles or leave, and log access to sensitive data.",
   "Data masking hides sensitive values while keeping data usable. Static masking creates a masked copy, for example for testing and development, replacing real names and card numbers with realistic fake values. Dynamic masking shows masked values to unauthorized users at query time, such as showing only the last four digits of a card number, while the stored data stays unchanged. Masking lets developers and analysts work with realistic data without seeing the real sensitive values.",
   "Anonymization irreversibly removes the ability to identify individuals, for example by removing identifiers and generalizing or aggregating quasi-identifiers (age bands instead of birth dates, region instead of address), sometimes adding noise. Truly anonymized data is no longer personal data under GDPR, but achieving it is hard: combining quasi-identifiers can re-identify people, as several well-known public data releases have shown. Pseudonymization replaces identifiers with artificial ones, such as random IDs or tokens, while a separately stored key can re-link them. It reduces risk and allows records to be linked across datasets, but it is reversible, so under GDPR pseudonymized data is still personal data. Tokenization is a related technique, common for card numbers, where a token stands in for the real value stored in a secure vault.",
   "Encryption transforms data into unreadable ciphertext that only holders of the right key can decrypt. Encryption at rest protects stored data, such as databases, files, backups and laptops, if storage is stolen or accessed improperly. Encryption in transit, using TLS for web and database connections, protects data moving across networks. Encryption is only as strong as key management: keys must be protected, rotated and separated from the data. Hashing is a one-way function used to check integrity or compare values without storing them, though hashing guessable values such as phone numbers is weak protection on its own.",
   "Layer these controls: least-privilege access, masking or pseudonymization for data used outside production, encryption everywhere, and monitoring of who accesses what."
  ],
  terms: [
   ["Least privilege", "Granting users and systems only the minimum access needed to do their work."],
   ["Data masking", "Hiding sensitive values with realistic substitutes or partial values while keeping data usable."],
   ["Pseudonymization", "Replacing identifiers with artificial values that can be re-linked using a separately held key."],
   ["Anonymization", "Irreversibly removing the ability to identify individuals from data."],
   ["Encryption at rest", "Encrypting stored data so it is unreadable without the key if storage is accessed."]
  ],
  example: "A bank's analytics team needs transaction data to build a fraud model. Production data stays encrypted at rest with access limited by role. The modeling environment receives a copy in which customer IDs are pseudonymized with tokens, names and addresses are removed, and account numbers are masked to the last four digits. Only the fraud operations team can re-link tokens to customers when a case needs investigation.",
  tip: "Reversible with a key means pseudonymization; irreversible means anonymization. Realistic fake values for testing means masking. Viewing only your region's rows means row-level security.",
  check: [
   ["Why is pseudonymized data still personal data under GDPR?", "Because a key exists that can re-identify individuals, so the data remains linkable to people."],
   ["What is the difference between static and dynamic masking?", "Static masking creates a permanently masked copy, such as for test environments; dynamic masking hides values at query time for unauthorized users while the stored data stays unchanged."]
  ]
 },
 {
  t: "Data life cycle: collection, storage, use, sharing, archiving and secure disposal",
  body: [
   "Data has a life cycle from the moment it is created or collected until it is destroyed. Governance and security controls apply at every stage, and many real-world failures happen at the edges: collecting more than needed at the start, or never deleting at the end.",
   "Collection (creation) is when data enters the organization, through forms, transactions, sensors, APIs, purchases from third parties or derived calculations. Good practice is to collect only what is needed for a defined purpose (data minimization), tell people what is collected and why, obtain consent where required, validate data at entry, and classify it as soon as possible so the right controls apply from the start.",
   "Storage means keeping data in databases, files, warehouses, lakes or cloud services with appropriate protection: access controls, encryption, backups and resilience appropriate to its classification. Storage location matters for sovereignty rules, and every extra copy, such as extracts, spreadsheets and test environments, adds risk and cost.",
   "Use covers processing and analysis: querying, transforming, reporting and modeling. Use should stay within the purpose for which data was collected and within the user's authorization. Analysts should work with the least sensitive form that answers the question, such as aggregated or pseudonymized data rather than full personal records.",
   "Sharing (distribution) moves data to others, whether internal teams, partners, vendors, regulators or the public. Before sharing, confirm it is permitted, share only what is needed, use secure transfer methods, and put agreements such as data sharing or processing agreements in place with external parties. Track what was shared with whom.",
   "Archiving moves data that is no longer in active use, but must be kept, to cheaper, long-term storage with restricted access. Archived data still falls under retention and protection rules and must stay retrievable if needed for audits or legal requests.",
   "Destruction (secure disposal) removes data permanently once its retention period ends and no legal hold applies. Methods depend on the medium: secure deletion or overwriting, cryptographic erasure (destroying the encryption keys), degaussing magnetic media, or physically shredding drives and paper. Disposal must cover every copy, including backups according to their own cycles, laptops, exported files and cloud storage, and should be documented with a certificate of destruction for high-sensitivity data. Keeping data longer than necessary increases breach exposure and can itself violate privacy laws."
  ],
  terms: [
   ["Data life cycle", "The stages data passes through from collection to storage, use, sharing, archiving and destruction."],
   ["Archiving", "Moving inactive data that must be retained to long-term, lower-cost storage with restricted access."],
   ["Secure disposal", "Permanently destroying data at the end of its retention period so it cannot be recovered."],
   ["Cryptographic erasure", "Making encrypted data unrecoverable by destroying its encryption keys."]
  ],
  example: "A retailer's retention policy says loyalty program data is deleted two years after an account closes. An audit finds the warehouse purge works, but copies survive in analysts' old extracts and a vendor's system. The company adds its extract folders and vendor contracts to the disposal process, requires vendors to certify deletion, and schedules automated cleanup of analyst workspaces.",
  tip: "Data kept past its retention period, especially stray copies, is a disposal-stage failure. Collect only what you need at the start, and delete every copy at the end.",
  check: [
   ["At which life-cycle stage should data be classified, and why?", "At or near collection, so the right protection, access and retention rules apply from the start rather than after the data has spread."],
   ["What is the difference between archiving and disposal?", "Archiving keeps data that must be retained in long-term, restricted storage; disposal permanently destroys data that no longer needs to be kept."]
  ]
 }
], { reviewed: "2026-09-25" });
