$(document).ready(function () {
    $('#collapseNavbar li').has('a[href="/catalog"]').addClass('active');

    var bouquets = [];
    $.ajax({
        url: '/catalog/list',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            bouquets = data;
            initBouquetsList();
        }
    });

    function initBouquetsList() {
        var div = $('div[id=bouquets]');
        var row = null;

        for (var i = 0; i < bouquets.length; i++) {
            if (i % 4 === 0) {
                row = createRow();
                div.append(row);
            }
            var itemWrapper = createItemWrapper();
            var item = initItem(bouquets[i]);
            addItemToWrapper(itemWrapper, item);
            row.append(itemWrapper);
        }
    }

    function itemClickEvent(event) {
        window.location.href = '/catalog/' + $(event.target).attr('data-id');
    }

    function createRow() {
        var row = $('<div></div>');
        row.addClass('row');
        return row;
    }

    function createItemWrapper() {
        var div = $('<div></div>');
        div.addClass('col-md-3');
        div.addClass('center');
        div.addClass('cursor-pointer');
        div.css('marginTop', '20px');
        return div;
    }

    function initItem(bouquet) {
        return {
            id: bouquet._id,
            image: '../resource/catalog/' + bouquet.image,
            name: bouquet.name,
            price: Math.ceil(bouquet.price * getIncreaseCoefficient(bouquet.count) * bouquet.count)
        };
    }

    function addOnClickListeners(itemWrapper, item) {
        itemWrapper.click(itemClickEvent);
        itemWrapper.attr('data-id', item.id);
        itemWrapper.find('.itemImage').attr('data-id', item.id);
        itemWrapper.find('.itemImage').click(itemClickEvent);
        itemWrapper.find('.itemName').attr('data-id', item.id);
        itemWrapper.find('.itemName').click(itemClickEvent);
        itemWrapper.find('.itemPrice').attr('data-id', item.id);
        itemWrapper.find('.itemPrice').click(itemClickEvent);
    }

    function getIncreaseCoefficient(count) {
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

    function addItemToWrapper(itemWrapper, item) {
        $("#templates").load("../html/templates/catalogItem.html", function (result) {
            var output = Mustache.render(result, item);
            itemWrapper.html(output);
            addOnClickListeners(itemWrapper, item);
        });
    }
});