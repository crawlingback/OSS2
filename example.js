const usersList = document.getElementById("user-cards");
// Assign callback funciton on click for the Request Button
const requestBtn = document.getElementById("request-btn");
requestBtn.addEventListener("click", () => {
    requestAndDisplayJsonData(usersList);
});

// Assign callback funciton on click for the Clear Button
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", () => {
    clearList(usersList);
});

function clearList(listDiv) {
    if (listDiv == null || listDiv == undefined) return;
    if (listDiv.nodeType != 1) return;

    listDiv.innerHTML = "";
}

function requestAndDisplayJsonData(listDiv) {
    if (listDiv == null || listDiv == undefined) return;
    if (listDiv.nodeType != 1) return;

    xhr = new XMLHttpRequest();

    const url = "https://api.github.com/users";
    let isAsync = true;

    xhr.open("GET", url, isAsync);

    xhr.onload = function () {
        if (this.status != 200) return;

        const obtainedData = JSON.parse(this.responseText);
        obtainedData.forEach((user) => {
            let output = `
                <div class="user">
                    <img src="${user.avatar_url}" alt="${user.login} Avatar" class="pfp">
                    <ul>
                        <li>id: ${user.id}</li>
                        <li>user: ${user.login}</li>
                    </ul>
                </div>
            `;
            listDiv.innerHTML += output;
        });
    };

    xhr.onerror = function (e) {
        console.log("somethign went wrong...");
        console.log(e);
    };

    xhr.send();
}
