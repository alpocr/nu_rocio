var authenticator = "server_magic";
var keyTransportCert = null;
var crmfObject = null;
var tempPid;
var form = document.forms[1];

/* ===================
    Inicializadores
   =================== */

jQuery(document).ready(function($) {

});

jQuery(window).load(function() {
    initFirma();
    form.onsubmit = validate;
    // $('#loginFirma form').submit(validate);
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
    $('#loginFirma .alert').text("Su tarjeta está conectada correctamente. Puede continuar.");
    $('#loginFirma .btn').removeAttr("disabled");
}

function cardOut(e) {
    $('#loginFirma .alert').removeClass("alert-success");
    $('#loginFirma .alert').text("Primero debe conectar su tarjeta para continuar.");
    $('#loginFirma .btn').attr({
        "disabled": "disabled"
    });
}

function validate() {
    // generate keys for nsm.
    if (typeof(crypto.version) != "undefined") {
        crmfObject = crypto.generateCRMFRequest(
            "CN=Usuario,OU=Ingenieria de Software,O=Universidad Latina,C=CR",
            tempPid,
            authenticator,
            keyTransportCert,
            "setCRMFRequest();",
            1024,
            null,
            "rsa-dual-use");
    }
    return false;
}

function setCRMFRequest() {
    //form.firma.value = tempPid;
    //console.log("FRM: ", form.firma.value); //DEBUG
    form.cert_request.value = crmfObject.request;
    form.submit();
    // if (crmfObject.request != "error:userCancel") form.submit();
    // $('#loginFirma form').find("input[name=cert_request]").val(crmfObject.request);
    // $('#loginFirma form').submit();
}