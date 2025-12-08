const id_sdt = localStorage.getItem('stdID');
const id_mod = localStorage.getItem('modID');
const data = localStorage.getItem("data");
const secData = localStorage.getItem("secData");
const idOfSubRpt = localStorage.getItem("idOfSubRpt");
const idOfPjt = localStorage.getItem("idOfPjt");
var alfaIndex = 0;
var finalRptIndex = 0;
var finalPjtIndex = 0;
var alfaSumGrd = 0;
var finalRptSumGrd = 0;
var finalPjtSumGrd = 0;

jQuery(function ($) {
    // console.log('data - ', data)
    // var csvRpt = document.getElementById('csvId')
    var checkelm = document.getElementById("rptsH1");
    if (checkelm === null) {
        // console.log('in null')
        document.getElementById('lblStatusProp').innerHTML = "";
        document.getElementById('lblStatusAlfa').innerHTML = "";
        document.getElementById('lblStatusBeta').innerHTML = "";
        document.getElementById('lblStatusFinal').innerHTML = "";

        //הצגת דוחות שללא ציון
        var elements = document.getElementsByName("nonGrade");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "ללא ציון";
        }

        if (data === "moderator" || data === "coordinator") {
            document.getElementById("upload_file").innerHTML = "הורדת מסמך";
            document.getElementById("weighted_score").innerHTML = "נתינת ציון";

            if (secData === "notJudge") {
                // console.log('mod not judge')

                var elements = document.querySelectorAll('.uploadForm');
                elements.forEach(function (element) {
                    element.style.display = "none";
                });

                var elements = document.querySelectorAll('[id="downloadForm"]');
                elements.forEach(function (element) {
                    element.style.display = "inherit";
                });
                showDetailsForMod();
            }

            else if (secData === 'judge') {
                // console.log('mod judge')
                var hiddenElements = $("[style='display: none;']");
                // Show all hidden elements
                hiddenElements.each(function () {
                    $(this).css("display", "inherit"); // Change display style to make them visible
                });
                $(".uploadForm").hide();

                var elements = document.querySelectorAll('[name="subRptTbl"]');
                // Loop through each element and hide it
                elements.forEach(function (element) {
                    element.style.display = 'none';
                });

                // showDetailsForMod('jdg')
            }
        }


        if (data === "student") {
            // console.log('datattt - ', data)
            var elements = document.querySelectorAll('[name="subRptTbl"]');
            // Loop through each element and hide it
            elements.forEach(function (element) {
                element.style.display = 'none';
            });
            getIdPjt();
            beforeGetAvgGrds(id_sdt);
        }
    }

    else {
        if (data !== "coordinator") {
            var elements = document.querySelectorAll('.uploadForm');
            elements.forEach(function (element) {
                element.style.display = "none";
            });
            var elements = document.querySelectorAll('[id="downloadForm"]');
            elements.forEach(function (element) {
                element.style.visibility = "visible";
            });
            // csvRpt.style.display = "none";
        }
    }

});

function getIdPjt() {
    // console.log('id_pjt - ', idOfPjt)
    var idPjt;
    $.ajax({
        type: 'GET',
        url: '/getstudents',
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].sdt_ID == id_sdt) {
                    idPjt = result[i].id_pjt;
                    break;
                }
            }

            var prop = document.getElementById('propUpload');//.id = 'idPjt';
            prop.id = idPjt;
            var alfa = document.getElementById('alfaUpload');//.id = 'idPjt';
            alfa.id = idPjt;
            var beta = document.getElementById('betaUpload');//.id = 'idPjt';
            beta.id = idPjt;
            var final = document.getElementById('finalUpload');//.id = 'idPjt';
            final.id = idPjt;
            // console.log('id_pjt - ', prop.id)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function proposal_upload(id) {
    // console.log('id - ', id)
    if (data === "student") {
        // id = id_sdt;
        checkIfStudentUploadedRpt(id_sdt, 'prop');
    }
    if (id.startsWith("00")) {
        checkUploadTnplt('prop')
    }
    const formData = new FormData();  // Create a new FormData object
    // Assuming 'fileInput' is the id of file input element
    const file = document.getElementById('propFileInput').files[0];
    const fileName = 'proposal_rpt-' + id + '.pdf';
    // Append the file to the formData
    formData.append('proposal_rpt', file);//, fileName);
    $.ajax({
        url: '/uploadProposalRep/' + id + '/' + fileName,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            alert('הקובץ הועלה בהצלחה!')
            if (!data.propos_rpt_id.startsWith("00")) {
                updateSdtIdRpt(id_sdt, data._id, 'prop', false);
            }
        }
    });
}

function alfa_upload(id) {
    if (data === "student") {
        // id = id_sdt;
        checkIfStudentUploadedRpt(id_sdt, 'alfa');
    }
    if (id.startsWith("00")) {
        checkUploadTnplt('alfa')
    }
    const formData = new FormData();  // Create a new FormData object
    // Assuming 'fileInput' is the id of file input element
    const file = document.getElementById('alfaFileInput').files[0];
    const fileName = 'alfa_rpt-' + id + '.pdf';
    // Append the file to the formData
    formData.append('alfa_rpt', file);
    $.ajax({
        url: '/uploadAlfaRep/' + id + '/' + fileName,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            alert('הקובץ הועלה בהצלחה!')
            if (!data.alfa_rpt_id.startsWith("00")) {
                updateSdtIdRpt(id_sdt, data._id, 'alfa', false);
            }
        }
    });
}

function beta_upload(id) {
    if (data === "student") {
        // id = id_sdt;
        checkIfStudentUploadedRpt(id, 'beta');
    }
    if (id.startsWith("00")) {
        checkUploadTnplt('beta')
    }
    const formData = new FormData();  // Create a new FormData object
    // Assuming 'fileInput' is the id of file input element
    const file = document.getElementById('betaFileInput').files[0];
    // Set the desired filename (you can modify this part)
    const fileName = 'beta_rpt-' + id + '.pdf';
    // Append the file to the formData
    formData.append('beta_rpt', file);
    $.ajax({
        url: '/uploadBetaRep/' + id + '/' + fileName,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            alert('הקובץ הועלה בהצלחה!')
            if (!data.beta_rpt_id.startsWith("00")) {
                updateSdtIdRpt(id_sdt, data._id, 'beta', false);
            }
        }
    });
}

function final_upload(id) {
    if (data === "student") {
        // id = id_sdt;
        checkIfStudentUploadedRpt(id, 'final');
    }
    if (id.startsWith("00")) {
        checkUploadTnplt('final')
    }
    const formData = new FormData();  // Create a new FormData object
    // Assuming 'fileInput' is the id of file input element
    const file = document.getElementById('finalFileInput').files[0];
    const fileName = 'final_rpt-' + id + '.pdf';
    // Append the file to the formData
    formData.append('final_rpt', file);
    $.ajax({
        url: '/uploadFinalRep/' + id + '/' + fileName,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            alert('הקובץ הועלה בהצלחה!')
            if (!data.final_rpt_id.startsWith("00")) {
                updateSdtIdRpt(id_sdt, data._id, 'final', false);
            }
        }
    });
}

//בדיקה אם הסטודנט העלה את הדוח הזה. אם כן אז מחיקתו והעלאת הדוח המחודש
function checkIfStudentUploadedRpt(id, nameRpt) {
    $.ajax({
        type: 'GET',
        url: '/student/' + id,
        success: function (result) {
            // console.log(result[0])
            var rpt;
            if (nameRpt === 'prop') {
                rpt = result[0].id_prop_rpt;
            }
            if (nameRpt === 'alfa') {
                rpt = result[0].id_alfa_rpt;
            }
            if (nameRpt === 'beta') {
                rpt = result[0].id_beta_rpt;
            }
            if (nameRpt === 'final') {
                rpt = result[0].id_final_rpt;
            }
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
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function checkUploadTnplt(nameRpt) {
    $.ajax({
        type: 'GET',
        url: '/checkRptUpload/' + nameRpt,
        success: function (result) {
            // console.log(result[0])
            if (result[0] != undefined) {
                dltRptTlt(nameRpt)
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function dltRptTlt(nameRpt) {
    $.ajax({
        url: "/deleteRptTlt/" + nameRpt,
        type: 'DELETE',
        success: function (data) {
            // location.reload();
        },
        error: function (err) {
            console.log("err", err);
        }
    });
}

function updateSdtIdRpt(id, idRpt, nameRpt, flag) {
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: '/saveIdRptInSdt/' + id + '/' + nameRpt,
        contentType: 'application/json',
        data: JSON.stringify({
            "id_prop_rpt": idRpt,
            "id_alfa_rpt": idRpt,
            "id_beta_rpt": idRpt,
            "id_final_rpt": idRpt
        }),
        success: function (result) {
            // console.log(result[0].)
            if (!flag) {
                checkIfSdtHasCouple(result.id_pjt, id, idRpt, nameRpt)
            }

            // alert('הדוח עלה בהצלחה');
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function checkIfSdtHasCouple(idPjt, idSdt, idRpt, nameRpt) {
    $.ajax({
        type: 'GET',
        url: '/project/' + idPjt,
        success: function (result) {
            if (result[0].single_or_couple == "couple") {
                $.ajax({
                    type: 'GET',
                    url: '/getstudents',
                    success: function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if ((result[i].id_pjt == idPjt) && (result[i].sdt_ID != idSdt)) {
                                updateSdtIdRpt(result[i].sdt_ID, idRpt, nameRpt, true);
                            }
                        }
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function downloadFile(fileId, rpt) {
    // console.log('download - fileId', fileId)
    // console.log('download - rpt', rpt)
    // alert('check')
    var path = rpt + '-' + fileId + '.pdf';
    var form = document.getElementById('downloadForm');
    form.action = '/download-file/' + path;
    form.submit();
}

//מקשרת כפתור לפרויקט
function loadPjt(idBtn) {//
    // console.log(idBtn)
    getIdModOfDoc(id_mod);
    $.ajax({
        type: 'GET',
        url: '/getModeratorProjectsJudge/' + id_mod + "/" + idBtn,
        success: function (result) {
            //מקבלים בתשובה את האיידי של הפרויקט
            // console.log(id_mod)
            // alert("moderatorProjects")
            if (result == "" || result == undefined) {
                // console.log('result is undefined or empty')
                alert("לא קיים פרויקט")
            }
            else {
                localStorage.setItem('id_pjt', result);

                $.ajax({
                    type: 'GET',
                    url: '/project/' + result,
                    success: function (result) {
                        var name = result[0].name_hebrew;
                        document.getElementById("namePjt").innerHTML = "שם הפרויקט: " + name;
                        var jdgIdDoc = localStorage.getItem('jdgIdDoc');
                        // console.log('modGrdsArr - ', modGrdsArr[0])
                        showDetails(jdgIdDoc, result[0].Grades_arr, result[0].sub_rpt_id, result[0]._id);
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//מחזיר את האיידי של ההמסמך של השופט
function getIdModOfDoc(id) {
    $.ajax({
        type: 'GET',
        url: '/moderator/' + id,
        success: function (result) {
            localStorage.setItem('jdgIdDoc', result[0]._id);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function showDetails(jdgIdDoc, gradesArrPjt, subRptId, idPjt) {
    for (var i = 0; i < 3; i++) {
        getGrd(gradesArrPjt[i], jdgIdDoc);
    }
    getSub(subRptId);
    AttachStudentRptToBtn(idPjt);
}

//מחזיר את מסמך הציון הרצוי
function getGrd(id_grade, jdgIdDoc) {
    document.getElementById('lblGrdAlfa').innerHTML = "";
    document.getElementById('lblGrdFinal').innerHTML = "";
    document.getElementById('lblGrdFinalPjt').innerHTML = "";
    // console.log('id_grade - ', id_grade)
    // if (result[0].id_judge == jdgIdDoc) {
    $.ajax({
        type: 'GET',
        url: '/getGrdDoc/' + id_grade,
        success: function (result) {
            // console.log('result - ', result);
            if (result[0].id_judge == jdgIdDoc) {
                $.each(result, function (index, value) {
                    if ("alfa_rpt_grd" in value) {
                        document.getElementById('lblGrdAlfa').innerHTML = value.alfa_rpt_grd;
                    }
                    if ("final_rpt_grd" in value) {
                        document.getElementById('lblGrdFinal').innerHTML = value.final_rpt_grd;
                    }
                    if ("final_grd_pjt" in value) {
                        document.getElementById('lblGrdFinalPjt').innerHTML = value.final_grd_pjt;
                    }
                });
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getSub(id_sub) {

    $.ajax({
        type: 'GET',
        url: '/getSubDoc/' + id_sub,
        success: function (result) {
            if (result[0].prop_rpt_sub != "") {
                document.getElementById('lblStatusProp').innerHTML = "הדוח אושר";
            }
            if (result[0].alfa_rpt_sub != "") {
                document.getElementById('lblStatusAlfa').innerHTML = "הדוח אושר";
            }
            if (result[0].beta_rpt_sub != "") {
                document.getElementById('lblStatusBeta').innerHTML = "הדוח אושר";
            }
            if (result[0].final_rpt_sub != "") {
                document.getElementById('lblStatusFinal').innerHTML = "הדוח אושר";
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function showDetailsForMod() {
    // if (typeEnter == '') {
        AttachStudentRptToBtn(idOfPjt);
    // }

    var sdtId = localStorage.getItem('sdtId')
    beforeGetAvgGrds(sdtId)
}

//הצמדת דוח של סטודנט לכפתור
function AttachStudentRptToBtn(idPjt) {
    // console.log('idPjt - ', idPjt)
    $.ajax({
        type: 'GET',
        url: '/getstudents',
        success: function (result) {
            // console.log('rslt - ', result)
            var index;
            for (var i = 0; i < result.length; i++) {
                if (result[i].id_pjt == idPjt) {
                    index = i;
                    break;
                }
            }

            var propRptId = document.getElementById('propDownload');
            propRptId.setAttribute("id", idPjt);

            var alfaRptId = document.getElementById('alfaDownload');
            alfaRptId.setAttribute("id", idPjt);

            var betaRptId = document.getElementById('betaDownload');
            betaRptId.setAttribute("id", idPjt);

            var finalRptId = document.getElementById('finalDownload');
            finalRptId.setAttribute("id", idPjt);

            localStorage.setItem('sdtId', result[index].sdt_ID)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//אישור דוח
function saveSubRpt(idBtn) {
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: '/saveSub/' + idOfSubRpt,
        contentType: 'application/json',
        data: JSON.stringify({
            "idBtn": idBtn
        }),
        success: function (result) {
            alert("האישור נשלח");
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//נתינת ציון
function grade(idBtn) {
    getDates();
    var id_pjt = localStorage.getItem('id_pjt')

    var grade = prompt("הכנס ציון:", "");
    if (grade < 0 || grade > 100) {
        alert("הזן רק מספרים");
    }
    else {
        // מביאים את שני המערכים של מסמכי הציונים - מהשופט ומהפרויקט- המסמך הקיים בשני המערכים הוא המסמך ששם צריך לשנות את הציון
        $.ajax({
            type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
            url: '/getGradeIdDoc/' + id_mod,
            success: function (result) {
                // console.log('array - ', result)
                var grdsFromMod = result;
                $.ajax({
                    type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
                    url: '/getGradeId/' + id_pjt,
                    success: function (result) {
                        var grdsFromPjt = result;

                        grdsFromMod.forEach(element => {
                            const index = grdsFromPjt.indexOf(element);
                            if (index !== -1) {
                                saveGrd(grdsFromPjt[index], idBtn, grade);
                            }
                        });
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}

function saveGrd(id, idBtn, grade) {
    if (grade % 1 !== 0) {
        const intGrd = parseInt(grade);
        grade = intGrd + 1;
    }

    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (GET for our form)
        url: '/saveGrade/' + id,
        contentType: 'application/json',
        data: JSON.stringify({
            "grd": grade,
            "idBtn": idBtn
        }),
        success: function (result) {
            // alert("הציון נשמר בהצלחה");
            if (idBtn === "alfa") {
                document.getElementById("lblGrdAlfa").innerHTML = grade;
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

/////שמירת ציונים לתלמיד
function beforeGetAvgGrds(idSdt) {
    // console.log("beforeGetAvgGrds - ", idSdt);

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/student/' + idSdt,
        success: function (result) {
            // if (secData === 'notJudge') {
                checkGrdForSdt(result[0].id_grade);
            // }
            checkRptSub(result[0]);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function checkRptSub(student) {
    var prop = document.getElementById('lblStatusProp');
    var alfa = document.getElementById('lblStatusAlfa');
    var beta = document.getElementById('lblStatusBeta');
    var final = document.getElementById('lblStatusFinal');

    // $.ajax({
    //     type: 'GET',
    //     url: '/getGrdDoc/' + idGrd,
    //     success: function (result) {

    //     },
    //     error: function (jqXhr, textStatus, errorThrown) {
    //         console.log(errorThrown);
    //     }
    // });

    if (student.id_prop_rpt != "") {
        prop.innerHTML = 'הדוח הוגש';
    }
    if (student.id_alfa_rpt != "") {
        alfa.innerHTML = 'הדוח הוגש';
    }
    if (student.id_beta_rpt != "") {
        beta.innerHTML = 'הדוח הוגש';
    }
    if (student.id_final_rpt != "") {
        final.innerHTML = 'הדוח הוגש';
    }
}

//בדיקה אם כבר נשמרו חלק מהציונים לסטודנט
function checkGrdForSdt(idGrd) {
    $.ajax({
        type: 'GET',
        url: '/getGrdDoc/' + idGrd,
        success: function (result) {
            if (result[0].alfa_rpt_grd == undefined ||
                result[0].final_rpt_grd == undefined ||
                result[0].final_grd_pjt == undefined) {
                getGrdsArrFromPjt(result[0].id_project, idGrd);
            }
            else {
                showDetailsForSdt(result[0].id_project, idGrd);
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function showDetailsForSdt(id_pjt, id_grd) {
    getGrd(id_grd);

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + id_pjt,
        success: function (result) {
            getSub(result[0].sub_rpt_id);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//הפןנקציה מקבל איידי של פרוייקט ומחזירה את מערך האיידי'ס של הציונים
function getGrdsArrFromPjt(idPjt, idGrdOfSdt) {

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (GET for our form)
        url: '/project/' + idPjt,
        success: function (result) {
            var gradesIdArr = result[0].Grades_arr;
            for (var i = 0; i < gradesIdArr.length; i++) {
                getGradesForSdt(gradesIdArr[i], idGrdOfSdt);
            }
            getSub(result[0].sub_rpt_id)
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}


function getGradesForSdt(gradeId, idGrdOfSdt) {
    $.ajax({
        type: 'GET',
        url: '/getGrdDoc/' + gradeId,
        success: function (result) {
            var alfaGrd = result[0].alfa_rpt_grd;
            var finalRGrd = result[0].final_rpt_grd;
            var finalPGrd = result[0].final_grd_pjt;

            if (alfaGrd != undefined) {
                alfaSumGrd += result[0].alfa_rpt_grd;
                alfaIndex++;
                if (alfaIndex == 3) {
                    saveGrd(idGrdOfSdt, "alfa", alfaSumGrd / 3);
                }
            }
            if (finalRGrd != undefined) {
                finalRptSumGrd += result[0].final_rpt_grd;
                finalRptIndex++;
                if (finalRptIndex == 3) {
                    saveGrd(idGrdOfSdt, "final", finalRptSumGrd / 3);
                }
            }
            if (finalPGrd != undefined) {
                finalPjtSumGrd += result[0].final_grd_pjt;
                finalPjtIndex++;
                if (finalPjtIndex == 3) {
                    saveGrd(idGrdOfSdt, "finalPGrd", finalPjtSumGrd / 3);
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function home() {
    // console.log("hi")
    // window.location.href = "http://localhost:3000/home";

    window.location.href = "/assigAndsubDats";
}