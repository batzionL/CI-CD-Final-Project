function add_mod(e) {
    e.preventDefault(); // מונע את שליחת הטופס הרגילה

    var id = document.getElementById("id_mod").value;
    if (id.length != 9) {
        alert("מס' ת.ז. לא תקין");
        return;
    }

    checkIfModExist(id).then(flag => {
        if (flag === false) {
            $.ajax({
                type: 'POST', 
                url: '/addmoderator', 
                contentType: 'application/json',
                data: JSON.stringify({
                    "username": $("#mod_username_id").val(),
                    "password": $("#mod_pswd_id").val(),
                    "mod_firstName": $("#firstName_mod_id").val(),
                    "mod_lastName": $("#lastName_mod_id").val(),
                    "mod_ID": $("#id_mod").val(),
                    "mod_email": $("#email_mod_id").val()
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

function checkIfModExist(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/moderator/' + id,
            success: function (result) {
                if (result[0] != undefined) {
                    alert('מנחה זה כבר קיים');
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


function add_coor(){
    location.href = "/addcoordinator"
}