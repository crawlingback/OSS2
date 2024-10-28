window.onload = function () {
    //event.preventDefault();
    //getcourses();
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");
    btnStu.addEventListener("click", function (event) {
        //event.preventDefault();
        getcourses();
    });
    btnAdd.addEventListener("click", function (event) {
        event.preventDefault();
        postData();
    });
    getcourses();
};

isDebug = true;

function logger(data) {
    if (isDebug) {
        console.log(data);
    }
}

function getData() {}

function getcourses() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "courses.json");
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
    var cid = 1;
    let cname = document.getElementById("cname");
    let credit = document.getElementById("credit");
    let code = document.getElementById("code");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "courses.json");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            for (key in res) {
                if (res[key].id >= cid) {
                    cid = res[key].id + 1;
                }
            }

            xhr.open("POST", "courses.json");
            xhr.setRequestHeader(
                "content-type",
                "application/json; charset=UTF-8"
            );
            const data = {
                id: cid,
                cname: cname.value,
                credit: credit.value,
                code: code.value,
            };
            xhr.send(JSON.stringify(data));

            xhr.onload = () => {
                if (xhr.status == 201) {
                    cname.value = "";
                    credit.value = "";
                    const res = JSON.parse(xhr.response);
                    getcourses();
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
    let str = "<ul>";
    logger(data);
    logger(data[0]);
    logger(data[1]);

    for (key in data) {
        logger(data[key].credit);
        logger(data[key].cname);
        logger(key.cname);
        logger(key);
        str +=
            "<li> " +
            data[key].cname +
            "[" +
            data[key].credit +
            "] (" +
            data[key].code +
            ")</li>";
        str +=
            "<form action='' method='get'><input type='hidden' name='upd_id' class='upd_id'/ value='" +
            data[key].id +
            "'><input type='text' name='upd_cname' class='upd_cname' size='10' placeholder='cname'/><input type='text' name='upd_credit' class='upd_credit' size='5' placeholder='credit'/><input type='text' name='upd_code' class='upd_code' size='10' placeholder='code'/><button onclick='updateData(this)'>Modify</button></form>";
        str +=
            "<button onclick='deleteData(\"" +
            data[key].id +
            "\")'>Delete</button>";
    }

    // for (dt in data) {
    //     logger(dt.cname);
    //     str +=
    //         "<li> " + dt.cname + "[" + dt.credit + "] (" + dt.code + ")</li>";
    //     str +=
    //         "<form action='' method='get'><input type='hidden' name='upd_id' class='upd_id'/ value='" +
    //         dt.id +
    //         "'><input type='text' name='upd_cname' class='upd_cname' size='10' placeholder='cname'/><input type='text' name='upd_credit' class='upd_credit' size='5' placeholder='credit'/><input type='text' name='upd_code' class='upd_code' size='10' placeholder='code'/><button onclick='updateData(this)'>Modify</button></form>";
    //     str +=
    //         "<button onclick='deleteData(\"" + dt.id + "\")'>Delete</button>";
    // }
    // data.forEach((dt) => {
    //     logger(dt.cname);
    //     str +=
    //         "<li> " + dt.cname + "[" + dt.credit + "] (" + dt.code + ")</li>";
    //     str +=
    //         "<form action='' method='get'><input type='hidden' name='upd_id' class='upd_id'/ value='" +
    //         dt.id +
    //         "'><input type='text' name='upd_cname' class='upd_cname' size='10' placeholder='cname'/><input type='text' name='upd_credit' class='upd_credit' size='5' placeholder='credit'/><input type='text' name='upd_code' class='upd_code' size='10' placeholder='code'/><button onclick='updateData(this)'>Modify</button></form>";
    //     str +=
    //         "<button onclick='deleteData(\"" + dt.id + "\")'>Delete</button>";
    // });
    str += "</ul>";

    return str;
}

function updateData(obj) {
    let form = obj.parentNode;
    let id = form.querySelector(".upd_id").value;
    let cname = form.querySelector(".upd_cname").value;
    let credit = form.querySelector(".upd_credit").value;
    let code = form.querySelector(".upd_code").value;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "courses.json/" + id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    const data = {
        id: id,
        cname: cname,
        credit: credit,
        code: code,
    };
    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getcourses();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}

function deleteData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "courses.json/" + id);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    const data = { cname: cname.value, credit: credit.value };
    // xhr.send(JSON.stringify(data));
    xhr.send(JSON.stringify());

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            getcourses();
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
}
