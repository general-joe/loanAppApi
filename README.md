# loan_management_system

Design and implementation of a computerized loan management system for
rejecting or approving loan requests using credit risk and evaluation models

1. User Management
   User Registration: System should allow new users (customers, admin) to register.
   User Authentication: Secure login and logout for all users.
   Role-Based Access Control: Different permissions for customers, and admin.

2. Loan Application Management
   Loan Application Submission: Customers can submit loan applications with required details.
   Document Upload: Ability for customers to upload necessary documents (e.g., ID proof, income proof).
   Application Tracking: Customers can track the status of their loan applications.
   Notification System: Automatic notifications (email/SMS) for application status updates.

3. Credit Risk Evaluation
   Credit Score Retrieval: Integration with external credit score providers to retrieve applicant's credit score.
   Risk Assessment Models: Implementation of various credit risk models (e.g., FICO score, custom risk models) to evaluate loan applications.
   Automated Decision Making: Automated system for approving or rejecting loan requests based on credit risk evaluation.

Key Components of a Credit Scoring System
Data Collection

Personal Information: Name, address, date of birth, Ghana Card number.
Credit History: Details of past and current credit accounts, including loans, mortgages.
Payment History: Records of on-time, late, and missed payments.
Outstanding Debt: Total amount of debt currently owed.
Length of Credit History: Duration of credit accounts and their activity.
Credit Mix: Types of credit accounts (e.g., credit cards, installment loans, mortgages).
New Credit Inquiries: Number of recent applications for new credit.

Risk Assessment
Key Components
Personal Information: Name, address, date of birth, etc.
Credit History: Credit accounts, payment history, outstanding debts, etc.
Financial Information: Income, employment status, savings, etc.
Public Records: Bankruptcies, liens, judgments, etc.
Behavioral Data: Spending patterns, transaction history, etc.

Scoring Mechanism:

Score Ranges: Defining score ranges (e.g., 300-850) where higher scores represent lower risk.
Weighting Factors: Assigning weights to different factors such as payment history, credit utilization, length of credit history, new credit, and types of credit used.

300 - 850 points

Personal information (KYC)

Name
Date of Birth
National ID
Passport Picture
Marital Status
Number of Dependents

Contact Information
Home Address (Current and Previous, if applicable)
Phone Number
Email Address

Employment Information
Current Employer Name
Employer Address
Job Title/Position
Length of Employment
Employment Type (Full-time, Part-time, Contract, Self-employed)
Previous Employment Details (if current employment is less than 2 years)

Guarantor Information
Name
Address
Phone Number
Relationship

Financial Information
Company Name
Job Title
Monthly Salary
Other Income
Type of Job (Trader/ Employeed)
Job Location
Employment Status (Employeed/Suspended/Fired/UnEmployed)
Savings Account Number
Account Bank
No of Businesses

Financial Information
Monthly Income
Salary/Wages
Bonuses/Commissions
Other Sources of Income (e.g., rental income, investment income)
Monthly Expenses
Rent/Mortgage Payments
Utilities
Groceries
Transportation
Insurance
Other Regular Expenses

Credit History
Credit Accounts
Type of Loan (Mortgage/Installment Loan)
Payment History
Outstanding Debt
Record of Default
record of successful
Loan length
age of first loan

Credit and Debt Information
Current Debts
Credit Card Balances
Existing Loans (personal, auto, mortgage, student)
Outstanding Balances
Monthly Payment Obligations
Credit History
Details of Previous Loans
Repayment History
Any Defaults or Late Payments

Public Records
Bankruptcies
Criminal Record
Nationality (Ghanaian / Foreigner)
if foreigner country name

Behavorial Data
Spending Pattern
Bank Statement
Transaction History

Loan Management

Loan Details
Loan Amount Requested
Purpose of the Loan (e.g., home improvement, debt consolidation, medical expenses, education)
Preferred Loan Term (duration)
Collateral Offered (if any)
Co-applicant Information (if applicable)

Supporting Documents
Proof of Identity (e.g., passport, driver’s license)
Proof of Address (e.g., utility bill, lease agreement)
Proof of Income (e.g., recent pay stubs, tax returns, bank statements)
Credit Report Authorization (permission for the lender to pull the applicant’s credit report)

Declarations and Agreements
Consent for Credit Check
Agreement to Terms and Conditions
Disclosure of Other Liabilities (e.g., alimony, child support)
Declaration of the accuracy of the provided information
