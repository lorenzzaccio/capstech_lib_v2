var Loader;
var slide_name=['la','lofcg','lf','lav','lof','lofc','loc','ls'];
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
  init_loc:0,
  init_ls:0
};

 function check_url_cors(){  
	let url = (window.location);
	_HTTP = url.protocol+"//";
	g_ipServer=url.host;
	console.log("read "+_HTTP+ "ip= "+url.host);
}

async function load(id){
	check_url_cors();
  await seq_load_libs();
  for(let key in slide_list){
      slide_list[key]=parseInt(localStorage.getItem(key))||0;
  }
  let i=0;
  for(let key in slide_list){
      if(slide_list[key]) {
        ordered_slide_list[key]=[slide_list[key],i];
        i++;
      }
  }
	fecth_data_client();
  fecth_data_article();
  fecth_desc_article();
  //fecth_data_fournisseur();
  availableTagsFournisseurList = await fecth_data_completion(getJsonFournisseurListTask);

  if(id===undefined){//multi mode
    add_swipe_frame();
    for(let key in slide_list){
      if(slide_list[key]){
        
        await init_page_dir(key.split("_")[1]);

      }
    }
  }else{//single mode
    init_loader(id);
    init_page(id);
  }
};



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

async function loadScript1(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

async function loadScript(src){
  let promise = loadScript1(src);
  promise.catch(err => alert(err));
  return promise;
}

function add_swipe_frame(){
        var swipe = '<div class="swiper-container">'+
            '<div class="swiper-wrapper">'+
            '</div>'+
        '</div>';
        $('body').prepend(swipe);
}