/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var COL_LBL=0;
var COL_NAME=1;
var COL_TABLE=2;
var COL_COND=3;
var COL_COND1=3;
var COL_UI_TYPE=4;
var COL_UI_ARG=5;
var COL_UI_VAL=6;
var COL_COND2=4;
var COL_VAL=4;
var COL_REF=5;


var g_list_lbl;
function generate_detail(thisObj,modal_id,id,optionList,title,table_id,list_lbl,col_status,service_cbk,row_id,obj_tp){
        var offre_id = parseInt(thisObj);
        var arrow = obj_tp.loc.filter(id , parseInt(offre_id));
        g_list_lbl = list_lbl;
        if(arrow===null)
            return;

        var bConfirmAction=false;
        showBSModal({
            title: title,
            modal_id:modal_id,
            body: '',
            size: "large",
            actions: [{
                    label: 'Cancel',
                    cssClass: 'btn-success',
                    onClick: function (e) {
                        $(e.target).parents('.modal').modal('hide');
                        bConfirmAction=false;
                    }
                }, {
                    label: 'Confirm',
                    cssClass: 'btn-danger',
                    onClick: function (e) {
                        if($(e.target).parents('.modal').find('tr[data-status="modif"]').length>0){
                            confirm_click_cb(e,offre_id,id,table_id,obj_tp);
                            if ((typeof service_cbk)==="function")
                                    service_cbk(row_id,offre_id);
                            $(e.target).parents('.modal').modal('hide');
                            bConfirmAction=false;
                        }
                    }    
                }]
        });
        inject_table("table_lbl_val","#"+modal_id+" .modal-body",table_id);
        for (var k = 0; k < list_lbl.length; k++){
            if((list_lbl[k] !== null) && (list_lbl[k].length!==0)){
                var cond=((list_lbl[k][COL_COND1])[STR])+"='"+arrow[(list_lbl[k][COL_COND1])[INT]]+"'";
                var colName = list_lbl[k][COL_NAME][STR];
                var col_id = list_lbl[k][COL_NAME][INT];
                if(k===col_status){
                    var optionList = lofc_detail_wnd[colName];
                    var combo = addRowComboVal(table_id, [list_lbl[k][COL_LBL], colName, decodeURIComponent(escape(list_lbl[k][COL_TABLE])), cond, arrow[k], col_id],optionList);
                    $(combo).val(arrow[k]);
                }else
                    addRowLblVal(table_id,[list_lbl[k][COL_LBL],colName,list_lbl[k][COL_TABLE],cond,arrow[k],col_id]);
            } 
        }
}

//Update values to sql Db
function confirm_click_cb(e,com_id,col_id,table_id,obj_tp){
    $(e.target).parents('.modal').find('tr').css('display', 'none');
    $(e.target).parents('.modal').find('tr[data-status="modif"]').css('display', 'table-row');
    $(e.target).parents('.modal').find('tr[data-status="modif"]').fadeIn('slow');
    
    //for combo
    var arr = $(e.target).parents('.modal').find('tr[data-status="modif"]').find('option:selected').toArray();
    for(var l=0;l<arr.length;l++){
        if(($(arr[l]).parents().attr("data-table")!==undefined)&&($(arr[l]).parents().attr("data-name")!==undefined)&&($(arr[l]).parents().attr("data-cond")!==undefined)){
            var v1=$(arr[l]).parents().attr("data-table");
            var v2=$(arr[l]).parents().attr("data-name");
            var v3=$(arr[l]).val().trim();
            var v4=$(arr[l]).parents().attr("data-cond");
            var v5=parseInt($(arr[l]).parents().attr("data-ref"));
            var vconsole="sql_update("+v1+","+v2+","+v3+","+v4+")";
            console.log(vconsole);
            sql_update(v1,v2,v3,v4);
            for(i=0;i<g_list_lbl.length;i++){
                var arrow = g_list_lbl[i][1]; 
                var lbl = v4.split("=")[0];
                var val = v4.split("=")[1];
                if(lbl===arrow[STR]){
                    id=arrow[INT];
                    break;
                }
            }
            var current_row_index = (obj_tp.loc).filterIndex(id,com_id);
        }
    }
    
    //for label
    var arr = $(e.target).parents('.modal').find('tr[data-status="modif"] > td > input').toArray();
    for(var l=0;l<arr.length;l++){
        if(($(arr[l]).attr("data-table")!==undefined)&&($(arr[l]).attr("data-name")!==undefined)&&($(arr[l]).attr("data-cond")!==undefined)){
            var v1=$(arr[l]).attr("data-table");
            var v2=$(arr[l]).attr("data-name");
            var v3=escape("\'"+$(arr[l]).val().trim()+"\'");
            var v4=$(arr[l]).attr("data-cond");
            var v5=parseInt($(arr[l]).attr("data-ref"));
            var vconsole="sql_update("+v1+","+v2+","+v3+","+v4+")";
            console.log(vconsole);
            sql_update(v1,v2,v3,v4);
            var current_row_index = (obj_tp.loc).filterIndex(col_id,com_id);
        }
    }
    refresh();
}

function inject_table(table_id,jquery_id,tbody_id){
    var table = "<div class='detail_table-container'><table id='"+table_id+"' class='table table-filter'><tbody id='"+tbody_id+"'></tbody></table></div>";
    $(jquery_id).append(table);
}

function initEvents_lbl_val(){
    $('.table tr').on('keypress', function () {
        $(this).find('td input').addClass("colorOrange");
        $(this).css( "background", "yellow" );
        $(this).attr('data-status','modif');
    });

    $('.table tr').on('keyup', function () {
        $(this).find('td input').addClass("colorOrange");
        $(this).css( "background", "yellow" );
        $(this).attr('data-status','modif');
    });
}
function initEvents_combo_val(){
    $('.table tr').on('change', function () {
        $(this).find('td input').addClass("colorOrange");
        $(this).css( "background", "yellow" );
        $(this).attr('data-status','modif');
    });
}

function insertTdLabelValue(row,arg) {
    var lbl = arg[COL_LBL];
    var name = arg[COL_NAME];
    var table = arg[COL_TABLE];
    var cond = arg[COL_COND];
    var val = arg[COL_VAL];
    var ref = arg[COL_REF];

    //td1
    var td1 = createTD(row, "", "");
    //p
    var p = createElement(td1, "p");
    p.setAttribute("class", "labelValue");
    p.textContent = lbl;
    //td2
    var td2 = createTD(row, "", "");
    //val
    var inp = createElement(td2, "input");
    inp.setAttribute("class", "inputValue");
    inp.setAttribute("type", "text");
    inp.setAttribute("size", "50");
    if((name!==null)&&(name!==""))
        inp.setAttribute("data-name", name);
    if((table!==null)&&(table!==""))
        inp.setAttribute("data-table", table);
    if((cond!==null)&&(cond!==""))
        inp.setAttribute("data-cond", cond);
    if((ref!==null)&&(ref!==""))
        inp.setAttribute("data-ref", ref);
    inp.value = val;
}

function insertTdComboValue(row,arg,optionList) {
    var lbl = arg[COL_LBL];
    var name = arg[COL_NAME];
    var table = arg[COL_TABLE];
    var cond = arg[COL_COND];
    var val = arg[COL_VAL];
    var ref = arg[COL_REF];

    //td1
    var td1 = createTD(row, "", "");
    //p
    var p = createElement(td1, "p");
    p.setAttribute("class", "labelValue");
    p.textContent = lbl;
    //td2
    var td2 = createTD(row, "", "");
    //combo
    var inp = createCombo(td2,name,optionList);
    if((name!==null)&&(name!==""))
        inp.setAttribute("data-name", name);
    if((table!==null)&&(table!==""))
        inp.setAttribute("data-table", table);
    if((cond!==null)&&(cond!==""))
        inp.setAttribute("data-cond", cond);
    if((ref!==null)&&(ref!==""))
        inp.setAttribute("data-ref", ref);
        return inp;
}

function addRowLblVal(tableBodyId, arg) {
    var row = appendRow(tableBodyId, "original");//25);
    insertTdLabelValue(row, arg);
}
function addRowComboVal(tableBodyId, arg, optionList) {
    var row = appendRow(tableBodyId, "original");//25);
    return insertTdComboValue(row, arg, optionList);
}

function appendRow(parentId, arg) {
    var status = arg;
    var row = createTR(parentId, "data-status", status);
    if(row === undefined)
        return undefined;
    row.setAttribute("class", "rowProd");
    return row;
}
