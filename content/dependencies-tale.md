+++
title = "Building a Dynamic Data Pipeline from Scratch with Snowflake and Python"
description = "Data Pipelines are very crucial to data modeling and training. Inthis blog we will design a pipeline from very scratch using Python , snowflake and numpy."
date = 2024-04-12
[taxonomies] 
tags = ["DataPipeline", "python", "snowflake"]
+++

### The problem statement

Sells 44 is an E-comerce platform which need some user data for it campaign. you are hence asked to extracts sales data from Snowflake, performs transformation using Pandas and NumPy (e.g., handling missing values and aggregating sales by region), and then saves the final output back to Snowflake or to a CSV for further analysis.

### System Design

#### 1. Components
- *Snowflake:* The cloud-based data warehouse where the raw sales data is stored.
- Python: The programming language used for data pipeline orchestration.
- Snowflake Connector for Python: This allows seamless interaction with Snowflake to extract and load data.
- Pandas: Used for data manipulation, cleaning, and transformation.
- NumPy: Used for numerical operations and advanced calculations.
- CSV Output or Data Persistence: The final transformed data can be written back to Snowflake or exported as a CSV for external use. 

#### 2. Flow (The ETL)
- Extract: Fetch raw sales data from Snowflake.
- Transform: Clean the data using Pandas (handle missing values, filter, group, and calculate). Use NumPy for any complex numerical operations.
- Load: Save the transformed data either back into Snowflake or export as a CSV for further reporting.
- Establish a Snowflake Connection: Connects to Snowflake using your credentials and account information.
- Extract: Runs a SQL query to fetch sales data.
- Pandas Transformation:
   - Missing Values: Fills missing values in the sales_amount column with the mean.
   - NumPy Transformation: Applies a log transformation to scale the sales data using NumPy.
   - Aggregation: Groups the data by region and aggregates the total sales.
   - Load: Saves the transformed data to a CSV file or writes it back to Snowflake.

### Lets Code it 

1. Setup the Snowflake Connector
You'll need to install the Snowflake connector and Pandas library:

```pip install snowflake-connector-python pandas numpy```

2. Code for the Data Pipeline:

```
import snowflake.connector
import pandas as pd
import numpy as np

# Step 1: Establish connection to Snowflake
conn = snowflake.connector.connect(
    user='your_username',
    password='your_password',
    account='your_account_url'
)

# Step 2: Query Snowflake to extract data
query = """
SELECT region, sales_amount, sales_date
FROM sales_data
WHERE sales_date >= '2024-01-01'
"""

# Step 3: Execute the query and fetch data
cur = conn.cursor()
cur.execute(query)
data = cur.fetchall()

# Step 4: Load the data into a Pandas DataFrame
columns = ['region', 'sales_amount', 'sales_date']
df = pd.DataFrame(data, columns=columns)

# Step 5: Data Cleaning and Transformation
# Fill missing values in the 'sales_amount' column with the mean
df['sales_amount'].fillna(df['sales_amount'].mean(), inplace=True)

# Use NumPy to apply advanced numerical transformations (e.g., scaling)
df['scaled_sales'] = np.log(df['sales_amount'] + 1)

# Aggregate sales by region
aggregated_data = df.groupby('region')['sales_amount'].sum().reset_index()

# Step 6: Save the transformed data back to Snowflake or to a CSV
# Save to CSV
aggregated_data.to_csv('aggregated_sales_data.csv', index=False)

# Alternatively, you can write the data back to Snowflake:
# cur.execute("CREATE OR REPLACE TABLE transformed_sales_data (region STRING, total_sales FLOAT)")
# for index, row in aggregated_data.iterrows():
#     cur.execute(f"INSERT INTO transformed_sales_data (region, total_sales) VALUES ('{row['region']}', {row['sales_amount']})")

# Close the cursor and connection
cur.close()
conn.close()

print("Data pipeline completed successfully!")
```
### Scalability:

The architecture allows easy scaling as Snowflake handles large datasets efficiently.
Python’s flexibility enables more complex transformations if needed.

### Deployment Considerations:

The pipeline can be scheduled using Jenkins jobs or GitHub Action 
```
name: Snowflake Pipeline Schedule

# Schedule to run daily at 12:00 AM (UTC)
on:
  schedule:
    - cron: '0 0 * * *'

  workflow_dispatch: # Allows manual trigger

jobs:
  run-snowflake-pipeline:
    runs-on: ubuntu-latest

    steps:
    # Step 1: Checkout the repository code
    - name: Checkout code
      uses: actions/checkout@v3

    # Step 2: Set up Python environment
    - name: Set up Python 3.x
      uses: actions/setup-python@v4
      with:
        python-version: '3.x'

    # Step 3: Install dependencies
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install snowflake-connector-python pandas numpy

    # Step 4: Run the Snowflake pipeline
    - name: Run Snowflake Data Pipeline
      env:
        SNOWFLAKE_USER: ${{ secrets.SNOWFLAKE_USER }}
        SNOWFLAKE_PASSWORD: ${{ secrets.SNOWFLAKE_PASSWORD }}
        SNOWFLAKE_ACCOUNT: ${{ secrets.SNOWFLAKE_ACCOUNT }}
      run: |
        python snowflake_pipeline.py
```




