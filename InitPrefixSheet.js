function initPrefixSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const prefixSheet = ss.insertSheet(sheetName, ss.getActiveSheet().getIndex());
  setColumn(prefixSheet, 1, 1, 100);
  setColumn(prefixSheet, 1, 2, 350);

  const initialColumnSize = 2;
  const initialRowSize = 16;
  prefixSheet.deleteColumns(initialColumnSize+1, 26-initialColumnSize);
  prefixSheet.deleteRows(initialRowSize+1, 1000-initialRowSize);

  const prefixSheetRange = prefixSheet.getRange(1, 1, initialRowSize, initialColumnSize);
  prefixSheetRange.setHorizontalAlignment("left").setVerticalAlignment("top");

  // Set default setting variables
  setValue(prefixSheet, 1, 1, "rdf");
  setValue(prefixSheet, 1, 2, "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  setValue(prefixSheet, 2, 1, "rdfs");
  setValue(prefixSheet, 2, 2, "http://www.w3.org/2000/01/rdf-schema#");
  setValue(prefixSheet, 3, 1, "owl");
  setValue(prefixSheet, 3, 2, "http://www.w3.org/2002/07/owl#");
  setValue(prefixSheet, 4, 1, "xsd");
  setValue(prefixSheet, 4, 2, "http://www.w3.org/2001/XMLSchema#");
  setValue(prefixSheet, 5, 1, "obo");
  setValue(prefixSheet, 5, 2, "http://purl.obolibrary.org/obo/");

  // The sheet is protected only to the owner by default
  const protection = prefixSheet.protect().setDescription('Protected ' + sheetName + ' sheet');
  const owner = ss.getOwner().getEmail();
  protection.removeEditors(protection.getEditors());
  protection.addEditors([owner]);

  return prefixSheet;
}