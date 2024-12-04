# CEDAR Template Builder for Google Sheets

An app tool to streamline the creation and management of CEDAR metadata templates that works seamlessly with Google Sheets.

## Installation

This step-by-step instruction will guide you to install the app tool from its source code to your own spreadsheet in Google Sheets.

1. Install [clasp](https://github.com/google/clasp).
   ```
   npm install -g @google/clasp
   ```

2. Enable the Google Apps Script API by visiting https://script.google.com/home/usersettings.
   
   <img width="500" alt="Screenshot 2024-12-04 at 11 58 18 AM" src="https://github.com/user-attachments/assets/40244387-5555-4add-9625-8c42033019a1">


3. Login to your Google Drive account to enable the CLI commands.
   ```
   clasp login
   ```

4. Clone this project to your local machine.
   ```
   git clone https://github.com/metadatacenter/cedar-template-builder-for-gsheet.git
   ```

5. Create a new spreadsheet file in your project folder in Google Drive.

   <img width="500" alt="Screenshot 2024-12-03 at 2 38 23 PM" src="https://github.com/user-attachments/assets/b7bffe31-9674-48e9-b44a-08fbe071479f">


6. In your spreadsheet, go to **Extensions > Apps Script** to open the script editor.

   <img width="520" alt="Screenshot 2024-12-03 at 2 39 44 PM" src="https://github.com/user-attachments/assets/9ecf3ff6-87d4-40bc-9697-4dc757229e66">


7. In the Apps Script editor, go to **Project Settings** from the left-hand menu bar and copy the Script ID using the "Copy" button.

   <img width="500" alt="Screenshot 2024-12-03 at 2 42 50 PM" src="https://github.com/user-attachments/assets/7b8c1c7f-360e-4b51-b68a-c1048e46a0db">

8. Navigate to the project folder and link it to your remote Apps Script project using the Script ID.
   ```
   $ cd cedar-template-builder-for-gsheet
   $ clasp clone [PASTE SCRIPT ID HERE] --rootDir `pwd`
   ```
   
9. Push the files to the Apps Script project.
   ```
   clasp push
   ```
   
10. Refresh the spreadsheet to activate the code.

    <img width="550" alt="Screenshot 2024-12-03 at 3 08 41 PM" src="https://github.com/user-attachments/assets/db0875b5-784a-4ec3-b282-79e9b8953efe">

## Initial Setup

Follow this instruction to set up the environment variables and initialize the tool for the first time.

1. Select **Extensions > Apps Script** and navigate to **Project Settings**. Scroll down to locate **Script Properties**.

   <img width="550" alt="Screenshot 2024-12-03 at 3 30 54 PM" src="https://github.com/user-attachments/assets/7ec418f1-d5de-4790-ac3b-6d0087aa2f31">

2. Add the following properties and their values.
   
   | Property | Value |
   | --- | --- |
   | glossary.fields.index_column | 2 |
   | glossary.valuesets.index_column | 3 |
   | template.index_column | 2 |
   | value_selection_limit | 100 |
   | value_selection_offset | 25 |
   
3. Go back to the spreadsheet and select **Automation > New metadata specification...** from the spreadsheet menu. Resolve any authorization prompts that appear.

   <img width="400" alt="Screenshot 2024-12-03 at 3 26 06 PM" src="https://github.com/user-attachments/assets/8c0cbafb-d37a-4acc-a643-aec162541f7e">
   
4. Executing the create a new metadata specification command for the first time will trigger the auto-generation of 3 system-required sheets for storing the fields, value sets and prefixes:
   * `.FIELDS`: Used to store reusable template fields.
   * `.VALUESETS`: Used to store the value sets.
   * `.PREFIXES`: Used to store concept prefixes referenced in value sets.
  
5. Enter a preferred name for the new metadata specification in the dialog box. This will automatically generate a new sheet where you can define the specification.

6. Share the spreadsheet with the setting **"Anyone with the link"** and grant at least **Viewer** access to grant a read access to third-party APIs.

   <img width="500" alt="Screenshot 2024-12-03 at 5 10 09 PM" src="https://github.com/user-attachments/assets/45c7bb4b-d192-4f3e-b489-691fc6bf6f87">


## Contributing

Follow the workflow below to contribute on the code development of this software.

1. Navigate to the project folder and make a new branch and switch to it.
   ```
   git checkout -b feat/xyz
   ```
   
2. Write your code using the Apps Script editor in the browser.
3. Download the new code to your local project folder.
   ```
   clasp pull
   ```
   
4. Create a commit.
   ```
   $ git add .
   $ git commit -m "Add a detailed commit message describing your changes."
   ```
   
5. Push the branch to GitHub.
   ```
   git push --set-upstream origin feat/xyz
   ```

6. Create the pull request.
   ```
   gh pr create --base main --head feat/xyz --title "Your PR title" --body "Detailed description of the changes"
   ```

7. Or alternatively, you can visit the project GitHub page from the browser to create the pull request interactively.
