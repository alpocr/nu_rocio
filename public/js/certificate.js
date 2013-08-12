/* the following values could be filled in by the server CGI */
var forceBackup = false;

function LoadCertificate()
{
  window.crypto.importUserCertificates(nickname, cert, forceBackup);
  alert("YA FUNCIONA!");
  return false;
}

document.forms[0].onsubmit = LoadCertificate;