var authenticator = "server_magic";
var keyTransportCert = null;
var crmfObject = null;
var form = document.forms[0];

function onSmartCardChange(e) {
  console.log("Datos?:", e);
  alert("TARJETA!");
  //window.location.reload();
}
function register() {
  window.crypto.enableSmartCardEvents = true;
  document.addEventListener("smartcard-insert", onSmartCardChange, false);
  document.addEventListener("smartcard-remove", onSmartCardChange, false);
}
function deregister() {
  document.removeEventListener("smartcard-insert", onSmartCardChange, false);
  document.removeEventListener("smartcard-remove", onSmartCardChange, false);
}

function validate()
{
  // generate keys for nsm.
  if (typeof(crypto.version) != "undefined") {
    crmfObject = crypto.generateCRMFRequest(
      "CN=" + form.name.value,
      form.password.value,
      authenticator,
      keyTransportCert,
      "setCRMFRequest();",
      1024,
      null,
      "rsa-dual-use");
  }
  return false;
}

function setCRMFRequest()
{
  form.cert_request.value = crmfObject.request;
  form.submit();
}

form.onsubmit = validate;
document.body.onload = register;
document.body.onunload = deregister;