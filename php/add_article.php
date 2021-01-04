<?php
    include("../../php_conf/config1.php");
    include("Utils.php");
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Content-Type: application/json; charset=UTF-8');

if(isset($_REQUEST['b_noWrite']))
  $b_noWrite=intval($_REQUEST['b_noWrite']);
else
  $b_noWrite=1;


if(isset($_REQUEST['product']))
  $product = $_REQUEST['product'];
if(isset($_REQUEST['imp_jupe']))
  $imp_jupe = addslashes(utf8_decode($_REQUEST['imp_jupe']));
if(isset($_REQUEST['imp_tete']))
  $imp_tete = addslashes(utf8_decode($_REQUEST['imp_tete']));
if(isset($_REQUEST['nbr_cliche_tete']))
  $nbr_cliche_tete = intval(addslashes($_REQUEST['nbr_cliche_tete']));

//echo "cliche tete".$nbr_cliche_tete;

/*if(isset($_REQUEST['prefix']))
  $prefix = $_REQUEST['prefix'];
if(isset($_REQUEST['article']))
  $article = $_REQUEST['article'];
*/
if(isset($_REQUEST['matiere']))
  $matiere = $_REQUEST['matiere'];
if(isset($_REQUEST['epaisseur']))
  $epaisseur = $_REQUEST['epaisseur'];
if(isset($_REQUEST['conicite']))
  $conicite = $_REQUEST['conicite'];
if(isset($_REQUEST['forme']))
  $forme = $_REQUEST['forme'];
if(isset($_REQUEST['diam_tete']))
  $diam_tete = $_REQUEST['diam_tete'];
if(isset($_REQUEST['hauteur']))
  $hauteur = $_REQUEST['hauteur'];
$dimensions = $diam_tete."x".$hauteur;
if(isset($_REQUEST['deboitage'])){
  $deboitage = $_REQUEST['deboitage'];
  if (strpos($deboitage, 'cran') !== false){
    $cran="cran";
  }else{
    $cran="jonc";
  }
  
  if (strpos($deboitage, 'cannelure') !== false){
    $cannelure="avec cannelures";
  }else{
    $cannelure="sans cannelure";
  }
}


if(isset($_REQUEST['type_tete']))
  $type_tete = $_REQUEST['type_tete'];
if(isset($_REQUEST['cannelures']))
  $deboitage = $_REQUEST['cannelures'];
if(isset($_REQUEST['ouverture']))
  $ouverture = $_REQUEST['ouverture'];
if(isset($_REQUEST['grilles']))
  $grilles = $_REQUEST['grilles'];
if(isset($_REQUEST['adelphe']))
  $adelphe = $_REQUEST['adelphe'];
if(isset($_REQUEST['couleur_fond']))
  $couleur_fond = $_REQUEST['couleur_fond'];
if(isset($_REQUEST['reperage']))
  $reperage = $_REQUEST['reperage'];
if(isset($_REQUEST['couleur_fond']))
  $couleur_fond = $_REQUEST['couleur_fond'];


$desc=0;
$status="1";
$nombre_alloc=0;

//calcul new article
$q="select LPAD(MAX(SUBSTRING(LPAD(art_num,8,0),5,4))+1,8,0) as max from articles WHERE art_prefix like '{$product}__'";
  if($result=$mysqli->query($q)){
        $row = $result->fetch_assoc();
        $article = $row['max'];
  }

  if($reperage==="spot_vi") $article[1]=1;
  if($reperage==="spot_uv") $article[1]=2;
  if($reperage==="spot_uv_vi") $article[1]=3;
  $article[0] = $nbr_cliche_tete;

  $prefix = "C00";
  $prefix[2] = $epaisseur;
  if($matiere==="CX_SILK") $f=5; else $f=1;
  if($forme!=="BD") $f+=1;
  if($type_tete!=="RP") $f+=2;
  $prefix[1] = $f;

  if($b_noWrite===1) 
    echo json_encode(array('groups'=>[$prefix,$article]));  
  else{
    $table = "articles";
    $q = "INSERT INTO {$table} VALUES(".
      "null".",".
      "'{$prefix}',".
      "'{$article}',".
      "'{$conicite}',".
      "'{$cran}',".
      "'{$cannelure}',".
      "'{$ouverture}',".
      "'{$grilles}',".
      "'{$adelphe}',".
      "'{$reperage}',".
      "'{$dimensions}',".
      "'{$couleur_fond}',".
      "'{$imp_jupe}',".
      "'{$imp_tete}',".
      "'','','','','','',".
      "{$status},".
      "{$nombre_alloc},".
      "{$desc})";//photos_path

        
        if($result=$mysqli->query($q)){ 
            echo json_encode(array('groups'=>[$prefix,$article]));      
        } else echo json_encode(array('groups'=>["-1"]));  
  }

?>
