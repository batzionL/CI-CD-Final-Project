jQuery(function ($) {
    var username = localStorage.getItem('username')
    if (username != null) {
        document.getElementById('username_reset_pwd').value = username
        document.getElementById('username_reset_pwd').innerHTML = username
    }


});

function getUsername(e) {
    e.preventDefault()
    var flag = false;
    var id = document.getElementById("old_pwd_or_ID").value
    var newPwd = document.getElementById('id_new_pwd').value
    var newAgain = document.getElementById('id_again_new_pwd').value

    if (newPwd != newAgain) {
        alert('The new passwords do not match')
    }

    else {
        $.ajax({
            type: 'GET', 
            url: 'api/getstudents',
            success: function (result) {
                $.each(result, function (index, value) {
                    if (value.sdt_ID == id) {
                        flag = true;
                        update_student_pwd(id, newPwd)
                    }
                });
                if (!flag) {
                    $.ajax({
                        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                        url: 'api/getmoderators',
                        success: function (result) {
                            $.each(result, function (index, value) {
                                if (value.mod_ID == id) {
                                    update_moderator_pwd(id, newPwd);
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
    localStorage.setItem('status', 'student')
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: 'api/updateStudent/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "password": newPwd
        }),
        success: function () {
            window.location.href = '/login.html';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function update_moderator_pwd(id, newPwd) {
    localStorage.setItem('status', 'moderatur')
    $.ajax({
        type: 'PUT',
        url: 'api/updateModerator/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "password": newPwd
        }),
        success: function () {
            window.location.href = '/login.html';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}