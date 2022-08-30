class parameters{

	constructor(config,hfw){
		this._config=config;
        this._hfw = hfw;
        this._id= this._hfw._id;
	}


	displayParameter() {
        var modalBox;
        var full_container = '.'+this._hfw.container;

        if (document.getElementById("modalBox") !== null) {
            var parent = $(full_container);
            $('div').remove('#modalBox');
        }
        var rootParentId = $('body'/*full_container*/);
        modalBox = createModalWnd(rootParentId, "modalBox", "PARAMETRES", "","init_page()");
        //add parameters
        //IP
        var cbk_ip = this.setIpServer.bind(this);
        let lbl =createLabel(document.getElementById("modalBox"+"Bdy"),"ipServerId","");
        lbl.innerText="serveur";
        var btnServer = createInputButtonInfo("modalBox"+"Bdy", this._config.get_ip(), cbk_ip);
        btnServer.setAttribute("id", `ipServerId_${this._id}`);
        btnServer.setAttribute("data-dismiss", "");
        btnServer.setAttribute("class", "btn btn-capstech btn-block");

                //NODE SERVER
                var cbk_node_server = this.setNode.bind(this);
                let lbl_node =createLabel(document.getElementById("modalBox"+"Bdy"),"nodeServerId","");
                lbl_node.innerText="node server";
                var btnServer = createInputButtonInfo("modalBox"+"Bdy", this._config.get_node_server(), cbk_node_server);
                btnServer.setAttribute("id", `nodeServerId_${this._id}`);
                btnServer.setAttribute("data-dismiss", "");
                btnServer.setAttribute("class", "btn btn-capstech btn-block");
        //date deb
        var cbk = this.setDateDeb.bind(this);
        lbl =createLabel(document.getElementById("modalBox"+"Bdy"),"datepickerDeb","");
        lbl.innerText="Date début :";
        var dateDeb = createInputButtonInfo("modalBox"+"Bdy", this._config.get_date_deb(),cbk);
        dateDeb.setAttribute("id", "datepickerDeb");
        dateDeb.setAttribute("data-dismiss", "");
        dateDeb.setAttribute("class", "form-control hasDatepicker");
        //status input
        var cbk_status = this.set_status.bind(this);
        lbl =createLabel(document.getElementById("modalBox"+"Bdy"),"status_id ","");
        lbl.innerText="Status :";
        var btn_status = createInputButtonInfo("modalBox"+"Bdy", this._config.get_status(), cbk_status);
        btn_status.setAttribute("id", "status_id");
        btn_status.setAttribute("data-dismiss", "");
        btn_status.setAttribute("class", "btn btn-capstech btn-block");

		var _self = this;
        //close btn
        $('#closeBtn').on('click',function() {
            //_self.sync_db();
            _self._config.setIp($(`#ipServerId_${_self._id}`).val()||'127.0.0.1');
            _self._config.setNodeServer($(`#node_server_${_self._id}`).val()||'127.0.0.1');
            $('#modalBox').modal();
            
        });
        // Set a timeout to hide the element again
        modalBox.style.display = "block";
        //modalBox.style.position = "absolute";
    };

    displayParameter_2(){
        let modal_arg={ 
            parent:rootParentId,
            id:"modalBox",
            title:"PARAMETRES",
            init:init_page
        };
        
        ui_create_modal_box("modalBox");
        ui_add_btn("ipServerId");
        ui_add_btn("datepickerDeb");
        ui_add_btn("status_id");
    }

   init_ip() {
    $('#ipServerId').val(this._config.get_ip());
   }

    setIp() {
        this.setIpServer();
        refresh();
    }
    setNode() {
        this.setNodeServer();
        refresh();
    }
    set_status(){
        var status = prompt("Status", this._config.get_status());
        this._config.set_status(status);
        var el = document.getElementById('status_id');
        el.value = status;
    }

    setDateDeb() {
        var dateDeb = prompt("Modifier la date de début", this._config.get_date_deb());
        this._config.set_date_deb(dateDeb);
        var el = document.getElementById('datepickerDeb');
        el.value=this._config.get_date_deb();
    }

    setDateFin() {
        var dateFin = prompt("Modifier la date de fin", this._config.get_date_fin());
        this._config.set_date_fin(dateFin);
        var el = document.getElementById('datepickerFin');
        el.value=this._dateFin;
    }

    setIpServer() {
        var ip = prompt("Nouvelle ip", this._config.get_ip());
        var el = document.getElementById(`ipServerId_${this._id}`);
        el.value = this._config.check_ip(ip);
        //el.value=ip;
    }
    setNodeServer() {
        var ip = prompt("Nouvelle node ip", this._config.get_node_server());
        var el = document.getElementById(`nodeServerId_${this._id}`);
        el.value = this._config.check_node_server(ip);
        //el.value=ip;
    }

}