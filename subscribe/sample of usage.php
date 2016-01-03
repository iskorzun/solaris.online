<?php
$config = array(
    'api_id' => '12435678', // эти цифры берем из "Настройки" -> "настройки вашего аккаунта" -> "API"
    'api_key' => 'sjdfksdjfklsjdfkjsdkflsdjlfk', // этот ключ тоже оттуда же
    'format' => 'json', // это не трогаем
);


// в этот массив собираем все id и произвольные имена списков, с которыми будем работать(необязательны)
$lists = array(
	'имя-списка' => 6666666, // цифры - id списка который можно найти в в админке "Рассылки" -> "Список рассылки" -> ID рассылки(did):
);

// запускаем класс
$API = new api_smartresponder($config, $lists);


//$API->debug = TRUE; // включаем подробный лог работы класса
//$result = $API->getSubscriber('имя-списка', 'sample@gmail.com'); // получаем данные по емайл и заодно проверяем есть ли он в нужном списке
//$result = $API->getSubscriber(NULL, 'sample@gmail.com'); // получаем данные по емайл вне зависимости от того в каком подписчик списке

//$result = $API->updateSubscriber('имя-списка', array('name' => 'Тест', 'email' => 'sample@gmail.com')); // обновляем данные по емейл
//$result = $API->deleteSubscriber('имя-списка', 'sample@gmail.com'); // удаляем нафик

//$result = $API->addSubscriber(NULL, array('email' => 'sample@gmail.com')); // добавляем человека
//$result = $API->addSubscriber('имя-списка', array('email' => 'sample@gmail.com')); // добавляем человека и подписываем на конкретную рассылку



//print_r($result); // выводим резульаты

//print_r($API->debug_output); // выводим лог

//var_dump($result); // выводим резульаты еще раз, мало ли;)