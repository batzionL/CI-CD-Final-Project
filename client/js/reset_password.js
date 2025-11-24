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
            url: '/getstudents',
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
                        url: '/getmoderators',
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
        url: '/updateStudent/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "password": newPwd
        }),
        success: function () {
            // alert('update_student_pwd - in success')
            // resolve();
            window.location.href = '/login';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


// function check_id_moderator(username, id) {
//     console.log('in check_mod - id - ', id)
//     alert(' in check_id_moderator')
//     var newPwd = document.getElementById('id_new_pwd').value
//     // var newAgain = document.getElementById('id_again_new_pwd').value

//     $.ajax({
//         type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
//         url: '/getmoderators',
//         contentType: 'application/json',
//         success: function (result) {
//             console.log('username - ', result)
//             $.each(result, function (index, value) {
//                 console.log('username - ', value)
//                 if(value.mod_ID == id){
//                     check_new_pwd_moderator(id, newPwd);
//                 }
//             });
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }


function update_moderator_pwd(id, newPwd) {
    // alert('before')
    // console.log('id - ' + id + 'nepwd - ' + newPwd)
    // alert('in check_new_pwd_moderator')
    localStorage.setItem('status', 'moderatur')
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: '/updateModerator/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "password": newPwd
        }),
        success: function () {
            // resolve();
            window.location.href = '/login';
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

// $(document).ready(function () {
//     var username = localStorage.getItem('username');
//     document.getElementById('username_reset_pwd').value = username;
//     document.getElementById('username_reset_pwd').innerHTML = username;
//     // getUsername(username);
// });

// function getUsername() {
//     alert('in getUse...')
//     var username = localStorage.getItem('username');
//     var flag = false;
//     var id = document.getElementById("old_pwd_or_ID").value;

//     // Wrap the AJAX calls in Promises
//     function getStudents() {
//         return new Promise(function (resolve, reject) {
//             $.ajax({
//                 type: 'GET',
//                 url: '/students',
//                 success: function (result) {
//                     resolve(result);
//                 },
//                 error: function (jqXhr, textStatus, errorThrown) {
//                     reject(errorThrown);
//                 }
//             });
//         });
//     }

//     function getModerators() {
//         alert('in getmod...')
//         return new Promise(function (resolve, reject) {
//             $.ajax({
//                 type: 'GET',
//                 url: '/getmoderators',
//                 success: function (result) {
//                     alert('in success')
//                     resolve(result);
//                 },
//                 error: function (jqXhr, textStatus, errorThrown) {
//                     reject(errorThrown);
//                 }
//             });
//         });
//     }

//     // Call the AJAX functions and handle the results using Promises
//     getStudents()
//         .then(function (result) {
//             $.each(result, function (index, value) {
//                 if (value.username == username) {
//                     localStorage.setItem('status', 'student');
//                     flag = true;
//                     return check_id_student(username, id);
//                 }
//             });
//             if (!flag) {
//                 return getModerators();
//             }
//         })
//         .then(function (result) {
//             $.each(result, function (index, value) {
//                 if (value.mod_ID == id) {
//                     return check_id_moderator(username, id);
//                 }
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// function check_id_student(username, id) {
//     var newPwd = document.getElementById('id_new_pwd').value;
//     var newAgain = document.getElementById('id_again_new_pwd').value;

//     return new Promise(function (resolve, reject) {
//         $.ajax({
//             type: 'GET',
//             url: '/student/' + id,
//             contentType: 'application/json',
//             success: function (result) {
//                 if (result[0].username == username && result[0].sdt_ID == id) {
//                     if (newPwd == newAgain) {
//                         return check_new_pwd_student(id, newPwd);
//                     }
//                 }
//                 resolve();
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 reject(errorThrown);
//             }
//         });
//     });
// }

// function check_new_pwd_student(id, newPwd) {
//     return new Promise(function (resolve, reject) {
//         $.ajax({
//             type: 'PUT',
//             url: '/updateStudent/' + id,
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 "password": newPwd
//             }),
//             success: function () {
//                 resolve();
//                 window.location.href = '/assigAndsubDats';
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 reject(errorThrown);
//             }
//         });
//     });
// }

// function check_id_moderator(username, id) {
//     console.log('in check_mod - id - ', id);
//     var newPwd = document.getElementById('id_new_pwd').value;
//     var newAgain = document.getElementById('id_again_new_pwd').value;

//     return new Promise(function (resolve, reject) {
//         $.ajax({
//             type: 'GET',
//             url: '/moderators',
//             contentType: 'application/json',
//             success: function (result) {
//                 $.each(result, function (index, value) {
//                     if (value.username == username) {
//                         return check_new_pwd_moderator(id, newPwd);
//                     }
//                 });
//                 resolve();
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 reject(errorThrown);
//             }
//         });
//     });
// }

// function check_new_pwd_moderator(id, newPwd) {
//     return new Promise(function (resolve, reject) {
//         $.ajax({
//             type: 'PUT',
//             url: '/updateModerator/' + id,
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 "password": newPwd
//             }),
//             success: function () {
//                 resolve();
//                 window.location.href = '/assigAndsubDats';
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 reject(errorThrown);
//             }
//         });
//     });
// }


// // assigAndsubDats