<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    include("dbUtil.php");
    include("../../scanStockServer/php/codes.php");
    include("../../scanStockServer/php/status.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    if(isset($_REQUEST['offre_num'])){
      $offre_num = $_REQUEST['offre_num'];
    }
    if(isset($_REQUEST['revision_offre_num'])){
      $revision_offre_num = $_REQUEST['revision_offre_num'];
    }
    if(isset($_REQUEST['revision_client_id'])){
      $revision_client_id = $_REQUEST['revision_client_id'];
    }
    if(isset($_REQUEST['revision_date'])){
      $offre_date = $_REQUEST['revision_date'];
    }
    if(isset($_REQUEST['revision_sell_price'])){
      $revision_sell_price = $_REQUEST['revision_sell_price'];
    }
    if(isset($_REQUEST['revision_desc'])){
      $revision_desc = addslashes(utf8_decode($_REQUEST['revision_desc']));
    }

    $data = array();

    $q="select * from offrePrix WHERE offreprix_num='".$offre_num."'";
    if($list_result=$mysqli->query($q)){ 
      while ($row = $list_result->fetch_assoc()) {
          $id = dbUtil::db_copy_row($mysqli,"offrePrix","offreprix_id","offreprix_num='".$offre_num."' AND offrePrix_prefix='".$row["offrePrix_prefix"]."'");

          dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_num","'".$revision_offre_num."'","offrePrix_id=".$id);
          dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_date","'".$offre_date."'","offrePrix_id=".$id);
          return_code($OPERATION_SUCCESS);  
      }
    }else return_code($ERROR_DB_SQL); 
?>
