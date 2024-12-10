function onOpen(e) {
  if (isAuthorizationRequired()) {
    // Build the menu options
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('🤖 Automation');
    
    if (isOwner()) {
      menu.addItem('New metadata specification...', 'createNew')
        .addSeparator()
        .addItem('Settings...', 'showSettingDialog')
        .addSeparator()
        .addItem('↓ Import', 'importFields')
        .addItem('↑ Export', 'exportFields')
        .addSeparator()
        .addItem('Synchronize', 'synchronizeFields')
        .addSeparator()
        .addItem('Rename a field...', 'none')
        .addSeparator()
        .addItem('Convert to CEDAR template...', 'none')
        .addItem('Convert to LinkML schema...', 'generateLinkMl')
        .addSeparator()
        .addItem('Generate SKOS vocabulary...', 'generateSkos')
        .addSeparator()
        .addItem('Publish metadata specification to CEDAR', 'none')
        .addItem('Publish metadata vocabulary to BioPortal', 'none')
        .addSeparator()
        .addItem('Update access rights', 'updateAccessRights');
    } else {
      menu.addItem('New metadata specification...', 'createNew')
        .addSeparator()
        .addItem('↓ Import', 'importFields')
        .addItem('↑ Export', 'exportFields')
        .addSeparator()
        .addItem('Synchronize', 'synchronizeFields')
        .addSeparator()
        .addItem('Rename a field...', 'none')
        .addSeparator()
        .addItem('Convert to CEDAR template...', 'none')
        .addItem('Convert to LinkML schema...', 'generateLinkMl')
        .addSeparator()
        .addItem('Generate SKOS vocabulary...', 'generateSkos');
    }
    menu.addToUi();
  }
};

function none() {
  alert('Not implemented yet');
}

function onEdit(e) { 
  const ss = SpreadsheetApp.getActiveSpreadsheet(); 
  const sheet = ss.getActiveSheet();
  const sheetName = sheet.getSheetName();

  if (!sheetName.startsWith(".")) {
    const range = e.range;
    const lastColumn = range.getLastColumn();
    if (lastColumn === TEMPLATE_FIELD_NAME) {
      const startColumn = range.getColumn();
      const numRows = range.getNumRows();
      [...Array(numRows).keys()].forEach((rowIndex) => {
        if (startColumn === 1) {
          autoFillOut(range.offset(rowIndex, 1, 1, 1));
        } else if (startColumn === 2) {
          autoFillOut(range.offset(rowIndex, 0, 1, 1));
        }
      });
    }
  }
}

function autoFillOut(cell) {
  const templateColumnIndex = cell.getColumn();
  if (templateColumnIndex != TEMPLATE_FIELD_NAME) {
    return;
  }
  const fieldName = cell.getValue();
  if (fieldName == "") {
    return;
  }
  const rowIndex = cell.getRow();

  const ss = SpreadsheetApp.getActiveSpreadsheet(); 
  const templateSheet = ss.getActiveSheet();

  const searchResult = searchField(fieldName);
  if (searchResult.success) {
    Logger.log("Copying '" + fieldName + "' definition to the template sheet");
    const fieldDefinitionRange = searchResult.data.range.offset(0, 1);
    setValuesByRow(templateSheet, rowIndex, fieldDefinitionRange.getValues(), startingColumn=TEMPLATE_FIELD_NAME);
    setRichTextUrl(templateSheet, rowIndex, TEMPLATE_PERMISSIBLE_VALUES, fieldDefinitionRange.offset(0, 2, 1, 1).getRichTextValue()); // view link
    setRichTextUrl(templateSheet, rowIndex, TEMPLATE_VALUE_SET_IRI, fieldDefinitionRange.offset(0, 3, 1, 1).getRichTextValue()); // lookup link
  } else { 
    setValuesByRow(templateSheet, rowIndex, [["","","","","","",""]], startingColumn=TEMPLATE_FIELD_DESCRIPTION);
  }
}

function showReport(title, htmlText) {
  const message = HtmlService.createHtmlOutput(htmlText)
    .setWidth(300)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(message, title);
}

function asList(str) {
  return `<li>${str}</li>`;
}

function updateAccessRights() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const progressBar = startProcessing(ss, "Updating, please wait...");

  // Populate the owner and editors
  const owner = ss.getOwner();
  const editors = ss.getEditors();
  const authorizedUsers = [owner, ...editors];
  const sheets = ss.getSheets();
  
  sheets.forEach(sheet => {
    // Get the protection for the sheet
    const protection = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET)[0];
    if (protection?.canEdit()) { // check if the user has permission to edit it.
      // Reset the protection for current editors
      protection.removeEditors(protection.getEditors());
      // Assign the access to new authorized users as new editors
      protection.addEditors(authorizedUsers);
    }
  });

  finishProcessing(ss, progressBar);
}
