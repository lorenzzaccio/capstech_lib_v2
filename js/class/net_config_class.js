class net_config_class {
	constructor(nc){
            this._cook_ip = "ip_server";//this._id+"_ipServer",
            this._cook_node_server = "node_server";//this._id+"_ipServer",
            this.DEFAULT_IP= nc ? nc.DEFAULT_IP :   window ? window.location.host : "127.0.0.1";
            this._HTTP= nc ? nc._HTTP : "http://";
            this._ip_server = this.DEFAULT_IP;
            this._offline=true;
            this.g_port= nc ? nc.g_port : '3023';
	}

        async init(){
                await this.recover_cooky();  
                await this.check_config();
                
                //pour des raisons de facilité, on alloue une variable globale pour service.js
                this._ip_server = this.get_ip()||this.get_ip().split(":")[0];
                this._node_server = this.get_node_server()||this.get_node_server().split(":")[0];
        }
        set (nc) {
                this.DEFAULT_IP= nc.DEFAULT_IP;
                this._HTTP= nc._HTTP;
                this.g_port= nc.g_port;
        }

        async recover_cooky(){
            
                this._ip_server = await db_read(this._cook_ip)||this.DEFAULT_IP;
                this._node_server = await db_read(this._cook_node_server)||this.DEFAULT_IP;
        }


        async check_config(){
            //ip
            await this.check_ip(await this.get_ip());
            await this.check_node_server(await this.get_node_server());
        }

      

      

        async set_ip(ip){
                if ((ip !== null)&& (parseInt(ip.split(".").length) === 4)) {
                        this._ip_server = ip;
                        await db_write(this._cook_ip, ip);
                }
        }

        async set_node_server(ip){
                if ((ip !== null)&& (parseInt(ip.split(".").length) === 4)) {
                        this._node_server = ip;
                        await db_write(this._cook_node_server, ip);
                }
        }
        get_ip(){
                return this._ip_server||this.DEFAULT_IP /*window.location.host*/;
        }
        get_node_server(){
                return this._node_server||this.DEFAULT_IP/*window.location.host*/;
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
        check_node_server(ip){
                // var ip = this._ip_server;
                 if (ip === null) {
                         let url = (window.location);
                         this.set_node_server( url.host);
                         alert("Connection", `Adresse IP invalide, réinitialisation à ${this._node_server}`);
                         //this.set_ip(DEFAULT_IP);
                         return this._node_server;
                 }
                 
         
                 if (parseInt(ip.split(".").length) === 4)
                         this.set_node_server(ip);
                 else {
                         let url = (window.location);
                         this.set_node_server( url.host);
                         alert("Connection", `Adresse IP invalide, réinitialisation à ${this._node_server}`);
                 }
 
                 return this._node_server;
         }
       



}