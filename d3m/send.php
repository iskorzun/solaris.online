<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Обучающие курсы, UI/UX-дизайнер</title>
<?
 $name = htmlspecialchars(stripslashes($_POST['name']));
 $phone = htmlspecialchars(stripslashes($_POST['phone']));
 $email = htmlspecialchars(stripslashes($_POST['email']));

 $form = htmlspecialchars(stripslashes($_POST['f_type']));

$message_arr =array (
	'1'=>'Тест-драйв',
	'2'=>'Ответить на вопросы',
	'3'=>'Бронирование места',
	'4'=>'Подписка на новости',
);

$message = $message_arr[$form];

$phone_num = preg_replace('/[^\d]/','',$phone);

$kurs_id = 3;

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


?>
	<!--<meta http-equiv='refresh' content='1;url=http://design.ivanprotsko.com'>-->
	<!--<meta http-equiv='refresh' content='3;url=http://design.ivanprotsko.com/index2.html'>-->
</head>
<body>
	<div align=center>
    	<h1>Обучающие курсы, UI/UX-дизайнер</h1>
        <h2>Ваша заявка принята!<br /></h2>
        <!--<p>Через 3 сек. Вы будете перенаправлены обратно...</p>-->
    </div>
</body>

<?
/*
include('yandex.php');
include('analyticstracking.php');
require_once 'db.php';*/
require_once 'amocrm.php';
	//Если новостная рассылка
	if($form == "4"){
			require_once('Mailchimp.php');

			$api_key = "d361c34017d6a76d6d2f5b001d2e3212-us11"; //replace with your API key
		    $list_id = "2f67f73156"; //replace with the list id you're adding the email to

		    // set up our mailchimp object, and list object
		    $Mailchimp = new Mailchimp( $api_key );
		    $Mailchimp_Lists = new Mailchimp_Lists( $Mailchimp );
		    try {
		        $subscriber = $Mailchimp_Lists->subscribe( $list_id, array( 'email' => $email ) ); //pass the list id and email to mailchim
		    } catch (Exception $e) {

		    }

			die;
		}



	if(auth_amocrm()) {
		$prod_name = "Д3m design.ivanprotsko.by";
		$manager = '134230';

		if ($phone == ''){
			$leads_id_arr = array();
			$contacts_id_arr = contacts_add_no_phone($name, $email);
			notes_add_amocrm($contacts_id_arr[0], $message, 1);




		}else{
			$contacts_list = contacts_list_amocrm(substr($phone_num, strlen($phone_num)-7, 7));

			if($contacts_list === false) { // нету, создаём
				$leads_id_arr = leads_add_amocrm($prod_name, $name, $manager);

				if ($email ==''){
					$contacts_id_arr = contacts_add_no_email($name, $phone, $leads_id_arr);
				}else
				{
					$contacts_id_arr = contacts_add_amocrm($name, $phone, $email, $leads_id_arr);
				}

				//$contacts_id_arr = contacts_add_amocrm($name, $phone, $email, $leads_id_arr);

				$tasks_id_arr = tasks_add_amocrm($leads_id_arr, "Позвонить по новой заявке.");

				notes_add_amocrm($leads_id_arr[0], $message, 2);
			}

		}
	}
	else {
		$amocrm = "Не смогли авторизоваться";
	}

	if($email){
		require_once('Mailchimp.php');

		$api_key = "d361c34017d6a76d6d2f5b001d2e3212-us11"; //replace with your API key
	    $list_id = "11098e2755"; //replace with the list id you're adding the email to

	    // set up our mailchimp object, and list object
	    $Mailchimp = new Mailchimp( $api_key );
	    $Mailchimp_Lists = new Mailchimp_Lists( $Mailchimp );

	    try {
	        $subscriber = $Mailchimp_Lists->subscribe( $list_id, array( 'email' => $email ) ); //pass the list id and email to mailchim
	    } catch (Exception $e) {

	        //You'll need to write your own code to handle exceptions
	    }
	}






?>
</body>
</html>