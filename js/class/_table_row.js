var _arr_obj={};

class _table_row {

	constructor(row_mapper,row_id, data,config,sub_row_class,columns,status_class) {
		this._row_mapper = row_mapper;
		this._row_id = row_id;
		this._config = config;
		this.columns = columns;
		this._sub_row_class = sub_row_class;
		this._status = status_class;
		this.register(this._row_id);
		this._columns = columns;
		this.COL_ID = this._columns[this._status.get_id()];
		this.COL_STATUS = this._columns[this._status.get_status()];
		this._status_index = this.COL_STATUS[INT];
		this._status_str = this.COL_STATUS[STR];
		this._star_id = 0;
		this.data=data;
	};

	get_data(){
		var arr = $("#"+this._row_id+" td").toArray();
		let myMap = new Map();
		for (const ele in arr){
			let property = $(arr[ele]).find('div').attr("class");
			if(property.includes("full-circle"))
			{	
				property = property.split("full-circle")[1].trim();
			}
			let val = $(arr[ele]).find('div')[0].textContent;
			myMap.set(property, val);
		}
		return myMap;
	}

	show_sub_row(){
		if(this._sub_row) 
	        this._sub_row.display_sub_row();    
	    else
	        this._sub_row = new this._sub_row_class(this,this._config,this._status);
	}

	add_click(){
		$('#'+this._row_id).on('click touchstart', this.show_sub_row.bind(this));
		this._event_handler=true;
	}

	is_listening(){
		return (this._event_handler===1)?true:false;
	}

	static get_obj(id){
		return _arr_obj[id];
	};

	insert_sub_row(){

	};

	delete_sub_row(){

	};

	hide_sub_row(b_hide){

	};

	register(id){
		_arr_obj[id]=this;
	}

	hide(){
		$(this._row).hide();
	}

	create(){
		//let t = this.data;
		var sub_id = "sub_" + this._row_id;
		this._row = (this._row_mapper).appendRowWithId(this._row_id, this._status._statusClass[this.data[this._status_index]], sub_id);
		(this._row_mapper).insertTdStar(this._row, (this.data[this._columns[this._star_id][INT]]), this._columns[this._star_id][STR]);
		var this_class = this;
		this._columns.forEach(function(element, index) {
			if ((index >= 0) && (index !== this_class._status_index) && (index !== this_class._star_id))
					(this_class._row_mapper).insertField(this_class._row, (this_class.data[element[INT]]), decodeURIComponent(escape(element[STR])));
		});
		(this._row_mapper).insertField(this._row, (this._status._statusClass[this_class.data[this._status_index]]), this._status_str);
	}

	update(){
		this._row = document.getElementById(this._row_id);
		if(!this._row) return;
		var this_class = this;
		this._columns.forEach(function(element, index) {
			if ((index >= 0) && (index !== this_class._status_index))
					(this_class._row_mapper).updateField(this_class._row, (this_class.data[element[INT]]), decodeURIComponent(escape(element[STR])));
		});
		(this._row_mapper).updateComboField(this._row, (this._status._statusClass[this_class.data[this._status_index]]), this._status_str);
		//localStorage.setItem(this._config._id+"_buffer_"+this._config.get_html_framework()._year,this._parent._loc.toString());
		//do a resync on next start
		//localStorage.removeItem(this._config._id+"_buffer_"+this._config.get_html_framework()._year);
	}

	recycle(index,data){
		const that=this;
		this._columns.forEach(function(element, i) {
			if ((i >= 0) && (i !== that._status_index)){
					try{
						//if(data[0]==="10893")
						//console.log(data[element[INT]]);
					(that._row_mapper).updateField(document.getElementById(that._row_id), data[element[INT]], decodeURIComponent(escape(element[STR])));
					}catch(e){
						console.log("error : line "+that._row_id);
					}
			}
		});
		(this._row_mapper).updateComboField(document.getElementById(that._row_id), (this._status._statusClass[data[this._status_index]]), this._status_str);
	}

}
