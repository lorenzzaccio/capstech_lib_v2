class Row_element {

constructor(){
}

insertTdButton(row,btn_name,btn_cbk) {
    var td = createTD(row, "", "");
    var inp = createSimpleButtonStyle(td,btn_name,btn_cbk,"btn btn-sm btn-success");
};

createSimpleButton(divId, opt, callback, style) {
    var select = document.getElementById(divId)||divId;
    var el = document.createElement("button");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    el.setAttribute("onclick", callback);
    return el;
}

insertTdId(row, text) {
    var td = createTD(row,"","");
    var div = createDiv(td,"","");
    div.setAttribute("class", "ckbox");
    var p = createElement(div, "p");
    p.setAttribute("class", "com_id");
    p.textContent = text;
};

insertTdCheck(row, bSelected) {
    var td = createTD(row, "", "");
    
    
    var lbl = createLabel(td,"","1");
    lbl.setAttribute("class", "check_container");
    var checkBox = createCheckBox(lbl, "", "");
    if (bSelected){
    	checkBox.checked=true;
    }
    var span = createSpan(lbl,"checkmark");
    return td;
};

insertTdStar(row, text,classe) {
    var td = createTD(row, "", "");
    var divRond = createDiv(td, "", "");
    divRond.setAttribute("class", "full-circle "+classe);
    divRond.setAttribute("style", "border: 4px solid #ff1a07;");
    var spanFisc = createElement(divRond, "span");
    spanFisc.textContent = text;
};

insertHiddenField(row,num,class_name) {
    var td = createTD(row, "", "");
	td.setAttribute("class", "hidden");
    var div = createDiv(td, "", "");
    div.setAttribute("class", class_name );
    var span = createElement(div, "span");
    span.textContent = num;
};

async insertField(row,text,class_name) {
    var td = createTD(row, "", "");
	td.setAttribute("class", "field");
    var div = createDiv(td, "", "");
    div.setAttribute("class", class_name );
    var span = createElement(div, "span");
    span.textContent = text;
};

async updateField(row,text,class_name) {
    try{
        (row.querySelector("."+class_name).querySelector("span")||row.querySelector("."+class_name)).textContent=text;
        }catch(e){
            console.log("erreur for "+class_name);
        }
};
async updateComboField(row,text,class_name) {
    row.querySelector("."+class_name).querySelector("span").textContent=text;
    //row.querySelector("."+class_name).querySelector("select").value=text;
};

insertStatusField(row,text,class_name) {
    var td = createTD(row, "", "");
	td.setAttribute("class", "field");
    var div = createDiv(td, "", "");
    div.setAttribute("class", class_name );
    var span = createElement(div, "span");
    span.textContent = text;
};



}