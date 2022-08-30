var ARG_STATUS=0;
var ARG_LBL=1;
var ARG_SELECTED=2;
var ARG_PRODUCT_TYPE=3;
var ARG_TITLE=4;
var ARG_DATE=5;
var ARG_SUMMARY=6;
var ARG_COMMENT=7;
var ARG_COM_ID=8;
var ARG_TRANSFO=9;

function production(arg){
    //this.tableBodyId = tableBodyId;
    this.row = create_free_TR("data-status",arg.ficheprod_status);
}

production.prototype.empty=function () {
    $('#'+this.tableBodyId).empty();
};

production.prototype.addRow=function (arg) {
    this.insertTdId( arg);
    this.insertTdStar( arg);
    this.insertTdMedia( arg);
    this.insertSimple(arg.ficheprod_id);
    this.insertSimple(arg.ficheprod_date);
    this.insertSimple(arg.ficheprod_status);
};

production.prototype.insertSimple=function (text) {
    const td = createTD(this.row, "", "");
    let div = createDiv(td, "", "");
    let span = createElement(div, "span");
    span.textContent = text;
};

production.prototype.insertTdId=function ( arg) {
    var com_id = arg.ficheprod_ordre;
    var td = createTD(this.row,"","");
    //div
    var div = createDiv(td,"","");
    div.setAttribute("class", "ckbox");
    //p
    var p = createElement(div, "p");
    p.setAttribute("class", "com_id");
    p.textContent = com_id;
};

production.prototype.insertTdCheck=function (arg) {
    var bSelected = !!arg[ARG_SELECTED];
    var td = createTD(this.row, "", "");
    var div = createDiv(td, "", "");
    div.setAttribute("class", "ckbox");
    var checkBox = createCheckBox(div, checkId, "");
    if (bSelected)
        checkBox.setAttribute("class", "selected");
    createLabel(div, checkId, "");
    return checkBox;
};

production.prototype.insertTdStar=function ( arg) {
    var transfo = arg.ficheprod_transfo;
    var td = createTD(this.row, "", "");
    var divRond = createDiv(td, "", "");
    if(transfo.includes("VERT")){
        divRond.setAttribute("class", "full-circle-prod");
        divRond.setAttribute("style", "border: 4px solid #00a000;");
    }
    if(transfo.includes("BLEU")){
        divRond.setAttribute("class", "full-circle-prod");
        divRond.setAttribute("style", "border: 4px solid #0000a0;");
    }
    if(transfo.includes("LIE_DE_VIN")){
        divRond.setAttribute("class", "full-circle-prod");
        divRond.setAttribute("style", "border: 4px solid #AC1E44;");
    }
    if(transfo.includes("BLANC")){
        divRond.setAttribute("class", "full-circle-prod");
        divRond.setAttribute("style", "border: 4px solid #000;");
    }
    if(transfo.includes("GRIS")){
        divRond.setAttribute("class", "full-circle-prod");
        divRond.setAttribute("style", "border: 4px solid #000;");
    }
    if(transfo.includes("EXPORT")){
        divRond.setAttribute("class", "full-rect");
        divRond.setAttribute("style", "border: 4px solid #000;");
    }
    //span
    var spanFisc = createElement(divRond, "span");
    var centili = transfo.split("-")[1];
    spanFisc.textContent = transfo;
};


production.prototype.insertTdMedia=function (arg) {
    //var productType = arg[ARG_PRODUCT_TYPE];
    var title = "";//arg[ARG_TITLE];
    var status = arg.ficheprod_status;
    var date = arg.ficheprod_date;
    var summary = "";//arg[ARG_SUMMARY];
    var comment = arg.ficheprod_comment;
    var id = arg.ficheprod_id;

    var td = createTD(this.row, "", "");
    var div = createDiv(td, "", "");
    div.setAttribute("class", "media");
    //
    var div2 = createDiv(div, "", "");
    div2.setAttribute("class", "media-body");
    //span
    var span = createElement(div2, "span");
    span.setAttribute("class", "media-meta pull-right");
    span.textContent = date;
    //h4
   /* var h4 = createElement(div2, "h4");
    h4.setAttribute("class", "title");
    h4.textContent = title;*/
    //span h4
    var spanh4 = createElement(div2, "span");
    spanh4.setAttribute("class", "pull-right " + status/*statusClass[status]*/);
    spanh4.textContent = "(" + status/*convertStatus(status)*/ + ")";
    //span h4_2
    /*var spanh4_2 = createElement(div2, "span");
    spanh4_2.setAttribute("class", "pull-right ");
    spanh4_2.textContent = "(" + id + ")";*/
    //p
    var p = createElement(div2, "p");
    p.setAttribute("class", "summary");
    p.textContent = summary;
    //p
    var p1 = createElement(div2, "p");
    p1.setAttribute("class", "comment");
    p1.textContent = comment;
};