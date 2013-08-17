var authenticator = "server_magic";
var keyTransportCert = null;
var crmfObject = null;
var tempPid;

/* ===================
    Inicializadores
   =================== */

jQuery(document).ready(function($) {

});

jQuery(window).load(function() {
    initFirma();
    $('#loginFirma form').submit(validate);
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
    alert("CARD IN");
    tempPid = e.tokenName;

    $('#loginFirma .alert').addClass("alert-success");
    $('#loginFirma .alert').text("Su tarjeta está conectada correctamente. Puede continuar.");
    $('#loginFirma .btn').removeAttr("disabled");
}

function cardOut(e) {
    alert("CARD OUT");
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
            "CN=ULATINA Componentes - Certificado Firma Digital ",
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
    $('#loginFirma form').find("input[name=cert_request]").val(crmfObject.request);
    $('#loginFirma form').submit();
}