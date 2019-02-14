<?php

$array = array("name" => "", "email" => "", "message" => "", "nameError" => "", "emailError" => "", "messageError" => "", "isSuccess" => false);
$emailTo ="francois.degrincourt@gmail.com";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $array["name"] = verifyInput($_POST["name"]);
  $array["email"] = verifyInput($_POST["email"]);
  $array["message"] = verifyInput($_POST["message"]);
  $array["isSuccess"] = true;
  $emailText = "";

  // Name check
  if(empty($array["name"]))
  {
    $array["nameError"] = "Quel est votre nom ?";
    $array["isSuccess"] = false;
  }
  else {
    $emailText .= "Name : {$array["name"]}\n";
  }

  // Email check
  if(!isEmail($array["email"]))
  {
    $array["emailError"] = "Email invalide";
    $array["isSuccess"] = false;
  }
  else {
    $emailText .= "Email : {$array["email"]}\n";
  }
  
  // Message check
  if(empty($array["message"]))
  {
    $array["messageError"] = "Quel est votre message ?";
    $array["isSuccess"] = false;
  }
  else {
    $emailText .= "Message : {$array["message"]}\n";
  }
  if($array["isSuccess"])
  {
    //Envoie de l'email avec toutes les données
    $headers = "From: {$array["name"]} <{$array["email"]}>\r\nReply-To: {$array["email"]}";
    mail($emailTo, "Un message de votre site", $emailText, $headers);
  }

  echo json_encode($array);

}

function isEmail($var)
{
  return filter_var($var, FILTER_VALIDATE_EMAIL);
}

function verifyInput ($var)
{
  $var = trim($var);
  $var = stripslashes($var);
  $var = htmlspecialchars($var);
  return $var;
}

 ?>
