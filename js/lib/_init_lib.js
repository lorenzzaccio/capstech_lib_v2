var Loader;
var slide_name=['la','lofcg','lf','lav','lof','lofc','loc','ls','cli','sitecli'];
var ordered_slide_list = {};
var availableTagsFournisseurList;
var g_swiper;

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
  init_sitecli:0
};

 function check_url_cors(){  
	let url = (window.location);
	_HTTP = url.protocol+"//";
	g_ipServer=url.host.split(":")[0];
	console.log("read "+_HTTP+ "ip= "+g_ipServer);
}

async function load(id){
	check_url_cors();
  await seq_load_libs();
  //await init_storage();
  db = await idb.openDB(dbDef.dbName);
    //on force le status online au démarrage
  db_write('offline_status',0);
//await db.put(dbDef.dbStore,2)
  //await db_update(dbDef.dbStore,{uid:'init_toto',value:1});
  //const toto = await db.get(dbDef.dbStore,'init_la');
  //const toto = await db_read('init_la');
  //console.log(toto);
  
  (slide_list['init_la']=parseInt( await db_read('init_la'))||0);
  (slide_list['init_lofcg']=parseInt( await db_read('init_lofcg'))||0);
  (slide_list['init_lf']=parseInt( await db_read('init_lf'))||0);
  (slide_list['init_loc']=parseInt( await db_read('init_loc'))||0);
  (slide_list['init_cli']=parseInt( await db_read('init_cli'))||0);
  (slide_list['init_lofc']=parseInt( await db_read('init_lofc'))||0);
  (slide_list['init_lav']=parseInt( await db_read('init_lav'))||0);
  (slide_list['init_lof']=parseInt( await db_read('init_lof'))||0);
  (slide_list['init_sitecli']=parseInt( await db_read('init_sitecli'))||0);
/*
  await (slide_list['init_lofcg']=parseInt( await db_read('init_lofcg'))||0);
  await (slide_list['init_lf']=parseInt( db_read('init_lf'))||0);
  await (slide_list['init_loc']=parseInt( db_read('init_loc'))||0);
  await (slide_list['init_lofc']=parseInt( db_read('init_lofc'))||0);
  await (slide_list['init_cli']=parseInt( db_read('init_cli'))||0);
  await (slide_list['init_lof']=parseInt( db_read('init_lof'))||0);
  await (slide_list['init_lav']=parseInt( db_read('init_lav'))||0);
  await (slide_list['init_la']=parseInt( db_read('init_la'))||0);
  await (slide_list['init_ls']=parseInt( db_read('init_ls'))||0);*/
/*
  for  (const key in slide_list){
     await( slide_list[key]=parseInt( db_read(key))||0);
  }*/
  await part2(id);
};

async function part2(id){
  let i=0;
  for(let key in slide_list){
      if(slide_list[key]) {
        ordered_slide_list[key]=[slide_list[key],i];
        i++;
      }
  }
	/*await fecth_data_client();
  await fecth_data_article();
  await fecth_desc_article();*/
  //fecth_data_fournisseur();
  availableTagsClientList = await fecth_data_completion(getJsonClientListTask);
  availableTagsArticleList = await fecth_data_completion(getJsonArticleListTask);
  availableTagsFournisseurList = await fecth_data_completion(getJsonFournisseurListTask);
  
  if(id===undefined){//multi mode
    add_swipe_frame();
    for(let key in ordered_slide_list){
     // if(slide_list[key]){
        await init_page_dir(key.split("_")[1]);
     // }
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