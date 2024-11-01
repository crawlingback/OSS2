const jsonData = "http://localhost:3001/data";
const jsonLastID = "http://localhost:3001/lastID";

window.onload = function () {
    //event.preventDefault();
    //getmy_data();
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");
    btnStu.addEventListener("click", function (event) {
        //event.preventDefault();
        getmy_data();
    });
    btnAdd.addEventListener("click", function (event) {
        event.preventDefault();
        postData();
    });
    getmy_data();
};

isDebug = true;

function logger(data) {
    if (isDebug) {
        console.log(data);
    }
}

function getData() {}

function getmy_data() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", jsonData);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            contents.innerHTML = makeList(res);
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}

function postData() {
    var cid = 0;
    let userID = document.getElementById("userID");
    let title = document.getElementById("title");
    let body = document.getElementById("body");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", jsonData);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            for (key in res) {
                var resID = parseInt(res[key].id);
                if (resID >= cid) {
                    cid = resID + 1;
                }
            }

            xhr.open("POST", jsonData);
            xhr.setRequestHeader(
                "content-type",
                "application/json; charset=UTF-8"
            );
            const data = {
                id: "" + cid,
                userID: userID.value,
                title: title.value,
                body: body.value,
            };
            xhr.send(JSON.stringify(data));

            xhr.onload = () => {
                if (xhr.status == 201) {
                    userID.value = "";
                    title.value = "";
                    body.value = "";
                    getmy_data();
                } else {
                    console.log(xhr.status, xhr.statusText);
                }
            };
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}

function makeList(data) {
    // data = data["data"];
    let str = "<ul>";

    for (key in data) {
        str += "<li>";
        str += "<p class='c_writer'>Writer: " + data[key].userID + "</p>";
        str += "<p class='c_title'>" + data[key].title + "</p>";
        str += "<p class='c_body'>" + data[key].body + "</p>";
        str += "</li>";
        str += "<div class='updates'>";
        str +=
            "<input type='hidden' name='upd_id' class='upd_id' value='" +
            data[key].id +
            "'>";
        str +=
            "<input type='hidden' name='upd_uid' class='upd_uid' value='" +
            data[key].userID +
            "'>";
        str +=
            "<input type='text' name='upd_title' class='upd_title' size='30' placeholder='title' />";
        str +=
            "<input type='text' name='upd_body' class='upd_body' size='50' placeholder='body' />";
        str += "<button onclick='updateData(this)'>Modify</button>";
        str +=
            "<p><button onclick='deleteData(\"" +
            data[key].id +
            "\")'>Delete</button></p>";
        str += "</div>";
    }
    str += "</ul>";

    return str;
}

function updateData(obj) {
    let form = obj.parentNode;
    let id = form.querySelector(".upd_id").value;
    let uid = form.querySelector(".upd_uid").value;
    let title = form.querySelector(".upd_title").value;
    let body = form.querySelector(".upd_body").value;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", jsonData + "/" + id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    const data = {
        id: id,
        userID: uid,
        title: title,
        body: body,
    };
    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getmy_data();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}

function deleteData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", jsonData + "/" + id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    const data = { userID: userID.value, title: title.value };
    // xhr.send(JSON.stringify(data));
    xhr.send(JSON.stringify());

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getmy_data();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}
