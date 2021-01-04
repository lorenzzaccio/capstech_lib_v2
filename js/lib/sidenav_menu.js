//$(document).ready(
  function load_side_nav(config){
  inject_sidenav_menu(config);
  aria_expanded_cb();
  set_ui_pages();
}
//);
function set_ui_pages(){
  let list = document.getElementById("swipe_page_list");
  for(let key in slide_list){
    let li = document.createElement("li");
    let line = document.createElement("input");
    line.setAttribute("type","checkbox");
    line.setAttribute("name",key);
    line.checked=slide_list[key]?true:false;
    let lbl = document.createElement("label");
    lbl.text=key;
    //lbl.setAttribute("for",key);
    line.onchange=add_remove_swipe;
    let text = document.createTextNode(key);
    lbl.appendChild(text);
    li.appendChild(line);
    li.appendChild(lbl);
    list.appendChild(li);
  }
}

function add_remove_swipe(){
  let name = this.name;
  if((document.querySelectorAll("div.swiper-slide").length===1)&&(this.checked===false)){
    alert("Il faut garder au moins un tableau");
    this.checked=true;
    return;  
  }
  
  localStorage.setItem(name,this.checked?1:0);
  slide_list[name]=this.checked?1:0;
  //this.checked=!this.checked;
  if(this.checked)
    init_page_dir(name.split("_")[1]);
  else{
    document.querySelector("."+name.split("_")[1]+"_swipe").remove();
    if(document.getElementById("btn_"+name.split("_")[1])) document.getElementById("btn_"+name.split("_")[1]).remove();
  }
}

function inject_sidenav_menu(config){
  var ip = "http://"+config.get_ip();
  var sidenav = config.get_html_framework().sidenav;
  $("."+sidenav).append('<div id="swipe_page_list"></div>'+
              '<ul class="nav-link-list">'+
                '<li><label>Menu</label></li>'+
                '<li><button type="button" id="parameter" class="btn btn-violet btn-filter">paramètres</button><br></li>'+
              '</ul>'+
              
              '<ul class="mapping_menu nav-link-list" aria-expanded="false">'+
                '<li><a><span  class="fa fa-lg fa-home"></span>Mapping</a></li>'+
              '</ul>'+
              
              '<ul class="mapping_content "  hidden="hidden">'+
                '<li class="" id="mapping_content"></li>'+
              '</ul>'+
              
              '<ul class="nav-link-list">'+
                '<li><a href="."><span class="fa fa-lg fa-home"></span> Home</a></li>'+

                '<li><a href='+ip+'/plan/public_html/index.html" ><span class="fas fa-sitemap"></span>planning</a></li>'+
                
                '<li><a href="'+ip+'/production/index.html" ><span class="fas fa-cogs"></span>Production</a></li>'+
                
                '<li><a href="'+ip+'/listeOrdreClient/public_html/index.html" ><span class="fas fa-cart-arrow-down"></span> Ordres clients</a></li>'+
                
                '<li><a href="'+ip+'/listeOffreClient/public_html/index.html" ><span class="fas fa-handshake"></span> Offres</a></li>'+

				        '<li><a href="'+ip+'/listeOffreClientGlobal/public_html/index.html" ><span class="fas fa-handshake"></span> Offres Globales</a></li>'+
                
                '<li><a href="'+ip+'/listeOrdreFournisseur/public_html/index.html" ><span class="fas fa-shopping-cart"></span> Ordres fournisseurs</a></li>'+
                
                '<li><a href="'+ip+'/listArticle/public_html/index.html" ><span class="fas fa-anchor"></span> Articles</a></li>'+
                
                '<li><a href="http://plan.gaston.fr"><span class="fas fa-warehouse"></span> Stock plan</a></li>'+

                '<li><a href="'+ip+'/bonCi/public_html/index.html" ><span class="fas fa-table"></span> Bon de ci</a></li>'+
                
                '<li><a href="'+ip+'/listeClient/public_html/index.html" ><span class="fas fa-table"></span> Liste clients</a></li>'+
                
                '<li><a href="http://stock.gaston.fr" ><span class="fas fa-qrcode"></span> Stock scan</a></li>'+

                '<li><a href="https://pro.douane.gouv.fr/" ><span class="fas fa-user-tie"></span> ProDouane</a></li>'+

                '<li><a href="'+ip+'/Php_chart_DRM/index.php?dateDeb=2018-01-01&dateFin=2018-09-30&record=0" ><span class="fas fa-user-tie"></span> Ventes</a></li>'+

                '<li><a href="'+ip+'/Php_chart_DRM/ventes_cumul.php?dateDeb=2018-01-01&dateFin=2018-09-30&machine=marcel" ><span class="fas fa-user-tie"></span> Ventes cumul</a></li>'+

                '<li><a href="'+ip+'/php_chart_DRM/ventes_cumul.php?dateDeb=2018-01-01&dateFin=2018-09-30&machine=marcel"><span class="fas fa-user-tie"></span> Marges cumul</a></li>'+

                '<li><a href="'+ip+'/PhpDRM/drm.php?dateDeb=2018-01-01&dateFin=2018-09-30&record=0"><span class="fas fa-user-tie"></span> DRM</a></li>'+

                '<li><a href="'+ip+'/PhpDRM/compta_matiere.php?dateDeb=2018-09-01&dateFin=2018-09-30&machine=marcel&record=0&calcul=0"><span class="fas fa-user-tie"></span> Compta matière</a></li>'+

                '<li><a href="'+ip+'/PhpDRM/stock_crd.php?dateDeb=2018-04-01&dateFin=2018-09-30"><span class="fas fa-user-tie"></span> Stock global</a></li>'+
                
                '<li><a href="'+ip+'/PhpDRM/stock_crd_detail.php?dateDeb=2018-04-01&dateFin=2018-09-30"><span class="fas fa-user-tie"></span> Stock par ID</a></li>'+

				        '<li><a href="'+ip+'/listStock/public_html/index.html" ><span class="fas fa-sitemap"></span>liste stock</a></li>'+

                '<li><a href="'+ip+'/listeFactureClient/public_html/index.html" ><span class="fas fa-sitemap"></span>liste des factures</a></li>'+

                '<li><a href="'+ip+'/liste_inventaire/index.html" ><span class="fas fa-sitemap"></span>liste inventaire</a></li>'+
                
                '<li><a href="'+ip+'/listeFactureClient/public_html/index.html" ><span class="fas fa-sitemap"></span>liste des factures</a></li>'+

				'<li><a href="'+ip+'/listeAvoirClient/public_html/index.html" ><span class="fas fa-sitemap"></span>liste des avoirs</a></li>'+

                '<li><a href="'+ip+'/listeArticleParClient/index.html" ><span class="fas fa-sitemap"></span>liste article par client</a></li>'+

                '<li><a href="'+ip+'/calcul_prix/index.html" ><span class="fas fa-sitemap"></span>calcul prix</a></li>'+

                '<li><a href="'+ip+'/capstech_ball/index.html" ><span class="fas fa-sitemap"></span>ball</a></li>'+

                '<li><a href="'+ip+'/snapCaps2/www/index.html" ><span class="fas fa-sitemap"></span>Snap Caps 2</a></li>'+

                '<li><a href="'+ip+'/pointeuse/index.html" ><span class="fas fa-sitemap"></span>pointeuse</a></li>'+

                '<li><a href="'+ip+'/fiche_tech/fiche_technique.php" ><span class="fas fa-sitemap"></span>fiche technique</a></li>'+
              '</ul>'
  );
}

function aria_expanded_cb(){
  var $mapping, $tooltip
    $mapping = $('.mapping_menu');
    $tooltip = $('.mapping_content');
    return $mapping.on('click touchstart',() => {
      if ($tooltip.attr('hidden') === 'hidden') {
        $tooltip.removeAttr('hidden')
        return $mapping.attr('aria-expanded', true)
      } else {
        $tooltip.attr('hidden', true)
        return $mapping.attr('aria-expanded', false)
      }
    })
}
