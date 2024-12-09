function getSettingSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTING_SHEET);
}

function showSettingDialog() {
  const settings = getSettings(); // Fetch existing settings
  const html = HtmlService.createHtmlOutputFromFile('SettingDialog')
    .setWidth(550)
    .setHeight(240)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .append(`<script>window.settings = ${JSON.stringify(settings)};</script>`);
  SpreadsheetApp.getUi().showModalDialog(html, 'Settings');
}

function getSettings() {
  const sheet = getSettingSheet();
  const data = sheet.getDataRange().getValues();
  const settings = {};
  
  // Map key-value pairs from the settings table
  for (let i = 0; i < data.length; i++) {
    settings[data[i][0]] = data[i][1]; // Key is in column 1, value in column 2
  }
  return settings;
}

function saveSettings(parameters) {
  const sheet = getSettingSheet();

  // Iterate through the parameters and save them to the .SETTINGS sheet
  Object.keys(parameters).forEach(key => {
    const rowIndex = findRowByKey(sheet, key);
    if (rowIndex > 0) {
      // Update existing parameter
      sheet.getRange(rowIndex, 2).setValue(parameters[key]);
    } else {
      alert("Unknown " + key);
    }
  });
}

function findRowByKey(sheet, key) {
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === key) {
      return i + 1; // Return row index (1-based)
    }
  }
  return -1; // Key not found
}

