class _list_of_class {
	constructor(parent,custom_config,list_class_tp,list_class_row,table_row_class,sub_row_class,columns,html_framework,status){
	    this._parent = parent;
		this._hfw = html_framework;
        this._id=this._hfw._id;
        this._table_body_id = this._hfw._html_framework.table_body_id;
		this._config = custom_config || new config(this._id);//html_framework.get_html_framework());
        this.params = new parameters(this._config,this._hfw);
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

    init_table(){
        this.empty_table();
    }

	async init(){
		await this.init_ui();
		await this.init_table();
		await this.sync_db();
	}
	
	async init_ui(){
		this._currentDate = today();
        await this._config.init();
    	await this.init_dates();
		await this.init_status_combo();
        await this.init_slider();
    	await this.init_refresh();
        await this.init_filter();
        await this.init_sidebar();
        await this.init_parameter_btn();
        await register_sidenav_btn(this._config,this._hfw._html_framework);
        await this.create_row_mapping();
	}

    init_filter(){
        this._filter = new filter(this,null,this._pagi,this._config,this._table_row_class,this._hfw);
    }

    init_sidebar(){
        load_side_nav(this._config,this._hfw._html_framework.sidenav);
        if(this._config._side_bar_open===0)
            closeNav(this._hfw._html_framework);
        else
            openNav(this._hfw._html_framework);      
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
        $("body").off('click touchstart','#parameter_'+this._id);
        const p = new parameters(this._config,this._hfw._html_framework);

        $('#parameter_'+this._id).on('click touchstart',p.displayParameter.bind(this.params));
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
        //var html_framework =this._config.get_html_framework();  
		$('#'+this._hfw._html_framework.status_combo).val(this._config._combo_status||'all');
        console.log(`status ${this._id} initialised to ${this._config._combo_status||'all'}`);
	}

    init_slider(){
        //var html_framework = this._config.get_html_framework();
        //retrieve id
        var classname = this.constructor.name;
        var id = classname.split("_")[0];
        //update ui slider
        var year = this._config._date_filter.split("-")[0];
        let fin = this._config._dateFin.split("-")[0];
        $('#'+this._hfw._html_framework.slider)[0].max=fin;
        $('#'+this._hfw._html_framework.slider_lbl).text(year);
        $('#'+this._hfw._html_framework.slider).val(year);
    }

	init_pagination(){
    	this._pagi = new Pagination(PAGINATION_BLOCK_ID);
	}

	async sync_db(){
        //var html_framework = '.'+this._config.get_html_framework();
    	$('#'+this._hfw._html_framework.input_search).val(this._config.get_search_param());
        await this.fetch_full_data();
	};

    sync_db_cbk(buffer){
    	this._token=true;
        this._hfw.set_extra_search_btn(buffer.length);
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
        $('#'+this._hfw._html_framework.refresh_btn).on('click',()=>{
        	_self.fetch_update_data.bind(_self)();
        	});
    }

    sync_worker(arg){
        this.worker_send_msg(arg);
    }

    init_worker(){
        this._myWorker = new Worker('../../new_'+this._id+'/public_html/js/'+this._id+'_update_worker.js');
        this.test_worker = this._myWorker; 
        const f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
    } 
 
    handle_worker_response(e){
        var arg = e.data;
        if(arg[0]==="db_sync"){
            if(arg[1] && arg[2] && arg[2]!==-1){
                db_write(this._config._id+"_buffer_"+arg[1],new Buffer(arg[2].groups || arg[2]).toString() );
                console.log(" syncing received "+arg[1]);
                var year = $('#'+this._hfw._html_framework.slider).val();
                if(parseInt(year)===arg[1])
                    this._filter.cbk_search();
                 
            }
        }    
        if(arg[0]==="db_update"){
            if(arg[1].length>0){
                const modified_result=arg[1];
                const year = arg[2];
                let redundancy = [];let redundancy_index=0;
                for(let row in modified_result){
                    Loader.log("something to update"+modified_result[row][0]);
                    const line = modified_result[row].split(";");
                    const id =line[0];
                    //check redundancy
                    const r_index = redundancy.findIndex((row) => row===id);
                    if(r_index===-1) redundancy.push(id); else { redundancy++;console.log(`redundancy detected for ${id}`); continue;}
                    let row_id;
                    //update le scroll buffer
                    if(this._filter._buf){
                    	row_id = this._filter._buf.findIndex((row)=>row[0]===id);
                    	this._liste_class.update(this._config._id+"_mainRow"+row_id,line.join(";"));    
                    }
                    //this_loc = buffer interne des données
                    //retrouve l'index du tableau pour l'id correspondant
                    const index = this.filtreTexte(this._loc,line[0]);
                    if(index !==-1){
                        //console.log("row_index="+index);
                        let i=0;
                        //retrouve la colonne modifiée
                        const col_index = this._loc.getRow(index).findIndex( (el)=> {
                            return el!==line[i++];
                        });

                        if(col_index!==-1){
                            //console.log("col_index="+col_index);
                            //update le buffer interne de données
                            this._loc.setValue(line[col_index],index,col_index);
                            //update ui and local mem
                            row_id ?this._liste_class.update(this._config._id+"_mainRow"+row_id,line):"";  
                            console.log(`updating ${index} ${col_index}`);
                        }
                        //update scroll buffer
                        this._filter._buf ? this._filter.update_buf(line[0],line):"";  
                    }
                }
                if(redundancy_index>3){
                    console.log(`${this._config._id}_buffer_${year} too much redundancy ${redundancy_index}`);
                    localStorage.removeItem(`${this._config._id}_buffer_${year}`);
                    this._myWorker.postMessage(["sync",this._config.get_status()||this._status.DEFAULT,year]);
                }
                //recopie dans localStorage
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
        $('#pacman').hide();
    }
    filtreTexte(arr, requete) { 
        return arr.getBuffer().findIndex(
            (el) => (el.indexOf(requete)!==-1)      
        )
    };




    async fetch_full_data(){
       
        //const date_deb = new Date(this._config.get_date_deb());
        const date_fin = new Date(this._config.get_date_fin());
        this.init_worker();
        const start_year = parseInt(extract_year(this._config.get_date_deb()));
        const end_year = parseInt(extract_year(this._config.get_date_fin()));
        let lcl_date_deb = this._config.get_date_deb();
        let lcl_date_fin=(+new Date(getEndYear(lcl_date_deb))<+date_fin)?getEndYear_str(lcl_date_deb):this._config.get_date_fin();
        for(let year=start_year;year<=end_year;year++){
            const l = await db_read(this._config._id+"_buffer_"+year);
            this._loc=l?new Buffer( l.split("||")): null ;
            
            if(this._loc){
                //launch synchronisation
                if(year===parseInt(document.getElementById(this._hfw._html_framework.slider).value)){
                    this.test_worker.postMessage(["start",this._config.get_status()||this._status.DEFAULT,this._loc.buffer,year]);
                }
                if(year===parseInt(document.getElementById(this._hfw._html_framework.slider).value))
                    this._filter.cbk_search();
            }
            if(!this._loc){
                this._myWorker.postMessage(["sync",this._config.get_status()||this._status.DEFAULT,year]);
            }
            lcl_date_deb=addDay_str(lcl_date_fin,1);
            if(+new Date(lcl_date_deb)>=+new Date(this._config.get_date_fin())) break;
            lcl_date_fin=(+new Date(getEndYear_str(lcl_date_deb))<+new Date(date_fin))?getEndYear_str(lcl_date_deb):this._config.get_date_fin();
        }
    }

    async fetch_update_data(self){
        $('#pacman').show();
        const cl = this || self;
        const year =  cl._hfw._html_framework._year;
        this.test_worker.postMessage(["start",cl._config.get_status(),cl._loc.buffer,year]);      
    }  

}
