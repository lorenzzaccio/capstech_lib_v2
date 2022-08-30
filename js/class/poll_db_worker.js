importScripts('../../../capstech_lib_v2/js/lib/check_db_connection.js');
importScripts('https://cdn.jsdelivr.net/npm/idb@7/build/umd.js');
importScripts('../../../capstech_lib_v2/js/lib/storage_worker.js');
importScripts('../../../capstech_lib_v2/js/lib/index_db_worker.js');
importScripts('../lib/service.js');
importScripts('../lib/compare_array.js');
importScripts('../lib/libTime.js');

let b_poll_db = true;
let b_active = false //indique qu'il est en train de scruter

const poll_db_interval = setInterval(db_poll_loop,5000);

onmessage = function(e) {
  const data=e.data;
    let cmd = data[0];
    const log_date = data[1];
    
    if(cmd==="start")  
      //lancement de la mise à jour toutes les 5 secondes
      b_poll_db=true;
    
    //activation de la mise à jour directement
    if(cmd==="update"){
      if(!b_active){
        b_poll_db=false;
        await poll_db();
        b_poll_db = true;
      }
    }

    if(cmd==="stop")
      b_poll_db=false;
}
function db_poll_loop(){
  if(b_active || !b_poll_db)
    clearInterval(poll_db_interval);
  else
    poll_db();
}

async function update(){
  
}

async function poll_db(){
  b_active = true;
  let res = await get_db_log();
  console.log("checking db"+res.groups[0].log_msg);
  b_active = false;
}