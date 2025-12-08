// // Revised function with async/await for AJAX calls
// async function sub() {
//     var username = document.getElementById("id_username").value;
//     var password = document.getElementById("id_password").value;
//     const errorElement = document.getElementById('error');
//     const hasLetter = /[a-zA-Z]/.test(password);

//     if (password.length == 7 && !hasLetter) {
//         alert("")
//     }
//     if (password.length >= 8 && password.length <= 14 && hasLetter) {
//         errorElement.textContent = ''; // Clear any previous error messages

//         $.ajax({
//             type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
//             url: '/getStudentPwd/' + password,
//             success: function (result) {
//                 console.log(result[0])
//                 // console.log('result - ')
//                 // console.log(result)
//                 // var Fname = result[0].mod_firstName;
//                 // var Lname = result[0].mod_lastName;
//                 // var name = Fname + " " + Lname;
//                 // addJdgIdToActvPjts(idPjt, name, num)
//             },
//             error: function (jqXhr, textStatus, errorThrown) {
//                 console.log(errorThrown);
//             }
//         });

//         // try {
//         //     const result = await $.ajax({
//         //         type: 'GET',
//         //         url: '/getStudentPwd/' + password,
//         //         contentType: 'application/json',
//         //     });
//         //     console.log(result[0])
//         //     if (JSON.stringify(result[0]) === undefined) {
//         //         console.log('oops');
//         //         await login_mod(username, password);
//         //     } else if (result[0].username == username && result[0].password == password) {
//         //         localStorage.setItem("data", "student");
//         //         var name = result[0].sdt_firstName + " " + result[0].sdt_lastName;
//         //         localStorage.setItem("name", name);
//         //         localStorage.setItem("stdID", result[0].sdt_ID);
//         //         localStorage.setItem("modID", "");
//         //         window.location.href = "/assigAndsubDats";
//         //     } else {
//         //         alert('שם משתמש ו/או הסיסמה שגויים');
//         //     }
//         // } catch (error) {
//         //     console.log(error);
//         // }

//     } else {
//         errorElement.textContent = '.יש להכניס בין 8 ל 14 תווים כולל אותיות';
//     }
// }

// // Adjusting login_mod to async
// async function login_mod(username, password) {
//     try {
//         const result = await $.ajax({
//             type: 'GET',
//             url: '/getModeratorPwd/' + password,
//         });

//         if (result[0] !== undefined && result[0].username == username) {
//             var name = result[0].mod_firstName + " " + result[0].mod_lastName;
//             await is_coor(result[0].mod_ID, name);
//         } else {
//             alert('שם משתמש ו/או הסיסמה שגויים');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Adjusting is_coor to async
// async function is_coor(id, name) {
//     try {
//         const result = await $.ajax({
//             type: 'GET',
//             url: '/getCoodinator', // Consider appending ID if needed
//             contentType: 'application/json',
//         });

//         console.log(result);
//         if (result[0].coo_ID === undefined || result[0].coo_ID != id) {
//             localStorage.setItem("data", "moderator");
//         } else {
//             localStorage.setItem("data", "coordinator");
//         }
//         localStorage.setItem("name", name);
//         localStorage.setItem("modID", id);
//         localStorage.setItem("stdID", "");
//         window.location.assign("/assigAndsubDats");
//     } catch (error) {
//         console.log(error);
//     }
// }

// // No changes needed for showPassword, it remains synchronous
// function showPassword(str) {
//     var x;
//     switch (str) {
//         case 'sdt':
//             x = document.getElementById("sdt_pswd_id");
//             break;
//         case 'mod':
//             x = document.getElementById('mod_pswd_id');
//             break;
//         case 'old':
//             x = document.getElementById('old_pwd_or_ID');
//             break;
//         case 'new':
//             x = document.getElementById('id_new_pwd');
//             break;
//         case 'again':
//             x = document.getElementById('id_again_new_pwd');
//             break;
//         case 'login':
//             x = document.getElementById('id_password');
//             break;
//     }

//     x.type = x.type === 'password' ? 'text' : 'password';
// }

// function resetPassword() {
//     var username = document.getElementById("id_username").value;
//     localStorage.setItem('username', username);
//     window.location.href = "/changepassword";
// }
