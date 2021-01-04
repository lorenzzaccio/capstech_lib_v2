<?php

    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

    if(isset($_REQUEST['full_article'])){
      $full_article = $_REQUEST['full_article'];
    }
    $full_article_arr = explode('-',$full_article);
    //echo $full_article_arr[0];
    $prefix = $full_article_arr[0];
    $article = $full_article_arr[1];

$data = array();
$q="SELECT sum(stockscan_quantite) as sum FROM stockScan WHERE stockscan_prefix = '{$prefix}' and stockscan_article='{$article}' and stockscan_prefix not like 'AC00' and stockscan_prefix not like '_K__' and (stockscan_typeStock between 0 and 2) group by stockscan_prefix,stockscan_article";
//echo $q;
if($result=$mysqli->query($q)){
    $index=0;

    if ($row = $result->fetch_assoc()) {
        $data[]=$row["sum"];
        echo json_encode(array('groups'=>$data));
    }
    else
        echo "-1";
}else
    echo "-1";

?>
