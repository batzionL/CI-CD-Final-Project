jQuery(function ($) {
    var coordinator = document.createElement("option")
    coordinator.setAttribute("disabled", "disabled")
    coordinator.setAttribute("selected", "selected")

    coordinators_name.appendChild(coordinator)
    $.ajax({
        type: 'GET', 
        url: '/getmoderators',
        success: function (result) {
            coordinators_name = document.getElementById("coordinators_name")
            index = 0;
            $.each(result, function (index, value) {
                var coordinator = document.createElement("option")
                coordinator.setAttribute('value', index)
                coordinator.setAttribute("id", value.mod_ID)
                coordinator.setAttribute("first_name_coordinator", value.mod_firstName)
                coordinator.setAttribute("last_name_coordinator", value.mod_lastName)
                coordinator.innerHTML = value.mod_firstName + " " + value.mod_lastName
                coordinators_name.appendChild(coordinator)
                index++;
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    coordinators_name.addEventListener("change", function () {     
        var select = document.getElementById('coordinators_name');
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            if (option.selected) {
                localStorage.setItem('id_coor', option.id)
                break;
            }
        }
    });

});

function if_there_coor(e) {
    e.preventDefault()
    $.ajax({
        type: 'GET', 
        url: '/getCoodinator',
        success: function (result) {
            if (result[0] == undefined) {
                add_coord('');
            }
            else {
                var userResponse = confirm("בלחיצה על אישור הינך מחליף/ה את הרכז/ת הקיים/ת");

                if (userResponse) {
                    dltOldCoor();
                    add_coord(userResponse);
                } else {
                    location.href = "/assigAndsubDats";
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}



function add_coord(res) {
    var id_coor = localStorage.getItem('id_coor')
    $.ajax({
        type: 'POST',
        url: '/addcoordinator',
        contentType: 'application/json',
        data: JSON.stringify({
            "coo_ID": id_coor
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            if (res == '') {
                createSubDatesDoc();
            }
            else{
                location.href = "/assigAndsubDats";
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function createSubDatesDoc() {
    $.ajax({
        type: 'POST', 
        url: '/dateOfSub', 
        contentType: 'application/json',
        data: JSON.stringify({
            "propRpt": "",
            "alfaRpt": "",
            "betaRpt": "",
            "finalRpt": "",
            "presentation": ""
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
            location.href = "/assigAndsubDats";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function dltOldCoor() {
    $.ajax({
        url: "/deleteOldCoor",
        type: 'DELETE',
        success: function (data) {
        },
        error: function (err) {
            console.log("err", err);
        }
    });
}