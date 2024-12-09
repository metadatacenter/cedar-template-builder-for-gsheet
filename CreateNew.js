function createNew() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetIndex = ss.getActiveSheet().getIndex();

  /*
   * Check mandatory data storage sheets.
   */
  const hasFieldSheet = ss.getSheetByName(FIELD_STORE_SHEET);
  const hasValueSetSheet = ss.getSheetByName(VALUESET_STORE_SHEET);
  const hasPrefixSheet = ss.getSheetByName(PREFIX_STORE_SHEET);
  const hasSettingSheet = ss.getSheetByName(SETTING_STORE_SHEET);

  const missingStorageSheet = !hasFieldSheet || !hasValueSetSheet || !hasPrefixSheet || !hasSettingSheet;

  if (missingStorageSheet) {
    const progressBar = startProcessing(ss, "Issue detected! Pausing the action...");
    Utilities.sleep(3000);
    finishProcessing(ss, progressBar);
  }

  if (!hasFieldSheet) {
    const progressBar = startProcessing(ss, "Initializing " + FIELD_STORE_SHEET + " sheet...")
    initFieldSheet(FIELD_STORE_SHEET);
    finishProcessing(ss, progressBar);
  }
  if (!hasValueSetSheet) {
    const progressBar = startProcessing(ss, "Initializing " + VALUESET_STORE_SHEET + " sheet...")
    initvalueSetSheet(VALUESET_STORE_SHEET);
    finishProcessing(ss, progressBar);
  }
  if (!hasPrefixSheet) {
    const progressBar = startProcessing(ss, "Initializing " + PREFIX_STORE_SHEET + " sheet...")
    initPrefixSheet(PREFIX_STORE_SHEET);
    finishProcessing(ss, progressBar);
  }
  if (!hasSettingSheet) {
    const progressBar = startProcessing(ss, "Initializing " + SETTING_STORE_SHEET + " sheet...")
    initSettingSheet(SETTING_STORE_SHEET);
    finishProcessing(ss, progressBar);
  }

  if (missingStorageSheet) {
    const progressBar = startProcessing(ss, "Continuing new specification creation...");
    Utilities.sleep(2000);
    finishProcessing(ss, progressBar);
  }

  const specificationName = prompt("Enter the new specification name:");

  const progressBar = startProcessing(ss, "Preparing...")
  const templateSheet = ss.insertSheet(specificationName, sheetIndex);
  setHeader(templateSheet, 1, TEMPLATE_FIELD_REQUIREMENT, "", 80);
  setHeader(templateSheet, 1, TEMPLATE_FIELD_NAME, "Field Name", 175);
  templateSheet.getRange(1, 1, 1, 2).mergeAcross();
  setHeader(templateSheet, 1, TEMPLATE_FIELD_DESCRIPTION, "Field Description", 520);
  setHeader(templateSheet, 1, TEMPLATE_PERMISSIBLE_VALUES, "Enumerated Values", 150);
  setHeader(templateSheet, 1, TEMPLATE_VALUE_SET_IRI, "Lookup", 150)
  setHeader(templateSheet, 1, TEMPLATE_STRING_PATTERN, "String Pattern", 150)
  setHeader(templateSheet, 1, TEMPLATE_NUMBER_RANGE, "Number Range", 150);
  setHeader(templateSheet, 1, TEMPLATE_EXAMPLE, "Example", 150);
  setHeader(templateSheet, 1, TEMPLATE_DEFAULT_VALUE, "Default Value", 150);

  const initialColumnSize = 9;
  const initialRowSize = 16;
  templateSheet.deleteColumns(initialColumnSize+1, 26-initialColumnSize);
  templateSheet.deleteRows(initialRowSize+2, 1000-(initialRowSize+1));
  templateSheet.setFrozenRows(1);
  templateSheet.setFrozenColumns(2);

  const requirementList = ["", "Required", "Optional", "Recommended"];
  const requirementRange = templateSheet.getRange(2, TEMPLATE_FIELD_REQUIREMENT, initialRowSize, 1);
  setDataValidation(requirementRange, requirementList);
  setRangeColor(requirementRange, "#d9d1e9"); // light purple

  const fieldList = getFieldList();
  const fieldNameRange = templateSheet.getRange(2, TEMPLATE_FIELD_NAME, initialRowSize, 1);
  setDataValidation(fieldNameRange, fieldList, allowInvalid=true);
  setRangeColor(fieldNameRange, "#d9d1e9"); // light purple

  const firstColumnHeaderRange = templateSheet.getRange(1, TEMPLATE_FIELD_REQUIREMENT);
  setRangeColor(firstColumnHeaderRange, "#d9d1e9"); // light purple

  const templateRange = templateSheet.getRange(2, TEMPLATE_FIELD_REQUIREMENT, initialRowSize, initialColumnSize);
  templateRange.setHorizontalAlignment("left").setVerticalAlignment("top");

  finishProcessing(ss, progressBar);
}
