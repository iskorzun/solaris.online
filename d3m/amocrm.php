<?php

if($_SERVER['REQUEST_URI'] == '/amocrm.php') {
	echo "<h1>Локальный запуск скрипта</h1>";

	auth_amocrm();
	//$tasks_list = tasks_list_amocrm('375297077985');
	//$contacts_list = contacts_list_amocrm('375447099000');
	
	//$contacts_list = contacts_list_amocrm('7077985');
	//print_r($contacts_list);

	//leads_list_amocrm('7077985');
	//leads_list_amocrm('', '31747809');
	
	/*$contact_id = 60605761;
	echo "Пробегаем по всем сделкам контакта $contact_id <br>";
	$leads_arr = contacts_links_amocrm($contact_id);
	foreach($leads_arr['links'] as $link) {
		echo "<h2>$link[lead_id] </h2><br>";
		$leads_list = leads_list_amocrm('', $link['lead_id']);
		$lead_info = $leads_list['leads'][0];
		print_r($lead_info);
		if(strstr($lead_info['name'],"Спарта [22.05.2015]") && $lead_info['price']=="550") {
			echo "Повторная заявка <br>";
			return false;
		}
	}/**/
	//echo "Новая заявка <br>";
	
	
	//contacts_links_amocrm('60587063');
	
	//notes_list_amocrm('', 'contact');
	//notes_list_amocrm('', 'lead');
	//notes_add_amocrm('29823171', "Первый коментарий");
}



// Авторизуемся через API
function auth_amocrm() {
	// https://developers.amocrm.ru/rest_api/auth.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен
	$user=array(
	  'USER_LOGIN'=>'ivanprotsko@ivanprotsko.com', #Ваш логин (электронная почта)
	  'USER_HASH'=>'2729c743391a81a8847c88c1b92c0dae' #Хэш для доступа к API (смотрите в профиле пользователя)
	  //'USER_HASH'=>'79425341054094074ab9e34f08734b1b' #Хэш для доступа к API (смотрите в профиле пользователя)
	);
	 
	#Формируем ссылку для запроса
	$link='https://'.$subdomain.'.amocrm.ru/private/api/auth.php?type=json';
	
	
	//Нам необходимо инициировать запрос к серверу. Воспользуемся библиотекой cURL (поставляется в составе PHP). Вы также можете использовать и кроссплатформенную программу cURL, если вы не программируете на PHP.
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($user));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE); #Получим HTTP-код ответа сервера
	curl_close($curl); #Заверашем сеанс cURL
	
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{ #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  //die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	  //mail('zinovenkov@gmail.com', 'Спарта - amoCRM, что-то не так', "Сайт - $_SERVER[HTTP_HOST], Ошибка: ".$E->getMessage().", Код ошибки: ".$E->getCode());
	  return false; // Авторизация не удалась
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];
	if(isset($Response['auth'])) {
		//echo '<h2>Авторизация прошла успешно</h2>';
		return true;
	}
	else {
		//echo '<h2>Авторизация не удалась</h2>';
		//exit;
		return false;
	}
}


// Получаем список контактов
function contacts_list_amocrm($query='') {
	// https://developers.amocrm.ru/rest_api/contacts_list.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/list';
	if($query == '')
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/contacts/list";
	else
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/contacts/list?query=$query";

	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=barny182@hotmail.com';
	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=20151363890';

	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{ //Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	if(empty($Response)) {
		if($_SERVER['REQUEST_URI'] == '/amocrm.php') {
			echo "<strong>Список контактов пуст!</strong>";
		}
		return false;
	}
	else {
		if($_SERVER['REQUEST_URI'] == '/amocrm.php') {
			echo "<strong>Список контактов</strong><br><pre>"; print_r($Response); echo "</pre><br>";//exit;/**/
		}
		return $Response;
	}
}

// Связи между сделками и контактами
function contacts_links_amocrm($contact_id) {
	// https://developers.amocrm.ru/rest_api/contacts_links.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	$link="https://$subdomain.amocrm.ru/private/api/v2/json/contacts/links?contacts_link=$contact_id";

	//Нам необходимо инициировать запрос к серверу. Воспользуемся библиотекой cURL (поставляется в составе PHP). Подробнее о работе с этой библиотекой Вы можете прочитать в мануале.
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	
	//Вы также можете передать дополнительный HTTP-заголовок IF-MODIFIED-SINCE, в котором указывается дата в формате D, d M Y H:i:s. При передаче этого заголовка, будут возвращены сделки, изменённые позже этой даты.
	//curl_setopt($curl,CURLOPT_HTTPHEADER,array('IF-MODIFIED-SINCE: Mon, 01 Aug 2013 07:07:23'));
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	if(empty($Response)) {
		//echo "<strong>Список связей пуст!</strong>";
		return false;
	}
	else {
		//echo "<strong>Список связей</strong><br><pre>"; print_r($Response); echo "</pre><br>";//
		return $Response;
	}
}


// Список сделок
function leads_list_amocrm($query='', $id='') {
	// https://developers.amocrm.ru/rest_api/leads_list.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list';
	$query_text = '';
	if($query != '')
		$query_text = "?query=$query";
	if($id != '')
		$query_text = "?id=$id";

	$link="https://$subdomain.amocrm.ru/private/api/v2/json/leads/list".$query_text;

	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=barny182@hotmail.com';
	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=20151363890';

	
	//Нам необходимо инициировать запрос к серверу. Воспользуемся библиотекой cURL (поставляется в составе PHP). Подробнее о работе с этой библиотекой Вы можете прочитать в мануале.
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	
	//Вы также можете передать дополнительный HTTP-заголовок IF-MODIFIED-SINCE, в котором указывается дата в формате D, d M Y H:i:s. При передаче этого заголовка, будут возвращены сделки, изменённые позже этой даты.
	//curl_setopt($curl,CURLOPT_HTTPHEADER,array('IF-MODIFIED-SINCE: Mon, 01 Aug 2013 07:07:23'));
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	if(empty($Response)) {
		//echo "<strong>Список сделок пуст!</strong>";
		return false;
	}
	else {
		//echo "<strong>Список сделок</strong><br><pre>"; print_r($Response); echo "</pre><br>";//
		return $Response;
	}
}

// Список задач
function tasks_list_amocrm($query='') {
	// https://developers.amocrm.ru/rest_api/tasks_list.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен
	
	if($query == '')
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/tasks/list";
	else
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/tasks/list?query=$query";

	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=barny182@hotmail.com';
	//$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/list?query=20151363890';
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	//Вы также можете передать дополнительный HTTP-заголовок IF-MODIFIED-SINCE, в котором указывается дата в формате D, d M Y H:i:s. При передаче этого заголовка, будут возвращены задачи, изменённые позже этой даты.
	//curl_setopt($curl,CURLOPT_HTTPHEADER,array('IF-MODIFIED-SINCE: Mon, 01 Aug 2013 07:12:31'));

	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];
	
	if(empty($Response)) {
		echo "<strong>Список сделок пуст!</strong>";
		return false;
	}
	else {
		echo "<strong>Список сделок</strong><br><pre>"; print_r($Response); echo "</pre><br>";//
		return $Response;
	}
}

// Список примечаний (событий)
function notes_list_amocrm($query='', $type) {
	// https://developers.amocrm.ru/rest_api/notes_list.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен
	
	if($query == '')
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/notes/list?type=$type";
	else
		$link="https://$subdomain.amocrm.ru/private/api/v2/json/notes/list?type=$type&query=$query";
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response'];
	
	if(empty($Response)) {
		echo "<strong>Список примечаний пуст!</strong>";
		return false;
	}
	else {
		echo "<strong>Список примечаний</strong><br><pre>"; print_r($Response); echo "</pre><br>";//
		return $Response;
	}
}



// Добавление контактов
function contacts_add_amocrm($name, $phone, $email, $leads_id_arr,  $manager=134230) {
	// https://developers.amocrm.ru/rest_api/contacts_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен
	

	
	$contacts['request']['contacts']['add']=array(
	  array(
		'name'=>$name, #Имя контакта
		//'tags'=>$trafik, #Теги
		'date_create'=>time(), //Дата создания
		'responsible_user_id'=>$manager, #Ответсвенный
		'linked_leads_id'=>$leads_id_arr, #Список с айдишниками сделок контакта
		'custom_fields'=>array(
		  array( #Телефоны
			'id'=>424060,
			'values'=>array(
			  array(
				'value'=>$phone,
				'enum'=>'999176'
			  )
			)
		  ),

		  array( #E-mails
			'id'=>424062,
			'values'=>array(
			  array(
				'value'=>$email,
				'enum'=>'999186'
			  )
			)
		  )
		)
	  )
	);/**/
	//echo "<strong>Контакт</strong><br><pre>"; print_r($contacts); //echo "</pre><br>";
	
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/set';
	
	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($contacts));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	
	
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response']['contacts']['add'];
	 
	$contacts_id_arr = array();
	$output='ID добавленных контактов:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$contacts_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($output); //echo "</pre><br>";
	return $contacts_id_arr;
}

// Добавление контактов без телефона
function contacts_add_no_phone($name, $email, $manager=134230) {
	// https://developers.amocrm.ru/rest_api/contacts_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен



	$contacts['request']['contacts']['add']=array(
	  array(
		'name'=>$name, #Имя контакта
		//'tags'=>$trafik, #Теги
		'date_create'=>time(), //Дата создания
		'responsible_user_id'=>$manager, #Ответсвенный
		//'linked_leads_id'=>$leads_id_arr, #Список с айдишниками сделок контакта
		'custom_fields'=>array(


		  array( #E-mails
			'id'=>424062,
			'values'=>array(
			  array(
				'value'=>$email,
				'enum'=>'999186'
			  )
			)
		  )
		)
	  )
	);/**/
	//echo "<strong>Контакт</strong><br><pre>"; print_r($contacts); //echo "</pre><br>";

	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/set';

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($contacts));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);


	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);

	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}

	$Response=json_decode($out,true);
	$Response=$Response['response']['contacts']['add'];

	$contacts_id_arr = array();
	$output='ID добавленных контактов:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$contacts_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($output); //echo "</pre><br>";
	return $contacts_id_arr;
}

// Добавление контактов без телефона
// Добавление контактов
function contacts_add_no_email($name, $phone,  $leads_id_arr,  $manager=134230) {
	// https://developers.amocrm.ru/rest_api/contacts_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	$contacts['request']['contacts']['add']=array(
	  array(
		'name'=>$name, #Имя контакта
		//'tags'=>$trafik, #Теги
		'date_create'=>time(), //Дата создания
		'responsible_user_id'=>$manager, #Ответсвенный
		'linked_leads_id'=>$leads_id_arr, #Список с айдишниками сделок контакта
		'custom_fields'=>array(
		  array( #Телефоны
			'id'=>424060,
			'values'=>array(
			  array(
				'value'=>$phone,
				'enum'=>'999176'
			  )
			)
		  ),


		)
	  )
	);/**/
	//echo "<strong>Контакт</strong><br><pre>"; print_r($contacts); //echo "</pre><br>";

	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/set';

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($contacts));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);


	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);

	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}

	$Response=json_decode($out,true);
	$Response=$Response['response']['contacts']['add'];

	$contacts_id_arr = array();
	$output='ID добавленных контактов:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$contacts_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($output); //echo "</pre><br>";
	return $contacts_id_arr;
}

// Обновление контактов
function contacts_update_amocrm($contacts_id, $leads_id_arr) {
	// https://developers.amocrm.ru/rest_api/contacts_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен
	
	$contacts['request']['contacts']['update']=array(
	  array(
		'id'=>$contacts_id, #ID контакта
		'linked_leads_id'=>$leads_id_arr, #Список с айдишниками сделок контакта
		'last_modified'=>time() //Дата изменения
	  )
	);
	//echo "<strong>Контакт</strong><br><pre>"; print_r($contacts); //echo "</pre><br>";
	
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/contacts/set';
	
	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($contacts));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	
	
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response']['contacts']['add'];
	 
	$contacts_id_arr = array();
	$output='ID обновлённых контактов:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$contacts_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($out); echo "</pre><br>";
	return $contacts_id_arr;
}

function lead_update_amocrm($lead_id, $price) {
	// https://developers.amocrm.ru/rest_api/contacts_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	$leads['request']['leads']['update']=array(
	  array(
		'id'=>$lead_id, #ID контакта
		'price'=>$price, #Список с айдишниками сделок контакта
		'last_modified'=>time() //Дата изменения
	  )
	);
	//echo "<strong>Контакт</strong><br><pre>"; print_r($contacts); //echo "</pre><br>";

	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/set';

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($leads));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);


	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);

	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}

	$Response=json_decode($out,true);
	$Response=$Response['response']['leads']['update'];


	//return $output;
	//echo "<pre>"; print_r($out); echo "</pre><br>";
	return "11";


}


// Добавление сделки
function leads_add_amocrm($name, $fio, $manager=134230, $contact_id='') {
	if($contact_id!='') {
		//echo "Пробегаем по всем сделкам контакта $contact_id <br>";
		$leads_arr = contacts_links_amocrm($contact_id);
		foreach($leads_arr['links'] as $link) {
			//echo "<h2>$link[lead_id] </h2><br>";
			$leads_list = leads_list_amocrm('', $link['lead_id']);
			$lead_info = $leads_list['leads'][0];
			//print_r($lead_info);
			if(strstr($lead_info['name'],$name)) {
				//echo "Повторная заявка <br>";
				return false;
			}
		}/**/
	}
	
	// https://developers.amocrm.ru/rest_api/leads_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен




	
	$leads['request']['leads']['add']=array(
	  array(
		'name'=>"$name - $fio",
		'date_create'=>time(), //Дата создания
		'last_modified'=>time(), //Дата изменения
		'status_id'=>8152284, //Лид 
		//'price'=>$price,
		'responsible_user_id'=>$manager, #Ответсвенный
		//'tags' => $trafik, #Теги
		/*'custom_fields'=>array(
		  array(
			'id'=>1424781, # Продукт
			'values'=>array(
			  array(
				'value'=>$name,
				//'enum'=>$product_id
			  )
			)
		  ),

		)*/
	  )
	);
	//echo "<strong>Сделка</strong><br><pre>"; print_r($leads); //echo "</pre><br>";
	
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/leads/set';
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($leads));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response']['leads']['add'];
	
	$leads_id_arr = array();
	$output='ID добавленных сделок:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$leads_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($output); //echo "</pre><br>";
	//exit;
	return $leads_id_arr;
}

// Добавление задачи
function tasks_add_amocrm($leads_id_arr, $text, $manager=134230) {
	// https://developers.amocrm.ru/rest_api/tasks_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	$tasks['request']['tasks']['add']=array(
	  array( #Привязываем к сделке
		'element_id'=>$leads_id_arr[0], #ID сделки
		'element_type'=>2, #Показываем, что это - сделка, а не контакт
		//'task_type'=>'53796', // - звонок, 'MEETING' - #Встреча ; CALL - Звонок = 1\2
		'text'=>$text,
		'responsible_user_id'=>$manager, #Ответсвенный
		//'date_create'=>time(), //Дата создания
		'complete_till'=>mktime(0, 59, 0, date("n"), date("j")+1, date("Y")) //Дата завершения
	  )
	);
	//echo "<strong>Задача</strong><br><pre>"; print_r($tasks); echo "</pre><br>";
	
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/tasks/set';
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($tasks));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response']['tasks']['add'];
	
	$tasks_id_arr = array();
	$output='ID добавленных задач:'.PHP_EOL;
	foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$tasks_id_arr[] = $v['id'];
	  }
	}
	//return $output;
	//echo "<pre>"; print_r($output); echo "</pre><br>";
	//exit;
	return $tasks_id_arr;
}

// Добавление примечания (события)
function notes_add_amocrm($element_id, $text, $type=2, $manager=134230) {
	// https://developers.amocrm.ru/rest_api/notes_set.php
	$subdomain='ivanprotsko'; #Наш аккаунт - поддомен

	$notes['request']['notes']['add']=array(
	  array(
		'element_id'=>$element_id,
		'element_type'=>$type, // 1 - контакт, 2 - сделка, 4 - задача
		'note_type'=>4, // 4 - Обычное примечание
		'text'=>$text,
		'date_create'=>time(), //Дата создания
		'responsible_user_id'=>$manager, #Ответсвенный
	  )
	);
	//echo "<strong>Примечание</strong><br><pre>"; print_r($notes); echo "</pre><br>";
	
	$link='https://'.$subdomain.'.amocrm.ru/private/api/v2/json/notes/set';
	
	$curl=curl_init();
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($notes));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie_amocrm.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl);
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);

	//echo "<pre>"; print_r($out); echo "</pre><br>";
	
	//Теперь мы можем обработать ответ, полученный от сервера. Это пример. Вы можете обработать данные своим способом.
	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	
	try{
	  #Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  if($code!=200 && $code!=204)
		throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E){
	  die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}
	 
	$Response=json_decode($out,true);
	$Response=$Response['response']['tasks']['add'];
	
	$notes_id_arr = array();
	$output='ID добавленных примечаний:'.PHP_EOL;
	/*foreach($Response as $v) {
	  if(is_array($v)) {
		$output.=$v['id'].PHP_EOL;
		$notes_id_arr[] = $v['id'];
	  }
	}*/
	//return $output;
	//echo "<pre>"; print_r($output); echo "</pre><br>";
	//exit;
	return $notes_id_arr;
}

?>