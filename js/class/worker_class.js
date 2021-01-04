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

    if(cmd==="check_added"){
      this.add_row_db(e);
    }

    if(cmd==="check_suppress"){
      this.suppress_row_db(e);
    }

    if(cmd==="sync"){
      this.sync_local_storage(e);
    }
  }

    async get_response_buffer(e){
    return null;//await getFullOffreClientTask(e[0],e[1],e[2],"");
  }

  async update_db(e){
    
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status});    

    const lcl_buffer = e[2].map((row)=>row.join(";"));
    const modified_result = is_modified_in_array(lcl_buffer,response.groups);
    //const suppressed_result = is_id_in_array(lcl_buffer,response.groups);
    //const added_result = is_id_in_array(response.groups,lcl_buffer);
    postMessage(['db_update',modified_result,year]);

  }

  async add_row_db(e){
    const year = e[3];
    const status = e[1];
    const date_deb = year+"-01-01";
    const date_fin = year+"-12-31";
    let response = await this.get_response_buffer({date_deb,date_fin,status});    

    const lcl_buffer = e[2].map((row)=>row.join(";"));
    //const modified_result = is_modified_in_array(lcl_buffer,response.groups);
    //const suppressed_result = is_id_in_array(lcl_buffer,response.groups);
    const added_result = is_id_in_array(response.groups,lcl_buffer);
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
    const suppressed_result = is_id_in_array(lcl_buffer,response.groups);
    //const added_result = is_id_in_array(response.groups,lcl_buffer);
    postMessage(['db_suppress_row',suppressed_result,year]);
  }


  async sync_local_storage(e){
    const date_deb=e[1];
    const date_fin= e[2];
    const status = e[3];
    let response = await this.get_response_buffer({date_deb,date_fin,status});
    postMessage(["db_sync",parseInt(extract_year(date_deb)),response.groups]);
  }

}