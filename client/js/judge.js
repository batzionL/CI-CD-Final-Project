function randJudges() {
    const judges = [];
    const judgeSelectionCount = {}; 
    $.ajax({
        type: 'GET',
        url: 'api/getmoderators',
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                judges.push(result[i]._id);
                judgeSelectionCount['Judge ' + i] = 0; 
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


    const projectsJudges = [];
    $.ajax({
        type: 'GET',
        url: 'api/projects',
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                const shuffledJudges = judges.sort(() => Math.random() - 0.5);
                const selectedJudges = shuffledJudges.slice(0, 3);

                for (let k = 0; k < shuffledJudges.length; k++) {
                    const judge = shuffledJudges[k];
                    if (judgeSelectionCount[judge] < 3) {
                        selectedJudges.push(judge);
                        judgeSelectionCount[judge]++; 
                        if (selectedJudges.length === 3) break; 
                    }
                }
                projectsJudges.push(selectedJudges);
                add_pjt_to_judge(result[i]._id, selectedJudges[0]);
                add_pjt_to_judge(result[i]._id, selectedJudges[1]);
                add_pjt_to_judge(result[i]._id, selectedJudges[2]);

                add_judge_to_pjt(result[i]._id, selectedJudges[0]);
                add_judge_to_pjt(result[i]._id, selectedJudges[1]);
                add_judge_to_pjt(result[i]._id, selectedJudges[2]);

                getNameJdg(result[i]._id, selectedJudges[0], 1);
                getNameJdg(result[i]._id, selectedJudges[1], 2);
                getNameJdg(result[i]._id, selectedJudges[2], 3);

                getPjt(result[i]._id, selectedJudges);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function add_pjt_to_judge(id_pjt, id_judge) {
    $.ajax({
        type: 'POST',
        url: 'api/addProjectToJudge/' + id_judge,
        contentType: 'application/json',
        data: JSON.stringify({
            "projectID": id_pjt
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function add_judge_grd(id_judge, grade) {
    $.ajax({
        type: 'POST',
        url: 'api/addJudgeGrd/' + id_judge,
        contentType: 'application/json',
        data: JSON.stringify({
            "id_grade": grade
        }),
        success: function (result) {
            add_grd_judge(id_judge, grade);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function add_judge_to_pjt(id_pjt, id_judge) {
    $.ajax({
        type: 'POST', 
        url: 'api/addJudgesToProject/' + id_pjt,
        contentType: 'application/json',
        data: JSON.stringify({
            "JudgeID": id_judge,
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function add_grd_judge(id_judge, id_grade) {
    $.ajax({
        type: 'PUT', 
        url: 'api/updateGrdDocId/' + id_grade, 
        contentType: 'application/json',
        data: JSON.stringify({
            "id_judge": id_judge
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function getNameJdg(idPjt, idJdg, num) {
    $.ajax({
        type: 'GET', 
        url: 'api/getModByIdDoc/' + idJdg,
        success: function (result) {
            var Fname = result[0].mod_firstName;
            var Lname = result[0].mod_lastName;
            var name = Fname + " " + Lname;
            addJdgIdToActvPjts(idPjt, name, num)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function addJdgIdToActvPjts(idPjt, name, num) {
    $.ajax({
        type: 'PUT', 
        url: 'api/addJdgNameToActvPjts/' + idPjt, 
        contentType: 'application/json',
        data: JSON.stringify({
            "jdgName": name,
            "num": num
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function getPjt(id, judges) {
    $.ajax({
        type: 'GET',
        url: 'api/project/' + id,
        success: function (result) {
            var grades = result[0].Grades_arr;
            console.log('DEBUG getPjt: Project grades:', grades, 'Judges:', judges);
            if (grades && grades.length >= 3) {
                add_judge_grd(judges[0], grades[0]);
                add_judge_grd(judges[1], grades[1]);
                add_judge_grd(judges[2], grades[2]);
            } else {
                console.error('ERROR: Project does not have 3 grade documents. Grades:', grades);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function createTable() {
    var table = document.createElement("table");
    table.setAttribute("id", "dynamicTable"); 
    var headerTexts = ["Project name", "Moderator", "Judges", "Student/s"];
    var headerRow = table.insertRow();
    for (var j = 0; j < headerTexts.length; j++) {
        var headerCell = document.createElement("th");
        headerCell.textContent = headerTexts[j];
        headerRow.appendChild(headerCell);
    }

    var container = document.getElementById("tableContainer");
    container.innerHTML = "";
    container.appendChild(table);

    $.ajax({
        url: 'api/actvPjtsList',
        type: 'GET',
        success: function (data) {
            $.each(data, function (index, value) {  
                if (value.pjtName && value.modName && value.jdgName1 && value.jdgName2 && value.jdgName3 && value.sdtName1) {
                    var sdt2 = value.sdtName2 ? ', ' + value.sdtName2 : '';
                    var row = table.insertRow();
                    row.insertCell().textContent = value.pjtName;
                    row.insertCell().textContent = value.modName;
                    row.insertCell().textContent = value.jdgName1 + ', ' + value.jdgName2 + ', ' + value.jdgName3;
                    row.insertCell().textContent = value.sdtName1 + sdt2;
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });
}