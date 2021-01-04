<?php
    include("../../php_conf/config1.php");
    include("../../scanStockServer/php/Utils.php");
    include("../../scanStockServer/php/dbUtil.php");
    include("../../scanStockServer/php/codes.php");
    include("../../scanStockServer/php/status.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');
    
    $DEMPRIX_EN_COMMANDE = 3;
    //1-check Args 
    $arg = array(
        'lof_ref_dem_num'=>'',
        'lof_renew_dem_num'=>'',
        'lof_renew_full_article'=>'',
        'lof_renew_date'=>'2007-01-01',
        'lof_renew_quantity'=>'0',
        'lof_renew_desc'=>'',
        'lof_renew_buy_price'=>'0.0'
    );

    foreach ($arg as $key=>$value) {
      echo ("checking ".$key."\n");
      $arg[$key]=Utils::check_req_arg_key($key);
    }

    //2- prepare args for request
    $prefix= explode("-",$arg['lof_renew_full_article'])[0];
    $arg['lof_renew_desc'] = addslashes(utf8_decode($_REQUEST['lof_renew_desc']));

    //3- engage MYSQL
    $data = array();

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
    }else return_code($ERROR_DB_SQL);
?>
