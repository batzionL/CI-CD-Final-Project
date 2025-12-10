jQuery(function ($) {
    var subDates = this.getElementById('subDates');
    if(subDates && subDates.id === "subDates"){
        var elements = document.getElementsByName("previousDate");
        for(var i = 0; i < elements.length; i++) {
            elements[i].readOnly = true;
        }
        showPrevDates()
    }
    else{
        getDates();
    }
});

function showPrevDates() {
    var prevProp = document.getElementById('prevProp');
    var prevAlfa = document.getElementById('prevAlfa');
    var prevBeta = document.getElementById('prevBeta');
    var prevFinal = document.getElementById('prevFinal');
    var prevPresnt = document.getElementById('prevPresnt');
    $.ajax({
        url: '/getdates',
        type: 'GET',
        success: function (result) {
            prevProp.value = result[0].propRpt;
            prevAlfa.value = result[0].alfaRpt;
            prevBeta.value = result[0].betaRpt;
            prevFinal.value = result[0].finalRpt;
            prevPresnt.value = result[0].presentation;

            var setDatesBtn = document.getElementById('okBtn');
            setDatesBtn.onclick = function () {
                setDates(prevProp.value, prevAlfa.value, prevBeta.value, prevFinal.value, prevPresnt.value);
            };
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });
}

function setDates(prevProp, prevAlfa, prevBeta, prevFinal, prevPresnt){
    var proposal = document.getElementById("proposal_id").value;
    var alfa = document.getElementById("alfa_id").value;
    var beta = document.getElementById("beta_id").value;
    var final = document.getElementById("final_id").value;
    var presentation = document.getElementById("presentation_id").value;

    if(proposal == ""){
        proposal = prevProp;
    }
    if(alfa == ""){
        alfa = prevAlfa;
    }
    if(beta == ""){
        beta = prevBeta;
    }
    if(final == ""){
        final = prevFinal;
    }
    if(presentation == ""){
        presentation = prevPresnt;
    }

    $.ajax({
        type: 'PUT', 
        url: '/updateSubDates',
        contentType: 'application/json',
        data: JSON.stringify({
            "propRpt": proposal,
            "alfaRpt": alfa,
            "betaRpt": beta,
            "finalRpt": final,
            "presentation": presentation
        }),
        success: function (result) {
            alert("Dates updated successfully");
            location.href = "/assigAndsubDats";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
    
function getDates() {
    var prop = document.getElementById("proposal_id_date");
    var alfa = document.getElementById("alpha_id_date");
    var beta = document.getElementById("beta_id_date");
    var final = document.getElementById("final_id_date");
    var present = document.getElementById("presentation_id_date");

    $.ajax({
        type: 'GET',
        url: '/getdates',
        success: function (result) {
            var current = new Date()
            let dd = String(current.getDate()).padStart(2, '0');
            let mm = String(current.getMonth() + 1).padStart(2, '0');
            let yyyy = current.getFullYear();
            current = yyyy + '-' + mm + '-' + dd;
            $.each(result, function (index, value) {
                if ("propRpt" in value) {
                    if (current <= value.propRpt) {
                        prop.innerHTML = value.propRpt;
                    }
                    else {
                        document.getElementById("propUploadForm").style.visibility = 'hidden';
                        prop.innerHTML = "The submission date has passed";
                    }
                }
                if ("alfaRpt" in value) {
                    if (current <= value.alfaRpt) {
                        alfa.innerHTML = value.alfaRpt;
                    }
                    else {
                        document.getElementById("alfaUploadForm").style.visibility = 'hidden';
                        alfa.innerHTML = "The submission date has passed";
                    }
                }
                if ("betaRpt" in value) {
                    if (current <= value.betaRpt) {
                        beta.innerHTML = value.betaRpt;
                    }
                    else {
                        document.getElementById("betaUploadForm").style.visibility = 'hidden';
                        beta.innerHTML = "The submission date has passed";
                    }
                }
                if ("finalRpt" in value) {
                    if (current <= value.finalRpt) {
                        final.innerHTML = value.finalRpt;
                    }
                    else {
                        document.getElementById("finalUploadForm").style.visibility = 'hidden';
                        final.innerHTML = "The submission date has passed";
                    }
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