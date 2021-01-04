<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    include("dbUtil.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');


    $data = array();

    //write in log file
    $file = 'log.txt';
  

    $com_id = dbUtil::get_new_num_ordre($mysqli);
    if($com_id==0){
      echo -1;
      return 0;
    }

  if(isset($_REQUEST['com_client_id'])){
    $com_client_id_full = addslashes(utf8_decode($_REQUEST['com_client_id']));
    $arr = explode("-",$com_client_id_full);
    $com_client_id = Utils::getClientId($com_client_id_full);
  }else {echo -1; return;}

  if(isset($_REQUEST['com_client_site'])){
    $com_client_site = addslashes(utf8_decode($_REQUEST['com_client_site']));
  }else $com_client_site=1;

  if(isset($_REQUEST['com_prefix'])){
    $com_prefix = addslashes(utf8_decode($_REQUEST['com_prefix']));
  } else {echo -1; return;}

  
  if(isset($_REQUEST['com_article_id'])){
    $com_article_id = addslashes(utf8_decode($_REQUEST['com_article_id']));
  } else {
    if($com_prefix=="R00"){
      $com_article_id=0;
      $com_article_id = dbUtil::get_new_num_remise($mysqli);
      if($com_article_id==0) {echo -1; return;}
    }
  }
  
  if(isset($_REQUEST['com_quantite'])){
    $com_quantite = addslashes(utf8_decode($_REQUEST['com_quantite']));
  }else $com_quantite = 1;

  if(isset($_REQUEST['com_date_modif'])){
    $com_date_modif = addslashes(utf8_decode($_REQUEST['com_date_modif']));
  } else $com_date_modif = date("Y-m-d");

  if(isset($_REQUEST['com_status_id'])){
    $com_status_id = addslashes(utf8_decode($_REQUEST['com_status_id']));
  }else { echo -1; return;}

  if(isset($_REQUEST['com_prix_au_mille_ht'])){
    $com_prix_au_mille_ht = addslashes(utf8_decode($_REQUEST['com_prix_au_mille_ht']));
  } else $com_prix_au_mille_ht = 0;
  
  if(isset($_REQUEST['com_desc_ordre'])){
    $com_desc_ordre = addslashes(utf8_decode($_REQUEST['com_desc_ordre']));
  } else $com_desc_ordre = "";
  
  if(isset($_REQUEST['com_num_com_client'])){
    $com_num_com_client = addslashes(utf8_decode($_REQUEST['com_num_com_client']));
  } else $com_num_com_client = "";
  
  if(isset($_REQUEST['com_date_livraison'])){
    $com_date_livraison = addslashes(utf8_decode($_REQUEST['com_date_livraison']));
  } else $com_date_livraison = date('Y-m-d');
    
  if(isset($_REQUEST['com_facture_num'])){
    $com_facture_num = addslashes(utf8_decode($_REQUEST['com_facture_num']));
  } else $com_facture_num=0;
  
  if(isset($_REQUEST['com_centilisation'])){
    $com_centilisation = addslashes(utf8_decode($_REQUEST['com_centilisation']));
  } else $com_centilisation = '0';
  
  if(isset($_REQUEST['com_type_timbre'])){
    $com_type_timbre = addslashes(utf8_decode($_REQUEST['com_type_timbre']));
  } else $com_type_timbre = 'EXPORT';
  
  if(isset($_REQUEST['com_ref_article_client'])){
    $com_ref_article_client = addslashes(utf8_decode($_REQUEST['com_ref_article_client']));
  } else $com_ref_article_client = "";
  
  if(isset($_REQUEST['com_stock_alloue'])){
    $com_stock_alloue = addslashes(utf8_decode($_REQUEST['com_stock_alloue']));
  } else $com_stock_alloue = 0;
  
  if(isset($_REQUEST['com_stock_commande'])){
    $com_stock_commande = addslashes(utf8_decode($_REQUEST['com_stock_commande']));
  } else $com_stock_commande = "0";
  
  if(isset($_REQUEST['com_stockfourn_num_commande'])){
    $com_stockfourn_num_commande = addslashes(utf8_decode($_REQUEST['com_stockfourn_num_commande']));
  } else $com_stockfourn_num_commande = "0";
  
  if(isset($_REQUEST['com_ref_article_client_etiq'])){
    $com_ref_article_client_etiq = addslashes(utf8_decode($_REQUEST['com_ref_article_client_etiq']));
  } else $com_ref_article_client_etiq = "";
  
  if(isset($_REQUEST['com_prix_au_mille_ht_achat'])){
    $com_prix_au_mille_ht_achat = addslashes(utf8_decode($_REQUEST['com_prix_au_mille_ht_achat']));
  } else $com_prix_au_mille_ht_achat = "0.0";
  
  if(isset($_REQUEST['com_transformation'])){
    $com_transformation = addslashes(utf8_decode($_REQUEST['com_transformation']));
  } $com_transformation = "0";
  
  if(isset($_REQUEST['com_type'])){
    $com_type = addslashes(utf8_decode($_REQUEST['com_type']));
  } else $com_type=0;
  
  if(isset($_REQUEST['com_ref_article_client_fact'])){
    $com_ref_article_client_fact = addslashes(utf8_decode($_REQUEST['com_ref_article_client_fact']));
  } else $com_ref_article_client_fact = "";
  
  if(isset($_REQUEST['com_unite'])){
    $com_unite = addslashes(utf8_decode($_REQUEST['com_unite']));
  } else $com_unite = 1;

  $q="INSERT INTO commandes VALUES('{$com_id}','{$com_client_id}','{$com_client_site}','{$com_prefix}','{$com_article_id}','{$com_quantite}','{$com_date_modif}','{$com_status_id}','{$com_prix_au_mille_ht}','{$com_desc_ordre}','{$com_num_com_client}','{$com_date_livraison}','{$com_facture_num}','{$com_centilisation}','{$com_type_timbre}','{$com_ref_article_client}','{$com_stock_alloue}','{$com_stock_commande}','{$com_stockfourn_num_commande}','{$com_ref_article_client_etiq}','{$com_prix_au_mille_ht_achat}','{$com_transformation}','{$com_type}','{$com_ref_article_client_fact}','{$com_unite}')";

  file_put_contents($file, $q,FILE_APPEND );
  
  if($result=$mysqli->query($q)){
    echo "1";
  } else echo "-1";
?>
