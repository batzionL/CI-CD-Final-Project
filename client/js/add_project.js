const isEdit = localStorage.getItem("isEdit")
const modID = localStorage.getItem("modID")
const data = localStorage.getItem("data")
const nameMod = localStorage.getItem("name");

jQuery(async function ($) {

    getFullDate();

    if (isEdit == 'true') {
        $('#title').html("עדכון פרויקט:")
        await receiving_the_information();
    }

    else if (isEdit == 'false') {
        document.getElementById('offer_id').value = nameMod;
        var update_or_add = document.getElementById('id_group_update')      //לבדוק מחר אם זה נותן את התאריך של של היום הנוכחי או את התאריך של ההוספה - לא תקין
        update_or_add.style.visibility = "hidden";

        localStorage.clear()
        $('#title').html("הוספת פרויקט:")
    }
});

async function per_add_proj(e) {
    e.preventDefault()
    var statusSelect = document.querySelector('#status_id');
    var outputStatus = statusSelect.value;
    document.getElementById("input_status_id").setAttribute('value', outputStatus)

    var singleOrCoupleSelect = document.querySelector('#single_or_couple_id');
    var outputSingleOrCouple = singleOrCoupleSelect.value;
    document.getElementById("input_single_or_couple_id").setAttribute('value', outputSingleOrCouple)

    var email = document.getElementById('external_party_email_id').value;
    validateEmail(email)

    if (isEdit == 'true') {
        var id = localStorage.getItem('proj_id')
        await update_project(id);
    }
    else if (isEdit == 'false') {
        await add_project(outputStatus, outputSingleOrCouple);
    }
}

function getFullDate() {
    const date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var day = date.getDate();

    var fullDate = day + '/' + month + '/' + year;

    if (isEdit == 'true') {
        document.getElementById("update_time_id").value = fullDate;
        document.getElementById("update_time_id").innerHTML = fullDate;
    }

    if (isEdit == 'false') {
        document.getElementById("add_time_id").value = fullDate;
        document.getElementById('add_time_id').innerHTML = fullDate;
    }
}

async function receiving_the_information() {
    var english_name = localStorage.getItem('english_name_proj')
    var hebrew_name = localStorage.getItem('hebrew_name_proj')
    var details = localStorage.getItem('details_proj')
    var project_type = localStorage.getItem('type_proj')
    var status = localStorage.getItem('status_proj')
    var offer = localStorage.getItem('offer_proj')
    var date = localStorage.getItem('add_time_proj')
    var single_or_couple = localStorage.getItem('single_or_couple_proj')
    var external_factor = localStorage.getItem('external_factor_proj')
    var external_party_email = localStorage.getItem('external_party_email_proj')

    document.getElementById("pjt_eng_id").setAttribute('value', english_name)
    document.getElementById("pjt_hbw_id").setAttribute('value', hebrew_name)
    document.getElementById("details_id").value = details;
    document.getElementById("project_type_id").setAttribute('value', project_type)
    document.getElementById('status_id').value = status;
    document.getElementById("offer_id").setAttribute('value', offer)
    document.getElementById("add_time_id").setAttribute('value', date)
    document.getElementById('single_or_couple_id').value = single_or_couple;
    document.getElementById("external_factor_id").setAttribute('value', external_factor)
    document.getElementById("external_party_email_id").setAttribute('value', external_party_email);
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

async function update_project(id) {
    $.ajax({
        type: 'PUT',
        url: '/updatProject/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "name_english": $("#pjt_eng_id").val(),
            "name_hebrew": $("#pjt_hbw_id").val(),
            "details": $('#details_id').val(),
            "project_type": $('#project_type_id').val(),
            "status": $('#input_status_id').val(),
            "update_time": $('#update_time_id').val(),
            "single_or_couple": $('#input_single_or_couple_id').val(),
            "external_factor": $('#external_factor_id').val(),
            "external_party_email": $('#external_party_email_id').val()
        }),
        processData: false,
        encode: true,
        success: async function (data, textStatus, jQxhr) {
            var status = document.getElementById('input_status_id').value;
            var single_or_couple = document.getElementById('input_single_or_couple_id').value;
            if (status == 'close') {
                await add_project_id_to_students(id, single_or_couple);
            }
            else {
                location.href = "/home";
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

async function add_project(outputStatus, outputSingleOrCouple) {
    $.ajax({
        type: 'POST', 
        url: '/addproject',
        contentType: 'application/json',
        data: JSON.stringify({
            "name_english": $("#pjt_eng_id").val(),
            "name_hebrew": $("#pjt_hbw_id").val(),
            "details": $('#details_id').val(),
            "project_type": $('#project_type_id').val(),
            "status": outputStatus,
            "offer": $('#offer_id').val(),
            "add_time": $('#add_time_id').val(),
            "single_or_couple": outputSingleOrCouple,
            "external_factor": $('#external_factor_id').val(),
            "external_party_email": $('#external_party_email_id').val(),
            "mod_id": ""
        }),
        processData: false,
        encode: true,
        success: async function (data, textStatus, jQxhr) {
            await add_pro_to_mod(data._id, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//Add project id to the moderator
async function add_pro_to_mod(id_pjt, outputSingleOrCouple) {
    $.ajax({
        type: 'POST',
        url: '/addProjectToModerator/' + modID,
        contentType: 'application/json',
        data: JSON.stringify({
            "projectID": id_pjt,
        }),
        processData: false,
        encode: true,
        success: async function (data, textStatus, jQxhr) {
            await add_mod_to_pro(id_pjt, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//Add moderator id to the project
async function add_mod_to_pro(id_pjt, outputSingleOrCouple) {
    $.ajax({
        type: 'PUT', 
        url: '/updateIdModToProjet/' + id_pjt,
        contentType: 'application/json',
        data: JSON.stringify({
            "mod_id": modID
        }),
        success: async function (result) {
            await createGraedeDoc(id_pjt, "", "", "");
            await createGraedeDoc(id_pjt, "", "", "");
            await createGraedeDoc(id_pjt, "", "", "");

            await createSubDoc(id_pjt, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//Add project id to the student/s that work on it
async function add_project_id_to_students(id_pjt, single_or_couple) {
    let id_sdt = prompt("הכנס תז של הסטודנט שעושה פרוייקט זה", "");
    getSdtName(id_sdt, '', '');
    var isExist = localStorage.getItem('isExist')
    if (id_sdt == null || id_sdt == "" || isExist == 'no') {
        alert("חובה להכניס תז תקין של הסטודנט");
    } else {
        await createGraedeDoc(id_pjt, id_sdt, 1, single_or_couple);    //יצירת מסמך של ציון ושמירתו אצל הסטודנט
    }
    if (single_or_couple == 'couple') {
        let id_second_sdt = prompt("הכנס תז של הסטודנט הנוסף שעושה פרוייקט זה", "");
        getSdtName(id_second_sdt, '', '');
        var isExist = localStorage.getItem('isExist')
        if (id_second_sdt == null || id_second_sdt == "" || isExist == 'no') {
            alert("חובה להכניס תז תקין של הסטודנט");
        } else {
            localStorage.setItem("id_second_sdt", id_second_sdt)
            localStorage.setItem("num_for_sec_sdt", 2)

        }
    }
}


async function update_student_idPjt_and_grd(id_sdt, id_pjt, id_grd, num, single_or_couple) {
    if (single_or_couple == 'couple' || num == 1) {
        getSdtName(id_sdt, id_pjt, num);
    }
    $.ajax({
        type: 'PUT',
        url: '/updateStudentIdPjt/' + id_sdt,
        contentType: 'application/json',
        data: JSON.stringify({
            "id_pjt": id_pjt,
            "id_grade": id_grd
        }),
        success: async function (result) {
            if (num == 1) {
                await save_grade_id_doc(id_pjt, id_grd, single_or_couple);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//Create Grades document and save the id of pjt
async function createGraedeDoc(id_pjt, id_sdt, num, single_or_couple) {
    var idJdg, flag;
    if ((id_sdt == "") && (num == "")) {
        flag = true;
        idJdg = "";
    }
    else {
        flag = false;
        idJdg = 0;
    }
    $.ajax({
        type: 'POST', 
        url: '/createGrdDoc', 
        contentType: 'application/json',
        data: JSON.stringify({
            "id_project": id_pjt,
            "id_judge": idJdg,
            "alfa_rpt_grd": 0,
            "final_rpt_grd": 0,
            "final_grd_pjt": 0
        }),
        processData: false,
        encode: true,
        success: async function (result) {
            if (!flag) {
                await update_student_idPjt_and_grd(id_sdt, id_pjt, result, num, single_or_couple);
            }
            else {
                await save_grade_id_doc(id_pjt, result, single_or_couple);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//שומר
async function save_grade_id_doc(id_pjt, id_grade_doc, single_or_couple) {
    $.ajax({
        type: 'POST',
        url: '/saveGrdInPjt/' + id_pjt,
        contentType: 'application/json',
        data: JSON.stringify({
            "GradeID": id_grade_doc,
        }),
        processData: false,
        encode: true,
        success: async function (result) {
            if (isEdit == 'true') {
                var id_second_sdt = localStorage.getItem("id_second_sdt")
                var num = localStorage.getItem("num_for_sec_sdt")
                await update_student_idPjt_and_grd(id_second_sdt, id_pjt, id_grade_doc, num, single_or_couple);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//Create Subs document and save the id of pjt
async function createSubDoc(id_pjt, outputSingleOrCouple) {
    $.ajax({
        type: 'POST',
        url: '/createSubDoc', 
        contentType: 'application/json',
        data: JSON.stringify({
            "id_project": id_pjt,
            "prop_rpt_sub": "",
            "alfa_rpt_sub": "",
            "beta_rpt_sub": "",
            "final_rpt_sub": ""
        }),
        processData: false,
        encode: true,
        success: async function (result) {
            await save_sub_id_doc(id_pjt, result, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//שומר את האיידי של המסמך בפרויקט
async function save_sub_id_doc(id_pjt, id_sub_doc, outputSingleOrCouple) {
    $.ajax({
        type: 'PUT', 
        url: '/saveSubInPjt/' + id_pjt,
        contentType: 'application/json',
        data: JSON.stringify({
            "SubRptID": id_sub_doc
        }),
        success: async function (result) {
            await createActivePjts(id_pjt, outputSingleOrCouple);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//מייצר מסמך עבור טבלת פרויקטים פעילים 
async function createActivePjts(idPjt, outputSingleOrCouple) {
    if (outputSingleOrCouple == 'single') {
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/crtActvPjts', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "idPjt": idPjt,
                "pjtName": $("#pjt_hbw_id").val(),
                "modName": $('#offer_id').val(),
                "jdgName1": "",
                "jdgName2": "",
                "jdgName3": "",
                "sdtName1": ""
            }),
            processData: false,
            encode: true,
            success: function (result) {
                localStorage.setItem("data", data);
                localStorage.setItem('modID', modID);
                localStorage.setItem('name', nameMod)
                location.href = "/assigAndsubDats";
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }
    else {
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/crtActvPjts', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "idPjt": idPjt,
                "pjtName": $("#pjt_hbw_id").val(),
                "modName": $('#offer_id').val(),
                "jdgName1": "",
                "jdgName2": "",
                "jdgName3": "",
                "sdtName1": "",
                "sdtName2": ""
            }),
            processData: false,
            encode: true,
            success: function (result) {
                localStorage.setItem('name', nameMod)
                localStorage.setItem("data", data);
                location.href = "/assigAndsubDats";
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

}

async function getSdtName(idSdt, idPjt, num) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/student/' + idSdt,
        success: async function (result) {
            if (idPjt == '') {
                if (result[0] == undefined) {
                    localStorage.setItem('isExist', 'no')
                }
                else {
                    localStorage.setItem('isExist', 'yes')
                }
            }
            else {
                var Fname = result[0].sdt_firstName;
                var Lname = result[0].sdt_lastName;
                var name = Fname + " " + Lname;

                await updateActvPjts(name, idPjt, num);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

async function updateActvPjts(name, idPjt, num) {
    // alert(name)
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: '/updateActvPjts/' + idPjt,
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "num": num
        }),
        success: function (result) {
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}