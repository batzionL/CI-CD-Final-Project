function randJudges() {
    const judges = [];
    const judgeSelectionCount = {}; // Object to track selection count for each judge
    $.ajax({
        type: 'GET',
        url: '/getmoderators',
        success: function (result) {
            // console.log('mod - result - ', result)
            for (let i = 0; i < result.length; i++) {
                judges.push(result[i]._id);
                judgeSelectionCount['Judge ' + i] = 0; // Initialize selection count for each judge
            }
            // console.log('judgeSelectionCount1')
            // console.log(judgeSelectionCount1)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    // console.log('judgeSelectionCount1')
    // console.log(judgeSelectionCount)
    // console.log('judges - ', judges)

    const projectsJudges = [];
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/projects',
        success: function (result) {
            // console.log('pjt - result - ', result)
            for (let i = 0; i < result.length; i++) {
                const shuffledJudges = judges.sort(() => Math.random() - 0.5);
                // Select the first 3 judges for each project
                const selectedJudges = shuffledJudges.slice(0, 3);
                // console.log('')

                for (let k = 0; k < shuffledJudges.length; k++) {
                    const judge = shuffledJudges[k];
                    if (judgeSelectionCount[judge] < 3) { // Check if the judge can be selected
                        selectedJudges.push(judge);
                        judgeSelectionCount[judge]++; // Increment selection count for the judge
                        if (selectedJudges.length === 3) break; // If 3 judges are selected, break the loop
                    }
                }
                // console.log('judgeSelectionCount2 - ', judgeSelectionCount)
                // console.log('selectedJudges - ', selectedJudges)
                // Store the selected judges for this project
                projectsJudges.push(selectedJudges);
                // console.log('projectsJudges - ', projectsJudges)
                // console.log(result[i]._id)

                //הוספת האיידי של הפרויקט לשופטים
                add_pjt_to_judge(result[i]._id, selectedJudges[0]);
                add_pjt_to_judge(result[i]._id, selectedJudges[1]);
                add_pjt_to_judge(result[i]._id, selectedJudges[2]);

                //הוספת האיידי של השופטים לפרויקט
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


//Adding project's id to array in judge
function add_pjt_to_judge(id_pjt, id_judge) {
    // console.log('add_pjt_to_judge: pjt - ', id_pjt, ' judge - ', id_judge)
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addProjectToJudge/' + id_judge, // the url where we want to POST
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

//פונקציה המוסיפה לשופט את המסמכים הקשורים לפרויקט שהוא שופט
function add_judge_grd(id_judge, grade) {
    // console.log('add_judge_grd: judge - ', id_judge, ' grade - ', grade)
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (GET for our form)
        url: '/addJudgeGrd/' + id_judge,
        contentType: 'application/json',
        data: JSON.stringify({
            "id_grade": grade
        }),
        success: function (result) {
            //הוספת איידי של שופט לטופס הציון של הפרויקט שהוא שופט
            add_grd_judge(id_judge, grade);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//Adding the judge's id to the project
function add_judge_to_pjt(id_pjt, id_judge) {
    // console.log('add_judge_to_pjt: pjt - ', id_pjt, ' judge - ', id_judge)
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addJudgesToProject/' + id_pjt, // the url where we want to POST
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
    // console.log('add_grd_judge: judge - ', id_judge, ' grade - ', id_grade)
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (PUT for our form)
        url: '/updateGrdDocId/' + id_grade, // the url where we want to PUT
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
    // console.log('getNameJdg: pjt - ', idPjt, ' judge - ', idJdg, ' num - ', num)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/getModByIdDoc/' + idJdg,
        success: function (result) {
            // console.log('result - ')
            // console.log(result)
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
    // console.log('addJdgIdToActvPjts: pjt - ', idPjt, ' name - ', name, ' num - ', num)
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
        url: '/addJdgNameToActvPjts/' + idPjt, // the url where we want to POST
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
    // console.log('getPjt: pjt - ', id, ' judge - ', judges)
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + id,
        success: function (result) {
            var grades = result[0].Grades_arr;
            //הוספת האיידי של טפסי הציונים לשופטים - אחד לכל שופט
            add_judge_grd(judges[0], grades[0]);
            add_judge_grd(judges[1], grades[1]);
            add_judge_grd(judges[2], grades[2]);
            // location.href = "/assigAndsubDats";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function createTable() {
    // Create a table element
    var table = document.createElement("table");
    table.setAttribute("id", "dynamicTable");  // Set an ID for the table
    var headerTexts = ["שם פרויקט", "מנחה", "שופטים", "סטודנט/ים"];
    // Create table header
    var headerRow = table.insertRow();
    for (var j = 0; j < headerTexts.length; j++) {
        var headerCell = document.createElement("th");
        headerCell.textContent = headerTexts[j];
        headerRow.appendChild(headerCell);
    }

    // Append the table to the container element
    var container = document.getElementById("tableContainer");
    container.innerHTML = "";
    container.appendChild(table);

    // Fetch data and populate the table
    $.ajax({
        url: '/actvPjtsList',
        type: 'GET',
        success: function (data) {
            $.each(data, function (index, value) {  // Save the params and append on the table
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