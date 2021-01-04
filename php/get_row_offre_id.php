<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

if(isset($_REQUEST['offre_id'])){
      $offre_id = $_REQUEST['offre_id']; //1 = en euros 1000 : au millle
}

//echo $status;
$data = array();
$q="SELECT offrePrix_id,
offrePrix_num,
offrePrix_clientId,
offrePrix_prefix,
offrePrix_article,
offrePrix_quantite,
offrePrix_prixHt,
offrePrix_date,
offrePrix_demNum,
offrePrix_status,
offrePrix_dateValidation,
offrePrix_refOrdreClient,
offrePrix_period_year,
offrePrix_comment,
offrePrix_solde,
offrePrix_refArticle,
client_nom
FROM offrePrix 
join client on (client_id=offrePrix_clientId) 
WHERE offrePrix_id='{$offre_id}' ";

//echo $q;
if($result=$mysqli->query($q)){
    $index=0;
    if ($row = $result->fetch_assoc()) {
	   $data[]=$row["offrePrix_id"].';'.$row["offrePrix_num"].';'.$row["offrePrix_clientId"].';'.$row["offrePrix_prefix"].';'.$row["offrePrix_article"].';'.$row["offrePrix_quantite"].';'.$row["offrePrix_prixHt"].';'.$row["offrePrix_date"].';'.$row["offrePrix_demNum"].';'.$row["offrePrix_status"].';'.$row["offrePrix_dateValidation"].';'.utf8_encode($row["offrePrix_refOrdreClient"]).';'.$row["offrePrix_period_year"].';'.utf8_encode($row["offrePrix_comment"]).';'.$row["offrePrix_solde"].';'.utf8_encode($row["offrePrix_refArticle"]).';'.utf8_encode($row["client_nom"]);
        $index++;
    }

    if($index==0){
        echo "-1";
    }else{
        echo json_encode(array('groups'=>$data));
    }
}else
    echo "-1";
?>
