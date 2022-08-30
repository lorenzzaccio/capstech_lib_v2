importScripts('../../../capstech_lib_v2/js/lib/check_db_connection.js');

importScripts('https://cdn.jsdelivr.net/npm/idb@7/build/umd.js');
importScripts('../../../capstech_lib_v2/js/lib/storage_worker.js');
importScripts('../../../capstech_lib_v2/js/lib/index_db_worker.js');
let db_w;
class worker_class{
  
  constructor(arg){
    this.func=arg.func;
    this.data=arg.data;
    this.handle_msg();
  }
  
  handle_msg(){
    const e=this.data;
    let cmd = e[0];
    
    if(cmd==="start"){
      this.update_db(e);
    }
    if(cmd==="push_update"){
      this.push_update(e);
    }
/*
    if(cmd==="check_added"){
      this.add_row_db(e);
    }

    if(cmd==="check_suppress"){
      this.suppress_row_db(e);
    }
*/
    if(cmd==="sync"){
      this.sync_local_storage(e);
    }
  }

    async get_response_buffer(e){
    return null;
  }

  async update_db(e){
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status});    
    if(!response) return;
    const lcl_buffer = e[2].map((row)=>row.join(";"));
    const modified_result = (lcl_buffer.length<=0)?response.groups||response : is_modified_in_array(lcl_buffer,response.groups||response);

    modified_result.add && postMessage(['db_add_row',modified_result.add.data,year]);
    modified_result.sup && postMessage(['db_suppress_row',modified_result.sup.data,year]);
    modified_result.mod && postMessage(['db_update',modified_result.mod.data,year]);
    (modified_result.length>0 && !modified_result.add && !modified_result.sup && !modified_result.mod)?postMessage(['db_sync',parseInt(year),modified_result,year]):"";

  }

  async push_update(e){
    const id=e[4];
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status,id});    
    if(!response) return;
    let r=Object.values(response);
    const r1=r.map((l)=>l===""?l="X":l);
    const db_buffer=r1.join(";");
    const lcl_buffer=e[2][0][0].join(';');//(e[2].map((row)=>Object.values(row).join(";")));
    const modified_result = is_modified_in_array_for_id([lcl_buffer],[db_buffer],id);
    //let modified_result = [];modified_result.push(db_buffer);
    postMessage(['db_update',modified_result.mod.data/*modified_result*/,year]);
  }
/*
  async add_row_db(e){
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status});    

    const lcl_buffer = e[2].map((row)=>row.join(";"));
    //const modified_result = is_modified_in_array(lcl_buffer,response.groups);
    //const suppressed_result = is_id_in_array(lcl_buffer,response.groups);
    const added_result = is_id_in_array(response.groups||response,lcl_buffer);
    postMessage(['db_add_row',added_result,year]);
  }

  async suppress_row_db(e){
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status});    

    const lcl_buffer = e[2].map((row)=>row.join(";"));
    //const modified_result = is_modified_in_array(lcl_buffer,response.groups);
    const suppressed_result = is_id_in_array(lcl_buffer,response.groups||response);
    //const added_result = is_id_in_array(response.groups,lcl_buffer);
    postMessage(['db_suppress_row',suppressed_result,year]);
  }
*/

  async sync_local_storage(e){
    //const date_deb=e[1];
    //const date_fin= e[2];
    
    const year = e[2];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";


    //const status = e[3];
    let response = await this.get_response_buffer({date_deb,date_fin,status});
    if(!response) return;
    postMessage(["db_sync",parseInt(/*extract_year(date_deb)*/year),response||response.groups]);
  }

}

