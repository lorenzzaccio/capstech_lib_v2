<?php
    include("../../php_conf/config1.php");
    include("../../scanStockServer/php/Utils.php");
    include("../../scanStockServer/php/dbUtil.php");
    include("../../scanStockServer/php/codes.php");
    include("../../scanStockServer/php/status.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');
    
    var_dump($_REQUEST);
    
    $OFFRE_ATTENTE_VALIDATION = 1;

    if(isset($_REQUEST['offre_num'])){
      $offre_num = $_REQUEST['offre_num'];
    }

    if(isset($_REQUEST['renew_offre_num'])){
      $renew_offre_num = $_REQUEST['renew_offre_num'];
    }

    if(isset($_REQUEST['renew_date'])){
      $offre_date = $_REQUEST['renew_date'];
    }
    
    if(isset($_REQUEST['renew_quantity'])){
      $renew_quantity = $_REQUEST['renew_quantity'];
    }

    if(isset($_REQUEST['renew_sell_price'])){
      $renew_sell_price = $_REQUEST['renew_sell_price'];
    }
    if(isset($_REQUEST['renew_desc'])){
      $renew_desc = addslashes(utf8_decode($_REQUEST['renew_desc']));
    }

    $data = array();

    $q="select * from offrePrix WHERE offreprix_num='".$offre_num."'";
    //echo $q;
    if($list_result=$mysqli->query($q)){ 
      while ($row = $list_result->fetch_assoc()) {

        $id = dbUtil::db_copy_row($mysqli,"offrePrix","offreprix_id","offreprix_num='".$offre_num."' AND offrePrix_prefix='".$row["offrePrix_prefix"]."'");

        dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_num","'".$renew_offre_num."'","offrePrix_id=".$id);
        if($result=$mysqli->query($q)){
          dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_quantite","'".$renew_quantity."'","offrePrix_id=".$id." and offrePrix_article!='001'");
          if($result=$mysqli->query($q)){
            dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_prixHt","'".$renew_sell_price."'","offrePrix_id=".$id." and offrePrix_article!='001'");
            if($result=$mysqli->query($q)){
              dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_date","'".$offre_date."'","offrePrix_id=".$id." and offrePrix_article!='001'");
              if($result=$mysqli->query($q)){
                dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_dateValidation","'".$offre_date."'","offrePrix_id=".$id." and offrePrix_article!='001'");
                if($result=$mysqli->query($q)){
                  dbUtil::db_update_line($mysqli,"offrePrix","offrePrix_status","'".$OFFRE_ATTENTE_VALIDATION."'","offrePrix_id=".$id." and offrePrix_article!='001'");
                if($result=$mysqli->query($q)){
                  return_code($OPERATION_SUCCESS);  
          } else return_code($ERROR_DB_SQL);    
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
          } else return_code($ERROR_DB_SQL);
      }
    }else return_code($ERROR_DB_SQL);
?>
