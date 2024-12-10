function initSettingSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingSheet = ss.insertSheet(sheetName, ss.getActiveSheet().getIndex());

  // Hide it immediately
  settingSheet.hideSheet();

  setColumn(settingSheet, 1, 1, 200);
  setColumn(settingSheet, 1, 2, 350);

  const initialColumnSize = 2;
  const initialRowSize = 16;
  settingSheet.deleteColumns(initialColumnSize+1, 26-initialColumnSize);
  settingSheet.deleteRows(initialRowSize+1, 1000-initialRowSize);

  const settingSheetRange = settingSheet.getRange(1, 1, initialRowSize, initialColumnSize);
  settingSheetRange.setHorizontalAlignment("left").setVerticalAlignment("top");

  // Set default setting variables
  setValue(settingSheet, 1, 1, ONTOLOGY_IRI);
  setValue(settingSheet, 2, 1, ONTOLOGY_ACRONYM);
  setValue(settingSheet, 3, 1, BIOPORTAL_API_KEY);

  // The sheet is protected only to the owner by default
  const protection = settingSheet.protect().setDescription('Protected ' + sheetName + ' sheet');
  const owner = ss.getOwner().getEmail();
  protection.removeEditors(protection.getEditors());
  protection.addEditors([owner]);

  return settingSheet;
}