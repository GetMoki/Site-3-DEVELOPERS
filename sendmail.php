<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLenguage('ru','phpmailer/lenguage/');
$mail->IsHTML(true);

//from
$mail->setForm('viktor.riabyy@gmail.com','Test Task Designers');
//to
$mail->addAddress('viktor.riabyy+1@gmail.com');
//letter title
$mail->Subject = "Форма отправлена:";

//letter body
$body = '<h1>In your test site somebody take form</h1>';

if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['number']))){
  $body.='<p><strong>Telegram/Viber (+380): </strong> '.$_POST['number'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

$mail->Body = $body;

//enter
if (!$mail->sned()){
  $message = 'Ошибка';
} else {
  $message = 'Даные отправлены!';
}

$response = ['message'=> $message];

header('Content-type: application/json');
echo json_encode($response);
?>
