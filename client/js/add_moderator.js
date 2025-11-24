jQuery(function ($) {
    const random7DigitNumber = getRandom7DigitNumber();
    document.getElementById("mod_pswd_id").value = random7DigitNumber;
})

function getRandom7DigitNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add_mod() {
    var id = document.getElementById("id_mod").value;
    if (id.length != 9 || !checkId(id)) {
        alert("מס' ת.ז. לא תקין")
    }
    else {
        checkIfModExist(document.getElementById('id_mod').value);
        var flag = localStorage.getItem('flag')
        if (flag === 'false') {
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
                processData: false,
                encode: true,
                success: function (data, textStatus, jQxhr) {
                    location.href = "/assigAndsubDats"
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    }
}

function checkIfModExist(id) {
    $.ajax({
        type: 'GET',
        url: '/moderator/' + id,
        success: function (result) {
            if (result[0] != undefined) {
                alert('מנחה זה כבר קיים');
                localStorage.setItem('flag', "true");
                location.reload();
            }
            else {
                localStorage.setItem('flag', 'false')
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function add_coor(){
    location.href = "/addcoordinator"
}
// 
function checkId(id) {
    let checkArray = [];
    let checkNum = 0, sum = 0;
    
    for (let i = 0; i < id.length - 1; i++) {
        if (i % 2 === 0) {
            checkNum = id[i] * 2;
            if (checkNum > 9)
                checkNum = checkNum / 10 + checkNum % 10;
            checkArray.push(checkNum); 
        } else {
            checkArray.push(id[i]); 
        }
    }
    for(let num of checkArray){
        sum += num;
    }
    checkNum = sum + id[id.length-1];
    if(checkNum === 30){
        return true;
    }
    else{
        return false;
    }
}