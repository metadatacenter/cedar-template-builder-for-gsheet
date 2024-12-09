function initPrefixSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const prefixSheet = ss.insertSheet(sheetName, ss.getActiveSheet().getIndex());
  setColumn(prefixSheet, 1, 1, 100);
  setColumn(prefixSheet, 1, 2, 350);

  const initialColumnSize = 2;
  const initialRowSize = 16;
  prefixSheet.deleteColumns(initialColumnSize+1, 26-initialColumnSize);
  prefixSheet.deleteRows(initialRowSize+1, 1000-initialRowSize);

  const PrefixSheetRange = prefixSheet.getRange(1, 1, initialRowSize, initialColumnSize);
  PrefixSheetRange.setHorizontalAlignment("left").setVerticalAlignment("top");

  // The sheet is protected only to the owner by default
  const protection = prefixSheet.protect().setDescription('Protected ' + sheetName + ' sheet');
  const owner = ss.getOwner().getEmail();
  protection.removeEditors(protection.getEditors());
  protection.addEditors([owner]);

  return prefixSheet;
}