class _sub_row{

constructor(parent,config,status){
    this._parent = parent;
    this._config = config;
    this._status = parent._status;
    this.db1= this._status.db1||"nop";
    this._COL_ID = this._status.get_full_id();
    this._COL_STATUS = this._status.get_full_status();
    this._current_row_id = this._parent._row_id;
    this._children=[];
    this.row_exist_buffer=[];
    this.action_facturer_buffer=[];
    this._visible=false;
    this.populate_sub_row_menu();
    this.show();
    this._optionList = this._status._statusClass;

      this._fournisseur = {
          0:"intercap",
          3:"LES BOUCHAGES DELAGE",
          11:"Etiq'etain",
          17:"Enoplastic",
          20:"René Salomon",
          24:"C.S.G.V.",
          26:"TinEurope",
          28:"Relvas",
          29:"Technologià"
    };

}

get_status_combo(){
    return this._optionList;
}

get_fournisseur_combo(){
    return this._fournisseur;
}

display_sub_row(){
    if(this._visible){
        let subrow = document.getElementById(this._parent._row_id).nextSibling;
        while( subrow && subrow.id.match('sub') && subrow.id.match('sub').index!=-1){
            $('#'+subrow.id).hide();
            subrow=subrow.nextSibling;
        }
        this._visible=false;
    }else{
        let subrow = document.getElementById(this._parent._row_id).nextSibling;
        while( subrow && subrow.id.match('sub') && subrow.id.match('sub').index!=-1){
            this.show(subrow.id);
            subrow=subrow.nextSibling;
        }
        
    }
        
}

show(id){
    this._visible=true;
    $('#'+id||this._row_id).css('display', 'table-row').animate({height: '40px'},
    function () {
        $('#'+id||this._row_id).show();
    });
};

hide(){
    this._visible=false;
    $('#'+this._row_id).css('height', '1px');
    $('#'+this._row_id).hide();
};

getChildren() {
    return this._children;
    }

addSubMenuRow(arg) {
    var parent = this._parent._row_id;
    var children = this.getChildren();
    this._row_id = "sub_"+parent+"_1";
    var row = create_free_TR("data-status",arg[this.COL_STATUS]);
   
    row.style.height = 0;
    row.setAttribute("class", "subrow");
    row.setAttribute("id", this._row_id);
    row.setAttribute("data-level","1");
    var td2 = createTD(row, "colspan", "30");
    for(var i=0;i<arg.length;i+=3){
        var arrow = arg[i+2];
        var inp = createSimpleButtonStyle(td2,arg[i],arg[i+1].bind(this, arrow),"btn btn-sm btn-success btn-subrow "+arrow[1]);
        $(inp).attr(onclick,"select_id('"+arrow[0]+"')");
    }
     $("#"+this._current_row_id).after(row);
    return row;
};

addSubMenuDiv(arg) {
    var parent = this._parent._row_id;
    var children = this.getChildren();
    this._row_id = "sub_"+parent+"_1";
    let row = document.querySelector('#'+this._row_id);

    const td2 = row.querySelector('TD');
    for(var i=0;i<arg.length;i+=3){
        var arrow = arg[i+2];
        var inp = createSimpleButtonStyle(td2,arg[i],arg[i+1].bind(this, arrow),"btn btn-sm btn-success btn-file-subrow "+arrow[1]);
       $(inp).attr(onclick,"select_id('"+arrow[0]+"')");
    }
     $("#"+this._current_row_id).after(row);
    return row;
};

addSubMenuFile(arg) {
    var parent = this._parent._row_id;
    var children = this.getChildren();
    this._row_id = "sub_"+parent+"_1";
    let row = document.querySelector('#'+this._row_id);

    const td2 = row.querySelector('TD');
    for(var i=0;i<arg.length;i+=3){
        var arrow = arg[i+2];
        var inp = createSimpleFileStyle(td2,arg[i],arg[i+1].bind(this, arrow),"btn btn-sm btn-info btn-file-subrow "+arrow[1]);
       $(inp).attr(onclick,"select_id('"+arrow[0]+"')");
    }
     $("#"+this._current_row_id).after(row);
    return row;
};

addSubProdRow(arg,index) {
    var parent = this._parent._row_id;
    var children = this.getChildren();
    this._row_id = "subprod_"+parent+"_"+index;
    let obj_prod = new production(arg);
    //var row = create_free_TR("data-status",arg[this.COL_STATUS]);
    this.createProductionRow(obj_prod,arg,index);
    obj_prod.row.style.height = 0;
    obj_prod.row.setAttribute("class", "subrow");
    obj_prod.row.setAttribute("id", this._row_id);
    obj_prod.row.setAttribute("data-level","1");
    /*var td2 = createTD(row, "colspan", "30");
    for(var i=0;i<arg.length;i+=3){
        var arrow = arg[i+2];
        var inp = createSimpleButtonStyle(td2,arg[i],arg[i+1].bind(this, arrow),"btn btn-sm btn-success btn-subrow "+arrow[1]);
       $(inp).attr(onclick,"select_id('"+arrow[0]+"')");
    }*/
     $("#"+this._current_row_id).after(obj_prod.row);
    //return row;
};

async createProductionRow(prod_obj,rowOrdreClient,index) {
    //let lblId = "lblCheck";
    let arg={};
    arg.ficheprod_status = parseInt(rowOrdreClient.ficheprod_status);
    arg.ficheprod_ordre  = parseInt(rowOrdreClient.ficheprod_ordre);
    arg.ficheprod_id  = parseInt(rowOrdreClient.ficheprod_id);
    //let productType = 1;//parseInt(rowOrdreClient[COL_PROD_TYPE[INT]]);
    //let title = "";//rowOrdreClient[COL_CLIENT[INT]] + " : " + rowOrdreClient[COL_QUANTITE[INT]]+ "_______" + rowOrdreClient[COL_OFFRENUM[INT]];
    arg.ficheprod_date = rowOrdreClient.ficheprod_date;
    arg.summary = "";//rowOrdreClient[COL_REF_ARTICLE_ETIQ[INT]] + "---" + rowOrdreClient[COL_PREFIX[INT]] + "-" + rowOrdreClient[COL_ARTICLE[INT]]; //;
    arg.ficheprod_comment = rowOrdreClient.ficheprod_comment;
    arg.ficheprod_transfo = rowOrdreClient.ficheprod_transfo;// + "-" + rowOrdreClient[COL_CENTILISATION[INT]];
    prod_obj.addRow(arg);//[status, lblId + index, false , productType, title, date, summary, comment, com_id, transfo]);
        //line_count++;
    //}
   // console.log("nbre de lines" + line_count);
   // $('h1').text($('h1').text() + " (" + line_count + ")");
   // initLocEventTable();
}

async populate_sub_row_menu(){
    let obj = $("#"+this._parent._row_id);
    
    let com_id = obj.closest('tr').find('div.full-circle').text().trim();
    let arr_dyn_menu= ["detail", this.detail_loc_cbk.bind(this),["","standard",com_id]];
    this.addSubMenuRow(arr_dyn_menu);
};

async populate_sub_row_prod(){
    let obj = $("#"+this._current_row_id);
    
    let com_id = obj.closest('tr').find('div.full-circle').text().trim();
    let arg =  await service_get_num_prod(JSON.stringify({com_id:com_id}));;//await getProductionLines({'com_id':com_id});
    let index=0;
    for(let row of arg){
        this.addSubProdRow(row,index++);
    }
    //let arr_dyn_menu= ["detail", this.detail_loc_cbk.bind(this),["","standard",com_id]];
    //this.addSubProdRow(arr_dyn_menu);
};

async upload_file(arg){
    await service_upload(arg[0],arg[1],this._config._id.toLowerCase());
    await service_set_file_store({fs_row_id:arg[0],fs_type:this._config._id,fs_path:arg[0]+'_'+document.querySelector('#'+arg[1]).files[0].name});
    document.querySelector("#sub_"+this._parent._row_id+"_1").remove();
    this.populate_sub_row_menu();
}

async download_file(arg){
   await service_download(arg[0],arg[1].split("_")[1],this._config._id.toLowerCase());
}

async clone_cbk(arg){
    const id = arg[2];
    const id_label = arg[1];
    const table = arg[0];
    await service_clone({table:table,condition:`${id_label}=${id}`});
};

}//end of class
