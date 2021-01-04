<?php
    include("../../php_conf/config1.php");
    include("../../scanStockServer/php/Utils.php");
    include("../../scanStockServer/php/dbUtil.php");
    include("../../scanStockServer/php/db_mapping.php");
    include("../../scanStockServer/php/codes.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    $APPRO_FOURN = 1;
    $APPRO_CLIENT_EXP = 2;
    $APPRO_CLIENT_FISCAL = 3;

    $STOCK_FISCAL = 2;
    $STOCK_MAT = 0;
    $STOCK_INTER = 2;

    $CAPSTECH_NO_PROP = 2;
    $CAPSTECH_PROP = 1;

	var_dump($_REQUEST);
    if(isset($_REQUEST['appro_client_combo'])){
      $appro_client_combo = $_REQUEST['appro_client_combo'];
      $appro_client_id=explode("-",$appro_client_combo)[0];
    }
    if(isset($_REQUEST['appro_article_combo'])){
      $appro_article_combo = $_REQUEST['appro_article_combo'];
      $prefix=explode("-",$appro_article_combo)[0];
      $article=explode("-",$appro_article_combo)[1];
    }
    if(isset($_REQUEST['appro_date'])){
      $appro_date = $_REQUEST['appro_date'];
    }
    if(isset($_REQUEST['appro_quantite'])){
      $appro_quantite = intval($_REQUEST['appro_quantite']);
    }
    if(isset($_REQUEST['appro_quantite_par_carton'])){
      $appro_quantite_par_carton = intval($_REQUEST['appro_quantite_par_carton']);
    }
    if(isset($_REQUEST['appro_prix_achat'])){
      $appro_prix_achat = $_REQUEST['appro_prix_achat'];
    }
    $appro_status=16;
    if(isset($_REQUEST['appro_type_combo'])){
      $appro_type_combo = intval($_REQUEST['appro_type_combo']);
      if($appro_type_combo===$APPRO_FOURN) $appro_status=16;
      if($appro_type_combo===$APPRO_CLIENT_EXP) $appro_status=16;
      if($appro_type_combo===$APPRO_CLIENT_FISCAL) $appro_status=15;

    }

    if(isset($_REQUEST['appro_num_ordre'])){
      $appro_num_ordre = $_REQUEST['appro_num_ordre'];
    }
    if(isset($_REQUEST['appro_num_ordre_fourn'])){
      $appro_num_ordre_fourn = $_REQUEST['appro_num_ordre_fourn'];
    }

    if(isset($_REQUEST['appro_emplacement'])){
      $appro_emplacement = intval($_REQUEST['appro_emplacement']);
    }else
      $appro_emplacement = 100;

    if(isset($_REQUEST['appro_num_palette'])){
      $appro_num_palette = addslashes(utf8_decode($_REQUEST['appro_num_palette']));
    }
    if(isset($_REQUEST['appro_rem'])){
      $appro_rem = addslashes(utf8_decode($_REQUEST['appro_rem']));
    }
    if(isset($_REQUEST['appro_fiscal_check'])){
      $appro_fiscal_check = addslashes(utf8_decode($_REQUEST['appro_fiscal_check']));
    }
    if(isset($_REQUEST['appro_texte_fiscal'])){
      $appro_texte_fiscal = addslashes(utf8_decode($_REQUEST['appro_texte_fiscal']));
    }
    if(isset($_REQUEST['appro_type_timbre'])){
      $appro_type_timbre = addslashes(utf8_decode($_REQUEST['appro_type_timbre']));
    }else
      $appro_type_timbre="EXPORT";

    if(isset($_REQUEST['appro_centilisation'])){
      $appro_centilisation = $_REQUEST['appro_centilisation'];
    }else
      $appro_centilisation=75;

    if(isset($_REQUEST['appro_dae'])){
      $appro_dae = $_REQUEST['appro_dae'];
    }
    
    $client_site = 1;
    $prix_vente = 0.0;
    $com_num_com="appro";
    $com_facture_num="";
    $com_ref_article_client='appro';
    $com_stock_alloue=$appro_quantite;
    $com_stock_commande=$appro_quantite;
    $com_facture_num=0;
    $com_stock_fourn_num_com=0;
    $com_ref_article_client_etiq="";
    $com_transfo=0;
    $com_type=0;
    $com_ref_client_fact="";
    $com_unite=1000;

    $stockscan_num_prod=$num_prod;
    $stockscan_user = -1;

    if($appro_type_combo===$APPRO_FOURN){
      $stockscan_status = $CAPSTECH_PROP;
      $stockscan_typeStock=$STOCK_MAT;
      $stockscan_num_com=$appro_num_ordre;    
    }

    if($appro_type_combo===$APPRO_CLIENT_FISCAL){
      $stockscan_status = $CAPSTECH_NO_PROP;//2 : client propriétaire
      $stockscan_typeStock=$STOCK_FISCAL;
      $mat_operation="APPRO_CLIENT_CRD";
      $stockscan_num_com="appro_".$appro_date;
    }

    if($appro_type_combo===$APPRO_CLIENT_EXP){
      $stockscan_status = $CAPSTECH_NO_PROP;
      $stockscan_typeStock=$STOCK_MAT;
      $mat_operation="APPRO_CLIENT_EXP";$stockscan_num_com="appro_".$appro_date;
    }

    $quantite_produite=0;
    $etape=1;
    $ficheprod_transfo="NO_TRANSFO";
    $ficheprod_machine="APPRO";
    $ficheprod_comment="";
    $ficheprod_time="1";
    $ficheprod_palette="P30";
    $ficheprod_date_deb=$appro_date;
    $ficheprod_date_fin=$appro_date;
    $ficheprod_heure_deb="00:00";
    $ficheprod_heure_fin="00:00";
    $ficheprod_status=3;
    $ficheprod_orientation=0;
    $ficheprod_gobelet="";
    $ficheprod_sachet="";
    $ficheprod_couleur_encre="";
    $ficheprod_join_file="";
        
    $mat_compteur_deb=0;
    $mat_compteur_fin=0;
    $mat_dechets=0;
    $timestamp = date("Y-m-d H:i:s");
    $mat_poubelle=0;
    $mat_machine=$ficheprod_machine;
    $mat_coups_vide=0;
    
        
    //COMMANDES
    $com_id = dbUtil::get_new_max($mysqli,"commandes","com_id");
    $prod_id = dbUtil::get_new_max($mysqli,"ficheProduction","ficheprod_id");
    if($appro_type_combo!==$APPRO_FOURN){
      $arg = array(
        $com_id,
        $appro_client_id,
        $client_site,
        $prefix,
        $article,
        $appro_quantite,
        $appro_date ,
        $appro_status,
        $prix_vente,
        $appro_rem,
        $com_num_com,
        $appro_date,
        $com_facture_num,
        $appro_centilisation,
        $appro_type_timbre,
        $com_ref_article_client,
        $com_stock_alloue,
        $com_stock_commande,
        $com_stock_fourn_num_com ,
        $com_ref_article_client_etiq,
        $appro_prix_achat,
        $com_transfo,
        $com_type,
        $com_ref_client_fact,
        $com_unite
      );
      if(!db_mapping::add_commandes_row($mysqli,$arg)){
        return_code($ERROR_COM_DB);
        exit();
      }

          
      //PRODUCTION
      $arg=array(
        $prod_id,
        $com_id,
        $etape,
        $prefix,
        $article,
        $prefix,
        $article,
        $appro_quantite,
        $ficheprod_transfo,
        $appro_date,
        $ficheprod_machine,
        $ficheprod_comment,
        $ficheprod_time,
        $appro_quantite_par_carton,
        $ficheprod_palette,
        $ficheprod_date_deb,
        $ficheprod_date_fin,
        $ficheprod_heure_deb,
        $ficheprod_heure_fin,
        $ficheprod_status,
        $appro_date,
        $ficheprod_orientation,
        $ficheprod_gobelet,
        $ficheprod_sachet,
        $ficheprod_couleur_encre,
        $ficheprod_join_file
      );
              
      if(!db_mapping::add_ficheproduction_row($mysqli,$arg)){
        return_code($ERROR_FICHEPROD_DB);
        exit();
      }

    
      $arg = array(
        'null',
        $appro_date,$appro_dae,
        $appro_client_combo,
        $mat_compteur_deb,
        $mat_compteur_fin,
        $mat_dechets,
        $timestamp,
        $mat_coups_vide,
        $mat_poubelle,
        $mat_operation,
        $mat_machine,
        $com_id
      );

      if(!db_mapping::add_new_gestion_matiere_row($mysqli,$arg)){
        return_code($ERROR_NGM_DB);
        exit();
      }
    }
              
    $nbr_carton = $appro_quantite/$appro_quantite_par_carton;
    $quantite_residuelle = $appro_quantite%$appro_quantite_par_carton;
            
    for($index_carton=1;$index_carton<=$nbr_carton;+$index_carton++)
    {   
      $arg=array(
        'null' ,
        $prefix,
        $article,
        $stockscan_num_com,
        $stockscan_num_prod,
        $timestamp,
        $appro_quantite_par_carton,
        $index_carton,
        $appro_emplacement,
        $appro_num_palette,
        $stockscan_user,
        $stockscan_status,
        $stockscan_typeStock    
      );
          
      if(!db_mapping::add_stockscan_row($mysqli,$arg)){
        return_code($ERROR_STOCKSCAN_DB);
        exit();
      }

    }

    if($quantite_residuelle>0){ 
      $arg=array(
        'null' ,
        $prefix,
        $article,
        $stockscan_num_com,
        $stockscan_num_prod,
        $timestamp,
        $quantite_residuelle,
        $index_carton,
        $appro_emplacement,
        $appro_num_palette,
        $stockscan_user,
        $stockscan_status,
        $stockscan_typeStock    
      );

      if(!db_mapping::add_stockscan_row($mysqli,$arg)){
        return_code($ERROR_STOCKSCAN_DB);
        exit();
      }
    }
    //appro foun : record in ordine
    if($appro_type_combo===$APPRO_FOURN){
      //check if an ordine line already exist
      $table = "ordine";
      $cond = "ord_com_num='{$appro_num_ordre}' and ord_prefix='{$prefix}'";
      if(Utils::check_row_exist($mysqli,$table,$cond)){
        //update the status and the quantity
        echo("row already exist !!");
      }else{
          $ORDINE_LIVRE = 1;
          $appro_fact_num = 0;
          $appro_prix_ht=0;
          $appro_status=$ORDINE_LIVRE;
          $appro_fourn = 1;
          $appro_timestamp = $timestamp;
          $appro_date_paiement="2007-01-01";
          //create ordine line
          $arg = array(
          'null',
          $prefix,
          $article,
          $appro_quantite,
          $appro_prix_achat,
          $appro_num_ordre_fourn,
          $appro_num_ordre,
          $appro_date,
          $appro_date,
          $appro_quantite,
          $appro_fact_num,
          $appro_prix_ht,
          $appro_status,
          $appro_date_paiement,
          $appro_fourn,
          $appro_date_paiement
        );

        if(!db_mapping::add_ordine_row($mysqli,$arg)){
          return_code($ERROR_ORDINE_DB);
          exit();
        }
      }
    }
    //all complete
    return_code($OPERATION_SUCCESS);
?>
