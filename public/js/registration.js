$(document).ready(function () {
    $('#collapseNavbar li').has('a[href="/registration"]').addClass('active');

    $('#form').submit(function () {
        signUp();
        return false;
    });
});

function signUp() {
    $.ajax({
        url: '/registration',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            'username': $('#username').val(),
            'password': $('#password').val(),
            'telNumber': $('#telNumber').val()
        }),
        success: function (data) {
            alert('Регистрация прошла успешно');
            window.location.href = '/login';
        },
        error: function (jqXHR, exception) {
            $('#errorAlert').removeClass('hidden');
        }
    });
}