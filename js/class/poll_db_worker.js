importScripts('../lib/service.js');
importScripts('../lib/compare_array.js');
importScripts('../lib/libTime.js');

let b_poll_db = true;
const poll_db_interval = setInterval(db_poll_loop,5000);

onmessage = function(e) {
  const data=e.data;
    let cmd = data[0];
    const log_date = data[1];
    
    if(cmd==="start"){
      
      b_poll_db=true;
    }

    if(cmd==="stop")
      b_poll_db=false;
}
function db_poll_loop(){
  if(!b_poll_db) clearInterval(poll_db_interval);
  poll_db();
}

async function poll_db(){
  let res = await get_db_log();
  console.log("checking db"+res.groups[0].log_msg);
}