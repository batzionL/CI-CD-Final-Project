async function sub(e) {
    e.preventDefault();

    const username = document.getElementById("id_username").value.trim();
    const password = document.getElementById("id_password").value;

    if (!username) {
        alert("אנא הזיני שם משתמש");
        return;
    }

    const student = await getStudentInfo(username);
    if (student) {
        if (!password) {
            await sendEmail(student.sdt_email, student.password.trim());
            alert("The password has been sent to your email");
            return;
        }
        if (password.trim() === student.password.trim()) {
            localStorage.setItem("data", "student");
            localStorage.setItem("name", student.sdt_firstName + " " + student.sdt_lastName);
            localStorage.setItem("stdID", student.sdt_ID);
            localStorage.setItem("modID", "");
            window.location.href = "/assignments_and_submission_dates.html";
            return;
        } else {
            alert("Password incorrect for this student");
            return;
        }
    }

    const mod = await getModeratorInfo(username);
    if (mod) {
        if (!password) {
            await sendEmail(mod.mod_email, mod.password.trim());
            alert("The password has been sent to your email");
            return;
        }
        if (password.trim() === mod.password.trim()) {
            const name = mod.mod_firstName + " " + mod.mod_lastName;
            await is_coor(mod.mod_ID, name);
            return;
        } else {
            alert("Incorrect password for moderator");
            return;
        }
    }

    alert("Username doesn't exsist");
}

async function getStudentInfo(username) {
    try {
        const result = await $.ajax({ type: 'GET', url: '/api/getStudentPwd/' + username });
        if (result[0]) return result[0];
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getModeratorInfo(username) {
    try {
        const result = await $.ajax({ type: 'GET', url: '/api/getModeratorPwd/' + username });
        if (result[0]) return result[0];
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function is_coor(id, name) {
    try {
        const result = await $.ajax({ type: 'GET', url: '/api/getCoodinator' });
        if (!result[0] || result[0].coo_ID !== id) {
            localStorage.setItem("data", "moderator");
        } else {
            localStorage.setItem("data", "coordinator");
        }
        localStorage.setItem("name", name);
        localStorage.setItem("modID", id);
        localStorage.setItem("stdID", "");
        window.location.href = "/assignments_and_submission_dates.html";
    } catch (err) {
        console.error(err);
    }
}

function sendEmail(userEmail, password) {
    return $.ajax({
        type: 'POST',
        url: '/api/sendEmail',
        contentType: 'application/json',
        data: JSON.stringify({ email: userEmail, password: password }),
    }).done(() => console.log('The password sent to your email'))
      .fail((jqXhr, textStatus, errorThrown) => console.error(errorThrown));
}


function showPassword(str) {
    let x;
    switch (str) {
        case 'sdt':
            x = document.getElementById("sdt_pswd_id");
            break;
        case 'mod':
            x = document.getElementById('mod_pswd_id');
            break;
        case 'old':
            x = document.getElementById('old_pwd_or_ID');
            break;
        case 'new':
            x = document.getElementById('id_new_pwd');
            break;
        case 'again':
            x = document.getElementById('id_again_new_pwd');
            break;
        case 'login':
            x = document.getElementById('id_password');
            break;
    }

    if (x) x.type = x.type === 'password' ? 'text' : 'password';
}