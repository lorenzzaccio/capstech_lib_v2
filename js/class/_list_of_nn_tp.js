/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class _list_of_nn_tp {

	constructor(container, row_mapper,config,sub_row_class,columns,status,table_row_class,loc,parent) {
		this._parent=parent;
		this.container = container;
		this.row_mapper = row_mapper;
		this._config = config;
		this.index = 0;
		this._sub_row_class = sub_row_class;
		this._columns = columns;
		this._status = status;
		this.loc=loc;//[];
		if(table_row_class !== undefined)
			this._table_row = table_row_class;
		else
			this._table_row = _table_row;
			
	};

	loc_addRowWithId(row_id, arr) {
		var new_row = new (this._table_row)(this.row_mapper,row_id,arr,this._config,this._sub_row_class,this._columns,this._status,this._parent);
		let f= new_row.create.bind(new_row);
		f(arr);
		new_row.hide();
		return new_row;
	};
	
	get_row(row_id){
		const id = row_id.split("_mainRow")[1];
		const data = this.loc.buffer[id];
		const row = new this._table_row(this.row_mapper,row_id,data,this._config,this._sub_row_class,this._columns,this._status,this._parent);
		return row;
	}
	
	update(row_id,arr){
		var existing_row = new (this._table_row)(this.row_mapper,row_id,Array.isArray(arr)?arr:arr.split(";"),this._config,this._sub_row_class,this._columns,this._status,this._parent);
		existing_row.update();
	}

	populateTable(loc, table_id) {
		const list_size = this._config._list_size;
		var rowOrdreClient;
		var line_count = 0;
		var arr = loc.getBuffer();
		var free_table_str="";
		var id = table_id.split("_")[1];
		
		document.getElementById(this.container).display='none';
		const limit = (arr.length<list_size)?arr.length:list_size;
		for (var k = 0; k <  limit; k++) {
			if ((arr[k] === null) || (arr[k] === undefined ))
				continue;
			if( Object.prototype.toString.call( arr[k] ) !== '[object Array]' ) 
				rowOrdreClient = arr[k].split(";");
			else
				rowOrdreClient = arr[k];

			var row_id = id+"_mainRow" + line_count;
			var row = this.loc_addRowWithId(row_id, rowOrdreClient);
			$('#'+this.container).append(row._row);
			
			line_count++;
		}
		this.index += arr.length;
		document.getElementById(this.container).display='table';

	}
}
