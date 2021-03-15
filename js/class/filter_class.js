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
	constructor(parent,call_cbk,pagi,config,table_row_class){
		this._parent = parent; 
		this._config = config;
        this.topSentinelPreviousY = 0;
        this.topSentinelPreviousRatio = 0;
        this.bottomSentinelPreviousY = 0;
        this.bottomSentinelPreviousRatio = 0;
        this.currentIndex=0;
        this._id=(this._config.get_html_framework().table_body_id).split("_")[1];
        //this.check_slider_change();//init pour avoir le current_date_slider
		this.init_timers();
        this._call_cbk = call_cbk;
		this.initEventTable(call_cbk);
		this._pagi = pagi;
        this.listSize=this._config._list_size;
        this.increment = this.listSize/2+8;
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
        this._buf[index]=row_val.split(";");

    }
    
    handle_worker_response(e){
        var arg = e.data;
            //console.log("message recieved from worker "+arg[0]);
            if(arg[0]==="search"){
                this._buf=arg[1];
                this._parent.sync_db_cbk(this._buf);
                this.filter_combo();
                if(this.listSize<this._buf.length){
                	const h = this.init_scroll_direction.bind(this);
                	h();
                	this.initIntersectionObserver();
                }
            }else{
                Loader.log(arg[0]);
            }
    }
       
    initIntersectionObserver() {
            const options = {
                /* root: document.querySelector(".cat-list") */
            }
	const that = this;
        const callback = entries => {
            entries.forEach(entry => {
                //console.log(entry.target.id );
                if (entry.target.id === that._id+'_mainRow0') {
                	const f=that.topSentCallback.bind(that);
                    f(entry);
                    //console.log(this._id+"_mainRow0");
                    //console.log(document.querySelector(".table-container").style.paddingTop);
                } else {
                    if (entry.target.id === `${that._id}_mainRow${that.listSize-1}`) {
                        //console.log(`${that._id}_mainRow${that.listSize-1}`);
                        //console.log(document.querySelector(".table-container").style.paddingTop);
                        if(!that.scroll_down){
                            const f=that.botSentCallback.bind(that);
                            f(entry);
                        }
                    }/*else {
                        if(entry.target.id === `${that._id}_mainRow${that.listSize/2}`) {
                            //console.log(`${that._id}_mainRow${that.listSize/2}`);
                            //console.log(document.querySelector(".table-container").style.paddingTop);
                            if(!that.scroll_down){
                            const f=that.botSentCallback.bind(that);
                            f(entry);
                            }
                            
                        }
                    }*/
                }

            });
        }

        var observer = new IntersectionObserver(callback, options);
        observer.observe(document.querySelector("#"+this._id+"_mainRow0"));
        observer.observe(document.querySelector("#"+this._id+`_mainRow${this.listSize-1}`));
        document.querySelector(`#${this._id}_mainRow0`).firstChild.style.backgroundColor="red";
        document.querySelector(`#${this._id}_mainRow3`).firstChild.style.backgroundColor="green";
        
        document.querySelector(`#${this._id}_mainRow${this.listSize/2}`).firstChild.style.backgroundColor="blue";

        document.querySelector(`#${this._id}_mainRow${this.listSize-3}`).firstChild.style.backgroundColor="pink";
        document.querySelector(`#${this._id}_mainRow${this.listSize-1}`).firstChild.style.backgroundColor="purple";
        //const g = this.scroll_down.bind(this);
        //document.querySelector("#scroll_btn").onclick=g;
    }

    init_scroll_direction(){
    	const that=this;
        document.querySelector(".table-container").addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
        //console.log((document.querySelector("#loc_mainRow0").getBoundingClientRect()).top);
        // detects new state and compares it with the new one
        if(!document.querySelector("#"+that._id+"_mainRow0") || !document.querySelector("#"+that._id+"_mainRow0").getBoundingClientRect()) {
        	console.log("error mainRow0");
        	return;
        }
        if ((document.querySelector("#"+that._id+"_mainRow0").getBoundingClientRect()).top > that.scrollPos)
            //console.log('data-scroll-direction', 'UP');
            that.scroll_down=true;
        else
            that.scroll_down=false;
            //console.log('data-scroll-direction', 'DOWN');
        // saves the new position for iteration.
        that.scrollPos = (document.querySelector("#"+that._id+"_mainRow0").getBoundingClientRect()).top;
            }, false);
    }
    /*
    scroll_down(e){
        document.querySelector("#loc_mainRow14").scrollIntoView();
    }*/

    getSlidingWindow(isScrollDown){
        
        let firstIndex;
  
        if (isScrollDown) {
            firstIndex = this.currentIndex + this.increment;
        } else {
            firstIndex = this.currentIndex - this.increment;// - this.listSize;
        }
  
        if (firstIndex < 0) {
            firstIndex = 0;
        }
  		console.log("index="+firstIndex);
        return firstIndex;
    }
    
    topSentCallback(entry){
        if (this.currentIndex === 0) {
            const container = document.querySelector(".table-container");
            container.style.paddingTop = "0px";
            container.style.paddingBottom = "0px";
        }

        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        // conditional check for Scrolling up
        if (
            //currentY > this.topSentinelPreviousY &&
            isIntersecting &&
            currentRatio >= this.topSentinelPreviousRatio &&
            this.currentIndex !== 0
          ) {
          	console.log("to top");
            const firstIndex = this.getSlidingWindow(false);
            document.querySelector("#"+this._id+`_mainRow${this.listSize-1-10}`).scrollIntoView();
            this.recycleDOM(firstIndex);
            this.currentIndex = firstIndex;
            this.disR20=true;
            console.log("this.scroll_down"+this.scroll_down);
          }

        this.topSentinelPreviousY = currentY;
        this.topSentinelPreviousRatio = currentRatio;
    }

    botSentCallback(entry){
        if (this.currentIndex === this._parent._loc.buffer.length - this.listSize) {
            return;
        }
        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

          // conditional check for Scrolling down
          if (
            //currentY < this.bottomSentinelPreviousY &&
            //currentRatio >= this.bottomSentinelPreviousRatio &&
            isIntersecting
          ) {
          	console.log("to bottom");
            const firstIndex = this.getSlidingWindow(true);
            if(this.currentIndex>=this._buf.length)
            	return;
            document.querySelector("#"+this._id+`_mainRow3`).scrollIntoView();
            this.recycleDOM(firstIndex);
            this.currentIndex = firstIndex;
            console.log("this.scroll_down"+this.scroll_down);
          }

        this.bottomSentinelPreviousY = currentY;
        this.bottomSentinelPreviousRatio = currentRatio;
    }

    recycleDOM(offset){
    	const total = offset;
        for (let i = 0; i < this.listSize; i++) {
            let row = this._parent.get_row(this._id+"_mainRow"+i);
            const data = this._buf[offset+i];
            if(total+i>=this._buf.length)
            	return;
            	//alert("end of buffer");
            row.recycle(i+offset,data);
      }
        document.querySelector("#"+this._id+"_mainRow0").firstChild.style.backgroundColor="red";
        document.querySelector("#"+this._id+"_mainRow"+this.listSize/2).firstChild.style.backgroundColor="blue";
        document.querySelector(`#${this._id}_mainRow3`).firstChild.style.backgroundColor="green";
        document.querySelector(`#${this._id}_mainRow${this.listSize-3}`).firstChild.style.backgroundColor="pink";
        document.querySelector(`#${this._id}_mainRow${this.listSize-1}`).firstChild.style.backgroundColor="purple";
     
    }
    /*
    getNumFromStyle(numStr){return Number(numStr.substring(0, numStr.length - 2))};

    adjustPaddings(isScrollDown){
        const container = document.querySelector(".table-container");
        const currentPaddingTop = this.getNumFromStyle(container.style.paddingTop);
        const currentPaddingBottom = this.getNumFromStyle(container.style.paddingBottom);
        let h=0;
        for(let i=0;i<this.listSize/5;i++){
            h += parseInt(document.querySelector(`#${this._id}_mainRow${i}`).clientHeight);
        }
        const remPaddingsVal = h;//60 * (this.listSize / 2);
        console.log("calculated padding="+h);
        if (isScrollDown) {
            container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
            container.style.paddingBottom = currentPaddingBottom === 0 ? "0px" : currentPaddingBottom - remPaddingsVal + "px";
        } else {
            container.style.paddingBottom = currentPaddingBottom + remPaddingsVal + "px";
            container.style.paddingTop = currentPaddingTop === 0 ? "0px" : currentPaddingTop - remPaddingsVal + "px";
        }
        console.log("padding top="+this.getNumFromStyle(container.style.paddingTop)+" padding_bottom="+this.getNumFromStyle(container.style.paddingBottom));
    }*/


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
    	$('#'+this._config._html_framework.status_combo).on('change',await x_s);
    	$('.'+this._config._html_framework.input_search).on('keyup', this.handle_timer_search.bind(this));
        $('#'+this._config._html_framework.slider).on('change', await x_s);
        
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
/*
	pagination_display(obj){
    	var bNoRecalc=1;
    	this._pagi.g_current_page=parseInt($(obj).html());
    	var table = '#'+$(obj).closest('.fullContainer').find('tbody').attr('id');
    	handle_btn_filter();
	}*/
	
	refresh(){
		Loader.log("filter refresh");
		return this.handle_btn_filter()
	}
    
    async check_inp_search(){
        var full_inputVal = $('.'+this._config._html_framework.input_search).val().trim();
        var inputVal_split = (full_inputVal.split('&&').every((row)=>row.length>0))?full_inputVal.split('&&'):null;
        this._config.set_search_param(full_inputVal);
        $('#'+this._table_target_id+' tr').remove();
        //Enfonction de l'année on charge le localStorage dans le buffer
        const combo = document.getElementById(this._config._html_framework.status_combo);
        await this._myWorker.postMessage(["search",inputVal_split,this._parent._loc.getBuffer(),combo.options[combo.selectedIndex].index]);
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
        var target = $('#'+this._config._html_framework.status_combo).val();
        this._config.set_combo_status(target);
    }

    async check_slider_change(e){
        var year = $('#'+this._config._html_framework.slider).val();
        return this.set_local_storage(year);
    }

    set_local_storage(year){
    	if(year===this._config.previous_year) return this._parent._loc;
		$('#'+this._config._html_framework.slider_lbl).text(year);
    	this._config._html_framework._year=year;
        this._config.set_date_filter(year+"-01-01");
        this.current_date_slider=year+"-01-01";
        this._config.previous_year=year;
        this._parent._loc=/*(this._parent._loc)?this._parent._loc.empty():*/new Buffer([],this._parent._columns);
        if(this._config._offline){
            //update current buffer
            var tableau = localStorage.getItem(this._config.get_html_framework().table_body_id.split("_")[1]+"_buffer_"+year);
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
	
    filter_combo(){
        var target = $('#'+this._config._html_framework.status_combo).val();
        var line;
        if (target !== 'all') {
            line = $('#'+this._table_target_id +' tr[data-status="' + target + '"]');
            
        }else{
            line = $('#'+this._table_target_id + ' tr');
        }
        //var arr = line.toArray();
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