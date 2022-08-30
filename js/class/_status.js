class _status{
	constructor(){
		this.DEFAULT="";
	}

	get_id(){
		return this.COL_ID[INT];
	  }
	  get_full_id(){
		return this.COL_ID;
	  }
	  get_full_status(){
		return this.COL_STATUS;
	  }
	  get_lbl_id(){
		return this.COL_ID[STR];
	  }
	  get_status(){
		return this.COL_STATUS[INT];
	  }
	  get_lbl_status(){
		return this.COL_STATUS[STR];
	  }
	  convertStatus(status){
		  return this._statusClass[status] || "no";
	  }
	   
	  revertStatus(status){
		for(var i=0;i<Object.keys(this._statusClass).length;i++){
		  if(status===this._statusClass[i])
			  return i;
		}
		return this._statusClass[status] || "no";
	 }
}