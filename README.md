# CEDAR Template Builder for Google Sheets

A app tool to streamline the creation and management of CEDAR metadata templates that works seamlessly with Google Sheets.

## Development Setup

1. Install [clasp](https://github.com/google/clasp).
   ```
   npm install -g @google/clasp
   ```

2. Clone this project to your local machine.
   ```
   git clone https://github.com/metadatacenter/cedar-template-builder-for-gsheet.git
   ```

3. Create a new spreadsheet file in your project folder in Google Drive.

   <img width="400" alt="Screenshot 2024-12-03 at 2 38 23 PM" src="https://github.com/user-attachments/assets/b7bffe31-9674-48e9-b44a-08fbe071479f">


5. In your spreadsheet, go to **Extensions > Apps Script** to open the script editor.

   <img width="420" alt="Screenshot 2024-12-03 at 2 39 44 PM" src="https://github.com/user-attachments/assets/9ecf3ff6-87d4-40bc-9697-4dc757229e66">


6. In the Apps Script editor, go to **Project Settings** from the left-hand menu bar and copy the Script ID using the "Copy" button.

   <img width="400" alt="Screenshot 2024-12-03 at 2 42 50 PM" src="https://github.com/user-attachments/assets/7b8c1c7f-360e-4b51-b68a-c1048e46a0db">

8. Navigate to the project folder and link it to your remote Apps Script project using the Script ID:
   ```
   $ cd cedar-template-builder-for-gsheet
   $ clasp clone [PASTE SCRIPT ID HERE] --rootDir `pwd`
   ```
   
9. Push the files to the Apps Script project.
   ```
   clasp push
   ```
   
10. Refresh the spreadsheet to activate the code.

    <img width="450" alt="Screenshot 2024-12-03 at 3 08 41 PM" src="https://github.com/user-attachments/assets/db0875b5-784a-4ec3-b282-79e9b8953efe">

## Initial Setup

1. Select **Extensions > Apps Script** and navigate to **Project Settings**. Scroll down to locate **Script Properties**.

   <img width="500" alt="Screenshot 2024-12-03 at 3 30 54 PM" src="https://github.com/user-attachments/assets/7ec418f1-d5de-4790-ac3b-6d0087aa2f31">


2. Add the following properties and their values.
   
   | Property | Value |
   | --- | --- |
   | glossary.fields.index_column | 2 |
   | glossary.valuesets.index_column | 3 |
   | template.index_column | 2 |
   | value_selection_limit | 100 |
   | value_selection_offset | 25 |
   
3. Select **Automation > New metadata specification...** from the spreadsheet menu. Resolve any authorization prompts that appear.

   <img width="400" alt="Screenshot 2024-12-03 at 3 26 06 PM" src="https://github.com/user-attachments/assets/8c0cbafb-d37a-4acc-a643-aec162541f7e">

   
4. Upon initialization, three system-required sheets will be auto-generated:
   * `.FIELDS`: Used to store reusable template fields.
   * `.VALUESETS`: Used to store the value sets.
   * `.PREFIXES`: Used to store concept prefixes referenced in value sets.
