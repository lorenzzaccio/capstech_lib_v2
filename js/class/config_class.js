class config {
	constructor(id){
	        //this._html_framework = html_framework;
                this._id=id;
                this._SEARCH_DELAY = 1000;
                this._BACK_LOAD_DELAY = 2000;
                /*this._search_cookie = this._html_framework.COOK_SEARCH_LOFC;
                this._cook_current_panel = this._html_framework.CURRENT_PANEL;
                this._cook_date_deb = this._html_framework.COOK_DATE_DEB;
                this._cook_ip = this._html_framework.COOK_IP_SERVER;
                this._cook_combo_status = this._html_framework.COOK_COMBO_STATUS; 
                this._cook_status = this._html_framework.COOK_STATUS;
                this._cook_date_filter = this._html_framework.COOK_DATE_FILTER;*/
                //PAGINATION_BLOCK_ID:"#"+this._id+"_pagination_div",
            //OVERLAY_ID:"overlay_"+this._id,
            //STICKY_WND_ID:"sticky_"+this._id,
            //CURRENT_PANEL : this._id+"_current_panel",
            //COOK_DATE_DEB : this._id+"_date_deb",
            //COOK_STATUS : this._id+"_status",
            //COOK_COMBO_STATUS : this._id+"_combo_status",
            //COOK_DATE_FILTER : this._id+"_date_filter",
            //COOK_IP_SERVER : this._id+"_ipServer",
            //COOK_SEARCH_LOFC : this._id+"_search",
            

            this._search_cookie=this._id+"_search",
            this._cook_current_panel = this._id+"_current_panel",
            this._cook_date_deb = this._id+"_date_deb",
            this._cook_ip = this._id+"_ipServer",
            this._cook_combo_status = this._id+"_combo_status",
            this._cook_status = this._id+"_status",
            this._cook_date_filter =this._id+"_date_filter",
                this._ip_server = DEFAULT_IP;
                this._offline=true;
                this._dateDeb = DEFAULT_DATE_DEB;
                this._dateFin = today();
                this._cook_sidebar = this._id+"_side_bar_open";
                this._cook_log = this._id+"_log";//this._html_framework.COOK_LOG;
                //this._id=this._cook_log .split('_')[0];
                this._list_size=100;
                this.previous_year=0;
 
           //this.init();
	}

        async init(){
                await this.recover_cooky();  
                await this.check_config();
                //pour des raisons de facilité, on alloue une variable globale pour service.js
                g_ipServer = this.get_ip()||this.get_ip().split(":")[0];
        }

        async recover_cooky(){
                this._cooky_current_tab=await db_read(this._cook_current_panel);
                this._side_bar_open = parseInt(await db_read(this._cook_sidebar))||0 ;
                this._search = await db_read(this._search_cookie) || "";
                this._dateDeb = await db_read(this._cook_date_deb)||this._dateDeb;
                this._ip_server = await db_read(this._cook_ip)||DEFAULT_IP;
                this._combo_status = await db_read(this._cook_combo_status);
                this._status = await db_read(this._cook_status);
                this._date_filter = await db_read(this._cook_date_filter)||DEFAULT_DATE_DEB;
                this._log = await db_read(this._cook_log);
        }
/*
        get_html_framework(){
            return this._html_framework;
        }*/

        async check_config(){
            //ip
            await this.check_ip(await this.get_ip());
            //dateDeb
            await this.check_date_deb(await this.get_date_deb());
            await this.check_date_filter(await this.get_date_filter());
        }

        get_search_param(){
                return this._search;
        }

        async set_search_param(val){
                this._search = val;
                await db_write(this._search_cookie, val);
                
        }

        async set_combo_status(val){
                this._combo_status = val;
                await db_write(this._cook_combo_status, val);
                
        }

        get_status_combo(){
            return this._combo_status;
        }

        async set_ip(ip){
                if ((ip !== null)&& (parseInt(ip.split(".").length) === 4)) {
                        this._ip_server = ip;
                        await db_write(this._cook_ip, ip);
                }
        }

        get_ip(){
                return this._ip_server||window.location.host;
        }
        
        check_ip(ip){
               // var ip = this._ip_server;
                if (ip === null) {
                        let url = (window.location);
                        this.set_ip( url.host);
                        alert("Connection", `Adresse IP invalide, réinitialisation à ${this._ip_server}`);
                        //this.set_ip(DEFAULT_IP);
                        return this._ip_server;
                }
                
        
                if (parseInt(ip.split(".").length) === 4)
                        this.set_ip(ip);
                else {
                        let url = (window.location);
                        this.set_ip( url.host);
                        alert("Connection", `Adresse IP invalide, réinitialisation à ${this._ip_server}`);
                }

                return this._ip_server;
        }

        check_date_deb(dateDeb){
            if ((dateDeb === null) || (dateDeb === undefined)){
                this.set_date_deb(DEFAULT_DATE_DEB);
            }else{
                if ((parseInt(dateDeb.split("-").length) !== 3)) 
                   this.set_date_deb(DEFAULT_DATE_DEB);
            }
        }

        check_date_filter(date_filter){
            if ((date_filter === null) || (date_filter === undefined)){
                this.set_date_filter(DEFAULT_DATE_DEB);
            }else{
                if ((parseInt(date_filter.split("-").length) !== 3)) 
                   this.set_date_filter(DEFAULT_DATE_DEB);
            }
        }

        async set_date_deb(dateDeb){
                if ((dateDeb !== null)&& (parseInt(dateDeb.split("-").length) === 3)) {
                        this._dateDeb = dateDeb;
                        await db_write(this._cook_date_deb, dateDeb);
                }
        }

        async set_date_filter(date_filter){
            if ((date_filter !== null)&& (parseInt(date_filter.split("-").length) === 3)) {
                this._date_filter = date_filter;
                await db_write(this._cook_date_filter, date_filter); 
                }
        }

        get_date_filter(){
            return this._date_filter;
        }

        async set_date_fin(dateFin){
                if ((dateFin !== null)&& (parseInt(dateFin.split("-").length) === 3)) {
                        this._dateFin = dateFin;
                        await db_write(this._cook_date_fin, dateFin);
                        
                }
        }

        get_date_deb(){
                return this._dateDeb;
        }

        get_date_fin(){
                return this._dateFin;
        }

        async open_sidebar(){
                this._side_bar_open=1;
                await db_write(this._cook_sidebar,1);
            
        }

        async close_sidebar(){
                this._side_bar_open=0;
                await db_write(this._cook_sidebar,0);
            
        }

        get_last_log(){
            return this._log;
        }

        async reset_last_log(){
            await db_write(this._cook_log,"");
        }

        async set_log(msg){
            await db_write(this._cook_log,msg);
        }

        async set_status(status){
                this._status = status;
                await db_write(this._cook_status, status);
            
        }

        get_status(){
                return this._status;
        }


}