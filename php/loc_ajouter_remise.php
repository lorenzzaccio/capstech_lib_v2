<?php
    include("../../php_conf/config1.php");
    include("../../scanStockServer/php/Utils.php");
    include("../../scanStockServer/php/dbUtil.php");
    include("../../scanStockServer/php/codes.php");
    include("../../scanStockServer/php/status.php");    
    include("../../scanStockServer/php/db_mapping.php");
    include("../../scanStockServer/php/codes.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');
    
    $LIVRE_STATUS = 6;
    //1-check Args 
    $arg = array(
        'loc_ajouter_remise_client'=>'',
        'loc_ajouter_remise_site_client'=>'1',
        'loc_ajouter_remise_libelle_fact'=>'',
        'loc_ajouter_remise_date'=>'2007-01-01',
        'loc_ajouter_remise_prix_achat'=>'0',
        'loc_ajouter_remise_prix_vente'=>'0',
        'loc_ajouter_remise_num_offre'=>'',
        'loc_ajouter_remise_desc'=>'0.0'
    );

    foreach ($arg as $key=>$value) {
      echo ("checking ".$key."\n");
      $arg[$key]=Utils::check_req_arg_key($key);
    }

    //2- prepare args for request
    $com_id = dbUtil::get_new_max($mysqli,"commandes","com_id");
    $com_client_id = $arg['loc_ajouter_remise_client'];
    $client_site = $arg['loc_ajouter_remise_site_client'];
    $prefix = "R00";
    $article = dbUtil::get_new_max_cond($mysqli,"commandes","com_article_id","com_prefix='R00'");
    $com_quantite=1;
    $com_date=$arg['loc_ajouter_remise_date'];
    $com_status=$LIVRE_STATUS;
    $prix_vente = $arg['loc_ajouter_remise_prix_vente'];
    $com_rem=$arg['loc_ajouter_remise_desc'];
    $com_num_com="remise";
    $com_facture_num=0;
    $com_centilisation="";
    $com_type_timbre="";
    $com_ref_article_client=$arg['loc_ajouter_remise_libelle_fact'];
    $com_stock_alloue=0;
    $com_stock_commande=0;
    $com_stock_fourn_num_com=0;
    $com_ref_article_client_etiq="";
    $com_prix_achat = $arg['loc_ajouter_remise_prix_achat'];
    $com_transfo=0;
    $com_type=-1;
    $com_ref_client_fact=$arg['loc_ajouter_remise_libelle_fact'];
    $com_unite=1;

    //3- engage MYSQL
    $data = array(
        $com_id,
        $com_client_id,
        $client_site,
        $prefix,
        $article,
        $com_quantite,
        $com_date ,
        $com_status,
        $prix_vente,
        $com_rem,
        $com_num_com,
        $com_date,
        $com_facture_num,
        $com_centilisation,
        $com_type_timbre,
        $com_ref_article_client,
        $com_stock_alloue,
        $com_stock_commande,
        $com_stock_fourn_num_com ,
        $com_ref_article_client_etiq,
        $com_prix_achat,
        $com_transfo,
        $com_type,
        $com_ref_client_fact,
        $com_unite
      );
      if(!db_mapping::add_commandes_row($mysqli,$data)){
        return_code($ERROR_COM_DB);
        exit();
      }
/*
    $q="select * from demandePrix WHERE demprix_num='".$arg['lof_ref_dem_num']."'";
    if($list_result=$mysqli->query($q)){ 
      while ($row = $list_result->fetch_assoc()) {
        $id = dbUtil::db_copy_row($mysqli,"demandePrix","demPrix_id","demPrix_num='".$arg['lof_ref_dem_num']."' AND demPrix_prefix='".$prefix."'");
        dbUtil::db_update_line($mysqli,"demandePrix","demPrix_num","'".$arg['lof_renew_dem_num']."'","demPrix_id=".$id);
        if($result=$mysqli->query($q)){
          dbUtil::db_update_line($mysqli,"demPrix","demPrix_autreQuantite","'".$arg['lof_renew_quantity']."'","demPrix_id=".$id);
          if($result=$mysqli->query($q)){
            dbUtil::db_update_line($mysqli,"demandePrix","demPrix_quantite","'".$arg['lof_renew_buy_price']."'","demandePrix_id=".$id);
            if($result=$mysqli->query($q)){
              dbUtil::db_update_line($mysqli,"demandePrix","demPrix_date","'".$arg['lof_renew_date']."'","demPrix_id=".$id);
              if($result=$mysqli->query($q)){
                  dbUtil::db_update_line($mysqli,"demandePrix","demPrix_status","'".$DEMPRIX_EN_COMMANDE."'","demPrix_id=".$id);
                if($result=$mysqli->query($q)){
                  return_code($OPERATION_SUCCESS);  
          } else return_code($ERROR_DB_SQL);    
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
      }
    }else return_code($ERROR_DB_SQL);*/
?>
