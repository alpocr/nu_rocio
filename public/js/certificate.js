/* ===================
    Variables
   =================== */

var forceBackup = false;
var nickname = "CN=Usuario,OU=Ingenieria de Software,O=Universidad Latina,C=CR";

/* ===================
    Inicializadores
   =================== */

jQuery(document).ready(function($) {

});

jQuery(window).load(function() {

    //console.log("FIRMA: ", nickname, cert);
    //if (nickname != undefined) loadCertificate();
});

/* ===================
    Utils
   =================== */

function loadCertificate() {
    window.crypto.importUserCertificates(nickname, cert, forceBackup);
    alert("Firma Digital!");
    return false;
}