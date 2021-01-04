<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    if(isset($_REQUEST['cliche_offre_num'])){
      $offre_num = $_REQUEST['cliche_offre_num'];
    }
    if(isset($_REQUEST['cliche_client_id'])){
      $cliche_client_id = $_REQUEST['cliche_client_id'];
    }
    if(isset($_REQUEST['cliche_date'])){
      $offre_date = $_REQUEST['cliche_date'];
    }
    $offre_quantity = 1;
    if(isset($_REQUEST['cliche_sell_price'])){
      $cliche_sell_price = $_REQUEST['cliche_sell_price'];
    }
    if(isset($_REQUEST['cliche_desc'])){
      $cliche_desc = addslashes(utf8_decode($_REQUEST['cliche_desc']));
    }
    if(isset($_REQUEST['cliche_unity'])){
      $cliche_unity = $_REQUEST['cliche_unity']; //1 = en euros 1000 : au millle
    }
    
    if(isset($_REQUEST['cliche_full_article'])){
      $cliche_full_article = $_REQUEST['cliche_full_article'];
      $cliche_prefix=explode("-",$cliche_full_article)[0];
      $cliche_article=explode("-",$cliche_full_article)[1];
    }

    if(isset($_REQUEST['cliche_status'])){
      $cliche_status = $_REQUEST['cliche_status'];
    }

    $dem_num = 0;
    $offer_alt='';
    $offer_date_validation='2007-01-01';
    $offer_ref_ordre_client="";
    $offer_period_year=0;

    $offer_solde=$cliche_unity;
    $offer_ref_article=$acompte_desc;
    $offer_client_sgv=0;
    $offer_select="";
    $offre_rem = '';

    $data = array();

    //write in log file
    //$file = 'log.txt';
    $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$cliche_client_id}','{$cliche_prefix}','{$cliche_article}','{$offre_quantity}','{$cliche_sell_price}','{$offre_date}','{$dem_num}','{$cliche_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
    //file_put_contents($file, $q,FILE_APPEND );
    
    if($result=$mysqli->query($q)){ 
      $q="INSERT INTO articles VALUES(null ,'{$cliche_prefix}','{$cliche_article}','{$cliche_desc}','','','','','','','','','','','','','','','','','0','1','0')";
      //file_put_contents($file, $q.'/n/r',FILE_APPEND );
      if($result=$mysqli->query($q)){
        echo "1";          
      } else echo "-1";   
    } else echo "-1";
?>
