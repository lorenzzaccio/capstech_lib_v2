async function is_offline(){
    return parseInt(await db_read('offline_status')|| 0);
  }