<?php
include("../../php_conf/config1.php");
include("Utils.php");
include("../../scanStockServer/php/codes.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json; charset=UTF-8');


date_default_timezone_set('UTC');

if(isset($_REQUEST["destination"])){
      header("Location: {$_REQUEST["destination"]}");
  }else if(isset($_SERVER["HTTP_REFERER"])){
      header("Location: {$_SERVER["HTTP_REFERER"]}");
  }else{
       /* some fallback, maybe redirect to index.php */
  }

if(isset($_REQUEST['offre_num']))
  $offrePrix_num_global = $_REQUEST['offre_num'];

if(isset($_REQUEST['offre_titre']))
  $offreTitle = $_REQUEST['offre_titre'];
else
  $offreTitle = "offre commerciale";

if(isset($_REQUEST['offre_cond1']))
  $offreCond1 = $_REQUEST['offre_cond1'];
else
  $offreCond1 = " ";

if(isset($_REQUEST['offre_cond2']))
  $offreCond2 = $_REQUEST['offre_cond2'];
else
  $offreCond2 = " ";

if(isset($_REQUEST['offre_cond3']))
  $offreCond3 = $_REQUEST['offre_cond3'];
else
  $offreCond3 = " ";

if(isset($_REQUEST['offre_cond4']))
  $offreCond4 = $_REQUEST['offre_cond4'];
else
  $offreCond4 = " ";

if(isset($_REQUEST['offre_cond5']))
  $offreCond5 = $_REQUEST['offre_cond5'];
else
  $offreCond5 = " ";

if(isset($_REQUEST['offre_rem']))
  $offreComment = $_REQUEST['offre_rem'];
else
  $offreComment = date('l jS \of F Y h:i:s A');

if(isset($_REQUEST['offre_client'])){
  $offre_client =explode('-',$_REQUEST['offre_client'])[0];
}


$table = "offre_global";
$condition = "offrePrix_global_num='".$offrePrix_num_global."'";


  //TITLE
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'T__' limit 1";
  $prefix = 'T00';
  $comment='';
  
  $desc= addslashes(utf8_decode($offreTitle));
  $prix='0';
  print_r("<BR>"."{$offreTitle}"."<BR>");
  print_r("<BR> offre_num_global : {$offrePrix_num_global}<BR>");
  record_line_title($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //comment
  $table="offre_global";
  $field = "offrePrix_comment";
  $lcl_condition = " and offrePrix_prefix like 'T__' limit 1";
  $prefix = 'T00';
  $desc=''; 
  $comment= addslashes(utf8_decode($offreComment));
  $prix='0';
  print_r("<BR>"."comment"."<BR>");
  record_line_comment($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

   //COND1
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'S01' limit 1";
  $prefix = 'S01';//array_keys($arg_array)[$i];
  $comment='';
  $desc= addslashes(utf8_decode($offreCond1));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //COND2
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'S02' limit 1";
  $prefix = 'S02';//array_keys($arg_array)[$i];
  $comment='';
  $desc= addslashes(utf8_decode($offreCond2));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //COND3
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'S03' limit 1";
  $prefix = 'S03';//array_keys($arg_array)[$i];
  $comment='';
  $desc= addslashes(utf8_decode($offreCond3));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //COND4
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'S04' limit 1";
  $prefix = 'S04';//array_keys($arg_array)[$i];
  $comment='';
  $desc= addslashes(utf8_decode($offreCond4));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //COND5
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'S05' limit 1";
  $prefix = 'S05';//array_keys($arg_array)[$i];
  $comment='';
  $desc= addslashes(utf8_decode($offreCond5));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //client
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'D00' and offrePrix_comment='client' limit 1";
  $prefix = 'D00';
  $comment='client';
  $desc= addslashes(utf8_decode($offre_client));
  $prix='0';
  print_r("<BR>"."condition1"."<BR>");
  record_line_client($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);

  //date
  $table="offre_global";
  $field = "offrePrix_desc";
  $lcl_condition = " and offrePrix_prefix like 'D00' and offrePrix_comment='date' limit 1";
  $prefix = 'D00';
  $comment='date';
  $desc= date("d/m/Y");
  $prix='0';
  print_r("<BR>"."date"."<BR>");
  record_line_client($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix);




  function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function record_line_comment($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix){
  $q = "SELECT  {$field} from {$table} WHERE ".$condition.$lcl_condition;
  $result = mysqli_query($mysqli,$q);
  $num_rows  = mysqli_num_rows($result);
  print_r("COMMENT<BR>".$q . '<BR>num='.$num_rows);
  if($num_rows>0)
  {
    $q = "UPDATE {$table} SET {$field}='".$comment."' WHERE ".$condition.$lcl_condition;
    print_r("<BR>".$q);
    mysqli_query($mysqli,$q);
  }else{
    $q = "INSERT INTO  {$table} VALUES(null,'{$offrePrix_num_global}','','{$prefix}',1,1,'','{$comment}',{$prix},0,1)";
    print_r("<BR>insert : ".$q);
    mysqli_query($mysqli,$q);
  }
}

function record_line_title($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix){
  $q = "SELECT  {$field} from {$table} WHERE ".$condition.$lcl_condition;
  $result = mysqli_query($mysqli,$q);
  $num_rows  = mysqli_num_rows($result);
  print_r("<BR>".$q . '<BR>num='.$num_rows);
  if($num_rows>0)
  {
    $q = "UPDATE {$table} SET {$field}='".$desc."' WHERE ".$condition.$lcl_condition;
    print_r("<BR>update : ".$q);
    mysqli_query($mysqli,$q);
  }else{
    $q = "INSERT INTO  {$table} VALUES(null,'{$offrePrix_num_global}','','{$prefix}',1,1,'{$desc}','',{$prix},0,1)";
    print_r("<BR>insert : ".$q);
    mysqli_query($mysqli,$q);
  }
}


function record_line($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix){
  $q = "SELECT  {$field} from {$table} WHERE ".$condition.$lcl_condition;
  $result = mysqli_query($mysqli,$q);
  $num_rows  = mysqli_num_rows($result);
  print_r("<BR>".$q . '<BR>num='.$num_rows);
  if($num_rows>0)
  {
    $q = "UPDATE {$table} SET {$field}='".$desc."' WHERE ".$condition.$lcl_condition;
    print_r("<BR>general : ".$q);
    mysqli_query($mysqli,$q);
  }else{
    $q = "INSERT INTO  {$table} VALUES(null,'{$offrePrix_num_global}','','{$prefix}',1,1,'{$desc}','{$comment}',{$prix},0,1)";
    print_r("<BR>insert : ".$q);
    mysqli_query($mysqli,$q);
  }
}

function record_line_client($mysqli,$table,$field,$condition,$lcl_condition,$offrePrix_num_global,$prefix,$desc,$comment,$prix){
  $q = "SELECT  {$field} from {$table} WHERE ".$condition.$lcl_condition;
  $result = mysqli_query($mysqli,$q);
  $num_rows  = mysqli_num_rows($result);
  print_r("<BR>".$q);
  if($num_rows>0)
  {
    $q = "UPDATE {$table} SET {$field}='".$desc."' WHERE ".$condition.$lcl_condition;
    mysqli_query($mysqli,$q);
  }else{
    $q = "INSERT INTO  {$table} VALUES(null,'{$offrePrix_num_global}','','{$prefix}',1,1,'{$desc}','{$comment}',{$prix},0,1)";
    mysqli_query($mysqli,$q);
  }
  print_r("<BR>".$q);
}


?>
