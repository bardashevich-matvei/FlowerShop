var bouquet = {};

$(document).ready(function () {
    bouquet.flowerPrice = +$('span[id=finalPrice]').text();
    bouquet.bouquetId = $('[id=flowerName]').attr('data-id');
    setBouquetData();
});

function changeCount() {
    var count = +$('input[id=count]').val();
    if (isNaN(count) || count < 1) {
        $('input[id=count]').val('1');
    }
    setBouquetData();
}

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

function getIncreaseCoefficientByCount(count) {
    if (count > 150) {
        return 0.58;
    } else if (count > 100) {
        return 0.63;
    } else if (count > 70) {
        return 0.7;
    } else if (count > 50) {
        return 0.82;
    }
    return 1;
}

function getIncreasedPriceByHeight(price, height) {
    if (height >= 90) {
        return price + 2;
    } else if (height >= 80) {
        return price + 1;
    }
    return price;
}

function calculateFinalPrice(bouquet) {
    var finalPrice = bouquet.count * getIncreasedPriceByHeight(bouquet.flowerPrice, bouquet.height)
        * getIncreaseCoefficientByCount(bouquet.count) + bouquet.delivery;
    return Math.ceil(finalPrice);
}

function makeOrder() {
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