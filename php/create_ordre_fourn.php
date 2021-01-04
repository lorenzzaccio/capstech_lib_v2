<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');
    //write in log file
    $file = 'log.txt';
    if(isset($_REQUEST['ordre_fourn_num'])){
      $ordre_fourn_num = $_REQUEST['ordre_fourn_num'];
    }

    if(isset($_REQUEST['ordre_full_article'])){
      $ordre_full_article = $_REQUEST['ordre_full_article'];
      $demPrix_prefix=explode("-",$ordre_full_article)[0];
      $demPrix_article=explode("-",$ordre_full_article)[1];
    }

    if(isset($_REQUEST['ordre_fourn_quantity'])){
      $ordre_fourn_quantity = $_REQUEST['ordre_fourn_quantity'];
    }

    if(isset($_REQUEST['ordre_fourn_date'])){
      $ordre_fourn_date = $_REQUEST['ordre_fourn_date'];
    }
    
    if(isset($_REQUEST['ordre_fourn_status'])){
      $ordre_fourn_status = $_REQUEST['ordre_fourn_status'];
    }

    if(isset($_REQUEST['ordre_fourn_rem'])){
      $ordre_fourn_rem = addslashes(utf8_decode($_REQUEST['ordre_fourn_rem']));
    }

    if(isset($_REQUEST['ordre_fourn_id'])){
      $ordre_fourn_id = $_REQUEST['ordre_fourn_id'];
    }

    if(isset($_REQUEST['ordre_fourn_ref_fourn'])){
      $ordre_fourn_ref_fourn = addslashes(utf8_decode($_REQUEST['ordre_fourn_ref_fourn']));
    }

    if(isset($_REQUEST['ordre_fourn_buy_price'])){
      $ordre_fourn_buy_price = $_REQUEST['ordre_fourn_buy_price'];
    }else
      $ordre_fourn_buy_price = 0;
    //echo ("prix achat :".$ordre_fourn_buy_price);

    if(isset($_REQUEST['ordre_fourn_num_offre'])){
      $ordre_fourn_num_offre = addslashes(utf8_decode($_REQUEST['ordre_fourn_num_offre']));
    }

    if(isset($_REQUEST['ordre_fourn_client'])){
      $ordre_fourn_client = addslashes(utf8_decode($_REQUEST['ordre_fourn_client']));
    }

    if(isset($_REQUEST['ordre_fourn_cond_1'])){
      $ordre_fourn_cond_1 = addslashes(utf8_decode($_REQUEST['ordre_fourn_cond_1']));
    }

    if(isset($_REQUEST['ordre_fourn_cond_2'])){
      $ordre_fourn_cond_2 = addslashes(utf8_decode($_REQUEST['ordre_fourn_cond_2']));
    }

    if(isset($_REQUEST['ordre_fourn_cond_3'])){
      $ordre_fourn_cond_3 = addslashes(utf8_decode($_REQUEST['ordre_fourn_cond_3']));
    }

    if(isset($_REQUEST['ordre_fourn_cond_4'])){
      $ordre_fourn_cond_4 = addslashes(utf8_decode($_REQUEST['ordre_fourn_cond_4']));
    }

    if(isset($_REQUEST['ordre_fourn_cond_5'])){
      $ordre_fourn_cond_5 = addslashes(utf8_decode($_REQUEST['ordre_fourn_cond_5']));
    }
    
  $ordre_fourn_cond_6 ="";
  $ordre_fourn_cond_7 ="";
  $ordre_fourn_cond_8 ="";
        $dem_num = 0;
        $offer_status=0;
        $offer_alt=$offre_ref_fourn;
        $offer_date_validation='2007-01-01';
        $offer_ref_ordre_client="";
        $offer_period_year=1;

        $offer_solde=0;
        $offer_ref_article="";
        $offer_client_sgv=0;
        $offer_select="";

        $data = array();

        $q="INSERT INTO demandePrix VALUES(null 
        ,'{$ordre_fourn_num}'
        ,'{$demPrix_prefix}'
        ,'{$demPrix_article}'
        ,'{$ordre_fourn_cond_1}'
        ,'{$ordre_fourn_cond_2}'
        ,'{$ordre_fourn_cond_3}'
        ,'{$ordre_fourn_cond_4}'
        ,'{$ordre_fourn_cond_5}'
        ,'{$ordre_fourn_cond_6}'
        ,'{$ordre_fourn_cond_7}'
        ,'{$ordre_fourn_cond_8}'
        ,'{$ordre_fourn_quantity}','{$ordre_fourn_buy_price}','{$ordre_fourn_date}','{$ordre_fourn_status}','{$ordre_fourn_rem}'
        ,'0','0','0','0','0','0','0'
        ,'{$ordre_fourn_id}','{$ordre_fourn_ref_fourn}','{$ordre_fourn_buy_price}','{$ordre_fourn_num_offre}','{$ordre_fourn_client}')";
        //echo utf8_encode($q);
        file_put_contents($file, $q,FILE_APPEND );
        if($result=$mysqli->query($q)){
            echo "1";
        } else echo "-1";
