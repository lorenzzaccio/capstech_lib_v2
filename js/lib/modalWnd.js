/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createModalWnd(parentId, modalId, headerTitle, bodyText,callback) {
    if (document.getElementById(modalId) !== null)
        return;
    if ( (document.getElementById(parentId) === null) && ($(parentId) === null) )
        return;
    var div = createDiv(parentId, modalId);
    div.setAttribute("class", "modal");
    div.setAttribute("tabindex", "-1");
    //div.setAttribute("role", "dialog");
    div.setAttribute("aria-labelledby", modalId + "Label");
    var divDialog = createDiv(getId(modalId), modalId + "Dlg");
    divDialog.setAttribute("class", "modal-dialog");
    divDialog.setAttribute("role", "dialog");
    var divContent = createDiv(getId(modalId + "Dlg"), modalId + "Ctnt");
    divContent.setAttribute("class", "modal-content modal-content-anim");
    var divHeader = createDiv(getId(modalId + "Ctnt"), modalId + "Hdr");
    divHeader.setAttribute("class", "modal-header");
    createCloseButton(modalId + "Hdr", '&times;');
    var h4 = createHeader(modalId + "Hdr", "H4", headerTitle);
    h4.setAttribute("class", "modal-title");
    var divBody = createDiv(getId(modalId + "Ctnt"), modalId + "Bdy");
    divBody.setAttribute("class", "modal-body");
    createHeader(modalId + "Bdy", "p", bodyText);
    var divFooter = createDiv(getId(modalId + "Ctnt"), modalId + "Footer");
    divFooter.setAttribute("class", "modal-footer");
    createButton(divFooter,"closeBtn");
    $('#closeBtn').on('click touchstart',function() {
        callback;
        $('#'+modalId).modal();
        
    });
    $('#'+modalId+'HdrcrossClose').on('click touchstart',function() {
        $('#'+modalId).modal();
    });
    return div;
}

function getId(id){
return document.getElementById(id);
}