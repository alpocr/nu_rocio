var authenticator = "server_magic";
var keyTransportCert = null;
var crmfObject = null;
var tempPid;
var form = document.forms[0];

/* ===================
    Inicializadores
   =================== */

jQuery(document).ready(function($) {

});

jQuery(window).load(function() {
    initFirma();
});

jQuery(window).unload(function() {
    terminateFirma();
});

/* ===================
    Utils
   =================== */

function initFirma() {
    window.crypto.enableSmartCardEvents = true;
    document.addEventListener("smartcard-insert", cardIn, false);
    document.addEventListener("smartcard-remove", cardOut, false);
}

function terminateFirma() {
    document.removeEventListener("smartcard-insert", cardIn, false);
    document.removeEventListener("smartcard-remove", cardOut, false);
}

function cardIn(e) {
    console.log("FIR: ", e.tokenName); //DEBUG
    tempPid = e.tokenName;
    console.log("TEMP: ", tempPid); //DEBUG
    $('#loginFirma .alert').addClass("alert-success");
    $('#loginFirma .alert').text("Su firma ha sido registrada correctamente.");
    form.firma.value = tempPid;
    console.log("FRM: ", form.firma.value); //DEBUG
}

function cardOut(e) {
    $('#loginFirma .alert').removeClass("alert-success");
    $('#loginFirma .alert').text("Primero debe conectar su tarjeta para agregarla.");
}