class _sub_row{

constructor(parent,config,status){
    this._parent = parent;
    this._config = config;
    this._status = parent._status;
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
        if(this._visible)
            this.hide();
        else
            this.show();
}

show(){
    this._visible=true;
    $('#'+this._row_id).css('display', 'table-row').animate({height: '40px'},
    function () {
        $('#'+this._row_id).show();
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



}//end of class
