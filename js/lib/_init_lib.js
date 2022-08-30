var Loader;
var slide_name=['la','lofcg','lf','lav','lof','lofc','loc','ls','cli','sitecli','fourn','inv','fp'];
var ordered_slide_list = {};
var availableTagsFournisseurList;
var g_swiper;
//var node_server;

var db_w;
var slide_list={
  init_la:0,//[actif,index]
  init_lofcg:0,
  init_lf:0,
  init_lav:0,
  init_lof:0,
  init_lofc:0,
  init_loc:1,
  init_ls:0,
  init_cli:0,
  init_sitecli:0,
  init_fourn:0,
  init_inv:0,
  init_fp:0
};

 function check_url_cors(){  
	let url = (window.location);
	_HTTP = url.protocol+"//";
	g_ipServer=url.host.split(":")[0];
	console.log("read "+_HTTP+ "ip= "+g_ipServer);
}

async function load(id){
  let first_init=0;
	check_url_cors();
  await seq_load_libs();
  
  var request = indexedDB.open("capstech");
  request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event) {
    start_part_1(first_init);
  };
  // This event is only implemented in recent browsers
  request.onupgradeneeded = function(event) {
    // Save the IDBDatabase interface
    var db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("capstech_store", { keyPath: "uid" });
    first_init=1;
  };

};

async function start_part_1(first_init){
  db = await idb.openDB(dbDef.dbName);
    await db_write('offline_status',0);
    first_init?await db_write('init_loc',1):"";
    first_init?slide_list['init_loc']=1:"";

    (slide_list['init_loc']=parseInt( await db_read('init_loc'))||0);
    (slide_list['init_la']=parseInt( await db_read('init_la'))||0);
    (slide_list['init_lofcg']=parseInt( await db_read('init_lofcg'))||0);
    (slide_list['init_lf']=parseInt( await db_read('init_lf'))||0);
    (slide_list['init_cli']=parseInt( await db_read('init_cli'))||0);
    (slide_list['init_lofc']=parseInt( await db_read('init_lofc'))||0);
    (slide_list['init_lav']=parseInt( await db_read('init_lav'))||0);
    (slide_list['init_lof']=parseInt( await db_read('init_lof'))||0);
    (slide_list['init_sitecli']=parseInt( await db_read('init_sitecli'))||0);
    (slide_list['init_fourn']=parseInt( await db_read('init_fourn'))||0);
    (slide_list['init_inv']=parseInt( await db_read('init_inv'))||0);
    (slide_list['init_fp']=parseInt( await db_read('init_fp'))||0);
  
    await part2();
}

async function part2(id){
  let i=0;
  for(let key in slide_list){
      if(slide_list[key]) {
        ordered_slide_list[key]=[slide_list[key],i];
        i++;
      }
  }
  
  //let g_ipServer="127.0.0.1";//"192.168.0.2" ;//"82.64.200.189:2080";//
  
  //var node_server='127.0.0.1';
  //let node_server = /*node_server ||*/ "127.0.0.1";//"192.168.0.2";//"192.168.0.113";//"82.64.200.189";//"192.168.0.146";//"192.168.0.2";//"82.64.200.189";//"192.168.0.146";
   net_conf = new net_config_class();
 await net_conf.init();
 
 node_server = net_conf.get_node_server();
  availableTagsClientList = await fecth_data_completion(getJsonClientListTask);
  availableTagsArticleList = await fecth_data_completion(getJsonArticleListTask);
  availableTagsFournisseurList = await fecth_data_completion(getJsonFournisseurListTask);
  
  if(!id){//multi mode
    add_swipe_frame();
    for(let key in ordered_slide_list){
        await init_page_dir(key.split("_")[1]);
    }
  }else{//single mode
    init_loader(id);
    init_page(id);
  }
}

function init_loader(id){
    Loader = new Loader_class();
    Loader.log("initialisation "+id+"...");
}


async function init_page_dir(id){
  var l1 = await loadScript("../../new_"+id+"/public_html/js/start_"+id+".js");
}

async function init_page(id){
     async function f() {
        var l1 = await loadScript("js/init_"+id+".js");
        var lé = await load_scripts(id);
     };

     f();
        
}

async function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.async=false;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
/*
async function loadScript(src){
  let promise = loadScript1(src);
  promise.catch(err => alert(err));
  return promise;
}*/

function add_swipe_frame(){
        var swipe = '<div class="swiper-container">'+
            '<div class="swiper-wrapper">'+
            '</div>'+
        '</div>';
        $('body').prepend(swipe);
}