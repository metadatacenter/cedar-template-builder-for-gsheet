# CEDAR Template Builder for Google Sheets

A app tool to streamline the creation and management of CEDAR metadata templates that works seamlessly with Google Sheets.

## Development Setup

1. Install [clasp](https://github.com/google/clasp).
   ```
   npm install -g @google/clasp
   ```

2. Clone this repository.
   ```
   git clone https://github.com/metadatacenter/cedar-template-builder-for-gsheet.git
   ```

3. Create a new spreadsheet file in your project folder in Google Drive.

   <img width="400" alt="Screenshot 2024-12-03 at 2 38 23 PM" src="https://github.com/user-attachments/assets/b7bffe31-9674-48e9-b44a-08fbe071479f">


5. Select **Extensions > Apps Script** to open the script editor.

   <img width="420" alt="Screenshot 2024-12-03 at 2 39 44 PM" src="https://github.com/user-attachments/assets/9ecf3ff6-87d4-40bc-9697-4dc757229e66">


6. Select **Project Settings** from the left-hand side menu bar, and copy the Script ID using the "Copy" button.

   <img width="400" alt="Screenshot 2024-12-03 at 2 42 50 PM" src="https://github.com/user-attachments/assets/7b8c1c7f-360e-4b51-b68a-c1048e46a0db">

8. Clone the project using the Script ID.
   ```
   $ cd cedar-template-builder-for-gsheet
   $ clasp clone [SCRIPT ID] --rootDir `pwd`
   ```
   
9. Push the files from GitHub to Google Sheets' apps script project.
   ```
   clasp push
   ```
   
10. Refresh the spreadsheet to activate the code.

    <img width="450" alt="Screenshot 2024-12-03 at 3 08 41 PM" src="https://github.com/user-attachments/assets/db0875b5-784a-4ec3-b282-79e9b8953efe">



