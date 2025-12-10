jQuery(function ($) {
    var data = localStorage.getItem("data");
    localStorage.setItem("data", data);

    var addProjBtn = document.getElementById("addProjectBtn");
    var addStudentBtn = document.getElementById("addStudentBtn")
    var addModeratorBtn = document.getElementById("addModeratorBtn")
    var updateDatesBtn = document.getElementById("updateDatesBtn");
    var allProjectsListBtnBtn = document.getElementById("allProjectsListBtn");
    var monitoringTblBtn = document.getElementById('monitoringTblBtn');
    var projectsListBtn = document.getElementById('projectsListBtn');
    var judgesAndPjctsBtn = document.getElementById('judgesAndPjctsBtn');

    if (data === "student") {
        monitoringTblBtn.textContent  = "טבלת מעקב";
        addProjBtn.style.display = "none";
        addStudentBtn.style.display = "none";
        addModeratorBtn.style.display = 'none';
        updateDatesBtn.style.display = "none";
        allProjectsListBtnBtn.style.display = "none";
        judgesAndPjctsBtn.style.display = "none";
        projectsListBtn.textContent = 'Projects List';
    }

    else if (data === "moderator") {
        addStudentBtn.style.display = "none";
        addModeratorBtn.style.display = 'none';
        updateDatesBtn.style.display = "none";
        judgesAndPjctsBtn.style.display = "none";
        allProjectsListBtnBtn.style.display = "none";
    }

    localStorage.setItem("data", data);
    getDates();
});

function addProject() {
    var modID = localStorage.getItem("modID");
    localStorage.setItem("modID", modID);
    localStorage.setItem("isEdit", 'false');
    var name = localStorage.getItem("name");
    localStorage.setItem("name", name);
    window.location.href = "/addproject";
}

function monitoringTbl() {
    var data = localStorage.getItem("data");
    var id;
    if (data === "student") {
        id = localStorage.getItem("stdID");
        localStorage.setItem('stdID', id);
        localStorage.setItem('idOfPjt', '')
    }
    else {
        id = localStorage.getItem("modID");
        localStorage.setItem('modID', id);
        localStorage.setItem('secData', 'judge')
    }


    window.location.href = "/Monitoring";
}

function projectsList() {
    var modID = localStorage.getItem("modID");
    localStorage.setItem("modID", modID);
    var name = localStorage.getItem("name")
    localStorage.setItem("name", name);
    localStorage.setItem("All", "not all");
    window.location.href = "/home";
}

function downloadReports() {
    window.location.href = "/template";
}

function addStudent() {
    window.location.href = "/addstudent";
}

function addModerator() {
    window.location.href = "/addmoderator";
}

function updateDates() {
    window.location.href = "/updateDates";
}

function allProjectsList() {
    localStorage.setItem("All", "all");
    var name = localStorage.getItem("name")
    localStorage.setItem("name", name);
    window.location.href = "/home";
}

function judgesAndPjcts() {
    window.location.href = "/judge";
}

//This function shows the submission dates of the reports and the project
function getDates() {
    var prop = document.getElementById("proposal_id");
    var alfa = document.getElementById("alpha_id");
    var beta = document.getElementById("beta_id");
    var final = document.getElementById("final_id");
    var present = document.getElementById("presentation_id");

    $.ajax({
        type: 'GET',
        url: '/getdates',
        success: function (result) {
            $.each(result, function (index, value) {
                if ("propRpt" in value) {
                    prop.innerHTML = value.propRpt;
                }
                if ("alfaRpt" in value) {
                    alfa.innerHTML = value.alfaRpt;
                }
                if ("betaRpt" in value) {
                    beta.innerHTML = value.betaRpt;
                }
                if ("finalRpt" in value) {
                    final.innerHTML = value.finalRpt;
                }
                if ("presentation" in value) {
                    present.innerHTML = value.presentation;
                }
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}