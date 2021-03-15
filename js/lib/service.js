    /* 
     * To change this license header, choose License Headers in Project Properties.
     * To change this template file, choose Tools | Templates
     * and open the template in the editor.
     */

    var g_ipServer="82.64.200.189:2080";//"192.168.0.2" ;
    var _HTTP = "http://";

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


    async function promise_db_task(url,data,meth) {
        let response ;
        const method =  meth?meth:'POST';
        if(data){
            response = await fetch(url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }else
            response = await fetch(url,
                {
                    method: method
                }
            ); // (2)

        if (response.status == 200) {
            //$('.msg_loader').text("donnée reçues");
            try{
            let json = await response.json(); // (3)
            return json;
            }catch(e){
                return response;
            }
        }
        //$('.msg_loader').text("Erreur de réception de données");
        throw new Error(response.status);
    }

    function service_add_todo(arg){
        return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/update_todo.php?"+arg);
    }
    function service_delete_line_todo_list(id){
        return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/delete_line_todo_list.php?todo_id="+id);
    }

    function service_get_todo_list(todo_list){
		if(todo_list)
			return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/get_todo_list.php?todo_list="+todo_list);
		else
        	return promise_db_task(_HTTP+g_ipServer+ "/PhpFormulaire/get_todo_list.php");
    }

    function service_detele_command(arg){
       return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/delete_client_order.php"+ "?" + "num_ordre="+arg); 
    }
    function getListArticlesParClientTask(arg){
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonListArticleForClient_2.php"+ "?" + "client="+arg);
    }
    
    function getListNumOrdreParArticleTask(full_article){
       //return promise_db_task(_HTTP+ g_ipServer + "http://192.168.0.146:3023/api/v1/approFourn/num_ordre/C42-12001663");
        return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/approFourn/num_ordre/"+full_article,null,"GET");
    }

    function service_export_facture_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/facture/export_facture.php"+ "?" + "list_fact="+arg;
    }
    function service_get_mail_from_facture(arg){
        return promise_db_task(_HTTP+g_ipServer+ "/scanStockServer/php/facture/get_mail_address_from_invoice.php?num_facture=" + arg)
    }
    function service_export_facture_to_pdf(arg){
        //pour le moment on execute en local
        let ip_local = "127.0.0.1";
        window.open(_HTTP+ ip_local + "/scanStockServer/php/facture/export_to_pdf.php"+ "?" + "num_facture="+arg);
    }
    function service_export_liste_facture_to_pdf(arg){
        //pour le moment on execute en local
        let ip_local = "127.0.0.1";
        window.open(_HTTP+ ip_local + "/scanStockServer/php/facture/export_liste_to_pdf.php"+ "?" + "list_fact="+arg);
    }
    function service_export_remise_cheque_facture_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/facture/export_remise_cheque.php"+ "?" + "list_fact="+arg;
    }
    function service_export_to_pdf(url){
        let ip_local = "127.0.0.1";
        window.open(_HTTP+ ip_local + "/PhpFormulaire/export_to_pdf.php"+ "?" + "url="+url);
    }
    function get_page(url){
        return promise_db_task(url);
    
    }
    function service_export_avoir_to_csv(arg){
        window.location.href = _HTTP+ g_ipServer + "/scanStockServer/php/avoir/export_avoir.php"+ "?" + "list_av="+arg;
    }

    function service_row_exist_in_command(prefix,article){
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/is_row_exist.php"+ "?" + "prefix="+prefix+"&article="+article);
    }
///////////////////FACTURE//////////////////////////////////////
    const g_port=3023;
    const node_server = "192.168.0.146";//"192.168.0.2";//"82.64.200.189";//"192.168.0.146";
    function service_create_facture(liste_com_id,fact_num){
        
        return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/factures/"+fact_num+"/"+liste_com_id,null,"POST");
    }
    
    function service_update_facture(fact_num){
        return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/factures/"+fact_num,null,"PUT");
    }

    function sql_update_facture(field,val,fact_num){
        return promise_db_task(`${_HTTP}${node_server.split(":")[0] }:${g_port}/api/v1/factures/${fact_num}/${field}/${val}`,null,"PUT");
    }

    function sql_update_facture_header(field,val,fact_num){
        return promise_db_task(`${_HTTP}${node_server.split(":")[0] }:${g_port}/api/v1/factures/header/${fact_num}/${field}/${val}`,null,"PUT");
    }

    function service_get_last_facture_num(){
        return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/factures/last",null,"GET");
    }

    function getFullFactureClientTask(dateDeb, dateFin,status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/facture/getJsonFactureClientBetweenDate.php"+ "?" +"dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };

///////////////////SITE_CLIENT////////////////////////////
function service_get_site_client(client_id){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/siteClient/"+client_id,null,"GET");
}
function getFullListeSiteClientTask(dateDeb, dateFin,callback,buffer) {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/siteclient/full",null,"GET");
};
function service_get_siteclient_model(){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/siteclient/model",null,"GET");
}
function getListeSiteParClientTask(id){
    return promise_db_task(`${_HTTP}${node_server.split(":")[0]}:${g_port}/api/v1/siteclient/${id}`,null,"GET");
}
///////////////////ARTICLE////////////////////////////
function getFullListeArticleTask() {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/articles/full",null,"GET");
};
function service_get_la_model(){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/articles/model",null,"GET");
}
///////////////////////LOC///////////////////////////
function sql_update_node(table,field,val,id)  {
    //return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/setJsonUpdate.php"+ "?" + "table=" + table + "&name=" + name+ "&val=" + val+ "&condition=" + condition);
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/"+table+"/"+field+"/"+val+"/"+id,null,"PUT");
};
function service_send_form(url)  {
    return promise_db_task(url,null,"POST");
};
function getFullOrdreClientTask(dateDeb, dateFin,status,callback,buffer) {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/commandes/"+dateDeb+"/"+dateFin,null,"GET");
};
function service_get_last_commande(){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/commandes/last",null,"GET");
}
function service_add_remise(arg){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/commandes/remise/"+arg,null,"POST");
}
/////////////////////////////////////////////////
////////////////////////LOFC/////////////////////
async function getFullOffreClientTask(dateDeb, dateFin,status,callback,buffer) {
    return await promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/offrePrix/"+dateDeb+"/"+dateFin,null,"GET");
};

function service_get_num_offre_prix(offre_date,offre_agent,callback,buffer){
    return promise_db_task(`${_HTTP}${node_server.split(":")[0]}:${g_port}/api/v1/offrePrix/alloc/${offre_date}/${offre_agent}`,null,"GET");
 }

/////////////////////////////////////////////////
/////////////////////CLIENT///////////////////////
function getJsonClientListTask() {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/client/",null,"GET");
};
function getFullListeClientTask(dateDeb, dateFin,callback,buffer) {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/client/full",null,"GET");
};
function service_get_client_model(){
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/client/model",null,"GET");
}
////////////////////////////////////////////////////
/////////////////////LOG_DB///////////////////////
function get_db_log() {
    return promise_db_task(_HTTP+ node_server.split(":")[0] +":"+g_port+ "/api/v1/db_log/",null,"GET");
};
////////////////////ARTICLE////////////////////////////////
function service_read_desc_article(arg){
    const prefix=arg.split("-")[0];
    const article=arg.split("-")[1];
    return promise_db_task(`${_HTTP}${node_server.split(":")[0]}:${g_port}/api/v1/articles/${prefix}/${article}`,null,"GET");
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
    function getFullAvoirClientTask(dateDeb, dateFin,status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/avoir/getJsonAvoirClientBetweenDate.php"+ "?" + "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };
    
    function getFullArticleTask(status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonListArticleForStatus.php"+ "?" + "status=" + status);
    };
    function service_alloc_new_article(type) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonNewArticle.php"+ "?" + "letter=" + type);
    };

    function getFullDemPrixTask(dateDeb, dateFin,status,callback,buffer) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonDemPrixBetweenDate.php"+ "?" + "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };


    function getJsonArticleListTask() {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getListArticle_completion.php");
    };


        function getFullStockTask(status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonStockForStatus.php"+ "?" + "status=" + status);
    };

    function getJsonFournisseurListTask() {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/getListFournisseur_completion.php");
    };

   function getOrdreClientForFactureTask(facture_num,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonOrdreClientForFacture.php", "facture_num=" + facture_num,callback,buffer);
    };

    function getFullOffreClientGlobalTask(dateDeb, dateFin,status) {
        return promise_db_task(_HTTP+ g_ipServer + "/scanStockServer/php/offre/getJsonOffreClientGlobalBetweenDate.php"+ "?" + "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status);
    };
    


    function getFullProductionTask(dateDeb, dateFin,status,callback,buffer) {
        getTaskGeneral(_HTTP+ g_ipServer + "/scanStockServer/php/getJsonProductionBetweenDate.php", "dateDeb=" + dateDeb + "&dateFin=" + dateFin+ "&status=" + status,callback,buffer );
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
    var arr_table_offer = [
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
    };

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

