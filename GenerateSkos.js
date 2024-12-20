function generateSkos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const progressBar = startProcessing(ss, "Preparing...")
  try {
    // Get the user-defined ontology IRI
    const ontologyIri = getOntologyIri();

    // Create a new sheet to contain the output
    const skosSheet = createSkosSheet();
    skosSheet.hideSheet(); // hide it

    // Generate a SKOS-Play table
    generateSkosTable(skosSheet, ontologyIri);
    SpreadsheetApp.flush();

    // Generate the SKOS file
    const file = generateSkosFile(skosSheet);
    ss.deleteSheet(skosSheet); // clean up

    // Download the file
    showDownloadDialog(file);
  }
  catch (error) {
    alert(error.message);
  } finally {
    finishProcessing(ss, progressBar);
  }
}

function getOntologyIri() {
  const ontologyIri = getSetting(ONTOLOGY_IRI);
  if (!ontologyIri) {
    if (isOwner()) {
      throw new Error("Ontology IRI is not set. Go to 'Automation > Settings...' to configure it.");
    } else {
      throw new Error("Ontology IRI is not set. Contact sheet owner to configure it.")
    }
  }
  return ontologyIri;
}

function createSkosSheet() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var skosSheet = activeSpreadsheet.getSheetByName(".SKOSPLAY");
  if (skosSheet != null) {
    activeSpreadsheet.deleteSheet(skosSheet);
  }
  skosSheet = activeSpreadsheet.insertSheet(activeSpreadsheet.getNumSheets());
  skosSheet.setName(".SKOSPLAY");
  return skosSheet;
}

function generateSkosTable(sheet, ontologyIri) {
  let endRow = 1;
  endRow = createPreamble(sheet, 1, ontologyIri);
  endRow = createHeader(sheet, endRow + 1);
  endRow = createConceptRecords(sheet, endRow + 1);
  endRow = createFieldRecords(sheet, endRow + 1);
}

function generateSkosFile(sheet) {
  const BASE_URL = "https://xls2rdf.sparna.fr/rest/convert";
  try {
    // Generate the export URL for the sheet and encode it
    const exportSheetUrl = getExportSheetUrl(sheet);
    const encodedSheetUrl = encodeURIComponent(exportSheetUrl);
    const url = `${BASE_URL}?url=${encodedSheetUrl}&lang=en`;
    
    // Fetch the SKOS file from the external service
    const response = UrlFetchApp.fetch(url);
    
    // Get the folder to store the file
    const folderId = getFolderId();
    const folder = DriveApp.getFolderById(folderId);
    
    // Generate a timestamp for the file name
    const dateTime = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HHmmss");
    
    // Create and return the file in the folder
    return folder.createFile(`skos-valueset_${dateTime}.ttl`, response.getContentText());
  } catch (error) {
    // Handle and log any errors
    throw new Error(`Failed to generate SKOS file: ${error.message}`);
  }
}

function showDownloadDialog(file) {
  const htmlTemplate = HtmlService.createTemplateFromFile('Download.html');
  htmlTemplate.data = { url: file.getDownloadUrl() };
  const html = htmlTemplate
    .evaluate()
    .setWidth(200)
    .setHeight(150);
  SpreadsheetApp.getUi().showModalDialog(html, 'Download');
}

function createPreamble(sheet, startingRow, ontologyIri) {
  setValuesByRow(sheet, startingRow, [['ConceptScheme URI', ontologyIri]]);
  const prefixes = getPrefixSheet().getDataRange().getValues().map((row) => ["PREFIX"].concat(row));
  setValuesByRow(sheet, startingRow + 1, prefixes);
  return startingRow + prefixes.length + 1;
}

function createHeader(sheet, startingRow) {
  setHeader(sheet, startingRow, 1, "URI", 175);
  setHeader(sheet, startingRow, 2, "skos:prefLabel", 250);
  setHeader(sheet, startingRow, 3, "skos:definition@en", 520);
  setHeader(sheet, startingRow, 4, "rdfs:label", 250);
  setHeader(sheet, startingRow, 5, "skos:broader(separator=\",\")", 250);
  setHeader(sheet, startingRow, 6, "rdf:type", 250);
  return startingRow;
}

function createConceptRecords(sheet, startingRow) {
  let categoryId = '';
  const valueSets = getValueSetSheet().getDataRange().getValues()
      .slice(1)  // remove the table header
      .filter((row) => !row[6] || row[6] === '') // not deprecated terms
      .map((row) => {
        categoryId = (row[2] !== '') ? row[1] : categoryId;
        const uri = row[1];
        const prefLabel = (row[3] === '') ? row[2] : row[3]; // if term label is empty then use the category label
        const definition = row[4];
        const label = row[5];
        const broader = (row[2] === '') ? categoryId : '';
        const type = '';
        return [ uri, prefLabel, definition, label, broader, type ];
      })
  setValuesByRow(sheet, startingRow, valueSets);
  return startingRow + valueSets.length - 1;
}

function createFieldRecords(sheet, startingRow) {
  const fieldSheet = getFieldSheet();
  if (!fieldSheet) {
    return startingRow;
  }
  const records = fieldSheet.getDataRange().getValues().slice(1);  // remove the table header
  if (records.length === 0) {
    return startingRow;
  }
  const fields = records.filter((row) => !row[8] || row[8] === '') // not deprecated terms
      .map((row) => {
        const uri = row[0];
        const prefLabel = toSnakeCase(row[1]);
        const definition = row[2];
        const label = row[1];
        const broader = '';
        const type = 'owl:AnnotationProperty';
        return [ uri, prefLabel, definition, label, broader, type ];
      })
  setValuesByRow(sheet, startingRow, fields);
  return startingRow + fields.length - 1;
}
