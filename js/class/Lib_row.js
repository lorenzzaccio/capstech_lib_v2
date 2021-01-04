/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Lib_row extends Row_element{

constructor(tableBodyId){
    super(tableBodyId);
}

 appendRowWithId(id, arg) {
    var status = arg;
    var row = create_free_TR("data-status", status);
    row.setAttribute("id", id);
    row.setAttribute("class", "main_rowProd");
    row.setAttribute("data-level", "0");
    return row;
};

 addRowLblVal(tableBodyId, arg) {
    var row = appendRow(tableBodyId, "original");//25);
    insertTdLabelValue(row, arg);
};

 addRowComboVal(tableBodyId, arg, optionList) {
    var row = appendRow(tableBodyId, "original");//25);
    insertTdComboValue(row, arg, optionList);
};

 appendRow(parentId, arg) {
    var status = arg;
    var row = createTR(parentId, "data-status", status);
    row.setAttribute("class", "rowProd");
    return row;
};

 appendRow_after(ref_id,parentId, arg) {
    var status = arg;
    var row = createTR_after(ref_id,parentId, "data-status", status);
    row.setAttribute("class", "main_rowProd");
    return row;
};

 addRowComboVal(tableBodyId, arg, optionList) {
    var row = appendRow(tableBodyId, "original");//25);
    insertTdComboValue(row, arg, optionList);
};

}
