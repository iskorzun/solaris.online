<?php

 $email = htmlspecialchars(stripslashes($_POST['email']));
 
 $name = htmlspecialchars(stripslashes($_POST['name']));


 /*Сохраняем пользователя в БД на reg.ru (домен ivanprotsko.com)*/

    $kurs_id = 2;

    $ch2 = curl_init();
    curl_setopt($ch2,CURLOPT_URL, "http://ivanprotsko.com/save_user.php");
    curl_setopt($ch2,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch2,CURLOPT_COOKIESESSION,false);
    curl_setopt($ch2,CURLOPT_TIMEOUT,60);
    curl_setopt($ch2,CURLOPT_POST,1);
    $postdata = array(
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'kurs_id' => $kurs_id,
    );
    curl_setopt($ch2,CURLOPT_POSTFIELDS,$postdata);
    curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, 0);
    $result = curl_exec($ch2);
    curl_close($ch2);


    /*Сохраняем email в SmartResponder*/

    $ch2 = curl_init();
    curl_setopt($ch2,CURLOPT_URL, "http://api.smartresponder.ru/subscribers.html");
    curl_setopt($ch2,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch2,CURLOPT_COOKIESESSION,false);
    curl_setopt($ch2,CURLOPT_TIMEOUT,60);
    curl_setopt($ch2,CURLOPT_POST,1);
    $postdata = array(
        'api_key' => 'e3ndFwpuqwuul91nL3CT4roG1ePZHuLm',
        'action' => 'create',
        'first_name' => $name,
        //'phone' => $phone,
        'email' => $email,
        //'kurs_id' => $kurs_id,
        'extra_s1' => 'solaris.online',
    );
    curl_setopt($ch2,CURLOPT_POSTFIELDS,$postdata);
    curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, 0);
    echo $result = curl_exec($ch2);
    curl_close($ch2);


    //require_once "target.html";

?>
