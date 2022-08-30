/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var timer = 0;
var delay = 200;
var prevent = false;

var g_pagi;
var check_token =false;

class filter{
	constructor(parent,call_cbk,pagi,config,table_row_class,hfw){
		this._parent = parent; 
		this._config = config;
		this._hfw = hfw._html_framework;
        this._id=this._config._id;
        //this.check_slider_change();//init pour avoir le current_date_slider
		this.init_timers();
        this._call_cbk = call_cbk;
		this.initEventTable(call_cbk);
		this._pagi = pagi;
        this._ds = new dynamic_scroll(this._parent,this._hfw,table_row_class);
        if(table_row_class===undefined)
            this._table_row_class = _table_row;
        else
            this._table_row_class = table_row_class;  
        this.init_worker();
	}

	get_obj(){
		return this;	
	}

    update_buf(id,row_val){
        const index = this._buf.findIndex(el=>el[0]===id);
        this._buf[index]=Array.isArray(row_val)?row_val:row_val.split(";");

    }
    
    handle_worker_response(e){
        var arg = e.data;
            //console.log("message recieved from worker "+arg[0]);
            if(arg[0]==="search"){
                this._buf=arg[1];
                this._parent.sync_db_cbk(this._buf);
                this.filter_combo();
                this._ds.init_io(this._buf);
                
            }
            
            if(arg[0]==="special_search"){
                this._buf=arg[1];
                this._parent.sync_db_cbk(this._buf);
                this.filter_combo();
                this._ds.init_io(this._buf);
            }
    }
       
    
    async init_worker(){
        this._myWorker = new Worker('../../capstech_lib_v2/js/class/worker.js');
        var f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
        this._myWorker.postMessage(['init']);
    }

	init_timers(){
		this._timerSearch = new Timer(this._config._SEARCH_DELAY, this.cbk_search.bind(this));
	}

	async initEventTable() {
		this._firstClickSearch = false;
		this._table_target_id = this._parent._table_body_id;
        
		const x_s = (e) => new Promise(() => this.cbk_search(e));
    	$('#'+this._hfw.status_combo).on('change',await x_s);
    	$('.'+this._hfw.input_search).on('keyup', this.handle_timer_search.bind(this));
        $('#'+this._hfw.slider).on('change', await x_s);
        $(`#${this._hfw.extra_search_btn}`).on('click', this.cbk_extra_search.bind(this));
        
    }

    handle_timer_search(){
        Loader.show();
        Loader.log("recherche en cours ...");
        if (!this._firstClickSearch) {
        	console.log("first click");
            this._firstClickSearch = true;
            this._timerSearch.reset();
        } else {
        	if (this._timerSearch.isActive) 
            	this._timerSearch.reset();
            else
            	this._firstClickSearch=false;
       	}
    }
	
	refresh(){
		Loader.log("filter refresh");
		return this.handle_btn_filter()
	}
    extra_search(){
        let occ = [];
        document.querySelectorAll(`#extra_search_div_${this._id} input`).forEach(
            row=> row.value!==""?occ.push({index:row.getAttribute('data_index'),val:row.value,type:row.getAttribute('data_type')}):""
        );
        $('#'+this._table_target_id+' tr').remove();
        this._myWorker.postMessage(["special_search",occ,this._parent._loc.getBuffer()]);
    }

    async check_inp_search(){
        var full_inputVal = $('.'+this._hfw.input_search).val().trim();
        var inputVal_split = (full_inputVal.split('&&').every((row)=>row.length>0))?full_inputVal.split('&&'):null;
        await this._config.set_search_param(full_inputVal);
        $('#'+this._table_target_id+' tr').remove();
        //Enfonction de l'année on charge le localStorage dans le buffer
        const combo = document.getElementById(this._hfw.status_combo);
        this._myWorker.postMessage(["search",inputVal_split,this._parent._loc.getBuffer(),combo.options[combo.selectedIndex].index]);
    }

    get_years(year){
        let last_year = parseInt(today().split('-')[0]);
        let start_year = parseInt(year);
        let str = start_year+'-';
        for(let y=start_year+1;y<=last_year;y++){
            str +='&&'+y+'-';
        }
        return str;
    }

    async check_combo_change(){
        var target = $('#'+this._hfw.status_combo).val();
        this._config.set_combo_status(target);
    }

    async check_slider_change(e){
        var year = $('#'+this._hfw.slider).val();
        return this.set_local_storage(year);
    }

    async set_local_storage(year){
    	if(year===this._config.previous_year) return this._parent._loc;
		$('#'+this._hfw.slider_lbl).text(year);
    	this._hfw._year=year;
        this._config.set_date_filter(year+"-01-01");
        this.current_date_slider=year+"-01-01";
        this._config.previous_year=year;
        this._parent._loc=new Buffer([],this._parent._columns);
        if(this._config._offline){
            //update current buffer
            var tableau = await db_read(this._hfw.table_body_id.split("_")[1]+"_buffer_"+year);
            return tableau?new Buffer(tableau.split("||"),this._parent._columns):new Buffer([],this._parent._columns);
        }else{
            
        }

    }
    
    async cbk_search(e){
        this._parent._loc=await this.check_slider_change();
        await this.check_inp_search();
        await this.check_combo_change();
        return true;
    }
	async cbk_extra_search(e){
        await this.extra_search();
        return true;
    }

    filter_combo(){
        var target = $('#'+this._hfw.status_combo).val();
        var line;
        if (target !== 'all') {
            line = $('#'+this._table_target_id +' tr[data-status="' + target + '"]');
            
        }else{
            line = $('#'+this._table_target_id + ' tr');
        }
        
        var line_count = line.length;
        line.show();
        $('#'+this._table_target_id).parent().find('tr').off('click touchstart');
       
        $('#'+this._table_target_id).parent().find('tr').filter(':visible').each(
            this.each_filter.bind(this)
        );
        Loader.log(line_count+" lignes trouvées");
        
        Loader.hide();
        return line_count;
    }
    
	 each_filter(index,row){
	 	try{
	 	var row = this._table_row_class.get_obj($(row).attr('id'));
        if(!row.is_listening())
        	row.add_click();
	 	}catch(e){
	 		console.log("erreur row ="+$(row).attr('id'));
	 		console.log("erreur get_id index="+index);
	 	}
	 }

	handle_btn_filter(){
        return this.cbk_search();
	}
}