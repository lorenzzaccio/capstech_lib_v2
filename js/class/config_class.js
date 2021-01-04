class config {
	constructor(html_framework){
	            this._html_framework = html_framework;
                this._SEARCH_DELAY = 1000;
                this._BACK_LOAD_DELAY = 2000;
                this._search_cookie = this._html_framework.COOK_SEARCH_LOFC;
                this._cook_current_panel = this._html_framework.CURRENT_PANEL;
                this._cook_date_deb = this._html_framework.COOK_DATE_DEB;
                this._cook_ip = this._html_framework.COOK_IP_SERVER;
                this._cook_combo_status = this._html_framework.COOK_COMBO_STATUS; 
                this._cook_status = this._html_framework.COOK_STATUS;
                this._cook_date_filter = this._html_framework.COOK_DATE_FILTER;
                this._ip_server = DEFAULT_IP;
                this._offline=true;
                this._dateDeb = DEFAULT_DATE_DEB;
                this._dateFin = today();
                this._cook_sidebar = SIDE_BAR_STATE;
                this._cook_log = this._html_framework.COOK_LOG;
                this._id=this._cook_log .split('_')[0];
                this._list_size=40;
                this.previous_year=0;
                this.init();
                this.check_config();
	}

        init(){
              this.recover_cooky();  
              //pour des raisons de facilité, on alloue une variable globale pour service.js
              g_ipServer = this.get_ip();

        }

        recover_cooky(){
                this._cooky_current_tab=localStorage.getItem(this._cook_current_panel);
                this._side_bar_open = parseInt(localStorage.getItem(this._cook_sidebar)) || 0;
                this._search = localStorage.getItem(this._search_cookie) || "";
                this._dateDeb = localStorage.getItem(this._cook_date_deb);
                this._ip_server = localStorage.getItem(this._cook_ip);
                this._combo_status = localStorage.getItem(this._cook_combo_status);
                this._status = localStorage.getItem(this._cook_status);
                this._date_filter = localStorage.getItem(this._cook_date_filter);
                this._log = localStorage.getItem(this._cook_log);
                this._log = localStorage.getItem(this._cook_log);
        }

        get_html_framework(){
            return this._html_framework;
        }

        check_config(){
            //ip
            this.check_ip(this.get_ip());
            //dateDeb
            this.check_date_deb(this.get_date_deb());
            this.check_date_filter(this.get_date_filter());
        }
        get_search_param(){
                return this._search;
        }

        set_search_param(val){
                localStorage.setItem(this._search_cookie, val);
                this._search = val;
        }

        set_combo_status(val){
                localStorage.setItem(this._cook_combo_status, val);
                this._combo_status = val;
        }

        get_status_combo(){
            return this._combo_status;
        }

        set_ip(ip){
                if ((ip !== null)&& (parseInt(ip.split(".").length) === 4)) {
                        localStorage.setItem(this._cook_ip, ip);
                        this._ip_server = ip;
                }
        }

        get_ip(){
                return this._ip_server;
        }
        
        check_ip(ip){
               // var ip = this._ip_server;
                if (ip === null) {
                        alert("Connection", "Adresse IP invalide, réinitialisation à 127.0.0.1");
                        this.set_ip(DEFAULT_IP);
                        return this._ip_server;
                }
                
        
                if (parseInt(ip.split(".").length) === 4)
                        this.set_ip(ip);
                else {
                        newAlert("Connection", "Adresse IP invalide, réinitialisation à 127.0.0.1");
                        this.set_ip(DEFAULT_IP);
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

        set_date_deb(dateDeb){
                if ((dateDeb !== null)&& (parseInt(dateDeb.split("-").length) === 3)) {
                        localStorage.setItem(this._cook_date_deb, dateDeb);
                        this._dateDeb = dateDeb;
                }
        }

        set_date_filter(date_filter){
            if ((date_filter !== null)&& (parseInt(date_filter.split("-").length) === 3)) {
                        localStorage.setItem(this._cook_date_filter, date_filter);
                        this._date_filter = date_filter;
                }
        }

        get_date_filter(){
            return this._date_filter;
        }

        set_date_fin(dateFin){
                if ((dateFin !== null)&& (parseInt(dateFin.split("-").length) === 3)) {
                        localStorage.setItem(this._cook_date_fin, dateFin);
                        this._dateFin = dateFin;
                }
        }

        get_date_deb(){
                return this._dateDeb;
        }

        get_date_fin(){
                return this._dateFin;
        }

        open_sidebar(){
            localStorage.setItem(this._cook_sidebar,1);
            this._side_bar_open=1;
        }

        close_sidebar(){
            localStorage.setItem(this._cook_sidebar,0);
            this._side_bar_open=0;
        }

        get_last_log(){
            return this._log;
        }

        reset_last_log(){
            localStorage.setItem(this._cook_log,"");
        }

        set_log(msg){
            localStorage.setItem(this._cook_log,msg);
        }

        set_status(status){
            localStorage.setItem(this._cook_status, status);
            this._status = status;
        }

        get_status(){
                return this._status;
        }


}