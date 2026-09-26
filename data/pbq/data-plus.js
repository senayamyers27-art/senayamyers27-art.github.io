/* Performance-based simulations for CompTIA Data+ (DA0-002). */
CertHub.addPbqs("data-plus", [
  { id: "data-store-match", d: 1, type: "match", title: "Match data stores to their descriptions",
    prompt: "A company is reviewing where its data lives. Match each data store to the description that fits it best.",
    pairs: [
      ["Data warehouse", "Cleaned, integrated history from many systems, modeled for reporting (schema on write)"],
      ["Data lake", "Raw files of any type kept in native format, structured only when read (schema on read)"],
      ["Data mart", "A subject-focused subset built for one department, such as finance"],
      ["OLTP database", "Handles many small, fast inserts and updates that run daily operations"],
      ["Graph database", "Stores nodes and relationships to answer multi-hop connection questions quickly"]
    ],
    extra: ["Stores values that can only be retrieved by a single unique key", "A spreadsheet shared by email each month"],
    explain: "Warehouses apply a schema when data is loaded and integrate cleaned history, while lakes keep raw data and apply structure at read time. A data mart is a smaller subject-area slice, often of a warehouse. OLTP systems record transactions as they happen, and graph databases store relationships directly. The key-value description fits a key-value store, which is not in the list." },

  { id: "data-type-match", d: 1, type: "match", title: "Choose the right data type for each column",
    prompt: "You are defining columns for a new customer orders table. Match each sample value to the most appropriate data type.",
    context: "Column          Sample value\nzip_code        02134\nunit_price      19.99   (must total exactly to the cent)\norder_date      2025-03-14\nopted_in        TRUE\nunits_in_stock  42",
    pairs: [["zip_code", "String (text)"], ["unit_price", "Fixed-precision decimal"], ["order_date", "Date"], ["opted_in", "Boolean"], ["units_in_stock", "Integer"]],
    extra: ["Binary large object (BLOB)", "Floating point"],
    explain: "ZIP codes are identifiers, so text keeps the leading zero. Money needs an exact decimal type; floating point stores binary approximations that can drift by a cent in totals. A calendar date belongs in a date type so it sorts and groups correctly, a yes/no flag is a Boolean, and a count of units is a whole number." },

  { id: "sql-having-result", d: 2, type: "fill", title: "Predict the result of a GROUP BY query",
    prompt: "Read the orders table and the query, then fill in what the query returns.",
    context: "orders\norder_id | region | amount | status\n1        | East   | 300    | Complete\n2        | West   | 450    | Complete\n3        | East   | 250    | Cancelled\n4        | North  | 200    | Complete\n5        | West   | 150    | Complete\n6        | East   | 400    | Complete\n7        | North  | 350    | Complete\n8        | West   | 100    | Cancelled\n\nSELECT region, SUM(amount) AS revenue\nFROM orders\nWHERE status = 'Complete'\nGROUP BY region\nHAVING SUM(amount) > 575\nORDER BY revenue DESC;",
    fields: [
      { label: "Number of rows returned", answers: ["2", "two"] },
      { label: "Region in the first row", answers: ["East"] },
      { label: "Revenue in the first row", answers: ["700"] },
      { label: "Revenue for West", answers: ["600"] }
    ],
    explain: "WHERE runs first and removes the two cancelled orders. Grouping the remaining rows gives East 300 + 400 = 700, West 450 + 150 = 600 and North 200 + 350 = 550. HAVING keeps only groups above 575, so North drops out, and ORDER BY revenue DESC puts East first. Counting the cancelled rows would wrongly give East 950 and West 700." },

  { id: "sql-logical-order", d: 2, type: "order", title: "Order the logical processing of a SQL query",
    prompt: "A query uses SELECT, FROM, WHERE, GROUP BY, HAVING and ORDER BY. Put the clauses in the order the database logically processes them.",
    steps: [
      "FROM: identify the source table(s) and apply joins",
      "WHERE: filter individual rows",
      "GROUP BY: collapse remaining rows into groups",
      "HAVING: filter the groups using aggregates",
      "SELECT: compute the output columns and aliases",
      "ORDER BY: sort the final result"
    ],
    explain: "SQL is written starting with SELECT but processed starting with FROM. Because WHERE runs before GROUP BY, it cannot use aggregates such as SUM; those conditions belong in HAVING. SELECT runs after HAVING, which is why a column alias usually works in ORDER BY but not in WHERE." },

  { id: "dq-flag-rows", d: 2, type: "select", title: "Flag rows with data quality problems",
    prompt: "Profile this customer extract. Select every row that should be flagged for a data quality problem. For duplicates, flag only the later copy.",
    context: "cust_id | name       | email                  | state  | birth_date\nC101    | Ana Lopez  | ana.lopez@example.com  | CA     | 1988-04-12\nC102    | Ben Ortiz  | ben.ortiz@example      | TX     | 1991-11-03\nC103    | Chloe Park | chloe.park@example.com | NY     | 1979-07-22\nC104    | Dev Rao    |                        | WA     | 1995-02-30\nC105    | Ana Lopez  | ana.lopez@example.com  | CA     | 1988-04-12\nC106    | Eli Stone  | eli.stone@example.com  | Calif. | 1983-09-09\nC107    | Fay Green  | fay.green@example.com  | OR     | 2090-01-15\nC108    | Gus Hall   | gus.hall@example.com   | IL     | 1970-12-01",
    options: ["C101", "C102", "C103", "C104", "C105", "C106", "C107", "C108"],
    answers: [1, 3, 4, 5, 6],
    explain: "C102's email has no top-level domain, so it is invalid. C104 is missing its email and has an impossible date (February 30). C105 repeats C101 exactly, so the later copy is a duplicate. C106 uses 'Calif.' instead of the two-letter code, which is inconsistent formatting. C107's birth date is in the future. C101, C103 and C108 pass every check." },

  { id: "descriptive-stats-fill", d: 3, type: "fill", title: "Calculate descriptive statistics",
    prompt: "A support team logged these ticket resolution times in hours. Calculate the statistics below.",
    context: "Resolution times (hours), sorted:\n4, 7, 7, 8, 10, 12, 13, 15, 32",
    fields: [
      { label: "Mean", answers: ["12", "12.0"] },
      { label: "Median", answers: ["10", "10.0"] },
      { label: "Mode", answers: ["7"] },
      { label: "Range", answers: ["28"] }
    ],
    explain: "The nine values sum to 108, so the mean is 108 ÷ 9 = 12. With nine sorted values the median is the fifth, 10. The value 7 appears twice, so it is the mode, and the range is 32 − 4 = 28. The single 32-hour ticket pulls the mean above the median, a sign of right skew, so the median better describes a typical ticket." },

  { id: "performance-math", d: 3, type: "fill", title: "Work out change, variance and a z-score",
    prompt: "Use the figures below to fill in each value. Enter plain numbers; use a minus sign for negative values.",
    context: "Quarterly revenue\nQ1 actual: 80,000\nQ2 actual: 92,000\nQ2 budget: 100,000\n\nAgent quality scores: mean 70, standard deviation 6\nAgent Kim's score: 85",
    fields: [
      { label: "Percent change in revenue from Q1 to Q2 (%)", answers: ["15", "15%", "+15", "+15%"] },
      { label: "Q2 variance to budget (actual minus budget)", answers: ["-8000", "-8,000"] },
      { label: "Q2 variance as a percent of budget (%)", answers: ["-8", "-8%"] },
      { label: "Kim's z-score", answers: ["2.5", "+2.5"] }
    ],
    explain: "Percent change divides by the old value: (92,000 − 80,000) ÷ 80,000 = 15%. Variance to plan is 92,000 − 100,000 = −8,000, and dividing by the budget gives −8%. The z-score is (85 − 70) ÷ 6 = 2.5, meaning Kim scored two and a half standard deviations above the mean. Dividing by the new or actual value instead of the base is the classic mistake." },

  { id: "ab-test-read", d: 3, type: "select", title: "Interpret A/B test output",
    prompt: "Read the A/B test summary. Select every statement that is a correct interpretation.",
    context: "Test: new checkout page (B) vs current page (A)\nVisitors A: 10,000   Conversions A: 480   Rate A: 4.80%\nVisitors B: 10,000   Conversions B: 545   Rate B: 5.45%\nDifference (B - A): +0.65 percentage points\n95% CI for difference: +0.04 to +1.26 percentage points\np-value: 0.037   Significance level (alpha): 0.05",
    options: [
      "The result is statistically significant at the 5% level",
      "The null hypothesis of no difference is rejected",
      "There is a 3.7% probability that the null hypothesis is true",
      "The relative lift in conversion rate is about 13.5%",
      "The confidence interval includes zero, so the result is inconclusive",
      "The test proves page B raises conversion in every customer segment",
      "At a significance level of 0.01, the result would not be significant"
    ],
    answers: [0, 1, 3, 6],
    explain: "Because 0.037 is below 0.05, the result is significant and the null hypothesis is rejected; it would not be significant at 0.01. The relative lift is 0.65 ÷ 4.80, about 13.5%. A p-value is not the probability that the null is true, the interval (+0.04 to +1.26) does not include zero, and an overall test says nothing about every segment." },

  { id: "chart-choice-match", d: 4, type: "match", title: "Pick the right chart for each question",
    prompt: "Stakeholders sent these requests for a new dashboard. Match each request to the most suitable visual.",
    pairs: [
      ["How has monthly revenue changed over the last 36 months?", "Line chart"],
      ["Which of our six product lines earned the most revenue this year?", "Bar chart"],
      ["Is advertising spend related to sales across our 200 stores?", "Scatter plot"],
      ["How are order delivery times distributed?", "Histogram"],
      ["How do salary medians, spread and outliers compare across five departments?", "Box plot"],
      ["Which states generate the most revenue?", "Filled (choropleth) map"]
    ],
    extra: ["Pie chart", "Gauge"],
    explain: "Lines show trends over time, bars compare categories, and scatter plots reveal relationships between two numeric variables. A histogram shows the distribution of one numeric variable, and a box plot compares distributions, including outliers, across groups. A filled map suits geographic comparisons. A pie chart only fits a few parts of one whole, and a gauge shows a single value against a target." },

  { id: "dashboard-review", d: 4, type: "select", title: "Review a draft dashboard",
    prompt: "A colleague asks you to review this draft executive dashboard. Select every element that is a design or reporting problem.",
    context: "1. Title: 'Monthly Sales, Jan 2024 – Dec 2025'\n2. KPI cards top left: Revenue, Orders, Avg order value, each with a vs-target arrow\n3. Bar chart of revenue by region, y-axis starts at 900,000\n4. Line chart of monthly revenue for the last 24 months\n5. 3D pie chart with 11 product categories\n6. Status column uses red or green cell fill only, with no text or icons\n7. Region slicer at the top, applied to all visuals\n8. Footer 'Data as of' field is blank",
    options: ["Item 1: title", "Item 2: KPI cards", "Item 3: regional bar chart", "Item 4: monthly line chart", "Item 5: product pie chart", "Item 6: status column", "Item 7: region slicer", "Item 8: footer"],
    answers: [2, 4, 5, 7],
    explain: "A bar chart must start at zero, or small differences look huge. A 3D pie with 11 slices distorts sizes and is unreadable; a sorted bar chart works better. Color alone fails readers with color vision deficiency, so add text or icons. A blank as-of date leaves readers unable to tell how current the data is. The title, KPI cards, trend line and global slicer follow good practice." },

  { id: "governance-roles", d: 5, type: "match", title: "Identify data governance roles",
    prompt: "Match each person or activity to the governance role it represents.",
    pairs: [
      ["The VP of Sales approves who may access the customer pipeline data", "Data owner"],
      ["A sales operations specialist maintains the definition of 'qualified lead' and its quality rules", "Data steward"],
      ["A database administrator configures backups, encryption and permissions", "Data custodian"],
      ["An analyst builds a weekly report from the certified dataset", "Data consumer"],
      ["A customer whose details are stored in the CRM", "Data subject"]
    ],
    extra: ["Data auditor"],
    explain: "The owner is the accountable business leader who decides classification and access. The steward manages definitions and quality day to day, and the custodian implements the technical controls the owner decides on. Consumers use the data under policy, and the data subject is the person the personal data describes. Confusing owner and custodian is the most common error." },

  { id: "phi-deidentify", d: 5, type: "select", title: "Choose columns to remove before sharing",
    prompt: "A hospital will send a visit extract to an outside vendor for a region-level volume analysis. Select every column that must be removed or de-identified before sharing.",
    context: "patient_visits extract (one row per visit)\npatient_name          e.g. 'Maria Chen'\nmedical_record_number e.g. 'MRN-0048213'\ndate_of_birth         e.g. '1964-08-19'\nhome_street_address   e.g. '12 Elm Street'\nclinic_region         e.g. 'Northeast' (multi-state region)\nvisit_year            e.g. '2025'\ndepartment            e.g. 'Cardiology'\npatient_email         e.g. 'm.chen@example.com'",
    options: ["patient_name", "medical_record_number", "date_of_birth", "home_street_address", "clinic_region", "visit_year", "department", "patient_email"],
    answers: [0, 1, 2, 3, 7],
    explain: "Names, record numbers, full birth dates, street addresses and email addresses identify individuals, so linked to visits they make the extract PHI. A multi-state region, the year alone and the department are not direct identifiers and support the region-level analysis. Keeping only the fields the vendor needs also follows the minimum necessary principle." }
]);
