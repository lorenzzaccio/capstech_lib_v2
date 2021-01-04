/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class _list_of_nn_tp {

	constructor(container, row_mapper,config,sub_row_class,columns,status,table_row_class,loc) {
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
		var new_row = new (this._table_row)(this.row_mapper,row_id,arr,this._config,this._sub_row_class,this._columns,this._status);
		let f= new_row.create.bind(new_row);
		f(arr);
		new_row.hide();
		return new_row;
	};
	
	get_row(row_id){
		const id = row_id.split("_mainRow")[1];
		const data = this.loc.buffer[id];
		const row = new this._table_row(this.row_mapper,row_id,data,this._config,this._sub_row_class,this._columns,this._status);
		return row;
	}
	
	update(row_id,arr){
		var existing_row = new (this._table_row)(this.row_mapper,row_id,arr.split(";"),this._config,this._sub_row_class,this._columns,this._status);
		existing_row.update();
	}
/*
	add(arr){
		cont row_id = arr.split(';')[0];
		var new_row = new (this._table_row)(this.row_mapper,row_id,arr,this._config,this._sub_row_class,this._columns,this._status);
		let f= new_row.create.bind(new_row);
		f(arr);
		new_row.hide();
		return new_row;
	}*/

	populateTable(loc, table_id) {
		//var virtual_dom = create_free_table();
		const list_size = this._config._list_size;
		var rowOrdreClient;
		var line_count = 0;
		var arr = loc.getBuffer();
		var free_table_str="";
		var id = table_id.split("_")[1];
		
		document.getElementById(this.container).display='none';
		const limit = (arr.length<list_size)?arr.length:list_size;
		for (var k = 0; k <  limit; k++) {
			if (arr[k] === null)
				continue;
			if( Object.prototype.toString.call( arr[k] ) !== '[object Array]' ) 
				rowOrdreClient = arr[k].split(";");
			else
				rowOrdreClient = arr[k];

			var row_id = id+"_mainRow" + line_count/*k+ this.index*/;
			var row = this.loc_addRowWithId(row_id, rowOrdreClient);
			$('#'+this.container).append(row._row);
			
			line_count++;
		}
		this.index += arr.length;
		document.getElementById(this.container).display='table';

	}
	;
/*
	syncLocTable(loc_shadow, loc, table_id) {
		var rowOrdreClient;
		var line_count = 0;
		var arr_new_row = [];
		var obj_this = this;
		var arr = loc_shadow.getBuffer();
		var old_arr = loc.getBuffer();

		//add new row
		this.chech_added_row(arr, old_arr, this, g_loc);

		//add delete row
		this.check_deleted_row(arr, old_arr, this, g_loc);

		//update row
		this.check_updated_row(arr, old_arr, this, g_loc);
		console.log("finished");
	}
	;

	loc_insert_row(row){
		$('#'+this.container).append(row);
	};*/

	/*
	loc_updateRowWithId(com_id_row, container, col, value) {
		var row = $("#" + container).find("tr ." + this.COL_ID[STR] + ":containsNC(" + com_id_row + ")").closest("tr");
		if (col === this.COL_STATUS[INT])
			value = statusClass[parseInt(value)];
		$(row).find("." + this.columns[col][STR])[0].textContent = value;
	}
	;

	loc_removeRowWithId(com_id_row, container) {
		$("#" + container).find("tr ." + this.COL_ID[STR] + ":containsNC(" + com_id_row + ")").closest("tr").remove();
	}
	;

	check_deleted_row(arr, old_arr, obj, loc) {
		old_arr.forEach(function(old_row, index) {
			var b_found_index = 0;
			var b_found = false;
			var rowOrdreClient = extract_row(old_row);

			var old_row_id = old_row[0];

			arr.forEach(function(row, index) {
				var tmp_row = extract_row(row);
				var row_id = tmp_row[0];
				if (old_row_id === row_id) {
					b_found = true;
				}
			});
			if (b_found === false) {
				obj.loc_removeRowWithId(old_row_id, obj.container);
				loc.remove(index);
				console.log("deleted row " + rowOrdreClient);
			}

		});
	}
	;

	check_updated_row(arr, old_arr, obj, loc) {
		old_arr.forEach(function(old_row, index) {
			var b_found_index = 0;
			var b_found = false;
			var rowOrdreClient = extract_row(old_row);

			var old_row_id = old_row[0];
			var arr_same_row = arr.filter((row)=>(row[0] === old_row_id));
			var new_row;
			var b_diff = false;
			if (arr_same_row.length > 0) {
				new_row = arr_same_row[0];
				var j = 0;
				for (j = 0; j < new_row.length; j++) {
					if (new_row[j] !== old_row[j]) {
						b_diff = true;
						loc.setValue(new_row[j], index, j);
						obj.loc_updateRowWithId(old_row_id, obj.container, j, new_row[j]);
					}
				}
			}
			if (b_diff)
				console.log("need update : " + old_row_id);

		});
	}
	;

	chech_added_row(arr, old_arr, obj, loc) {
		arr.forEach(function(row, index) {
			var b_found = false;
			var rowOrdreClient = extract_row(row);

			var row_id = row[0];
			old_arr.forEach(function(old_row, index) {
				var tmp_old_row = extract_row(old_row);
				var old_row_id = tmp_old_row[0];
				if (old_row_id === row_id) {
					b_found = true;
				}
			});
			if (!b_found) {
				var row_index = "mainRow" + g_current_row_index;
				var new_row = obj.loc_addRowWithId(row_index, rowOrdreClient);
				obj.loc_insert_row(new_row);
				$(new_row._row).on('click touchstart', function () {
                        handle_sub_row(this);
            	});
				loc.add(rowOrdreClient);
				g_current_row_index++;
				console.log("add row " + rowOrdreClient);
			}
		});
	}
	;
*/
}
