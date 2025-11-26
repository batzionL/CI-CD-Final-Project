// jQuery(function ($) {
//     const random7DigitNumber = getRandom7DigitNumber();
//     document.getElementById("sdt_pswd_id").value = random7DigitNumber;
// })

// function getRandom7DigitNumber() {
//     const min = 100000;
//     const max = 999999;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function add_studen(e) {
    e.preventDefault();
    var id = document.getElementById("id_sdt").value;
    if (id.length != 9) { 
        alert("מס' ת.ז. לא תקין");
        return;
    }

    checkIfSdudentExist(id).then(flag => {
        if (flag === false) {
            $.ajax({
                type: 'POST',
                url: '/addstudent',
                contentType: 'application/json',
                data: JSON.stringify({
                    "username": $("#sdt_username_id").val(),
                    "password": $("#sdt_pswd_id").val(),
                    "sdt_firstName": $("#firstName_sdt_id").val(),
                    "sdt_lastName": $("#lastName_sdt_id").val(),
                    "sdt_ID": id,
                    "sdt_email": $("#email_sdt_id").val()
                }),
                success: function () {
                    location.href = "/assigAndsubDats";
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
}


function checkIfSdudentExist(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/student/' + id,
            success: function (result) {
                if (result[0] != undefined) {
                    alert('סטודנט זה כבר קיים');
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (err) {
                console.log(err);
                reject(err);
            }
        });
    });
}