$(function() {
    if (isLogin()) {
        window.location.replace("http://127.0.0.1:5501/html/FinalExam.html");

    }

    document.getElementById("rememberMe").checked = storage.getRememberMe();

});

function login() {
    // Get username & password
    var username = $("#username").val();
    var password = $("#password").val();

    // validate
    if (!username) {
        showNameErrorMessage("Please input username!");
        return;
    }

    if (!password) {
        showNameErrorMessage("Please input password!");
        return;
    }


    // validate username 6 -> 50 characters
    if (username.length < 6 || username.length > 50 || password.length < 6 || password.length > 50) {
        // show error message
        showNameErrorMessage("Login fail!");
        return;
    }

    // Call API
    $.ajax({
        url: 'http://localhost:8080/api/v1/login',
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },


        success: function(data, textStatus, xhr) {
            console.log(data);
            // save data to storage (đăng nhập thành công thì mới được lưu, tương tự cookie
            // lưu vào để có user vs  pass khi truy cập api)
            // https://www.w3schools.com/html/html5_webstorage.asp

            var isRememberMe = $("#rememberMe").is(":checked");
            storage.saveRememberMe(isRememberMe)

            storage.setItem("ID", data.id);
            storage.setItem("FULLNAME", data.fullName);
            storage.setItem("USERNAME", username);
            storage.setItem("PASSWORD", password);
            storage.setItem("ROLE", data.role);


            // redirect to home page
            // https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
            window.location.replace("http://127.0.0.1:5501/html/FinalExam.html");
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                showNameErrorMessage("Login fail!");
            } else {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
}

function isLogin() {
    if (storage.getItem("ID")) {
        return true;
    } else {
        return false
    }
}

function showNameErrorMessage(message) {
    document.getElementById("nameErrorMessage").style.display = "inline";
    document.getElementById("nameErrorMessage").innerHTML = message;
}

function hideNameErrorMessage() {
    document.getElementById("nameErrorMessage").style.display = "none";
}