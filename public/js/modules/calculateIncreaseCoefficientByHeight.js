define('calcByHeight', [], function () {
    return {
        calculate: function (price, height) {
            if (height >= 90) {
                return price + 2;
            } else if (height >= 80) {
                return price + 1;
            }
            return price;
        }
    }
});