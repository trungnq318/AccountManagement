$(function() {
    if (!isLogin()) {
        window.location.replace("http://127.0.0.1:5501/html/login.html");

    }
    // HELLO TRUNG
    $("#hello").html("<span>Hello </span><br><span>" + storage.getItem("FULLNAME") + "</span>");

    // FORBIDDEN MANAGER AND EMPLOYEE
    if (storage.getItem("ROLE") == "MANAGER" || storage.getItem("ROLE") == "EMPLOYEE") {
        // document.getElementById("mainCol1Account").style.display = "none";
        // document.getElementById("mainCol1Department").style.display = "none";
    }

    // HEADER
    $('.header').load("header.html", function() {
        $("#headerCol2 i").click(function() {
            $('#mainCol2').load("homePage.html", function() {

                $("#homeHello").text("Hello " + storage.getItem("FULLNAME"));
            });

        });
        $("#nameOfAccount").text(storage.getItem("FULLNAME"));
    });

    // HOME PAGE
    $('#mainCol2').load("homePage.html", function() {

        $("#homeHello").text("Hello " + storage.getItem("FULLNAME"));
    });

    // MODAL ACCOUNT
    $('#myModal').load("modal.html", function() {
        $("#role").change(function() {
            var role = $(this).children("option:selected").val();
            $("#roleInput").val(role);
        });
        $("#department").change(function() {
            var department = $(this).children("option:selected").val();
            $("#departmentInput").val(department);
        });

        //SAVE BUTON
        $("#saveAccount").click(function() {
            var id = $("#accountId").val();
            console.log(id);
            if (!id) {
                var username = $("#username").val();
                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                var role = $("#roleInput").val();
                var department = $("#departmentInput").val();
                if (!username) {
                    showErrorMessage("Please input username...");
                    return;
                }
                if (!firstName) {
                    showErrorMessage("Please input firstName...");
                    return;
                }
                if (!lastName) {
                    showErrorMessage("Please input lastName...");
                    return;
                }
                if (!role) {
                    showErrorMessage("Please choose role...");
                    return;
                }
                if (!department) {
                    showErrorMessage("Please choose department...");
                    return;
                }
                if (username.length < 6 || username.length > 50) {
                    showErrorMessage("username length not valid");
                    return;
                }
                $.ajax({
                    url: "http://localhost:8080/api/v1/accounts/exists/" + username,
                    type: 'GET',
                    contentType: "application/json",
                    dataType: 'json', // datatype return

                    // ĐÍNH KÈM  USERNAME VA PASSWORD
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
                    },


                    success: function(data, textStatus, xhr) {
                        // console.log(data);
                        if (data.message) {
                            sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
                        }
                        if (data == true) {
                            showErrorMessage("username is exist");
                            return;
                        } else {

                            createAccount();
                        }


                    },
                    error(jqXHR, textStatus, errorThrown) {

                        sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
                        sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
                        window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

                        // console.log(jqXHR);
                        // console.log(textStatus);
                        // console.log(errorThrown);

                    }
                });

            } else {

                updateAccount(id);

            }

            // hideErrorMessage();
            // resetPage();
            // buildTableAccount();
        });
    });

    // MODAL DEP
    $('#myModalDep').load("modalDep.html", function() {
        $("#type").change(function() {
            var type = $(this).children("option:selected").val();
            $("#typeInput").val(type);
        });

        // SAVE BUTON
        $("#saveDep").click(function() {
            var id = $("#departmentId").val();
            if (!id) {
                var name = $("#name").val();
                var type = $("#typeInput").val();
                if (!name) {
                    showErrorMessageDep("Please input department name...");
                    return;
                }
                if (!type) {
                    showErrorMessageDep("Please choose type of department...");
                    return;
                }

                $.ajax({
                    url: "http://localhost:8080/api/v1/departments/exists/" + name,
                    type: 'GET',
                    contentType: "application/json",
                    dataType: 'json', // datatype return

                    // ĐÍNH KÈM  USERNAME VA PASSWORD
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
                    },


                    success: function(data, textStatus, xhr) {
                        // console.log(data);
                        if (data.message) {
                            sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
                        }
                        if (data == true) {
                            showErrorMessageDep("department is exist");
                            return;
                        } else {

                            createDep();
                        }


                    },
                    error(jqXHR, textStatus, errorThrown) {

                        sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
                        sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
                        window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

                        // console.log(jqXHR);
                        // console.log(textStatus);
                        // console.log(errorThrown);

                    }
                });
            } else {

                updateDep(id);
            }
            // hideErrorMessage();
            // resetPageDep();
            // buildTableDep();
        });
    });
    // MODAL ADD ACC
    $('#myModalAddAcc').load("modalAddAcc.html", function() {


        // SAVE BUTON
        $("#saveAddAcc").click(function() {
            hideModalAddAcc();
            resetPageDep();
            buildTableDep();
        });
    });
    // MENU 

    $("#mainCol1Name").click(function() {
        $('#mainCol2').load("homePage.html", function() {

            $("#homeHello").text("Hello " + storage.getItem("FULLNAME"));
        });
    })

    // MENU ACCOUNT

    $("#mainCol1Account").click(function() {

        // ACCOUNT PAGE
        $('#mainCol2').load("accountPage.html", function() {

            // CREATE BUTTON
            $("#createAccountIcon").click(function() {
                openCreateAccount();

            });
            // FILTER
            $("#roleFilter").change(function() {
                var role = $(this).children("option:selected").val();
                $("#filterByRole").val(role);
            });
            $("#departmentFilter").change(function() {
                var department = $(this).children("option:selected").val();
                $("#filterByDepartment").val(department);
            });
            // REFRESH BUTTON
            $("#refreshAccountIcon").click(function() {
                resetPage();
                buildTableAccount();

            });
            // DELETE BUTTON
            $("#deleteAccountsIcon").click(function() {

                deleteAccounts();
            });
            resetPage();
            buildTableAccount();


        });

    });
    // MENU DEPARTMENT

    $("#mainCol1Department").click(function() {
        // DEPARTMENT PAGE
        $('#mainCol2').load("departmentPage.html", function() {
            $("#typeFilter").change(function() {
                var type = $(this).children("option:selected").val();
                $("#filterByType").val(type);
            });

            // REFRESH BUTTON
            $("#refreshDepIcon").click(function() {
                resetPageDep();
                buildTableDep();

            });

            // CREATE BUTTON
            $("#createDepIcon").click(function() {
                openCreateDep();

            });


            // DELETE BUTTON
            $("#deleteDepsIcon").click(function() {

                deleteDeps();
            });

            resetPageDep();
            buildTableDep();
        });
    });

    // FOOTER

    $('.footer').load("footer.html");

});

function showErrorMessageDep(message) {
    document.getElementById("errorMessageDep").style.display = "block";
    document.getElementById("errorMessageDep").innerHTML = message;
}

function hideErrorMessageDep() {
    document.getElementById("errorMessageDep").style.display = "none";
}

function showErrorMessage(message) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").innerHTML = message;
}

function hideErrorMessage() {
    document.getElementById("errorMessage").style.display = "none";
}

var departments = [];
var accounts = [];
var currentPage = 1;
var size = 5;
var sortField = "";
var isAsc = false;
var search = "";
var roleFilter = "";
var departmentFilter = "";
var typeFilter = "";
var minDate = "";
var maxDate = "";

function Account(id, username, firstName, lastName, role, department) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.department = department;
}

// ADD ACCs TO DEP

function openAddAccountsToDepartment(id) {
    openModalAddAcc();
}
// MODAL ADD ACC
function openModalAddAcc() {
    $("#myModalAddAcc").modal("show");
}

function hideModalAddAcc() {
    $("#myModalAddAcc").modal("hide");
}





// CREATE ACCOUNT

function openCreateDep() {
    resetModalDep();
    openModalDep();

}

function createDep() {

    var name = $("#name").val();
    var type = $("#typeInput").val();
    var department = {
        name: name,
        type: type,
        // accouts: []
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments',
        type: 'POST',
        data: JSON.stringify(department), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {
                hideModalDep();
                alert("create department success");
                hideErrorMessageDep();
                resetPageDep();
                buildTableDep();
            }

        },
        error(jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR);

            hideModalDep();
            // console.log(jqXHR);
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);
        }
    });

}

//UPDATE ACCOUNT
function openUpdateDepartment(id) {

    fillDepToModal(id);
    openModalDep();

}

function updateDep(id) {
    var type = $("#typeInput").val();
    var account = {
        type: type,
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'PUT',
        data: JSON.stringify(account), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function(data, textStatus, xhr) {
            // success
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {

                hideModalDep();
                alert("update Department success");
                hideErrorMessageDep();
                resetPageDep();
                buildTableDep();
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            hideModalDep();
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);
        }
    });
}

// DELETE ACCOUNT


function openConfirmDeleteDepartment(id) {
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },


        success: function(data, textStatus, xhr) {
            // console.log(data);
            // accounts = data;

            var result = confirm("Do you want to delete username: " + data.username + "?");
            if (result) {
                if (data.message) {
                    sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                    sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                    window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
                } else {

                    deleteDep(id);
                }
            }


        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });

}

function deleteDep(id) {
    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'DELETE',

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function() {

            // error
            // if (result == undefined || result == null) {
            //     alert("Error when  data");
            //     return;
            // }
            // console.log(result);
            // success
            alert("delete department success");
        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });
    resetPageDep();
    buildTableDep();
}

// DELETE MANY ACCOUNTS

function deleteDeps() {
    var ids = [];
    var names = [];
    var i = 0;
    while (true) {
        var id = $("#checkboxDep-" + i).val();
        if (id != undefined) {
            var isChecked = $("#checkboxDep-" + i).is(":checked");
            if (isChecked == true) {
                ids.push(id);
                names.push(departments[i].name)
                    // var index = accounts.findIndex(x => x.id == id);
                    // names.push(accounts[index].firstName + " " + accounts[index].lastName)
            }
            i++;
        } else {
            break;
        }
    }
    // console.log(ids);
    // console.log(names);
    // console.log(accounts);
    var result = confirm("Do you want to delete department: " + names + " (" + names.length + " departments) ?");
    if (result) {
        deleteManyDeps(ids);
    }


}


function deleteManyDeps(ids) {

    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments?ids=' + ids,
        type: 'DELETE',

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function() {
            // error
            // if (result == undefined || result == null) {
            //     alert("Error when loading data");
            //     return;   
            // }

            // success
            alert("delete many Departments success");
        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });
    resetPageDep();
    buildTableDep();
}

// THAO TAC VOI MODAL DEPARTMENT

function fillDepToModal(id) {
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },


        success: function(data, textStatus, xhr) {
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {

                $("#titleModalDep").text("Update Department");
                $("#departmentId").val(data.id);

                $("#name").val(data.name);
                $("#name").prop('disabled', true);

                $("#type").val(data.type);
                $("#typeInput").val(data.type);
            }



        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });


}

function resetModalDep() {

    $("#departmentId").val("");
    $("#name").val("");
    $("#type").val("");
    $("#typeInput").val("");
    $("#name").prop('disabled', false);
}

function openModalDep() {
    $("#myModalDep").modal("show");
}

function hideModalDep() {
    $("#myModalDep").modal("hide");
}












// BUILD TABLE DEP
function buildTableDep() {

    $("tbody").empty();
    setTimeout(getListDeps, 500)

}

// GET LIST DEPS
function getListDeps() {

    var url = "http://localhost:8080/api/v1/departments";
    url += "?pageNumber=" + currentPage + "&size=" + size + "&sort=" + sortField + "," + (isAsc ? "asc" : "desc");
    if (search) {
        url += "&search=" + search;
    }
    if (typeFilter) {
        url += "&type=" + typeFilter;
    }
    if (minDate) {
        url += "&minCreatedDate=" + minDate;
    }
    if (maxDate) {
        url += "&maxCreatedDate=" + maxDate;
    }
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        // dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function(data, textStatus, xhr) {
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {
                // console.log(data);
                fillDepartmentsToTable(data);
                createPaginationBarDepartments(data.totalPages);
            }




        },
        error(jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR);
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });

}

function fillDepartmentsToTable(data) {
    departments = [];
    departments = data.content;
    departments.forEach(function(department, index) {
        $("tbody").append(
            '<tr>' +
            '<td><input type="checkbox" id="checkboxDep-' + index + '" name="user" value="' + department.id + '"></td>' +
            '<td>' + department.name + '</td>' +
            '<td>' + department.totalMember + '</td>' +
            '<td>' + department.type + '</td>' +
            '<td>' + department.createdDate + '</td>' +
            '<td>' +
            '<i class="fa fa-plus" onClick="openAddAccountsToDepartment(' + department.id + ')" aria-hidden="true"></i>' +
            '<i class="fa fa-pencil" onClick="openUpdateDepartment(' + department.id + ')" aria-hidden="true"></i>' +
            '<i class="fa fa-trash-o" onClick="openConfirmDeleteDepartment(' + department.id + ')" aria-hidden="true"></i>' +
            '</td>' +
            '</tr>'
        );
    });
}
//PAGINATION DEP
function createPaginationBarDepartments(totalPages) {

    var pageString = "";
    if (totalPages > 1 && currentPage > 1) {
        pageString += '<li class="page-item">' +
            '<a class="page-link" onClick="prevPageDeps()">Previous</a>' +
            '</li>'
    }
    for (i = 1; i < totalPages + 1; i++) {
        pageString += '<li class="page-item ' + (currentPage == i ? "active" : "") + '">' +
            '<a class="page-link" onClick="changePageDep(' + i + ')">' + i + '</a>' +
            '</li>'
    }
    if (totalPages > 1 && currentPage < totalPages) {
        pageString += '<li class="page-item">' +
            '<a class="page-link" onClick="nextPageDeps()">Next</a>' +
            '</li>'
    }
    $('#paginationDeps').empty();
    $('#paginationDeps').append(pageString);
    // <!-- <li class="page-item"><a class="page-link">Previous</a></li>
    // <li class="page-item"><a class="page-link">1</a></li>
    // <li class="page-item"><a class="page-link">Next</a></li>
}


function prevPageDeps() {
    currentPage -= 1;
    buildTableDep();
}

function nextPageDeps() {
    currentPage += 1;
    buildTableDep();
}

function changePageDep(pageNumber) {
    if (currentPage == pageNumber) {
        return;
    }
    currentPage = pageNumber;
    buildTableDep();
}

// SORTING DEP
function changeSortDep(field) {
    if (field == sortField) {
        isAsc = !isAsc;
    }
    sortField = field;
    buildTableDep();
}

//  RESET PAGE DEP
function resetPageDep() {
    currentPage = 1;
    size = 5;
    sortField = "totalMember";
    isAsc = false;
    search = "";
    typeFilter = "";
    minDate = "";
    maxDate = "";

}
// SEARCH DEPARTMENT

function seachDep() {
    var searchInput = $("#searchDep").val();
    if (!searchInput) {
        return;
    }
    search = searchInput;
    buildTableDep();
}

// FILTER DEPARTMENT
function filterDep() {
    var type = $("#filterByType").val();
    var min = $("#minDate").val();
    var max = $("#maxDate").val();
    if (!type && !min && !max) {
        return;
    }
    typeFilter = type;
    minDate = min;
    maxDate = max;
    buildTableDep();

}




















// LOGIN
function isLogin() {
    if (storage.getItem("ID")) {
        return true;
    } else {
        return false
    }
}
// LOGOUT
function logout() {
    if (isLogin()) {
        storage.removeItem("ID");
        storage.removeItem("USERNAME");
        storage.removeItem("FULLNAME");
        storage.removeItem("PASSWORD");
        storage.removeItem("ROLE");

    }



    window.location.replace("http://127.0.0.1:5501/html/login.html")
}







//GET LIST ACCOUNT
function buildTableAccount() {

    $("tbody").empty();
    setTimeout(getListAccounts, 500)

}

function getListAccounts() {

    var url = "http://localhost:8080/api/v1/accounts";
    url += "?pageNumber=" + currentPage + "&size=" + size + "&sort=" + sortField + "," + (isAsc ? "asc" : "desc");
    if (search) {
        url += "&search=" + search;
    }
    if (roleFilter) {
        url += "&role=" + roleFilter;
    }
    if (departmentFilter) {
        url += "&departmentId=" + departmentFilter;
    }
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        // dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function(data, textStatus, xhr) {
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {
                // console.log(data);
                fillAccountsToTable(data);
                createPaginationBarAccounts(data.totalPages);
            }




        },
        error(jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR);
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });

}


function fillAccountsToTable(data) {
    accounts = [];
    accounts = data.content;
    accounts.forEach(function(account, index) {
        $("tbody").append(
            '<tr>' +
            '<td><input type="checkbox" id="checkbox-' + index + '" name="user" value="' + account.id + '"></td>' +
            '<td>' + account.username + '</td>' +
            '<td>' + account.lastName + " " + account.firstName + '</td>' +
            '<td>' + account.role + '</td>' +
            '<td>' + account.department + '</td>' +
            '<td>' +
            '<i class="fa fa-pencil" onClick="openUpdateAccount(' + account.id + ')" aria-hidden="true"></i>' +
            '<i class="fa fa-trash-o" onClick="openConfirmDelete(' + account.id + ')" aria-hidden="true"></i>' +
            '</td>' +
            '</tr>'
        );
    });
}
// FILTER ACCOUNT
function filterAccount() {
    var role = $("#filterByRole").val();
    var departmentId = $("#filterByDepartment").val();
    if (!role && !departmentId) {
        return;
    }
    roleFilter = role;
    departmentFilter = departmentId;
    buildTableAccount();

}
// SEARCH ACCOUNT

function seachAccount() {
    var searchInput = $("#searchAccount").val();
    if (!searchInput) {
        return;
    }
    search = searchInput;
    buildTableAccount();
}
// PAGING ACCOUNT

function createPaginationBarAccounts(totalPages) {

    var pageString = "";
    if (totalPages > 1 && currentPage > 1) {
        pageString += '<li class="page-item">' +
            '<a class="page-link" onClick="prevPageAccounts()">Previous</a>' +
            '</li>'
    }
    for (i = 1; i < totalPages + 1; i++) {
        pageString += '<li class="page-item ' + (currentPage == i ? "active" : "") + '">' +
            '<a class="page-link" onClick="changePage(' + i + ')">' + i + '</a>' +
            '</li>'
    }
    if (totalPages > 1 && currentPage < totalPages) {
        pageString += '<li class="page-item">' +
            '<a class="page-link" onClick="nextPageAccounts()">Next</a>' +
            '</li>'
    }
    $('#paginationAccounts').empty();
    $('#paginationAccounts').append(pageString);
    // <!-- <li class="page-item"><a class="page-link">Previous</a></li>
    // <li class="page-item"><a class="page-link">1</a></li>
    // <li class="page-item"><a class="page-link">Next</a></li>
}

function prevPageAccounts() {
    currentPage -= 1;
    buildTableAccount();
}

function nextPageAccounts() {
    currentPage += 1;
    buildTableAccount();
}

function changePage(pageNumber) {
    if (currentPage == pageNumber) {
        return;
    }
    currentPage = pageNumber;
    buildTableAccount();
}

// SORTING ACCOUNT
function changeSort(field) {
    if (field == sortField) {
        isAsc = !isAsc;
    }
    sortField = field;
    buildTableAccount();
}

// RESET PAGE PAGING SORTING
function resetPage() {
    currentPage = 1;
    size = 5;
    sortField = "createdDate";
    isAsc = false;
    search = "";
    roleFilter = "";
    departmentFilter = "";
}


// CREATE ACCOUNT

function openCreateAccount() {
    resetModal();
    openModal();

}

function createAccount() {

    var username = $("#username").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var role = $("#roleInput").val();
    var department = $("#departmentInput").val();
    var account = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        role: role,
        department: department
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts',
        type: 'POST',
        data: JSON.stringify(account), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {
                hideModal();
                alert("create account success");
                hideErrorMessage();
                resetPage();
                buildTableAccount();
            }

        },
        error(jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR);

            hideModal();
            // console.log(jqXHR);
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);
        }
    });

}


//UPDATE ACCOUNT
function openUpdateAccount(id) {

    fillDataUpdateToModal(id);
    openModal();

}

function updateAccount(id) {
    var role = $("#roleInput").val();
    var department = $("#departmentInput").val();
    var account = {
        role: role,
        department: department
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + id,
        type: 'PUT',
        data: JSON.stringify(account), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function(data, textStatus, xhr) {
            // success
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {

                hideModal();
                alert("update account success");
                hideErrorMessage();
                resetPage();
                buildTableAccount();
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            hideModal();
            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);
        }
    });
}

// DELETE ACCOUNT


function openConfirmDelete(id) {
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },


        success: function(data, textStatus, xhr) {
            // console.log(data);
            // accounts = data;

            var result = confirm("Do you want to delete username: " + data.username + "?");
            if (result) {
                if (data.message) {
                    sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                    sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                    window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
                } else {

                    deleteAccount(id);
                }
            }


        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });

}

function deleteAccount(id) {
    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + id,
        type: 'DELETE',

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function() {

            // error
            // if (result == undefined || result == null) {
            //     alert("Error when  data");
            //     return;
            // }
            // console.log(result);
            // success
            alert("delete account success");
        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });
    resetPage();
    buildTableAccount();
}

// DELETE MANY ACCOUNTS

function deleteAccounts() {
    var ids = [];
    var names = [];
    var i = 0;
    while (true) {
        var id = $("#checkbox-" + i).val();
        if (id != undefined) {
            var isChecked = $("#checkbox-" + i).is(":checked");
            if (isChecked == true) {
                ids.push(id);
                names.push(accounts[i].lastName + " " + accounts[i].firstName)
                    // var index = accounts.findIndex(x => x.id == id);
                    // names.push(accounts[index].firstName + " " + accounts[index].lastName)
            }
            i++;
        } else {
            break;
        }
    }
    // console.log(ids);
    // console.log(names);
    // console.log(accounts);
    var result = confirm("Do you want to delete username: " + names + " (" + names.length + " accounts) ?");
    if (result) {
        deleteManyAccounts(ids);
    }


}


function deleteManyAccounts(ids) {

    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts?ids=' + ids,
        type: 'DELETE',

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },

        success: function() {
            // error
            // if (result == undefined || result == null) {
            //     alert("Error when loading data");
            //     return;   
            // }

            // success
            alert("delete many account success");
        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });
    resetPage();
    buildTableAccount();
}


// THAO TAC VOI MODAL  ACCOUNT

function fillDataUpdateToModal(id) {
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return

        // ĐÍNH KÈM  USERNAME VA PASSWORD
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },


        success: function(data, textStatus, xhr) {
            // console.log(data);
            if (data.message) {
                sessionStorage.setItem("STATUS", "MESSAGE: " + data.message);
                sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + data.detailMessage);
                window.location.href = "http://127.0.0.1:5501/html/forbidden.html";
            } else {

                $("#titleModalAccount").text("Update Account");
                $("#accountId").val(data.id);

                $("#username").val(data.username);
                $("#username").prop('disabled', true);

                $("#firstName").val(data.firstName);
                $("#firstName").prop('disabled', true);

                $("#lastName").val(data.lastName);
                $("#lastName").prop('disabled', true);

                $("#role").val(data.role);
                $("#roleInput").val(data.role);

                $("#department").val(data.departmentId);
                $("#departmentInput").val(data.departmentId);
            }



        },
        error(jqXHR, textStatus, errorThrown) {

            sessionStorage.setItem("STATUS", "STATUS CODE: " + jqXHR.status + " <p>MESSAGE: " + jqXHR.responseJSON.message) + "</p>";
            sessionStorage.setItem("ERROR", "DETAIL MESSAGE: " + jqXHR.responseJSON.detailMessage);
            window.location.href = "http://127.0.0.1:5501/html/forbidden.html";

            // console.log(jqXHR);
            // console.log(textStatus);
            // console.log(errorThrown);

        }
    });


}

function resetModal() {

    $("#accountId").val("");
    $("#username").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#role").val("");
    $("#roleInput").val("");
    $("#department").val("");
    $("#departmentInput").val("");

    $("#username").prop('disabled', false);

    $("#firstName").prop('disabled', false);

    $("#lastName").prop('disabled', false);
}

function openModal() {
    $("#myModal").modal("show");
}

function hideModal() {
    $("#myModal").modal("hide");
}