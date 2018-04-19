<?php

if(
    (isset($_POST['name']) && $_POST['name']!="")&&
    (isset($_POST['phone']) && $_POST['phone']!=""))
    {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $text = $_POST['text'];
    
        $to = 'mymailboxmd@gmail.com';
        $subject = 'Сообщение с веб сайта Новое Место'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <h4>Имя: '.$name.'</h4>
                        <h4>Телефон: '.$phone.'</h4>
                        <h4>Email: '.$email.'</h4>
                        <p>Сообщение: '.$text.'</p> 
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Гость <from@new_place.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

}


?>