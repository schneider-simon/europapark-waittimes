<?php

date_default_timezone_set('Europe/Berlin');
define('EP_WT_URL', 'http://apps.europapark.de/webservices/waittimes/index.php');

$time = time();
$date = date('YmdHi', $time);
$callUrl = EP_WT_URL . '?code=' . md5('Europa-Park' . $date . 'SecondTry') . '&v=4&base=' . $time;

echo $callUrl;