/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createDiv(parent, id) {
    var select = parent || $('#' + parent);
    var el = document.createElement("div");
    if (id !== "")
        el.setAttribute("id", id);
    $(select).append(el);
    return el;
}
function createDivId(parent, id) {
    var select = document.getElementById(parent);
    var el = document.createElement("div");
    if (id !== "")
        el.setAttribute("id", id);
    select.appendChild(el);
    return el;
}
function createElement(div, tag) {
    var select = div;
    if(select === undefined)
        return undefined;
    var el = document.createElement(tag);
    select.appendChild(el);
    return el;
}

function createTextArea(divId, opt, callback, style, rows) {
    var select = document.getElementById(divId);
    var el = document.createElement("textarea");
    var t = document.createTextNode(opt);
    el.setAttribute("class", style);
    el.setAttribute("rows", rows);
    el.setAttribute("oninput", callback);
    el.appendChild(t);
    select.appendChild(el);
    return el;
}

function createHeader(parent, type, text) {
    var x = document.createElement(type);     // Create a <p> node
    var t = document.createTextNode(text);    // Create a text node
    x.appendChild(t);                         // Append the text to <p>
    document.getElementById(parent).appendChild(x);
    return x;
}

function createSimpleLabelStyle(divId, opt, id_from_input, style) {
    var select = document.getElementById(divId);
    var el = document.createElement("Label");
    el.setAttribute("class", style);
    el.setAttribute("for", id_from_input);
    el.innerHTML = opt;
    select.appendChild(el);
    return el;
}

function createSimpleButtonStyle(divId, text, callback, style) {
    var select = document.getElementById(divId)||divId;
    var el = document.createElement("button");
    el.setAttribute("class", style);
    el.textContent = text;
    el.value = text;
    el.setAttribute('onclick', callback);
    el.onclick=callback;
    select.appendChild(el);
    return el;
}
function createSimpleDivStyle(divId, frame_id, callback, style) {
  
    var select = document.getElementById(divId)||divId;
    let el = document.createElement("div");
    el.setAttribute("class", style);
    let sub_el = document.createElement("iframe");
    sub_el.setAttribute('id',frame_id);
    el.appendChild(sub_el);
    /*let sub_el = document.createElement("object");
    sub_el.setAttribute('data',filename);
    sub_el.setAttribute('type','application/pdf');
    sub_el.setAttribute('width','50');
    sub_el.setAttribute('height','50');
    el.insertAfter(sub_el);*/
    select.appendChild(el);
    /*el.insertAdjacentHTML('afterend',html_text)*/
    el.setAttribute('onclick', callback);
    el.onclick=callback;
    return el;
}function createSimpleFileStyle(divId, id, callback, style) {
    var select = document.getElementById(divId)||divId;
    let el = document.createElement("input");
    el.setAttribute("id", id);
    el.setAttribute("class", style);
    el.setAttribute("type", "file");
    //el.value = '+';
    select.appendChild(el);
    el.addEventListener("change", callback, false);
    //el.setAttribute('onclick', callback);
    //el.onclick=callback;
    return el;
}

function createSimpleInputStyle(divId, opt, callback, style, type) {
    var select = document.getElementById(divId);
    var el = document.createElement("input");
    el.setAttribute("class", style);
    el.setAttribute("type", type);
    el.value = opt;
    select.appendChild(el);
    el.setAttribute("onclick", callback);
    return el;
}

function createCombo(divId, comboId, list, callback, style) {
    var select = document.getElementById(divId) || divId;
    var el = document.createElement("select");
    el.setAttribute("id", comboId);
    el.setAttribute("class", style);
    el.setAttribute("onchange", callback);
    var i = 0;
    if(list.length>0){
        for (i = 0; i < list.length; i=i+2) {
            var optionItem = document.createElement("option");
            optionItem.text = list[i+1];
            optionItem.value = list[i];
            el.appendChild(optionItem);
        }
    }
    if(Object.keys(list).length>0){
        for (var key in list) {
            var optionItem = document.createElement("option");
            optionItem.text = list[key];
            optionItem.value = key;
            el.appendChild(optionItem);        
        }
    }

    select.appendChild(el);
    return el;
}

function createTR(parentId, tagName, tagValue) {
    var select = document.getElementById(parentId);
    if (select === null)
        return;
    var el = document.createElement("tr");
    if (tagName !== "" && tagValue !== "") {
        el.setAttribute(tagName, tagValue);
    }
    select.appendChild(el);
    return el;
}

function create_free_TR(tagName, tagValue) {
    var el = document.createElement("tr");
    if (tagName !== "" && tagValue !== "") {
        el.setAttribute(tagName, tagValue);
    }
    return el;
}

function create_free_table() {
    var el = document.createElement("table");
    return el;
}

function createTD(parent, tagName, tagValue) {
    var select = parent;
    if (select === undefined)
        return undefined;
    var el = document.createElement("td");
    if (tagName !== "" && tagValue !== "") {
        el.setAttribute(tagName, tagValue);
    }
    select.appendChild(el);
    return el;
}

function createLabel(parent, id, opt) {
    var select = parent;
    var el = document.createElement("Label");
    el.setAttribute("for", id);
    el.innerHtml = opt;
    select.appendChild(el);
    return el;
}

function createSpan(parent, classe) {
    var select = parent;
    var el = document.createElement("Span");
    el.setAttribute("class", classe);
    select.appendChild(el);
    return el;
}

function createCloseButton(divId, opt) {
    var select = document.getElementById(divId);
    var el = document.createElement("button");
    el.setAttribute("id",divId+'crossClose');
    el.setAttribute("type", "button");
    el.setAttribute("class", "close");
    el.setAttribute("data-dismiss", "modal");
    el.textContent = "X";
    //el.value = "&times;";
    select.appendChild(el);
}

function createButton(parentElement, btnId) {
    var select = parentElement;
    var el = document.createElement("button");
    el.setAttribute("type", "button");
    el.setAttribute("class", "btn btn-secondary");
    el.setAttribute("id", btnId);
    el.setAttribute("data-dismiss", "modal");
    el.textContent = "Quitter";
    select.appendChild(el);
}

function createButtonInfo(divId, opt, callback) {
    var select = document.getElementById(divId);
    var el = document.createElement("button");
    el.setAttribute("class", "btn btn-info btn-block");
    el.setAttribute("data-dismiss", "modal");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    el.setAttribute("onclick", callback);
    return el;
}

function createInputButtonInfo(divId, opt, callback) {
    var select = document.getElementById(divId);
    var el = document.createElement("input");
    el.setAttribute("class", "btn btn-info btn-block");
    el.setAttribute("type", "button");
    //el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    //el.setAttribute("onclick", callback);
    $(el).on("click touchstart",callback);
    return el;
}

function createTR_after(reference_id,parentId, tagName, tagValue) {
    var ref = document.getElementById(reference_id);
    if (ref === null)
        return;
    var el = document.createElement("tr");
    if (tagName !== "" && tagValue !== "") {
        el.setAttribute(tagName, tagValue);
    }
    insertAfter(ref,el);
    return el;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createCheckBox(parent, id, lbl) {
    var select = parent;//document.getElementById(divId);
    var el = document.createElement("input");
    el.setAttribute("id", id);
    el.setAttribute("type", "checkbox");
    select.appendChild(el);
    return el;
}

function toggleCheckbox(element)
 {
   //element.checked = !element.checked;
   console.log("checked :" +$(element).prop( "checked"));
 }



 function createModal(parent, modal_id,title) {
    var html_modal = 
    '<div id="'+modal_id+'" class="modal fade show">'+
    '<div class="modal-dialog">'+
    '<div class="modal-content">'+
    '<div class="modal-header">'+
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
    '<span aria-hidden="true">×</span>'+
    '</button>'+
    '<h4 class="modal-title">'+title+'</h4>'+
    '</div>'+
    '<div class="modal-body detail_modal"></div>'+
    '<div class="modal-footer">'+
    '<button type="button" class="btn btn-success">Cancel</button>'+
    '<button type="button" class="btn btn-danger">Confirm</button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    $('body').append(html_modal);
    return $('#'+modal_id);
}