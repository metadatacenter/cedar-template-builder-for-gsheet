function isOwner() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const owner = ss.getOwner().getEmail();
  const activeUser = Session.getEffectiveUser().getEmail();
  return activeUser === owner;
}

function isEditor() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const editors = ss.getEditors().map(editor => editor.getEmail());
  const activeUser = Session.getEffectiveUser().getEmail();
  return editors.includes(activeUser);
}

function isAuthorizationRequired() {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  return authInfo.getAuthorizationStatus() === ScriptApp.AuthorizationStatus.REQUIRED;
}
