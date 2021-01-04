class _list_of_class {
	constructor(parent,table_id,list_class_tp,list_class_row,table_row_class,sub_row_class,columns,html_framework,status){
	    this._parent = parent;
		this._table_body_id = html_framework.get_html_framework().table_body_id;
        this._id=html_framework._id;
		this._config = new config(html_framework.get_html_framework());
        this.params = new parameters(this._config);
        this._lll_row = new Lib_row(this._table_body_id);
        this._sub_row_class = sub_row_class;
        this._columns = columns;
        this._status=status;
        //init year sync
        this._year_sync=[];
        this._loc = new Buffer(new Array());
		this._liste_class = new _list_of_nn_tp(this._table_body_id,this._lll_row,this._config,this._sub_row_class,this._columns,this._status,table_row_class,this._loc);
        
        this._table_row_class = table_row_class;//_table_row;
		this.init();
	}

    init_worker(){
        this._myWorker = new Worker('../../new_'+this._filter._id+'/public_html/js/'+this._filter._id+'_update_worker.js');
        this.test_worker = this._myWorker; 
        const f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
    } 
    

    init_table(){
        //this._resBuffer = [];
        //this._loc = new Buffer(new Array());
        
        this.empty_table();
        //this._liste_class.create_row_mapping();
    }

	init(){
		this.init_ui();
        this.init_fetch_data();
		this.init_table();
		this.sync_db();
	}
	
	init_ui(){
		this._currentDate = today();
        //init_ip();
    	this.init_dates();
		this.init_status_combo();
        this.init_slider();
    	this.init_refresh();
        this.init_filter();
        this.init_sidebar();
        this.init_parameter_btn();
        register_sidenav_btn(this._config);
        this.create_row_mapping();
	}

    init_filter(){
        this._filter = new filter(this,null,this._pagi,this._config,this._table_row_class);
    }


    init_sidebar(){
        load_side_nav(this._config);
        if(this._config._side_bar_open===0)
            closeNav(this._config);
        else
            openNav(this._config);      
    }
    
    create_row_mapping(){
    	if(this._columns!==undefined){
        (this._columns).forEach(function(element){
            $('.mapping_content').append('<li><span class="map_lbl"><input type="checkbox" value="'+element[1]+'" checked><p>'+element[1]+'</p></span></li>');
        });  
        //register
        $('.map_lbl').find('input').on('click', function () {
            var col_class = $(this).val();
        $('.'+col_class).toggle(this.checked);
        });  

    	}
    }

    init_parameter_btn(){
        $("body").off('click touchstart','#parameter');
        $('#parameter').on('click touchstart',this.params.displayParameter.bind(this.params));
    }

	init_timers(){
    	this._timerBackLoad = new Timer(this._config._BACK_LOAD_DELAY, this.cbk_back_load_routine.bind(this));
    	this._timerBackLoad.reset();	
	}

	init_dates(){
    	this._dateDeb = this._dateDeb || DEFAULT_DATE_DEB;
    	this._dateFin=today();
	}

	init_status_combo(){
        var html_framework =this._config.get_html_framework();
  		//this._combo_status = $('#'+this._table_body_id).closest(full_container).find('select');  
		$('#'+html_framework.status_combo).val(this._config._combo_status);
	}

    init_slider(){
        var html_framework = this._config.get_html_framework();
        //retrieve id
        var classname = this.constructor.name;
        var id = classname.split("_")[0];
        //update ui slider
        var year = this._config._date_filter.split("-")[0];
        $('#'+html_framework.slider_lbl).text(year);
        $('#'+html_framework.slider).val(year);
    }

	init_pagination(){
    	this._pagi = new Pagination(PAGINATION_BLOCK_ID);
	}

	sync_db(){
        var html_framework = '.'+this._config.get_html_framework();
    	$('#'+html_framework.input_search).val(this._config.get_search_param());
        this.fecth_data();
	};

    init_fetch_data(){
        var buffer = [];
        var date_deb = new Date(this._config.get_date_deb());
        var date_fin = new Date(this._config.get_date_fin());
    
        date_deb.setMonth(date_deb.getMonth());
        this._current_date_deb = date_deb.toISOString().split("T")[0];

        date_fin.setMonth(date_fin.getMonth());
        this._current_date_fin = date_fin.toISOString().split("T")[0];
    }

    async fecth_data(){
        Loader.show();
        Loader.log("envoi de la requête");
        let fetch = await this.fetch_full_data();
        Loader.log("données reçues");
        //var length = await this._filter.cbk_search();
        Loader.hide()
    }
	
    sync_db_cbk(buffer){
    	this._token=true;
    	//this._loc=new Buffer(buffer);
    	this._liste_class.populateTable(new Buffer(buffer),this._table_body_id);
    	console.log("Populate "+this._table_body_id);
    	this._liste_class.loc=this._loc;
	};

    get_row(index){
        return this._liste_class.get_row(index);
    }

	empty_table(){
    	$('#'+this._table_body_id).empty();
	}

    
    init_refresh(){
        let _self = this;
        $('#'+this._config.get_html_framework().refresh_btn).on('click',()=>{
        	_self.fetch_update_data.bind(_self)();
        	});
    }

    sync_worker(arg){
        this.worker_send_msg(arg);
    }

    init_worker(){
        this._myWorker = new Worker('../../capstech_lib_v2/js/class/update_worker.js');
        test_worker = this._myWorker; 
        const f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
    }

    handle_worker_response(e){
        var arg = e.data;
        if(arg[0]==="db_sync"){
            if(arg[1] && arg[2]){
                db_write(this._config._id+"_buffer_"+arg[1],new Buffer(arg[2]).toString() );
                console.log(" syncing received "+arg[1]);
                var year = $('#'+this._filter._config._html_framework.slider).val();
                if(parseInt(year)===arg[1])
                    this._filter.cbk_search();
                 
            }
        }    
        if(arg[0]==="db_update"){
            if(arg[1].length>0){
                const modified_result=arg[1];
                const year = arg[2];
                for(let row in modified_result){
                    Loader.log("something to update"+modified_result[row][0]);
                    const id =modified_result[row][0];
                    if(this._filter._buf){
                    	const row_id = this._filter._buf.findIndex((row)=>row[0]===id);
                    	this._liste_class.update(this._config._id+"_mainRow"+row_id/*modified_result[row][2]*/,modified_result[row][1]);    
                    }
                    const index = this.filtreTexte(this._loc,modified_result[row][0]);
                    if(index !==-1){
                        console.log("row_index="+index);
                        let i=0;
                        const col_index = this._loc.getRow(index).findIndex( (el)=> {
                            return el!==modified_result[row][1].split(";")[i++];
                        });

                    if(col_index!==-1){
                        console.log("col_index="+col_index);
                        this._loc.setValue(modified_result[row][1].split(";")[col_index],index,col_index);
                        //update ui and local mem
                        this._liste_class.update(this._config._id+"_mainRow"+modified_result[row][2],modified_result[row][1]);  
                    }
                    this._filter.update_buf(modified_result[row][1].split(";")[0],modified_result[row][1]);  
                }
                }
                db_write(this._config._id+"_buffer_"+year,this._loc.toString());
		
            }
        }

        if(arg[0]==="db_add_row"){
            if(arg[1].length>0){
                const modified_result=arg[1];
                const year = arg[2];
                for(let row in modified_result){
                    Loader.log("some rows to add"+modified_result[row][0]);
                    //insert_row_to_DOM(modified_result[row]);
                    this._loc.buffer.push(modified_result[row].split(";"));
                    //insert_row_to_loc(modified_result[row]);
                    //this._filter.add_row(modified_result[row]);
                }
                //refresh filter
                this._filter.refresh();
                db_write(this._config._id+"_buffer_"+year,this._loc.toString());

            }
        }

        if(arg[0]==="db_suppress_row"){
            if(arg[1].length>0){
                const modified_result=arg[1];
                const year = arg[2];
                for(let row in modified_result){
                    Loader.log("some rows to add"+modified_result[row][0]);
                    const row_id = modified_result[row].split(";")[0];
                    //delete_row_to_DOM(modified_result[row]);
                     //const ret_index=this._loc.buffer.filter((row)=>{parseInt(row[0])===parseInt(row_id)||row[0]===row_id});
                     this._loc.buffer.map((row,index)=>{ if(parseInt(row[0])===parseInt(row_id)) this._loc.buffer.splice(index)});
                     
                     //if(index>=0)this._loc.buffer.splice(index);
                }
                //refresh filter
                this._filter.refresh();
            }
        }
        Loader.log(arg[0]||"nothing to do");
    }
    filtreTexte(arr, requete) { 
        return arr.getBuffer().findIndex(
            (el) => (el.indexOf(requete)!==-1)      
        )
    };

    init_worker(){
        this._myWorker = new Worker('../../new_'+this._filter._id+'/public_html/js/'+this._filter._id+'_update_worker.js');
        this.test_worker = this._myWorker; 
        const f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
    }


    async fetch_full_data(){
        
        const date_deb = new Date(this._config.get_date_deb());
        const date_fin = new Date(this._config.get_date_fin());
        this.init_worker();
        const start_year = parseInt(extract_year(this._config.get_date_deb()));
        const end_year = parseInt(extract_year(this._config.get_date_fin()));
        let lcl_date_deb = this._config.get_date_deb();
        let lcl_date_fin=(+new Date(getEndYear(lcl_date_deb))<+date_fin)?getEndYear_str(lcl_date_deb):this._config.get_date_fin();
        for(let year=start_year;year<=end_year;year++){
            this._loc=db_read(this._config._id+"_buffer_"+year)?new Buffer( db_read(this._config._id+"_buffer_"+year).split("||")): null ;
            
            if(this._loc){
                //launch synchronisation
                if(year===parseInt(document.getElementById(this._filter._config._html_framework.slider).value)){
                    this.test_worker.postMessage(["start",this._config.get_status()||this._status.DEFAULT,this._loc.buffer,year]);
                    this.test_worker.postMessage(["check_added",this._config.get_status(),this._loc.buffer,year])
                    this.test_worker.postMessage(["check_suppress",this._config.get_status(),this._loc.buffer,year])
                }
                if(year===parseInt(document.getElementById(this._filter._config._html_framework.slider).value))
                    this._filter.cbk_search();
            }
            if(!this._loc){
                this._myWorker.postMessage(["sync",lcl_date_deb,lcl_date_fin,this._config.get_status()||this._status.DEFAULT]);
            }
            lcl_date_deb=addDay_str(lcl_date_fin,1);
            if(+new Date(lcl_date_deb)>=+new Date(this._config.get_date_fin())) break;
            lcl_date_fin=(+new Date(getEndYear_str(lcl_date_deb))<+new Date(date_fin))?getEndYear_str(lcl_date_deb):this._config.get_date_fin();
        }
    }

    async fetch_update_data(){
        const year = this._config._html_framework._year;
        this.test_worker.postMessage(["start",this._config.get_status(),this._loc.buffer,year]);
        this.test_worker.postMessage(["check_added",this._config.get_status(),this._loc.buffer,year])
        this.test_worker.postMessage(["check_suppress",this._config.get_status(),this._loc.buffer,year])       
    }  

}
