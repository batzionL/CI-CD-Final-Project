// const { use } = require("../../server/routes/routes");

// $(document).ready(function () {
jQuery(function ($) {
    // alert('in reset page')
    var username = localStorage.getItem('username')
    // console.log('username - ', username)
    if (username != null) {
        document.getElementById('username_reset_pwd').value = username
        document.getElementById('username_reset_pwd').innerHTML = username
    }


});

function getUsername(e) {
    e.preventDefault()
    // alert('in getuser..')
    // var username = localStorage.getItem('username')
    var flag = false;
    var id = document.getElementById("old_pwd_or_ID").value
    var newPwd = document.getElementById('id_new_pwd').value
    var newAgain = document.getElementById('id_again_new_pwd').value

    if (newPwd != newAgain) {
        alert('אישור הסיסמה אינו דומה לסיסמה החדשה שהוזנה')
    }

    else {
        // alert('in else')
        $.ajax({
            type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
            url: 'api/getstudents',
            success: function (result) {
                $.each(result, function (index, value) {
                    if (value.sdt_ID == id) {
                        flag = true;
                        // alert(flag)
                        update_student_pwd(id, newPwd)
                        // return;
                    }
                });
                if (!flag) {
                    // alert('in flag false')
                    $.ajax({
                        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                        url: 'api/getmoderators',
                        success: function (result) {
                            $.each(result, function (index, value) {
                                // console.log('username - ' + username)
                                // alert('j')
                                if (value.mod_ID == id) {//((value.username == username) && ) {
                                    // check_id_moderator(username, id)
                                    update_moderator_pwd(id, newPwd);
                                    // return;
                                }
                            });
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}


function update_student_pwd(id, newPwd) {
    // alert('update_student_pwd')
    localStorage.setItem('status', 'student')
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: 'api/updateStudent/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "password": newPwd
        }),
        success: function () {
            // alert('update_student_pwd - in success')
            // resolve();
            window.location.href = '/login.html';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}