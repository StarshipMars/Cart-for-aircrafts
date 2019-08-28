<?php
$name 	= $_POST["name"];
$email 	= $_POST["email"];
$tel 	= $_POST["tel"];
$goods 	= $_POST["goods"];

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$to = "shop@gmail.com";

$user_message = "Ваш заказ принят!";
$shop_message = "<br>$name, $email, $goods";

//mail($email, "Заказ с сайта", $user_message, $headers);	
//mail($to, "Новый заказ", $shop_message, $headers);

$messages = array("message" => "Ваш заказ принят!");
print json_encode($messages);
?>
