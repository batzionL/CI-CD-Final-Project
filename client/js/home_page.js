jQuery(function ($) {
    var name = localStorage.getItem('name')
    document.getElementById("title").innerHTML = "שלום " + name;

    var project = document.createElement("option")

    project.setAttribute("diasbled", "disabled")
    project.setAttribute("selected", "selected")
    projects_name.appendChild(project);

    var data = localStorage.getItem("data");
    var btnEditProj = document.getElementById("editProjbtn");
    var btnSendingARequest = document.getElementById("sendingARequest");
    var btnDeleteProject = document.getElementById("deleteProjectBtn");
    var monitoringTblBtn = document.getElementById('monitoringTblBtn');

    var all = localStorage.getItem("All")


    // If the user id student he will see all the projects
    if (data === "student" || all === "all") {
        if (data === "coordinator") {
            btnSendingARequest.style.visibility = "hidden";
            btnDeleteProject.style.display = "block";
        }
        btnEditProj.style.visibility = "hidden";
        projects_name.appendChild(project)
        getAllProjectsDetails();
    }
    else {
        // If the user is moderator he will see onle his projects
        if (data === "moderator" || (data === "coordinator" && all === "not all")) {
            btnSendingARequest.style.visibility = "hidden";
            monitoringTblBtn.style.display = "block";
            var id = localStorage.getItem("modID");
            $.ajax({
                type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                url: '/getModeratorProjects/' + id,
                success: function (result) {
                    index = 0;
                    $.each(result, function (index, value) {
                        getProjectsDetails(result[index], index);
                    });
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }

    }

    projects_name.addEventListener("change", function () {     //choose the id of project that selected
        var select = document.getElementById('projects_name');
        var explanation = document.getElementById('id_explanation');
        var status = document.getElementById('status_id');
        var numOfStds = document.getElementById('num_stds_id');
        for (var i = 0; i < select.options.length; i++) {
            var option = select.options[i];
            if (option.id == '') {
                explanation.value = '';
                status.value = '';
                numOfStds.value = '';
            }
            else {
                if (option.selected) {
                    $.ajax({
                        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                        url: '/project/' + option.id,
                        success: function (result) {
                            explanation.value = result[0].details;

                            if (result[0].status == 'open') {
                                status.value = 'פתוח';
                            } else {
                                status.value = 'סגור';
                                btnSendingARequest.style.visibility = "hidden";
                            }

                            if (result[0].status == 'open' && data === "student") {
                                btnSendingARequest.style.visibility = "visible";
                            }
                            if (result[0].single_or_couple == 'single') {
                                numOfStds.value = 'יחיד';
                            } else {
                                numOfStds.value = 'זוגי';
                            }

                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });

                    if (document.getElementById("id_explanation") != "") {
                        document.getElementById('editProjbtn').onclick = function () {
                            editProject(option.id);
                        };

                        document.getElementById("deleteProjectBtn").onclick = function () {
                            stoppedProject(option.id);
                        };
                        monitoringTblBtn.onclick = function () {
                            monitoringTbl(option.id);
                        };
                    }
                    localStorage.setItem('id_pjt', option.id)
                    break;
                }
            }
        }
    });
});


function editProject(id) {
    localStorage.setItem("isEdit", 'true');

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/project/' + id,
        success: function (result) {
            var data = result[0]
            localStorage.setItem('proj_id', data._id)
            localStorage.setItem('english_name_proj', data.name_english)
            localStorage.setItem('hebrew_name_proj', data.name_hebrew)
            localStorage.setItem('details_proj', data.details)
            localStorage.setItem('type_proj', data.project_type)
            localStorage.setItem('status_proj', data.status)
            localStorage.setItem('offer_proj', data.offer)
            localStorage.setItem('add_time_proj', data.add_time)
            localStorage.setItem('single_or_couple_proj', data.single_or_couple)
            localStorage.setItem('external_factor_proj', data.external_factor)
            localStorage.setItem("external_party_email_proj", data.external_party_email);
            window.location.href = "/addproject";
        },
        error: function (err) {
            console.log("err" + err);
        }
    });
}

function getProjectsDetails(id, index) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + id,
        success: function (result) {
            var value = result[0];

            var project = document.createElement("option")
            project.setAttribute('value', index)
            project.setAttribute("id", value._id)
            project.setAttribute("name_english", value.name_english)
            project.setAttribute("name_hebrew", value.name_hebrew)
            project.setAttribute("details", value.details)
            project.setAttribute("project_type", value.project_type)
            project.setAttribute("status", value.status)
            project.setAttribute("offer", value.offer)
            project.setAttribute("add_time", value.add_time)
            project.setAttribute("single_or_couple", value.single_or_couple)
            project.setAttribute("external_factor", value.external_factor)
            project.setAttribute("external_party_email", value.external_party_email)

            project.innerHTML = value.name_hebrew
            projects_name.appendChild(project)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getAllProjectsDetails() {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/projects',
        success: function (result) {
            //adding all the options
            // projects_name = document.getElementById("projects_name")
            index = 0;
            $.each(result, function (index, value) {
                var project = document.createElement("option")
                project.setAttribute('value', index)
                project.setAttribute("id", value._id)
                project.setAttribute("name_english", value.name_english)
                project.setAttribute("name_hebrew", value.name_hebrew)
                project.setAttribute("details", value.details)
                project.setAttribute("project_type", value.project_type)
                project.setAttribute("status", value.status)
                project.setAttribute("offer", value.offer)
                project.setAttribute("add_time", value.add_time)
                project.setAttribute("single_or_couple", value.single_or_couple)
                project.setAttribute("external_factor", value.external_factor)
                project.setAttribute("external_party_email", value.external_party_email)


                // console.log('name - ', value.name_hebrew);

                project.innerHTML = value.name_hebrew;
                projects_name.appendChild(project);
                index++;
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

/*
This function is before sending the request.
The function accesses the server and receives the desired project.
Then sends the request function the ID of the moderator and the name of the project in Hebrew.
*/
function getIdModFromPro(e) {
    e.preventDefault()
    var id_pjt = localStorage.getItem('id_pjt');
    // console.log('id_pjt - ', id_pjt)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + id_pjt,
        success: function (result) {
            sendRequest(result[0].mod_id, result[0].name_hebrew);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function sendRequest(id_mod, name) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getemail/' + id_mod,
        contentType: 'application/json',
        success: function (result) {
            // var email = 'batziona99@gmail.com'
            // console.log(result)
            // alert('before')
            var subject = 'בקשת פרוייקט';
            var body1 = 'שלום וברכה,';
            var body2 = "אשמח לשמוע פרטים אודות הפרוייקט:" + '\n' + name;
            var fullBody = body1 + "\n" + body2;
            var mailtoUrl = 'mailto:' + result + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(fullBody);
            // console.log('mailtoUrl - ', mailtoUrl)
            // alert('mailtoUrl')
            window.open(mailtoUrl, '_self');
            // alert('after window.open')
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


// function getIdModFromPro(e) {
//     e.preventDefault()
//     var id_pjt = localStorage.getItem('id_pjt');
//     // console.log('id_pjt - ', id_pjt)
//     $.ajax({
//         type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
//         url: '/project/' + id_pjt,
//         success: function (result) {
//             console.log('result - ', result)
//             // sendRequest(result[0].mod_id, result[0].name_hebrew);
//             $.ajax({
//                 type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
//                 url: '/getemail/' + result[0].mod_id,
//                 contentType: 'application/json',
//                 success: function (result) {
//                     // var email = 'batziona99@gmail.com'
//                     // console.log(result)
//                     // alert('before')
//                     var subject = 'בקשת פרוייקט';
//                     var body1 = 'שלום וברכה,';
//                     var body2 = "אשמח לשמוע פרטים אודות הפרוייקט:" + '\n' + result[0].name_hebrew;
//                     var fullBody = body1 + "\n" + body2;
//                     var mailtoUrl = 'mailto:' + result[0].mod_email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(fullBody);
//                     console.log('mailtoUrl - ', mailtoUrl)
//                     alert('mailtoUrl')
//                     window.open(mailtoUrl, '_self');
//                     alert('after window.open')
//                 },
//                 error: function (jqXhr, textStatus, errorThrown) {
//                     console.log(errorThrown);
//                 }
//             });
//         },
//         error: function (jqXhr, textStatus, errorThrown) {
//             console.log(errorThrown);
//         }
//     });
// }



function monitoringTbl(id) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + id,
        success: function (result) {
            // console.log(result[0])
            // alert('result')
            localStorage.setItem("secData", "notJudge")
            localStorage.setItem("idOfSubRpt", result[0].sub_rpt_id);
            localStorage.setItem("idOfPjt", id);
            window.location.href = "/Monitoring";
            // sendRequest(result[0].mod_id, result[0].name_hebrew);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function stoppedProject(id) {
    // dltGrdsDoc(id);
    updateSdtIdRpt(id);
    // dltSubDoc(id)
    $.ajax({
        type: 'PUT',
        url: "/stpPjt/" + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "status": "הופסק"
        }),
        success: function (data) {
            console.log('stopped')
            document.getElementById("status_id").innerHTML = "הופסק";

            // location.reload();
        },
        error: function (err) {
            console.log("err", err);
        }
    });
}


function updateSdtIdRpt(id) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getSdtbyPjtId/' + id,
        success: function (result) {
            // console.log(result[0])
            if (result[0] != undefined) {
                dltRpt(result[0].id_prop_rpt, "prop");
                dltRpt(result[0].id_alfa_rpt, "alfa");
                dltRpt(result[0].id_beta_rpt, "beta");
                dltRpt(result[0].id_final_rpt, "final");
            }

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function dltRpt(rpt, nameRpt) {
    if (rpt != "") {
        $.ajax({
            url: "/deleteRpt/" + rpt + '/' + nameRpt,
            type: 'DELETE',
            success: function (data) {
                // location.reload();
            },
            error: function (err) {
                console.log("err", err);
            }
        });
    }
}

// function dltSubDoc(id) {
//     $.ajax({
//         url: "/dltSubDoc/" + id,
//         type: 'DELETE',
//         success: function (data) {
//             // location.reload();
//         },
//         error: function (err) {
//             console.log("err", err);
//         }
//     });
// }