<?php

    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

$data = array();
$q="SELECT art_id,art_prefix,art_num,art_conicite FROM articles WHERE art_prefix like '_K__' group by art_num,art_prefix";
//echo $q;
if($result=$mysqli->query($q)){
    $index=0;

    while ($row = $result->fetch_assoc()) {
        $data[]=$row["art_id"].";".$row["art_prefix"].";".$row["art_num"].";".$row["art_conicite"];
        $index++;
    }
    if($index==0){
        echo "-1";
    }else{
        echo json_encode(array('groups'=>$data));
    }
}
?>
