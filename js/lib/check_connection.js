/*  ********** Online / Offline Detection **********  */

// Request a small image at an interval to determine status
// ** Get a 1x1 pixel image here: http://www.1x1px.me/
// ** Use this code with an HTML element with id="status"

const checkOnlineStatus = async () => {
    try {
      const online = await fetch("/new_swipe/public_html/1Pixel.png");
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };

  setInterval(async () => {
    const result = await checkOnlineStatus();
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = result ? "Online" : "OFFline";
    let result_db;
    try{
        result_db = await getconnectionStatusTask();
        result_db=true;
    }catch(e){
        result_db=false;
    }
    const statusDbDisplay = document.getElementById("statusDb");
    statusDbDisplay.textContent = result_db ? "Online" : "OFFline";

  }, 30000); // probably too often, try 30000 for every 30 seconds
  
  // forgot to include async load event listener in the video! 
  window.addEventListener("load", async (event) => {
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = (await checkOnlineStatus())
      ? "Online"
      : "OFFline";
/*
    const statusDbDisplay = document.getElementById("statusDb");
    statusDbDisplay.textContent = (await getconnectionStatusTask())
      ? "Online"
      : "OFFline";*/
  });

  async function check_db_connection(){
    try {
      token_connect=true;
      const article = await service_get_last_article();
      await db_write('offline_status',0);
      return true;
    } catch (err) {
      alert("connection db problem"); 
      await db_write('offline_status',1);
      const statusDbDisplay = document.getElementById("statusDb");
      statusDbDisplay ?  
      statusDbDisplay.textContent = (_offline)
      ? "OFFline"
      : "Online"
      :"";
      return false; // definitely offline
    }
  }


