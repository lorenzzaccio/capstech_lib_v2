<?php

    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    /*
    if(isset($_REQUEST['full_article'])){
      $full_article = $_REQUEST['full_article'];
    }
    $full_article_arr = explode('-',$full_article);
    //echo $full_article_arr[0];
    $prefix = $full_article_arr[0];
    $article = $full_article_arr[1];
    */
    if(isset($_REQUEST['offre_num'])){
      $offre_num = $_REQUEST['offre_num'];
    }else{
        echo"-1";
        return;
    }

$data = array();
/*
$q="SELECT sum(stockscan_quantite) as sum FROM stockScan WHERE stockscan_prefix = '{$prefix}' and stockscan_article='{$article}' and (stockscan_typeStock between 0 and 2) group by stockscan_prefix,stockscan_article";

*/
$q="SELECT offrecom_offrenum,offrePrix_date,com_prefix,com_article_id,offrePrix_quantite - sum(com_quantite) as solde,sum(com_quantite) as 'quant_deja_livree',offrePrix_quantite as 'quantite_offre' ,com_ref_article_client from offreCom 
JOIN commandes on offrecom_comId=com_id
JOIN offrePrix on offrePrix_num=offrecom_offrenum COLLATE latin1_general_cs  and offrePrix_prefix not like 'S__' and offrePrix_prefix not like 'T__' and offrePrix_prefix not like '_K__' and offrePrix_prefix not like 'AC__'
WHERE offrecom_offrenum='{$offre_num}' and com_status_id>=5 and offrePrix_prefix not like 'S__' and offrePrix_prefix not like 'T__' and offrePrix_prefix not like '_K__' and offrePrix_prefix not like 'AC__' and offrePrix_prefix not like 'FK00' /*group by offrecom_offrenum order by offrePrix_date desc*/";


//echo $q;
if($result=$mysqli->query($q)){
    $index=0;

    if ($row = $result->fetch_assoc()) {
        $data[]=$row["solde"].';'.$row["quant_deja_livree"].';'.$row["quantite_offre"];
        echo json_encode(array('groups'=>$data));
    }
    else
        echo "-1";
}else
    echo "-1";

?>
