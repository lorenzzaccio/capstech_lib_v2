<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    if(isset($_REQUEST['forfait_offre_num'])){
      $offre_num = $_REQUEST['forfait_offre_num'];
    }
    if(isset($_REQUEST['forfait_client_id'])){
      $forfait_client_id = $_REQUEST['forfait_client_id'];
    }
    if(isset($_REQUEST['forfait_date'])){
      $offre_date = $_REQUEST['forfait_date'];
    }
    $offre_quantity = 1;
    if(isset($_REQUEST['forfait_sell_price'])){
      $forfait_sell_price = $_REQUEST['forfait_sell_price'];
    }
    if(isset($_REQUEST['forfait_desc'])){
      $forfait_desc = addslashes(utf8_decode($_REQUEST['forfait_desc']));
    }
    if(isset($_REQUEST['forfait_unity'])){
      $forfait_unity = $_REQUEST['forfait_unity']; //1 = en euros 1000 : au millle
    }
    
    if(isset($_REQUEST['forfait_full_article'])){
      $forfait_full_article = $_REQUEST['forfait_full_article'];
      $forfait_prefix=explode("-",$forfait_full_article)[0];
      $forfait_article=explode("-",$forfait_full_article)[1];
    }

    if(isset($_REQUEST['forfait_status'])){
      $forfait_status = $_REQUEST['forfait_status'];
    }

    $dem_num = 0;
    $offer_alt='';
    $offer_date_validation='2007-01-01';
    $offer_ref_ordre_client="";
    $offer_period_year=0;

    $offer_solde=$forfait_unity;
    $offer_ref_article=$acompte_desc;
    $offer_client_sgv=0;
    $offer_select="";
    $offre_rem = '';

    $data = array();

    //write in log file
    //$file = 'log.txt';
    $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$forfait_client_id}','{$forfait_prefix}','{$forfait_article}','{$offre_quantity}','{$forfait_sell_price}','{$offre_date}','{$dem_num}','{$forfait_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
    //file_put_contents($file, $q,FILE_APPEND );
    
    if($result=$mysqli->query($q)){ 
      $q="INSERT INTO articles VALUES(null ,'{$forfait_prefix}','{$forfait_article}','{$forfait_desc}','','','','','','','','','','','','','','','','','0','1','0')";
      //file_put_contents($file, $q.'/n/r',FILE_APPEND );
      if($result=$mysqli->query($q)){
        echo "1";          
      } else echo "-1";   
    } else echo "-1";
?>
