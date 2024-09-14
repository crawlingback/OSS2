const t_obj = document.querySelector(".t_obj");
const btn_add = document.querySelector(".btn_add");
const btn_del = document.querySelector(".btn_del");
const ul_targ = document.querySelector(".ul_targ");

function adder(text, seperator, target) {
    if (!text) return;
    var lists = text.split(seperator);
    lists.forEach((lis) => {
        const temp = document.createElement("li");
        temp.class = "li_targ";
        temp.innerText = lis;
        target.appendChild(temp);
    });
}

function deleter(target) {
    target.replaceChildren();
}

btn_add.addEventListener("click", () => adder(t_obj.value, ", ", ul_targ));

btn_del.addEventListener("click", () => deleter(ul_targ));
