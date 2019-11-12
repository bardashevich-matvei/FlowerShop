define('calcByCount', [], function () {
    return {
        calculate: function (count) {
            var coef = 1;
            if (count > 150) {
                coef = 0.58;
            } else if (count > 100) {
                coef = 0.63;
            } else if (count > 70) {
                coef = 0.7;
            } else if (count > 50) {
                coef = 0.82;
            }
            return coef;
        }
    }
});