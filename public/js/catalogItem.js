requirejs.config({
    paths: {
        jquery: 'lib/jquery',
        calcByCount: 'modules/calculateIncreaseCoefficientByCount',
        calcByHeight: 'modules/calculateIncreaseCoefficientByHeight'
    }
});

require(["jquery", "calcByCount", "calcByHeight"], function ($, calcByCount, calcByHeight) {
    var bouquet = {};

    $(document).ready(function () {
        if (localStorage.getItem('user')) {
            $('#auth').addClass('hidden');
            $('#exit').removeClass('hidden');
        } else {
            $('#auth').removeClass('hidden');
            $('#exit').addClass('hidden');
        }

        bouquet.flowerPrice = +$('span[id=finalPrice]').text();
        bouquet.bouquetId = $('[id=flowerName]').attr('data-id');
        setBouquetData();

        $('#makeOrderBtn').click(function () {
            if (localStorage.getItem('user') === null) {
                alert('Необходимо авторизироваться чтобы сделать заказ!');
                window.location.href = '/login';
            }
            bouquet.userId = JSON.parse(localStorage.getItem('user'))._id;
            $.ajax({
                url: '/orders',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(bouquet),
                success: function (data) {
                    alert('Заказ успешно оформлен');
                    window.location.href = '/catalog';
                },
                error: function (jqXHR, exception) {
                }
            });
        });

        $('#count').change(function () {
            var count = +$(this).val();
            if (isNaN(count) || count < 1) {
                $(this).val('1');
            }
            setBouquetData();
        });

        $('#roseHeight').change(setBouquetData);
        $('#minus').click(decreaseCount);
        $('#plus').click(increaseCount);
    });

    function setBouquetData() {
        bouquet.height = +$('select[id=roseHeight]').val();
        bouquet.count = +$('input[id=count]').val();
        bouquet.delivery = bouquet.count > 51 ? 0 : 5;
        console.log(bouquet);
        setFinalAndDescriptionPrice(calculateFinalPrice(bouquet));
    }

    function setFinalAndDescriptionPrice(price) {
        bouquet.finalPrice = price;
        $('[id=finalPrice], [id=descriptionPrice]').text(price);
    }

    function calculateFinalPrice(bouquet) {
        var finalPrice = bouquet.count * calcByHeight.calculate(bouquet.flowerPrice, bouquet.height)
            * calcByCount.calculate(bouquet.count) + bouquet.delivery;
        return Math.ceil(finalPrice);
    }

    function increaseCount() {
        var count = +$('input[id=count]').val();
        if (isNaN(count) || count < 1) {
            return $('input[id=count]').val('1');
        }
        $('input[id=count]').val(++count);
        setBouquetData();
    }

    function decreaseCount() {
        var count = +$('input[id=count]').val();
        if (isNaN(count) || count <= 1) {
            return $('input[id=count]').val('1');
        }
        $('input[id=count]').val(--count);
        setBouquetData();
    }
});
