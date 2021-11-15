<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: *");
?>

<?php if (isset($_POST["email"], $_POST["name"], $_POST["phone"])) {
  $to = "denzelhawking@gmail.com";
  $subject = "Письмо с сайта";
  $charset = "utf-8";
  $headers = "Content-type: text/html; charset=$charset\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Date: " . date('D, d M Y h:i:s O') . "\r\n";

  $msg = "Имя: " . $_POST["name"] . ";<br>";
  if ($_POST["surname"]) $msg .= "Фамилия: " . $_POST["surname"] . ";<br>";
  $msg .= "Почта: " . $_POST["email"] . ";<br>";
  $msg .= "Номер телефона: " . $_POST["phone"] . ";<br>";
  if ($_POST["package"]) $msg .= "Тур: " . $_POST["package"] . ";<br>";
  if ($_POST["message"]) $msg .= "Сообщение: " . $_POST["message"] . ";";
  $err = mail($to, $subject, $msg, $headers);
  var_dump($err);
  echo "Сообщение успешно отправлено";
} ?>