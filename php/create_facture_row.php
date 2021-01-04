<?php
    include("../../php_conf/config1.php");
    include("../../scanStockServer/php/Utils.php");
    include("../../scanStockServer/php/dbUtil.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    $data = array();
    

    //write in log file
    $file = 'log.txt';


  if(isset($_REQUEST['fact_date'])){
    $fact_date = addslashes(utf8_decode($_REQUEST['fact_date']));
  } else $fact_date = date("Y-m-d");

  if(isset($_REQUEST['fact_com_id'])){
    $fact_com_id = addslashes(utf8_decode($_REQUEST['fact_com_id']));
  }else {echo -1; return;}


  if(isset($_REQUEST['fact_num'])){
    $fact_num = addslashes(utf8_decode($_REQUEST['fact_num']));
  }else { echo -1; return;}

  if(isset($_REQUEST['fact_delai_paiement'])){
    $fact_delai_paiement = addslashes(utf8_decode($_REQUEST['fact_delai_paiement']));
  } else $fact_delai_paiement = '45fdm';
  
  if(isset($_REQUEST['fact_date_modif'])){
    $fact_date_modif = addslashes(utf8_decode($_REQUEST['fact_date_modif']));
  } else $fact_date_modif = date("Y-m-d");
  
  if(isset($_REQUEST['fact_total_ht'])){
    $fact_total_ht = addslashes(utf8_decode($_REQUEST['fact_total_ht']));
  } else $fact_total_ht = "0.0";
  
  if(isset($_REQUEST['fact_cout_ht'])){
    $fact_cout_ht = addslashes(utf8_decode($_REQUEST['fact_cout_ht']));
  } else $fact_cout_ht ="0.0";
    
  if(isset($_REQUEST['fact_type_paiement'])){
    $fact_type_paiement = addslashes(utf8_decode($_REQUEST['fact_type_paiement']));
  } else $fact_type_paiement=dbUtil::get_compte_paiement($mysqli,$fact_com_id);
  
  if(isset($_REQUEST['fact_num_paiement'])){
    $fact_num_paiement = addslashes(utf8_decode($_REQUEST['fact_num_paiement']));
  } else $fact_num_paiement = '';
  
  if(isset($_REQUEST['fact_date_paiement'])){
    $fact_date_paiement = addslashes(utf8_decode($_REQUEST['fact_date_paiement']));
  } else {
      $fact_date_paiement = Utils::calcul_echeance($fact_date,$fact_delai_paiement);
  }
  
  if(isset($_REQUEST['fact_ref_paiement'])){
    $fact_ref_paiement = addslashes(utf8_decode($_REQUEST['fact_ref_paiement']));
  } else $fact_ref_paiement = "";
  

  $q="INSERT INTO facture VALUES(null,'{$fact_date}','{$fact_com_id}','{$fact_num}','{$fact_delai_paiement}','{$fact_date_modif}','{$fact_total_ht}','{$fact_cout_ht}','{$fact_type_paiement}','{$fact_num_paiement}','{$fact_date_paiement}','{$fact_ref_paiement}')";
echo $q;
  //file_put_contents($file, $q,FILE_APPEND );
  
  if($result=$mysqli->query($q)){
    echo "1";
  } else echo "-1";
?>
