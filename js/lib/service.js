    /* 
     * To change this license header, choose License Headers in Project Properties.
     * To change this template file, choose Tools | Templates
     * and open the template in the editor.
     *//*
    let _HTTP = "http://";
    //let g_ipServer="127.0.0.1";//"192.168.0.2" ;//"82.64.200.189:2080";//
    const g_port=3023;
    //var node_server='127.0.0.1';
    //let node_server = /*node_server ||*/ "127.0.0.1";//"192.168.0.2";//"192.168.0.113";//"82.64.200.189";//"192.168.0.146";//"192.168.0.2";//"82.64.200.189";//"192.168.0.146";
    /*let net_conf = new net_config_class();*/
    

    function getTaskGeneral(url, dataString,callback,buffer,callback_ko,bReturn) {
        g_sqlCompleted = false;
        g_sqlError = false;
        console.log(url+"?"+dataString);
        var request = $.ajax({
            url: url,
            method: "GET",
            data: dataString,
            dataType:'json',
            crossDomain: true,
            cache: false,
            async: true,
            timeout: 60000, // 10 seconds for getting result, otherwise error.

            error: function (xhr, ajaxOptions, thrownError) {
                $('nav').notify(xhr.responseText);
                $('nav').notify(thrownError);
            },
            xhr: function () {
            var xhr = new window.XMLHttpRequest();
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                //console.log(evt.lengthComputable);
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //progressElem.html(Math.round(percentComplete * 100) + "%");
                    //$('nav').notify(Math.round(percentComplete * 100) + "%");
                    $('#download_progress').html(Math.round(percentComplete * 100) + "%");
                    //console.log(Math.round(percentComplete * 100) + "%");
                }
            }, false);
            return xhr;
        },
        beforeSend: function () {
            $('#loading').show();
            $('nav').notify("attente réponse serveur ...");
        },
        complete: function () {
            //$('nav').notify("chargement terminé");
        },
        success: function (json) {
            $('nav').notify("Téléchargement effectué avec succès");
        }

        });
            request.fail( function (data) {
                g_sqlError = 1;
            });
            
            request.done( function (data) {
                $('nav').notify("Téléchargement effectué avec succès");
                g_sqlCompleted = 1;
                if ((data !==-1) &&(data !==-2)) {
                    //if( typeof data != 'undefined' && data instanceof Array ){
                    var field = data;
                    var opt = field.groups;
                    var lcl_buffer  = ( typeof buffer != 'undefined' && buffer instanceof Array ) ? buffer : []
                    lcl_buffer = opt;
                    //console.log(lcl_buffer);
                    if ((callback!=="") && (typeof callback !== "undefined"))
                        callback(lcl_buffer);
                    else
                        return lcl_buffer;
                }else{
                    var field = data;
                    var lcl_buffer  = ( typeof buffer != 'undefined' && buffer instanceof Array ) ? buffer : []
                    lcl_buffer = field;
                    //var opt = field.groups;
                    if ((callback_ko!=="") && (typeof callback_ko !== "undefined"))
                        callback_ko(lcl_buffer);
                }
            });
            request.always(function() {});

    };

    function getTaskGeneralSync(url, dataString,callback,buffer,callback_ko) {
        g_sqlCompleted = false;
        g_sqlError = false;
        //console.log(url+"?"+dataString);
        var request = $.ajax({
            url: url,
            method: "GET",
            data: dataString,
            dataType:'json',
            crossDomain: true,
            cache: false,
            async: false,
            timeout: 60000, // 10 seconds for getting result, otherwise error.

            error: function (xhr, ajaxOptions, thrownError) {
                $('nav').notify(xhr.responseText);
                $('nav').notify(thrownError);
            },
            xhr: function () {
            var xhr = new window.XMLHttpRequest();
            //Download progress
            xhr.addEventListener("progress", function (evt) {
                //console.log(evt.lengthComputable);
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //progressElem.html(Math.round(percentComplete * 100) + "%");
                    //$('nav').notify(Math.round(percentComplete * 100) + "%");
                    $('#download_progress').html(Math.round(percentComplete * 100) + "%");
                    //console.log(Math.round(percentComplete * 100) + "%");
                }
            }, false);
            return xhr;
        },
        beforeSend: function () {
            $('#loading').show();
            $('nav').notify("attente réponse serveur ...");
        },
        complete: function () {
            //$('nav').notify("chargement terminé");
        },
        success: function (json) {
            $('nav').notify("Téléchargement effectué avec succès");
        }

        });
            request.fail( function (data) {
                g_sqlError = 1;
            });
            
            request.done( function (data) {
                $('nav').notify("Téléchargement effectué avec succès");
                g_sqlCompleted = 1;
                if ((data !==-1) &&(data !==-2)) {
                    //if( typeof data != 'undefined' && data instanceof Array ){
                    var field = data;
                    var opt = field.groups;
                    var lcl_buffer  = ( typeof buffer != 'undefined' && buffer instanceof Array ) ? buffer : []
                    lcl_buffer = opt;
                    //console.log(lcl_buffer);
                    if ((callback!=="") && (typeof callback !== "undefined"))
                        callback(lcl_buffer);
                }else{
                    var field = data;
                    var lcl_buffer  = ( typeof buffer != 'undefined' && buffer instanceof Array ) ? buffer : []
                    lcl_buffer = field;
                    //var opt = field.groups;
                    if ((callback_ko!=="") && (typeof callback_ko !== "undefined"))
                        callback_ko(lcl_buffer);
                }
            });
            request.always(function() {});
    };

    async function is_offline(){
        try{
        return parseInt(await db_read('offline_status')|| 0);
        }catch(e){
            return 0;
        }
      }
      async function service_get_model(arg){
        const model = await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/${arg.db}/model`,null,"GET");
        if( model){
            db_write(`${arg.db}_model`,model);
            return model;
        }else
            return db_read(`${arg.db}_model`);
    } 
    async function promise_db_task_form(url,data,meth) {
        let response ;
        const method =  meth?meth:'POST';
        if(await is_offline()) return null;
        try{
            if(data){
                response = await fetch(url,
                {
                    method: method,
                    headers: {
                    },
                    mode:'no-cors',
                    body: data
                });
            }else
                response = await fetch(url,{method: method}); // (2)

            if (response.status === 200) {
                //$('.msg_loader').text("donnée reçues");
                try{
                    let json = await response.json(); // (3)
                    return json;
                }catch(e){
                    return response;
                }
            }
        }catch(err){
            if(token_connect)
                throw new Error(err.message);
            else{
                //$('.msg_loader').text("Erreur de réception de données");
                check_db_connection && await check_db_connection();
                token_connect=false;
            }
            //throw new Error(err.message);
        }
    }

    async function promise_db_task(url,data,meth) {
        let response ;
        const method =  meth?meth:'POST';
        if(await is_offline()) return null;
        try{
            if(data){
                response = await fetch(url,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode:'no-cors',
                    body: JSON.stringify(data)
                });
            }else
                response = await fetch(url,{method: method}); // (2)

            if (response.status === 200) {
                //$('.msg_loader').text("donnée reçues");
                try{
                    let json = await response.json(); // (3)
                    return json;
                }catch(e){
                    return response;
                }
            }
        }catch(err){
            if(token_connect)
                throw new Error(err.message);
            else{
                //$('.msg_loader').text("Erreur de réception de données");
                check_db_connection && await check_db_connection();
                token_connect=false;
            }
            //throw new Error(err.message);
        }
    }
    async function promiser(short_url,action){
        return  await  promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}${short_url}`,null,action);
    }

    async function getJsonClientListTask() {
        return await promiser(`/api/v1/completion/client/`,"GET");
    }
    //@TODO_LIST
    function service_add_todo(arg){
        //return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/update_todo.php?"+arg);
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/todolist/${encodeURIComponent(JSON.stringify(arg))}`,null,"POST");
    }
    function service_update_todo(arg){
        //return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/update_todo.php?"+arg);
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/todolist/${encodeURIComponent(JSON.stringify(arg))}`,null,"PUT");
    }
    function service_delete_line_todo_list(id){
        //return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/delete_line_todo_list.php?todo_id="+id);
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/todolist/${id}`,null,"DELETE");
    }

    function service_get_todo_list(todo_list){
			//return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/get_todo_list.php?todo_list="+todo_list);
            return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/todolist/full/${todo_list||"PROD"}`,null,"GET");
		/*else
        	return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/get_todo_list.php");*/
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    
    function service_detele_command(arg){
       return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/delete_client_order.php"+ "?" + "num_ordre="+arg); 
    }

    function getListArticlesParClientTask(arg){
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonListArticleForClient_2.php"+ "?" + "client="+arg);
    }
    
    function getListNumOrdreParArticleTask(full_article){
       return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/approFourn/num_ordre/"+full_article,null,"GET");
    }
    ////////////////////////////////////////FACTURE////////////////////////////////////////////////////
    function service_create_facture(liste_com_id,fact_num){
        return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/factures/"+fact_num+"/"+liste_com_id,null,"POST");
    }
    function service_export_facture_to_pdf(arg){
        return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/factures/send/"+JSON.stringify(arg),null,"POST");
    }
    function sql_update_facture(field,val,fact_num){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/factures/${fact_num}/${field}/${val}`,null,"PUT");
    }
    function sql_update_facture_header(field,val,fact_num){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/factures/header/${fact_num}/${field}/${val}`,null,"PUT");
    }
    function service_get_last_facture_num(){
        return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/factures/last",null,"GET");  
    }
    function getFullFactureClientTask(dateDeb, dateFin,status) {
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/factures/${dateDeb}/${dateFin}`,null,"GET");
    };
    function service_export_facture_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/facture/export_facture.php"+ "?" + "list_fact="+arg;
    }
    function service_get_mail_from_facture(arg){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/commandes/find/${arg.field}/${arg.val}`,null,"GET");
    }
    function service_export_liste_facture_to_pdf(arg){
        //pour le moment on execute en local
        let ip_local = "127.0.0.1";
        window.open(_HTTP+ ip_local + "/scanStockServer/php/facture/export_liste_to_pdf.php"+ "?" + "list_fact="+arg);
    }
    function service_export_remise_cheque_facture_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/facture/export_remise_cheque.php"+ "?" + "list_fact="+arg;
    }
    ////////////////////////////////////////////////////AVOIR//////////////////////////////////////////////
    function service_create_avoir(liste_com_id,av_num){
        return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/avoirs/"+av_num+"/"+liste_com_id,null,"POST");
    }
    function service_export_avoir_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/avoir/export_avoir.php"+ "?" + "list_av="+arg;
    }
    function getFullAvoirClientTask(dateDeb, dateFin,status) {
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/avoirs/${dateDeb}/${dateFin}`,null,"GET");
    };
    /*function getFullAvoirClientTask(dateDeb, dateFin,status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/avoir/getJsonAvoirClientBetweenDate.php"+ "?" + "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };*/
    function service_get_mail_from_avoir(arg){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/commandes/find/${arg.field}/${arg.val}`,null,"GET");
    }
    function sql_update_avoir(field,val,av_num){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/avoirs/${av_num}/${field}/${val}`,null,"PUT");
    }
    function sql_update_avoir_header(field,val,av_num){
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/avoirs/header/${av_num}/${field}/${val}`,null,"PUT");
    }
    async function service_get_last_avoir_num(){
        return await promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/avoirs/last",null,"GET");  
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    function service_export_to_pdf(url){
        let ip_local = "127.0.0.1";
        window.open(_HTTP+ ip_local + "/PhpFormulaire/export_to_pdf.php"+ "?" + "url="+url);
    }
    function get_page(url){
        return promise_db_task(url);
    
    }
    function service_row_exist_in_command(prefix,article){
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/is_row_exist.php"+ "?" + "prefix="+prefix+"&article="+article);
    }
///////////////////LIVRAISON//////////////////////////////////////
function service_create_livraison(arg){
    //let t = arg.replace(/[']+/g, "\\'");
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ `/api/v1/ordreClient/livrer/${arg}`,null,"POST");
}
function service_get_num_bl(a_date){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/ordreClient/livrer/"+a_date,null,"GET");
}
/////////////////////STOCKSCAN////////////////////////////////////
function service_get_stock_list(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/stockScan/${arg}`,null,"GET");
}
async function service_get_fp_model(){
    return await service_get_model({db:'ficheProduction'});
}
///////////////////////////FICHPROD/////////////////////////////////
function service_get_num_prod(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/ficheProduction/ordre/${arg}`,null,"GET");
}
function service_get_production(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/ficheProduction/${arg}`,null,"GET");
}
function service_update_ficheprod(field,val,ficheprod_id){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/ficheProduction/${field}/${val}/${ficheprod_id}`,null,"PUT");
}
function getFullProductionTask(dateDeb, dateFin) {
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/ficheProduction/find/${dateDeb}/${dateFin}`,null,"GET");
};
function getProductionLines(com_id) {
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/ficheProduction/ordre/${com_id}`,null,"GET");
};
function getconnectionStatusTask() {
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0] }:${g_port}/api/v1/ficheProduction/connection`,null,"GET");
};

///////////////////SITE_CLIENT////////////////////////////
function service_create_client(arg){
    return promise_db_task(`${_HTTP} ${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/client/${arg}`,null,"POST");
}
function service_allocate_new_site_client(client_id){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/siteClient/new_alloc/"+client_id,null,"GET");
}
function service_get_site_client(client_id){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/siteClient/"+client_id,null,"GET");
}
function service_get_sub_site_client(client_id,site_client_id){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/siteClient/"+client_id+"/"+site_client_id,null,"GET");
}
async function service_get_siteclient_model(){
    return await service_get_model({db:'siteclient'});
}
function getFullListeSiteClientTask(dateDeb, dateFin,callback,buffer) {
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/siteclient/full",null,"GET");
};
function getListeSiteParClientTask(id){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/siteclient/${id}`,null,"GET");
}
///////////////////ARTICLE////////////////////////////
function getFullListeArticleTask() {
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/articles/full",null,"GET");
};
async function service_get_la_model(){
    return await service_get_model({db:'articles'});
    //return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/articles/model",null,"GET");
}

function service_clone_article(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/articles/clone/${arg}`,null,"POST");
};
function service_clone(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/${arg.table}/clone/${arg.condition}`,null,"POST");
};


function service_delete_article_row(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/articles/${arg}`,null,"DELETE");
}
function service_get_last_article(){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/articles/last",null,"GET");
}
///////////////////////LOC///////////////////////////
let g_id;
function sql_update_node(table,field,val,id)  {
    return promise_db_task(`${net_conf._HTTP}${net_conf._node_server.split(":")[0]}:${net_conf.g_port}/api/v1/${table}/${field}/${val||' '}/${id}`,null,"PUT");

};
function service_send_form(url)  {
    return promise_db_task(url,null,"POST");
};
function service_send_form_get(url)  {
    return promise_db_task(url,null,"GET");
};
async function service_send_form2(url,fd)  {
    return await promise_db_task_form(url,fd,"POST");
};
async function getFullOrdreClientTask(dateDeb, dateFin,status,callback,buffer) {
    return await promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/commandes/"+dateDeb+"/"+dateFin,null,"GET");
};
function service_get_last_commande(){
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/commandes/last",null,"GET");
}
async function service_get_files_stored(arg){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/fileStore/${arg.fs_row_id}/${arg.fs_type}`,null,"GET")||[];
}

async function service_set_file_store(arg){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/fileStore/${JSON.stringify(arg)}`,null,"POST");
}

async function service_upload(row_id,ui_id,type){
try{
    let FD = new FormData();
    FD.append('myFile', document.querySelector('#'+ui_id).files[0],document.querySelector('#'+ui_id).files[0].name);
    FD.append('unique_id', row_id);
    FD.append('type', type);

    await service_send_form2(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:3001/uploadfile`,FD);
}catch(e){
    alert("erreur formulaire"+e);
}

   // return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:3001/uploadfile`,null,"POST");
}
async function service_download(filename,row_id,conf_id){
    const url =`${_HTTP}${net_conf.get_node_server().split(":")[0]}:3001/download/${filename}/${row_id}/${conf_id}`;
    const authHeader ="Bearer 6Q************" 

    const options = {
    headers: {
        //Authorization: authHeader
    }
    };
    fetch(url, options)
    .then( res => res.blob() )
    .then( blob => {
        showFile(blob);
    });
}
function isNil(value){
    return value === undefined || value === null;
  }

  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

  function showFile(blob,reportName){
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    //var newBlob = new Blob([blob], {type: "application/pdf"})
  
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    } 
  
    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);
    if(getMobileOperatingSystem()==="unknown"){
        showFileForPC(blob,reportName)
    }else
        window.open(data);//open in a new tab
   
  }
  
const showFileForPC = (blobData, reportName) => {
    // Adapted from: https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
    const fileName = reportName && `${ reportName }.pdf` || 'myreport.pdf';

    const newBlob =blobData;

    const newWindow = window.open('', reportName, "width=800,height=1200");
    if (!isNil(newWindow)) {
        setTimeout( () => {
            const dataUrl = window.URL.createObjectURL(newBlob);
            const title = newWindow.document.createElement('title');
            const iframe = newWindow.document.createElement('iframe');

            title.appendChild(document.createTextNode(reportName));
            newWindow.document.head.appendChild(title);

            iframe.setAttribute('src', dataUrl);
            iframe.setAttribute('width', "100%");
            iframe.setAttribute('height', "100%");

            newWindow.document.body.appendChild(iframe);

            setTimeout( () => {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(dataUrl);
            }, 100);
        }, 100);
    } else {
        alert("To display reports, please disable any pop-blockers for this page and try again.");
    }

};
async function service_get_commande(id){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/commandes/${id}`,null,"GET");
}
function service_add_remise(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/commandes/remise/${arg}`,null,"POST");
}
async function service_print_etiq(arg){
    //const prod = await service_get_num_prod(JSON.stringify(arg));
   // const client_id = await service_get_num_prod(JSON.stringify(arg));
    window.open(`http://${net_conf.get_node_server().split(":")[0]}:${g_port}/etiq/${arg.com_id}`, 'Imprimer etiq', 'window settings');//'http://' + lcl_address + 
}
async function service_print_bl(arg){
    //const num_liv = await service_get_num_liv(JSON.stringify(arg));
    //const client_id = await service_get_num_prod(JSON.stringify(arg));
    window.open(`http://${net_conf.get_node_server().split(":")[0]}:${g_port}/bl/${arg.com_id}`, 'Imprimer BL', 'window settings');//'http://' + lcl_address + 
}
async function service_print_etiq_crd(arg){
    //const prod = await service_get_num_prod(JSON.stringify(arg));
    //const client_id = await service_get_num_prod(JSON.stringify(arg));
    window.open(`http://${net_conf.get_node_server().split(":")[0]}:${g_port}/etiq_crd/${arg.total}/${arg.quantiteParCarton}/${arg.couleur}/${arg.text}`, 'Imprimer etiq', 'window settings');//'http://' + lcl_address + 
}

async function service_get_loc_model(){
    return await service_get_model({db:'commandes'});
}
/////////////////////////////////////////////////
////////////////////////INVOICE/////////////////////
async function getFullInvoiceTask(dateDeb, dateFin,status,callback,buffer) {
    return await promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/invoice/"+dateDeb+"/"+dateFin,null,"GET");
};
function service_get_num_invoice(offre_date,offre_agent,callback,buffer){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/invoice/alloc/${offre_date}/${offre_agent}`,null,"GET");
 }
 function service_delete_invoice_row(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/invoice/${arg}`,null,"DELETE");
}
async function service_get_invoice(id){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/invoice/${id}`,null,"GET");
}
////////////////////////LOFC/////////////////////
async function getFullOffreClientTask(dateDeb, dateFin,status,callback,buffer) {
    return await promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/offrePrix/"+dateDeb+"/"+dateFin,null,"GET");
};
function service_get_num_offre_prix(offre_date,offre_agent,callback,buffer){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/offrePrix/alloc/${offre_date}/${offre_agent}`,null,"GET");
 }
 function service_delete_offreprix_row(arg){
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/offrePrix/${arg}`,null,"DELETE");
}
async function service_get_offer(id){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/offrePrix/${id}`,null,"GET");
}
/////////////////////////LOF//////////////////////////////////////////
async function getFullDemPrixTask(dateDeb, dateFin,status,callback,buffer) {
    //return await promise_db_task($(_HTTP)+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/demandePrix/"+dateDeb+"/"+dateFin,null,"GET");
    return await promiser(`/api/v1/demandePrix/${dateDeb}/${dateFin}`,"GET");
};
async function service_get_num_demande_prix(demprix_date,demprix_agent,callback,buffer){
    //return await  promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/demandePrix/alloc/${demprix_date}/${demprix_agent}`,null,"GET");
    return await promiser(`/api/v1/demandePrix/alloc/${demprix_date}/${demprix_agent}`,"GET");
 }
 async function service_delete_demprix_row(arg){
    //return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/demandePrix/${arg}`,null,"DELETE");
    return await promiser(`/api/v1/demandePrix/${arg}`,"DELETE");
}
async function service_get_demprix(id){
    return await promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/demandePrix/${id}`,null,"GET");
}
/////////////////////////////////////////////////
/////////////////////CLIENT///////////////////////

function getFullListeClientTask(dateDeb, dateFin,callback,buffer) {
    //return promise_db_task(`${_HTTP}+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/client/full",null,"GET");
    return await promiser(`/api/v1/cclient/full`,"GET");
};
async function service_get_client_model(){
    return await service_get_model({db:'client'});
}
////////////////////////////////////////////////////
/////////////////////FOURNISSEUR///////////////////////
function getJsonFournisseurListTask() {
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/fournisseur/",null,"GET");
};
function getFullListeFournisseurTask(dateDeb, dateFin,callback,buffer) {
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/fournisseur/full",null,"GET");
};
async function service_get_fournisseur_model(){
    return await service_get_model({db:'fournisseur'});
}
////////////////////////////////////////////////////
/////////////////////LOG_DB///////////////////////
function get_db_log() {
    return promise_db_task(_HTTP+ net_conf.get_node_server().split(":")[0] +":"+g_port+ "/api/v1/db_log/",null,"GET");
};
////////////////////ARTICLE////////////////////////////////
function service_read_desc_article(arg){
    const prefix=arg.split("-")[0];
    const article=arg.split("-")[1];
    return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/articles/${prefix}/${article}`,null,"GET");
}
////////////////////////////////////////////////////////////
    function sql_update_async(table,name,val,condition)  {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonUpdate.php"+ "?" + "table=" + table + "&name=" + name+ "&val=" + val+ "&condition=" + condition);
    };

    function sql_get_async(table,field,condition)  {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonVal.php"+ "?" + "table=" + table + "&field=" + field+ "&condition=" + condition);
    }

    function getNumOrdreForArticleTask(prefix,article) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonNumOrdreForArticle.php"+ "?" + "prefix=" + prefix + "&article=" + article);
    };
    
    function getFullArticleTask(status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonListArticleForStatus.php"+ "?" + "status=" + status);
    };
    
    function service_alloc_new_article(type) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonNewArticle.php"+ "?" + "letter=" + type);
    };
    
    function getFullStockTask(status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonStockForStatus.php"+ "?" + "status=" + status);
    };

    function getJsonFournisseurListTask() {
       //return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getListFournisseur_completion.php");
       return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/fournisseur/completion/`,null,"GET");
    };

    function getJsonArticleListTask() {
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/articles/completion/`,null,"GET");
    };

    /*function getJsonClientListTask() {
        return promise_db_task(`${_HTTP}${net_conf.get_node_server().split(":")[0]}:${g_port}/api/v1/client/completion/`,null,"GET");
    };*/

   function getOrdreClientForFactureTask(facture_num,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonOrdreClientForFacture.php", "facture_num=" + facture_num,callback,buffer);
    };

    function getFullOffreClientGlobalTask(dateDeb, dateFin,status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/offre/getJsonOffreClientGlobalBetweenDate.php"+ "?" + "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };
    
    function getFullPlanTask(dateDeb, dateFin) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonPlanningBetweenDate1.php", "dateDeb=" + dateDeb + "&dateFin=" + dateFin );
    };

    function sql_update(table,name,val,condition,limit,callback,buffer)  {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonUpdate.php", "table=" + table + "&name=" + name+ "&val=" + val+ "&condition=" + condition,callback,buffer );
    };

    function sql_update_typed(table,name,val,condition,limit,type)  {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonUpdate.php", "table=" + table + "&name=" + name+ "&val=" + val+ "&condition=" + condition+ "&type="+type);
    };
    function sql_delete_row(table,condition,limit,callback,buffer)  {
        var uri = window.location.host;
        getTaskGeneral(_HTTP+ uri + "/scanStockServer/php/setJsonDelete.php", "table=" + table + "&condition=" + condition,callback,buffer );
    };
    function sql_update_multi(table,name,val,condition,limit,callback,buffer)  {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonUpdate.php", "table=" + table + "&name=" + name+ "&val=" + val+ "&condition=" + condition+ "&limit=" + limit,callback,buffer );
    };
    function sql_createPlanningLine(date,heure,duree,greffon,machine,prod_id) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonCreatePlanningLine.php", "date=" + date + "&heure=" + heure+ "&duree=" + duree+ "&prod_id=" + prod_id + "&greffon=" + greffon + "&machine=" + machine );
    };
     function sql_createCommandeLine(offre_id,client_id,prefix,article,ref_article,ref_article_client,ref_ordre_client,quantity,price,unity,status,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonCreateCommandLine.php", "offre_id=" + offre_id + "&client_id=" + client_id+ "&prefix=" + prefix+ "&article=" + article + "&ref_article=" + ref_article + "&ref_article_client=" + ref_article_client+ "&ref_ordre_client=" + ref_ordre_client+ "&quantity=" + quantity+ "&price=" + price+ "&unity=" + unity+ "&status=" + status,callback,buffer);
    };
    function sql_createOrdineLine(prefix,article,quantite_commande,price,demPrix_num,demPrix_fourn_num,ord_date,ord_fourn,callback,buffer,callback_ko) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonCreateOrdineLine.php", "ord_prefix=" + prefix + "&ord_article=" + article+ "&ord_quantite=" + quantite_commande+ "&ord_prix=" + price + "&ord_com_num=" + demPrix_num + "&ord_num=" + demPrix_fourn_num+ "&ord_date=" + ord_date+ "&ord_fourn=" + ord_fourn,callback,buffer,callback_ko);
    };
    /*var arr_table_offer = [
            "client_id"
            ,"prefix"
            ,"article"
            ,"quantity" 
            ,"sell_price"
            ,"offer_date"
            ,"dem_num" 
            ,"sell_price"
            ,"offer_status"
            ,"offer_alt"
            ,"offer_date_validation"
            ,"offer_ref_ordre_client"
            ,"offer_period_year"
            ,"offer_comment"
            ,"offer_solde"
            ,"offer_ref_article" 
            ,"offer_client_sgv"
            ,"offer_select"];

    function service_create_offer(date,sell_price,quantity){
        var index=0;
        var line_arg;
        arr_arg.forEach(function(val){
            if(index===0)
                line_arg=arr_table_offer[index,val];
            else
                line_arg+="&"+arr_table_offer[index,val];
            index++;
        });
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonCreateOfferLine.php", line_arg);
    };*/

    function service_get_num_dem(dem_num,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocDemNum.php", "dem_num=" + dem_num,callback,buffer); 
    }
    function service_get_num_forfait(type_prefix,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumForfait.php", "type_prefix=" + type_prefix,callback,buffer); 
    }

    function service_get_num_revision(num_offre,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumRevision.php", "num_offre=" + num_offre,callback,buffer); 
    }

    function service_get_num_cliche(type_prefix,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumCliche.php", "type_prefix=" + type_prefix,callback,buffer); 
    }
    function service_get_num_acompte(type_prefix,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumAcompte.php", "type_prefix=" + type_prefix,callback,buffer); 
    }

    function service_get_num_ordre_fourn(ordre_fourn_num,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumOrdre.php", "ordre_fourn_num=" + ordre_fourn_num,callback,buffer); 
    }

    function service_get_num_offre_prix_global(offre_num,callback,buffer){
       getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonAllocNumOffreGlobal.php", "offre_num=" + offre_num,callback,buffer); 
    }

    function service_get_dem_prix(dem_num,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDemPrix.php", "dem_num=" + dem_num,set_param_fixe_prix_bck,buffer);
    };

    function getFullClicheTask(dateDeb, dateFin,status,callback,buffer) {
        var local_server = '127.0.0.1';
        getTaskGeneral(_HTTP + local_server + "/capstech_lib/php/getListeCliche.php", "",callback,buffer );
    };
    
    function service_get_stock(div_id,full_article){
        var callback = function(data){
            g_stock_index--;
            var field = data;
            var opt = field;//.groups;
            var buffer = opt;
            if(buffer !='undefined')
                $('#'+div_id).html(buffer); // rafraichi toute ta DIV "bien sur il lui faut un id "
        };
        var callback_ko = function(data){g_stock_index--;};
        var buffer=[];
        var local_server = '127.0.0.1';
        getTaskGeneral(_HTTP + local_server + "/capstech_lib/php/get_stock_article.php","full_article="+full_article,callback,buffer,callback_ko );
    }


     function service_get_solde(div_id,offre_num){
        var callback = function(data){
            var field = data[0];
            var opt = field.split(";")
            ;
            var buffer = opt;
            console.log(div_id + " "+offre_num+" " +opt+" "+field);
            if( typeof buffer != 'undefined' && buffer instanceof Array )
                $('#'+div_id).html(buffer[0]); // rafraichi toute ta DIV "bien sur il lui faut un id "
        };
        var buffer=[];
        var local_server = '127.0.0.1';
        getTaskGeneral(_HTTP + local_server + "/capstech_lib/php/get_solde_offre.php","offre_num="+offre_num,callback,buffer,'' );
    }
    
    function service_get_offre_row(row_id,offre_id){
        var callback = function(data){
            var field = data[0];
            var opt = field.split(";");
            var buffer = opt;
            console.log(row_id + " "+offre_id+" " +opt+" "+field);
            if( typeof buffer != 'undefined' && buffer instanceof Array ){
                $('#'+row_id).empty();
                g_locTable.refreshRowWithId(row_id,buffer);
            }
        };
        var buffer=[];
        var local_server = '127.0.0.1';
        getTaskGeneral(_HTTP + local_server + "/capstech_lib/php/get_row_offre_id.php","offre_id="+offre_id,callback,buffer,'' );
        
    }
    function getFullBonCITask(dateDeb, dateFin,status,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonListBonCI.php","",callback,buffer );
    };
    function getBonCITask(texte, type,centili,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDistinctBonCI.php", "texte=" + texte + "&type="+ type + "&centili=" + centili,callback,buffer );
    };
    function getBonCI_vs_commandesTask(texte, type,centili,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDistinctBonCIVsCmd.php", "",callback,buffer );
    };
    function getDetailBonCI_vs_commandesTask(texte, type,centili,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDetailBonCIVsCmd.php", "texte=" + texte + "&type="+ type + "&centili=" + centili,callback,buffer );
    };

    function getFullStockWithOffersTask(table_name,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonStockWithOffers.php", "table_name=" + table_name,callback,buffer);
    };
    function getInventaireTask(table_name,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonInventaire.php", "table_name=" + table_name,callback,buffer);
    };
    
    function service_get_desc_article(prefix,article,row_id,callback,buffer){
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDescArticle.php", "fullArticle="+prefix+"-"+article ,callback,buffer );
    }
    
    function service_get_db_change(callback,buffer){
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDbChange.php", "" ,callback,buffer );
    }
    
    function service_get_last_proforma_num(callback,buffer){
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonLastProformaNum.php", "" ,callback,buffer );
    }
	function service_create_proforma(com_id,facture_num,prix_ht,callback,buffer){
        var local_server = g_ipServer;
         getTaskGeneral(_HTTP + local_server + "/capstech_lib/php/create_proforma_row.php", "fact_com_id="+com_id + "&fact_num="+facture_num+"&fact_total_ht="+prix_ht ,callback,buffer );
    }
	function service_update_proforma(facture_num,callback,buffer){
        var local_server = g_ipServer;
        var uri = window.location.host;
             getTaskGeneral(_HTTP + uri + "/PhpFormulaire/update_proforma.php", "fact_num="+facture_num ,callback,buffer );
    }

