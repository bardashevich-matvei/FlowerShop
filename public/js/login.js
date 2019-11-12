$(document).ready(function () {
    $('#collapseNavbar li').has('a[href="/login"]').addClass('active');
    
    $('#form').submit(function () {
        signIn();
        return false;
    });
});

function signIn() {
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({'username': $('#username').val(), 'password': $('#password').val()}),
        success: function (data) {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = '/';
        },
        error: function (jqXHR, exception) {
            $('#errorAlert').removeClass('hidden');
        }
    });
}