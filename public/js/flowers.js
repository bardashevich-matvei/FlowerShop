$(document).ready(function () {
    $('#collapseNavbar li').has('a[href="/flowers"]').addClass('active');
    $('[id=flowers-list] a').first().click();
});

var readCertainFlower = function readCertainFlower (event) {
    $.ajax({
        url: '/flowers/' + event.target.id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            initFlowerInfo(data);
        }
    });
};

var initFlowerInfo = function (flower) {
    $('#flower-header h1').text(flower.name);
    $('#flower-image').attr('src', '../resource/' + flower.image_url);
    var description = $('div[id=flower-description]').html("");
    flower.description.forEach(function (element) {
        $('<p></p>').text(element).appendTo(description);
    });
};