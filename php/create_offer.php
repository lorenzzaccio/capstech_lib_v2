<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    include("../../scanStockServer/php/codes.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    //echo $q;

    if(isset($_REQUEST['offre_num'])){
      $offre_num = $_REQUEST['offre_num'];
    }
    if(isset($_REQUEST['offre_date'])){
      $offre_date = $_REQUEST['offre_date'];
    }
    if(isset($_REQUEST['offre_ref_fourn'])){
      $offre_ref_fourn = $_REQUEST['offre_ref_fourn'];
    }
    if(isset($_REQUEST['offre_quantity'])){
      $offre_quantity = $_REQUEST['offre_quantity'];
    }
    if(isset($_REQUEST['offre_sell_price'])){
      $offre_sell_price = $_REQUEST['offre_sell_price'];
    }
    if(isset($_REQUEST['offre_titre'])){
      $offre_titre = addslashes(utf8_decode($_REQUEST['offre_titre']));
    }
    if(isset($_REQUEST['offre_cond1'])){
      $offre_cond1 = addslashes(utf8_decode($_REQUEST['offre_cond1']));
    }
    if(isset($_REQUEST['offre_cond2'])){
      $offre_cond2 = addslashes(utf8_decode($_REQUEST['offre_cond2']));
    }
    if(isset($_REQUEST['offre_cond3'])){
      $offre_cond3 = addslashes(utf8_decode($_REQUEST['offre_cond3']));
    }
    if(isset($_REQUEST['offre_cond4'])){
      $offre_cond4 = addslashes(utf8_decode($_REQUEST['offre_cond4']));
    }
    if(isset($_REQUEST['offre_cond5'])){
      $offre_cond5 = addslashes(utf8_decode($_REQUEST['offre_cond5']));
    }
    if(isset($_REQUEST['offre_rem'])){
      $offre_rem = addslashes(utf8_decode($_REQUEST['offre_rem']));
    }
    if(isset($_REQUEST['offre_full_article'])){
      $offre_full_article = $_REQUEST['offre_full_article'];
      $offre_prefix=explode("-",$offre_full_article)[0];
      $offre_article=explode("-",$offre_full_article)[1];
    }

    if(isset($_REQUEST['offre_client'])){
      $offre_client = $_REQUEST['offre_client'];
      $offre_client_id=(explode("-",$offre_client)[0]).trim();
    }
    

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

        //write in log file
        $file = 'log.txt';
        // Ouvre un fichier pour lire un contenu existant
        //$current = file_get_contents($file);
        // Ajoute une personne
        //$current .= "Jean Dupond\n";
        // Écrit le résultat dans le fichier
        

        
        $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
        file_put_contents($file, $q,FILE_APPEND );
        if($result=$mysqli->query($q)){
            $offre_quantity=0; $offre_sell_price=0;$offre_prefix="T00"; $offre_article="001";$offer_alt=$offre_titre;
            $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
            file_put_contents($file, $q.'/n/r',FILE_APPEND );
            if($result=$mysqli->query($q)){
                $offre_quantity=0; $offre_sell_price=0;$offre_prefix="S01"; $offre_article="001";$offer_alt=$offre_cond1;
                $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
                if($result=$mysqli->query($q)){
                    $offre_quantity=0; $offre_sell_price=0;$offre_prefix="S02"; $offre_article="001";$offer_alt=$offre_cond2;
                    $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
                    if($result=$mysqli->query($q)){
                        $offre_quantity=0; $offre_sell_price=0;$offre_prefix="S03"; $offre_article="001";$offer_alt=$offre_cond3;
                        $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
                        if($result=$mysqli->query($q)){
                            $offre_quantity=0; $offre_sell_price=0;$offre_prefix="S04"; $offre_article="001";$offer_alt=$offre_cond4;
                            $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
                          if($result=$mysqli->query($q)){
                            $offre_quantity = 0; $offre_sell_price =0;$offre_prefix = "S05"; $offre_article="001";$offer_alt=$offre_cond5;
                            $q="INSERT INTO offrePrix VALUES(null ,'{$offre_num}','{$offre_client_id}','{$offre_prefix}','{$offre_article}','{$offre_quantity}','{$offre_sell_price}','{$offre_date}','{$dem_num}','{$offer_status}','{$offer_alt}','{$offer_date_validation}','{$offer_ref_ordre_client}','{$offer_period_year}','{$offre_rem}','{$offer_solde}','{$offer_ref_article}','{$offer_client_sgv}','{$offer_select}')";
                            if($result=$mysqli->query($q)){
                              return_code($OPERATION_SUCCESS);//echo "1";
                            } else echo "-1";
                          } else echo "-1";
                        } else echo "-1";
                  } else echo "-1";
              } else echo "-1";
          } else echo "-1";   
        } else echo "-1";
?>
