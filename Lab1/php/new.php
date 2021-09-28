<?php
session_start();
$start = microtime(true); // Время начала исполнения скрипта
$validX = array(-3, -2, -1, 0, 1, 2, 3, 4, 5);
$r = floatval(htmlspecialchars($_GET["r"]));
$x = floatval(htmlspecialchars($_GET["x"]));
$y = floatval(htmlspecialchars($_GET["y"]));
date_default_timezone_set("Europe/Moscow");
$timeResponse = date("H:i:s");
$answer = "";
$error_msg = "";

//calculation
$hyp = 1/2 * $x - $r/2;
if (($x <= 0 && $y <= 0 && $x > -$r && $y > -$r) ||
    ($x >= 0 && $y >= 0 && $y <= $hyp) ||
    ($x >= 0 && $y <= 0 &&  pow($x, 2) + pow($y, 2) <= pow($r/2,2))){
    $answer = "Yes";
}else{
    $answer = "No";
}
//checking
if (!is_null($r) && !is_null($x) && !is_null($y)) {
    if ($r == 0 && $x == 0 && $y == 0) {
        $error_msg = "Поля не могут быть пустыми!";
    } else {
        if ($r < 1 || $r >4 ) {
            $error_msg  = "R некорректен!";
        }
        if (!in_array($x, $validX)) {
            $error_msg  = "X некорректен!";
        }
        if ($y < -5 || $y > 5) {
            $error_msg  = "Y некорректен!";
        }
    }
    $timeNow = strval(number_format(microtime(true) - $start, 10, ".", "")*1000) . 'ms';
    $result = array($x, $y, $r, $answer, $timeNow, $timeResponse, $error_msg);
    if (!isset($_SESSION['results'])) {
        $_SESSION['results'] = array();
    }
    array_push($_SESSION['results'], $result);

    if($error_msg != ""){
        print_r('<tr><td>'.$error_msg.'</td></tr>');
    }
    else {
        print_r('<tr>
                        <td>' . $x . '</td>
                        <td>' . $y . '</td>
                        <td>' . $r . '</td>
                        <td>' . $answer . '</td>
                        <td>' . $timeResponse . '</td>
                        <td>' . $timeNow . '</td>
                        </tr>');
    }
}