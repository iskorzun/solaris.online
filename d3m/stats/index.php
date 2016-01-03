<?php
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");
	header('Content-type: text/html; charset=utf-8');
	
    $kurs_id = 3;
    $ch2 = curl_init();
    curl_setopt($ch2,CURLOPT_URL, "http://ivanprotsko.com/users.php");
    //curl_setopt($ch2,CURLOPT_URL, "http://localhost/solaris/users.php");
    curl_setopt($ch2,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch2,CURLOPT_COOKIESESSION,false);
    curl_setopt($ch2,CURLOPT_TIMEOUT,60);
    curl_setopt($ch2,CURLOPT_POST,1);
    $postdata = array(

        'kurs_id' => $kurs_id,
    );
    curl_setopt($ch2,CURLOPT_POSTFIELDS,$postdata);
    curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, 0);
    $data = curl_exec($ch2);
    curl_close($ch2);


	/*if (isset($_REQUEST['del_id'])){
		$id = $_REQUEST['del_id'];
		mysql_query("DELETE FROM `q_request` WHERE id='$id'");
	}*/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Пользователи</title>
</head>
<body>

<div style="width:1200px; margin:auto;">
    <h1 align="center">Пользователи</h1>

	<div style="width:850px; margin:auto; text-align:center;">
        <a href="/" target="_blank">На сайт</a>
    </div>

	<!--<div style="width:250px; margin:auto; text-align:center; float:left; margin:10px;">
    	<form action="admin.php" method="get">
       	  <input name="search" type="text" placeholder="Поиск..." value="<?/* echo "$search";*/?>" />
       	  <input type="submit" value="Поиск" />

    	</form>
    </div>-->
    <div style="clear:both;"></div>

    <table cellpadding="10" cellspacing="0" align="center" border="1">
      <tr class="head">
        <th scope="col" width="20px">№</th>
        <th scope="col" width="150px">Имя</th>
        <th scope="col" width="150px">Телефон</th>
        <th scope="col" width="150px">Email</th>
        <th scope="col" width="80px">Дата</th>
        <th scope="col" width="80px">Источник</th>

      </tr>
<?php
    $num = 1;
    $users = json_decode($data,true);
//var_dump($users); die;
    foreach ($users as $user){
        echo "
      <tr>
        <td align='center'>".$num."</td>
        <td><strong>".$user['name']."</strong></td>
        <td>".$user['phone']."</td>
        <td>".$user['email']."</td>
	    <td>".$user['date']."</td>
	    <td>".$user['kurs']."</td>

      </tr>";
    $num++;
    }
?>


  </table>
</div>

</body>
</html>