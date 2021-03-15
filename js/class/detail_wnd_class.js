class detail_wnd{
	
	constructor(parent){
		this._parent = parent;
		this._status = this._parent._status;
		this._row_id=parent._row_id;
		this._list_lbl = this._parent._sub_row._list_lbl;
        this._confirm_cbk = sql_update_node;
	}
	update(arg){
		//sql_update(arg);
		//sync_worker.postMessage("sync",this._id,this._year);
		this._parent._parent.update(arg);
	}
    set_new_confirm_cbk(confirm_cbk){
        if ((typeof confirm_cbk)==="function")
            this._confirm_cbk=confirm_cbk;
    }
	async createWndDetail(offre_id, title) {
    	var title = title + " N°"+ offre_id;
    	var table_id = (this._row_id).split("_")[0]+ "_detail_tbody";
    	var modal_id = (this._row_id).split("_")[0]+"_detail_modal"
    	$('#'+modal_id).remove();
    	await this.generate_detail(offre_id,modal_id,title,table_id);
	};

	async generate_detail(offre_id,modal_id,title,table_id,service_cbk){
        var arrow = this._parent.get_data();
        var list_lbl = this._list_lbl;
        var _self = this;
        if(arrow===null)
            return;

        var bConfirmAction=false;
        let modal_wnd = createModal(document.body,modal_id,title);
        $(modal_wnd).find('.btn-success').on('click',(e) => {
            $(e.target).parents('.modal').modal('hide');
            bConfirmAction=false;
        });

        $(modal_wnd).find('.btn-danger').on('click',(e) => {
            if($(e.target).parents('.modal').find('tr[data-status="modif"]').length>0){
                _self.confirm_click_cb(e,offre_id);
                if ((typeof service_cbk)==="function")
                    service_cbk(row_id,offre_id);
                $(e.target).parents('.modal').modal('hide');
                bConfirmAction=false;
            }
        });
        $(modal_wnd).modal('show');
        let prefix = (this._parent._row_id).split('_')[0];
        inject_table("table_lbl_val_"+prefix,"#"+modal_id+" .modal-body",table_id);
		
        for (var k = 0; k < list_lbl.length; k++){
            if((list_lbl[k] !== null) && (list_lbl[k].length!==0)){
            	var cond_id = list_lbl[k][COL_COND1][STR];
            	var colName = list_lbl[k][COL_NAME][STR];
                var cond=arrow.get(cond_id);//((list_lbl[k][COL_COND1])[STR])+"='"+arrow.get(cond_id)+"'";
                
                var col_id = list_lbl[k][COL_NAME][INT];
                var ui_type = list_lbl[k][COL_UI_TYPE];
                if(ui_type===UI_COMBO){
                    let cbk_list = /*this._status._statusClass;//*/list_lbl[k][COL_UI_ARG];
                    let optionList = cbk_list();//this._status._statusClass;
                    let default_val_type = parseInt(list_lbl[k][COL_UI_VAL]);
                    
                    let val = Object.entries(optionList).findIndex(row=>row[0]===arrow.get(colName)||row[1]===arrow.get(colName));
                    var combo = addRowComboVal(table_id, [list_lbl[k][COL_LBL], colName, decodeURIComponent(escape(list_lbl[k][COL_TABLE])), cond, /*arrow.get(colName)*/val, col_id],optionList);
                    if(val!=-1)
                    $(combo).val(parseInt(Object.entries(optionList)[val][0]));
                    else
                    $(combo).val(parseInt(Object.entries(optionList)[0][0]));

                    //if(default_val_type) $(combo).val(arrow.get(colName));
                }else
                    addRowLblVal(table_id,[list_lbl[k][COL_LBL],colName,list_lbl[k][COL_TABLE],cond,arrow.get(colName),col_id]);
            } 
        }
	}

 mysql_real_escape_string (str) {
    if (typeof str != 'string')
        return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}



//Update values to sql Db
confirm_click_cb(e,com_id){
    $(e.target).parents('.modal').find('tr').css('display', 'none');
    $(e.target).parents('.modal').find('tr[data-status="modif"]').css('display', 'table-row');
    $(e.target).parents('.modal').find('tr[data-status="modif"]').fadeIn('slow');
    console.log(this._parent._data);
    console.log(this._parent._columns);
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
            this._confirm_cbk(v1,v2,v3,v4);

        }
    }
    
    //for label
    var arr = $(e.target).parents('.modal').find('tr[data-status="modif"] > td > input').toArray();
    for(var l=0;l<arr.length;l++){
        if(($(arr[l]).attr("data-table")!==undefined)&&($(arr[l]).attr("data-name")!==undefined)&&($(arr[l]).attr("data-cond")!==undefined)){
            var v1=$(arr[l]).attr("data-table");
            var v2=$(arr[l]).attr("data-name");
console.log($(arr[l]).val().trim());
            var v3=/*"'"+this.mysql_real_escape_string(*/encodeURIComponent($(arr[l]).val().trim());/*+"'"*/;// escape("\'"+$(arr[l]).val().trim()+"\'");
			console.log(v3);
            var v4=$(arr[l]).attr("data-cond");
            var v5=parseInt($(arr[l]).attr("data-ref"));//column
            var vconsole="sql_update("+v1+","+v2+","+v3+","+v4+")";
            console.log(vconsole);
            //sql_update(v1,v2,v3,v4);
            this._confirm_cbk(v1,v2,v3,v4);
            $("#"+this._row_id+" td div."+v2).text($(arr[l]).val().trim());
        }
    }
}

}
