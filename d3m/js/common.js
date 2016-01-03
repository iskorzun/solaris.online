// $(".portfolio-item").click(function(){
// 	$(".top-mnu").addClass("hidden");
// });

$(document).ready(function () {

    // Сортировка плиток по фильтру
    $(".s-portfolio-grid").mixItUp();

    // Добавление класса элементам фильтра
    $(".s-portfolio .top li").click(function () {
        $(".s_events li").removeClass("active");
        $(this).addClass("active");
    });

    // PageScroll2id
    $(".nav-in a, a.get-it, .add-site a").mPageScroll2id();

    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

    //Аякс отправка формы новости
    $("#form-news").submit(function () {
        $('#loading').show();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $('#loading').hide();
            $("#news-form").fadeOut(1300);
            $("#news-success").fadeIn(2200);

            $("#form-news").trigger('reset');
            $("#news-name").css({"background": "#f9f8f8"});
            $("#news-email").css({"background": "#f9f8f8"});

        });
        return false;
    });

    $('#show-news').click(function () {
        $("#news-success").fadeOut(1300);
        $("#news-form").fadeIn(2200);
        //цвет кнопки серый
        $('#news-button').css({"background-color": "#999999"});

    });


    //Аякс отправка формы тест-драйв
    $("#form-testdrive").submit(function () {
        $('#loading').show();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $('#loading').hide();
            $("#testdrive-form").fadeOut(1300);
            $("#testdrive-success").fadeIn(2200);

            $("#form-testdrive").trigger('reset');
            $("#test-name").css({"background": "#f9f8f8"});
            $("#test-email").css({"background": "#f9f8f8"});

        });
        return false;
    });

    $('#show-testdrive').click(function () {
        $("#testdrive-success").fadeOut(1300);
        $("#testdrive-form").fadeIn(2200);
        //цвет кнопки серый
        $('#testdrive-button').css({"background-color": "#999999"});  

    });

    //Аякс отправка формы хотите я вам позвоню
    $("#form-call").submit(function () {
        $('#loading').show();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $('#loading').hide();
            $("#call-form").fadeOut(1300);
            $("#call-success").fadeIn(2200);

            $("#form-call").trigger('reset');
            $("#call-name").css({"background": "#f9f8f8"});
            $("#call-phone").css({"background": "#f9f8f8"});
        });
        return false;
    });

    $('#show-call').click(function () {
        $("#call-success").fadeOut(1300);
        $("#call-form").fadeIn(2200);
    });

    //Аякс отправка формы бронирование места
    $("#form-place1").submit(function () {
        $('#loading').show();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $('#loading').hide();
            $("#place1-form").fadeOut(1300);
            $("#place1-success").fadeIn(2200);

            $("#form-place1").trigger('reset');
            $("#place1-name").css({"background": "#f9f8f8"});
            $("#place1-email").css({"background": "#f9f8f8"});
            $("#place1-phone").css({"background": "#f9f8f8"});
        });
        return false;
    });


    $('#show-place1').click(function () {
        $("#place1-success").fadeOut(1300);
        $("#place1-form").fadeIn(2200);
    });

    //Аякс отправка формы бронирование места
    $("#form-place2").submit(function () {

        if ($("#place2-name").val() == '' ||
            $("#place2-phone").val() == '' ||
            $("#place2-email").val() == ''){
         return false;
        }

        $('#loading').show();
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function () {
            $('#loading').hide();
            $("#place2-form").fadeOut(1300);
            $(".question-wrap").fadeOut(500);

            $("#pay2-success").fadeIn(2200);
            $(".question-wrap").fadeIn(2300);

             var name = $("#place2-name").val();
             var phone = $("#place2-phone").val();
             var email = $("#place2-email").val();

             var redirectUrl = "./pay.html?name="+name+"&email="+email+"&phone="+phone+"/#contact";

             location.href = encodeURI(redirectUrl);

            $("#place2-name").css({"background": "#f9f8f8"});
            $("#place2-email").css({"background": "#f9f8f8"});
            $("#place2-phone").css({"background": "#f9f8f8"});

        });
        return false;
    });

    /*Начало блока в котором формируем форму для оплаты, при переходе с домена d3m.by*/
    function getUrlVars(urlString){
        var vars = [], hash;
        console.log(urlString);
        var hashes = urlString.slice(urlString.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var url = decodeURI(window.location.href);

    var pos = url.indexOf('name');
    //console.log("Pos "+ pos);
    url = url.replace("/#contact", "");

    if(pos != "-1") {
        $("#place2-form").fadeOut(500);
        // $("#contact_block").css({"background": "#fff"});
        $("#pay2-success").fadeIn(1500);
        $("#place2-name").css({"background": "#f9f8f8"});
        $("#place2-email").css({"background": "#f9f8f8"});
        $("#place2-phone").css({"background": "#f9f8f8"});


        var userData = getUrlVars(url);

        $("#place2-name").val(userData["name"]);
        $("#place2-phone").val(userData["phone"]);
        $("#place2-email").val(userData["email"]);

    }

    /*Конец блока в котором формируем форму для оплаты, при переходе с домена d3m.by*/



    $('#choose-pay-form').submit(function () {

        var summ = $("input:checked").val();
        var id = $("input:checked").attr('id');
        if (summ === undefined){
            return false;
        }
        console.log(summ);
        console.log(id);
        var itemName = "";

        switch (id){
            case "pay1":{
                itemName = "Экстра-обучение дизайну сайтов. 1 месяц";
                 break;
            }
            case "pay2":{
                itemName = "Экстра-обучение дизайну сайтов. 2 месяца";
                break;
            }
            case "pay3":{
                itemName = "Экстра-обучение дизайну сайтов. 3 месяца";
                break;
            }
            case "pay4":{
                itemName = "Про-обучение дизайну сайтов. 1 месяц";
                break;
            }
            case "pay5":{
                itemName = "Про-обучение дизайну сайтов. 2 месяца";
                break;
            }
            case "pay6":{
                itemName = "Про-обучение дизайну сайтов. 3 месяца";
                break;
            }
            case "pay7":{
                itemName = "Стандарт-обучение дизайну сайтов. 1 месяц";
                break;
            }
            case "pay8":{
                itemName = "Стандарт-обучение дизайну сайтов. 2 месяца";
                break;
            }
            case "pay9":{
                itemName = "Стандарт-обучение дизайну сайтов. 3 месяца";
                break;
            }
            case "pay10":{
                itemName = "TEMP";
                break;
            }
        }
        //summ = "10000";
        console.log(itemName);

        //Получаем данные из формы для формирования платежа
        var order = "ORDER"+Math.random()*1000+25;

        var url = decodeURI(window.location.href);

        var pos = url.indexOf('name');
        //console.log("Pos "+ pos);
        url = url.replace("/#contact", "");

        if(pos != "-1") {
            var userData = getUrlVars(url);

            var name = userData["name"];
            var phone = userData["phone"];
            var email = userData["email"];
        }


        /*var name = $("#place2-name").val();
        var phone = $("#place2-phone").val();
        var email = $("#place2-email").val();*/
        //Заполняем форму платежа(имя, телефон,email)
        $("[name = 'wsb_order_num']").val(order);
        $("[name = 'wsb_customer_name']").val(name);
        $("[name = 'wsb_phone']").val(phone);
        $("[name = 'wsb_email']").val(email);

        //Формирование товара и цены
        $("[name = 'wsb_invoice_item_name[]']").val(itemName);
        $("[name = 'wsb_invoice_item_price[]']").val(summ);
        $("[name = 'wsb_total']").val(summ);


        //$("#form-place2").trigger('reset');
        //Отправляем форму платежа
        $("#pay-form").submit();

        return false;
    });


    //Валидация
    //НОВОСТИ
    $("#news-name").keyup(function () {
        //setTimeout(function() {checkField($("#test-name"), isValidName)}, 1000);
       // checkField($("#test-name"), isValidName);
        if (checkField($("#news-name"), isValidName) && checkEmail($("#news-email"), isValidEmailAddress)) {
            $('#news-button').css({"background-color": "#4580fd"});
        } else{
            $('#news-button').css({"background-color": "#9a999b"});
        }
    });

    $("#news-email").keyup(function () {
        if (checkField($("#news-name"), isValidName) && checkEmail($("#news-email"), isValidEmailAddress)) {
            $('#news-button').css({"background-color": "#4580fd"});
          } else{
            $('#news-button').css({"background-color": "#9a999b"});
          }

        var ms = new Date();
        var time = ms.getTime();

        var lastTime = $(this).data("time");
        var delta = time - lastTime;

        console.log(delta);

        $(this).css({"background": "#f2fff1"});

        if ($("#news-email").data("timeout")) {
             $(this).css({"background": "#f2fff1"});
             $("#news-email").data("timeout",false);
        } else {
          if ((delta) > 1500) {
            checkEmail($("#news-email"), isValidEmailAddress);

          }
        }
        setTimeout(function(){
            var ms = new Date();
            var time = ms.getTime();
             console.log(time);
            var lastTime = $("#news-email").data("time");
             console.log(lastTime);
            var delta = time - lastTime;
           // console.log(delta);
            $("#news-email").css({"background": "#f2fff1"});

            if ((delta) > 1500) {
                checkEmail($("#news-email"), isValidEmailAddress);
//                if (checkField($("#test-name"), isValidName) && checkEmail($("#test-email"), isValidEmailAddress)) {
//                    $('#testdrive-button').css({"background-color": "#406c8e"});
//                } else{
//                    $('#testdrive-button').css({"background-color": "#9a999b"});
//                }
                $("#news-email").data("time", time);
                $("#news-email").data("timeout", true);
            }
        },1500);

        $(this).data("time", time);
    });

    //ТЕСТ ДРАЙВ
    $("#test-name").keyup(function () {
        //setTimeout(function() {checkField($("#test-name"), isValidName)}, 1000);
       // checkField($("#test-name"), isValidName);
        if (checkField($("#test-name"), isValidName) && checkEmail($("#test-email"), isValidEmailAddress)) {
            $('#testdrive-button').css({"background-color": "#4580fd"});
        } else{
            $('#testdrive-button').css({"background-color": "#9a999b"});
        }
    });

    $("#test-email").keyup(function () {
        if (checkField($("#test-name"), isValidName) && checkEmail($("#test-email"), isValidEmailAddress)) {
            $('#testdrive-button').css({"background-color": "#4580fd"});
          } else{
            $('#testdrive-button').css({"background-color": "#9a999b"});
          }

        var ms = new Date();
        var time = ms.getTime();

        var lastTime = $(this).data("time");
        var delta = time - lastTime;

        console.log(delta);

        $(this).css({"background": "#f2fff1"});

        if ($("#test-email").data("timeout")) {
             $(this).css({"background": "#f2fff1"});
             $("#test-email").data("timeout",false);
        } else {
          if ((delta) > 1500) {
            checkEmail($("#test-email"), isValidEmailAddress);

          }
        }
        setTimeout(function(){
            var ms = new Date();
            var time = ms.getTime();
             console.log(time);
            var lastTime = $("#test-email").data("time");
             console.log(lastTime);
            var delta = time - lastTime;
           // console.log(delta);
            $("#test-email").css({"background": "#f2fff1"});

            if ((delta) > 1500) {
                checkEmail($("#test-email"), isValidEmailAddress);
//                if (checkField($("#test-name"), isValidName) && checkEmail($("#test-email"), isValidEmailAddress)) {
//                    $('#testdrive-button').css({"background-color": "#406c8e"});
//                } else{
//                    $('#testdrive-button').css({"background-color": "#9a999b"});
//                }
                $("#test-email").data("time", time);
                $("#test-email").data("timeout", true);
            }
        },1500);

        $(this).data("time", time);
    });


    //Валидация ХОТИТЕ Я ПЕРЕЗВОНЮ ВАМ
    $("#call-name").keyup(function () {

        if (checkField($("#call-name"), isValidName) && checkPhone($("#call-phone"), isValidPhone)) {
            $('#call-button').css({"background-color": "#ff5b4b"});
        } else{
            $('#call-button').css({"background-color": "#9a999b"});
        }
    });


    $("#call-phone").keyup(function () {

        if (checkPhone($("#call-phone"), isValidPhone) && checkField($("#call-name"), isValidName)) {
            $('#call-button').css({"background-color": "#ff5b4b"});
        } else{
            $('#call-button').css({"background-color": "#9a999b"});
        }
    });


    //Валидация Бронирование1
    $("#place1-name").keyup(function () {

        if (checkField($("#place1-name"), isValidName) && checkPhone($("#place1-phone"), isValidPhone) && checkEmail($("#place1-email"), isValidEmailAddress)) {
            $('#place1-button').css({"background-color": "#ff5b4b"});
        } else{
            $('#place1-button').css({"background-color": "#9a999b"});
        }
    });


//    $("#place1-phone").keyup(function () {
//
//        if (checkPhone($("#place1-phone"), isValidPhone) && checkField($("#place1-name"), isValidName) && checkEmail($("#place1-email"), isValidEmailAddress)) {
//            $('#place1-button').css({"background-color": "#ff5b4b"});
//        } else{
//            $('#place1-button').css({"background-color": "#9a999b"});
//        }
//    });

    $("#place1-email").keyup(function () {
        if (checkField($("#place1-name"), isValidName) && checkEmail($("#place1-email"), isValidEmailAddress) && checkPhone($("#place1-phone"), isValidPhone)) {
            $('#place1-button').css({"background-color": "#ff5b4b"});
          } else{
            $('#place1-button').css({"background-color": "#9a999b"});
          }

        var ms = new Date();
        var time = ms.getTime();

        var lastTime = $(this).data("time");
        var delta = time - lastTime;

        console.log(delta);

        $(this).css({"background": "#f2fff1"});

        if ($("#place1-email").data("timeout")) {
             $(this).css({"background": "#f2fff1"});
             $("#place1-email").data("timeout",false);
        } else {
          if ((delta) > 1500) {
            checkEmail($("#place1-email"), isValidEmailAddress);

          }
        }
        setTimeout(function(){
            var ms = new Date();
            var time = ms.getTime();
             console.log(time);
            var lastTime = $("#place1-email").data("time");
             console.log(lastTime);
            var delta = time - lastTime;
           // console.log(delta);
            $("#place1-email").css({"background": "#f2fff1"});

            if ((delta) > 1500) {
                checkEmail($("#place1-email"), isValidEmailAddress);
//
                $("#place1-email").data("time", time);
                $("#place1-email").data("timeout", true);
            }
        },1500);

        $(this).data("time", time);
    });

    $("#place1-phone").keyup(function () {
        if (checkField($("#place1-name"), isValidName) && checkEmail($("#place1-email"), isValidEmailAddress) && checkPhone($("#place1-phone"), isValidPhone)) {
            $('#place1-button').css({"background-color": "#ff5b4b"});
          } else{
            $('#place1-button').css({"background-color": "#9a999b"});
          }

        var ms = new Date();
        var time = ms.getTime();

        var lastTime = $(this).data("time");
        var delta = time - lastTime;

        console.log(delta);

        $(this).css({"background": "#f2fff1"});

        if ($("#place1-phone").data("timeout")) {
             $(this).css({"background": "#f2fff1"});
             $("#place1-phone").data("timeout",false);
        } else {
          if ((delta) > 1500) {
            checkPhone($("#place1-phone"), isValidPhone);

          }
        }

        setTimeout(function(){
            var ms = new Date();
            var time = ms.getTime();
             console.log(time);
            var lastTime = $("#place1-phone").data("time");
             console.log(lastTime);
            var delta = time - lastTime;
           // console.log(delta);
            $("#place1-phone").css({"background": "#f2fff1"});

            if ((delta) > 1500) {
                checkPhone($("#place1-phone"), isValidPhone);
//
                $("#place1-phone").data("time", time);
                $("#place1-phone").data("timeout", true);
            }
        },1500);

        $(this).data("time", time);
    });


    //Валидация Бронирование2
    $("#place2-name").keyup(function () {

        if (checkField($("#place2-name"), isValidName) && checkPhone($("#place2-phone"), isValidPhone) && checkEmail($("#place2-email"), isValidEmailAddress)) {
            $('#place2-button').css({"background-color": "#ff5b4b"});
        } else{
            $('#place2-button').css({"background-color": "#9a999b"});
        }
    });


    $("#place2-phone").keyup(function () {

        if (checkPhone($("#place2-phone"), isValidPhone) && checkField($("#place2-name"), isValidName) && checkEmail($("#place2-email"), isValidEmailAddress)) {
            $('#place2-button').css({"background-color": "#ff5b4b"});
        } else{
            $('#place2-button').css({"background-color": "#9a999b"});
        }
    });

    $("#place2-email").keyup(function () {
        if (checkField($("#place2-name"), isValidName) && checkEmail($("#place2-email"), isValidEmailAddress) && checkPhone($("#place2-phone"), isValidPhone)) {
            $('#place2-button').css({"background-color": "#ff5b4b"});
          } else{
            $('#place2-button').css({"background-color": "#9a999b"});
          }

        var ms = new Date();
        var time = ms.getTime();

        var lastTime = $(this).data("time");
        var delta = time - lastTime;

        console.log(delta);

        $(this).css({"background": "#f2fff1"});

        if ($("#place2-email").data("timeout")) {
             $(this).css({"background": "#f2fff1"});
             $("#place2-email").data("timeout",false);
        } else {
          if ((delta) > 1500) {
            checkEmail($("#place2-email"), isValidEmailAddress);

          }
        }
        setTimeout(function(){
            var ms = new Date();
            var time = ms.getTime();
             console.log(time);
            var lastTime = $("#place2-email").data("time");
             console.log(lastTime);
            var delta = time - lastTime;
           // console.log(delta);
            $("#place2-email").css({"background": "#f2fff1"});

            if ((delta) > 1500) {
                checkEmail($("#place2-email"), isValidEmailAddress);
//
                $("#place2-email").data("time", time);
                $("#place2-email").data("timeout", true);
            }
        },1500);

        $(this).data("time", time);
    });






    function checkPhone(field, validateFunction) {
        field.css({"background": "#f2fff1"});
        var name = field.val();
        if (name != 0) {
            if (validateFunction(name)) {
                field.css({"background": "#f2fff1"});
                return true;
            } else {
                field.css({"background": "#ffecec"});
                return false;
            }
        } else {
            field.css({"background": "#f9f8f8"});
            return false;
        }
    }

    function checkField(field, validateFunction) {
        field.css({"background": "#f2fff1"});
        var name = field.val();
        if (name != 0) {
            if (validateFunction(name)) {
                field.css({"background": "#f2fff1"});
                return true;
            } else {
                field.css({"background": "#ffecec"});
                return false;
            }
        } else {
            field.css({"background": "#f9f8f8"});
            return false;
        }
    }

    function checkEmail(field, validateFunction) {
        var name = field.val();

        if (name != 0) {
            if (validateFunction(name)) {
                field.css({"background": "#f2fff1"});
                return true;
            } else {
                field.css({"background": "#ffecec"});
                return false;
            }
        } else {
            field.css({"background": "#f9f8f8"});
            return false;
        }

    }

    function isValidName(name) {
        var pattern = new RegExp(/^([а-яё\s]+)$/i);
        return pattern.test(name);
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    /*function isValidPhone(phone) {
        var pattern = new RegExp(/^[\+0-9]{12,13}$/);
        console.log(pattern.test(phone));
        return pattern.test(phone);
    }*/
    function isValidPhone(phone) {
        var pattern = new RegExp(/^[\+\(\)\s0-9]+$/);
        console.log(pattern.test(phone));
        return pattern.test(phone);
    }


});

//Галерея всплывающих фотографий
$(document).ready(function() {
	$(".popup").magnificPopup({
		 type : "image",
		 gallery : {
		 	enabled : true
		}
		,
		image : {
		 	verticalFit: false
		}
	});
});

//BX-SLIDER
// $(document).ready(function(){
//   $('.bxslider').bxSlider({
//     // slideWidth: 601,
//     // minSlides : 3,
//     // maxSlides : 3,
//     // moveSlides : 1,
//     // slideMargin : 10,
//   	responsive : true,
//   	auto : true,
//     speed : 1000,
//     pause : 4000
//   });
// });

// Сортировка плиток по фильтру
$(document).ready(function() {
	$(".portfolio-item").mixItUp();

	// Добавление класса элементам фильтра
	$(".s-portfolio .top li").click(function(){
		$(".s_events li").removeClass("active");
		$(this).addClass("active");
	});
});

$(window).load(function () {

    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");

});


// Карусель
// Документация http://owlgraphic.com/owlcarousel/
// var owl = $(".carousel");
// owl.owlcarousel({
// 	items : 1
// });
// owl.on("mousewheel", ".owl-wrapper", function(e) {
// 	if(e.deltaY>0){
// 		owl.trigger("owl.prew");
// 	}
// 	else{
// 		owl.trigger("owl.next");
// 	}
// 	e.preventDefault();
// });
// $(".next_button").click(function() {
// 	owl.trigger("owl.next");
// });
// $(".prev_button").click(function() {
// 	owl.trigger("owl.prev");
// });


$(document).ready(function() {

	//Owl Carousel
	//http://www.owlcarousel.owlgraphic.com/docs/started-installation.html
	var owl = $(".slider");
	owl.owlCarousel({
		// autoplay : true,
		autoHeight : true,
	    center : true,
	    items : 2,
	    loop : true,
	    margin : 15,
	    autoplaySpeed : 1000,
	    responsive : {
	    	380 : {
	            items : 2,
	            margin : 120
	        },
	        600 : {
	            items : 2,
	            margin : 120
	        },
	        967 : {
	            items : 2,
	            margin : 110
	        },
	        1124 : {
	            items : 2,
	            margin : 100
	        },
	        1349 : {
	            items : 2,
	            margin : 15
	        },
	        1506 : {
	            items : 2,
	            margin : -20
	        },
	        1686 : {
	            items : 2,
	            margin : -100
	        },
	        1934 : {
	            items : 2,
	            margin : -120
	        },
	        2248 : {
	            items : 2,
	            margin : -149
	        },
	        2698 : {
	            items : 4,
	            margin : 180
	        },
	        3373 : {
	            items : 4,
	            margin : 140
	        },
	        4497 : {
	        	center : true,
	            items : 6,
	            margin : 100
	        },
	        5260 : {
	        	center : true,
	            items : 6,
	            margin : 70
	        },
	        6830 : {
	        	center : true,
	            items : 6,
	            margin : 70
	        }
	    }
	});
	// Go to the next item
	$(".next_button").click(function() {
	    owl.trigger("next.owl.carousel", [1000]);
	});
	// Go to the previous item
	$(".prev_button").click(function() {
	    // With optional speed parameter
	    // Parameters has to be in square bracket '[]'
	    owl.trigger("prev.owl.carousel", [1000]);
	});
});


