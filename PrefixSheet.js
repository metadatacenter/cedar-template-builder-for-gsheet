function getPrefixSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PREFIX_SHEET);
}

function getPrefixData() {
  const prefixSheet = getPrefixSheet();
  return prefixSheet.getRange(1, 1, prefixSheet.getLastRow(), 2).getValues();
}

function getPrefixMap() {
  const data = getPrefixData();
  return Object.assign(...data.map(([k, v]) => ({ [k]: v })));
}