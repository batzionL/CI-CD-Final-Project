function add_studen(e) {
    e.preventDefault();
    var id = document.getElementById("id_sdt").value;
    if (id.length != 9) { 
        alert("Invalid id number");
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
                    alert('This student already exists.');
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