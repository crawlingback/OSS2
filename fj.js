const bt_redeem = document.querySelector(".btn-secondary");
const bt_confirm = document.querySelector(".btn-primary");
const needValidate = document.querySelector(".needs-validation");
const all_input = needValidate.querySelectorAll("input");
const all_textarea = needValidate.querySelectorAll("textarea");

function bClick(text) {
    alert(text);
}

function validate() {
    var done = 1;
    all_input.forEach((inp) => {
        console.log(inp);
        console.log(inp.value.length);
        if (inp.value.length == 0) {
            var invalid = inp.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "block";
            done = 0;
        } else {
            var invalid = inp.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    all_textarea.forEach((txa) => {
        if (txa.value.length == 0) {
            var invalid = txa.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "block";
            done = 0;
        } else {
            var invalid = inp.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    return done;
}

function validate_integrated() {
    var result = validate();
    if (result) {
        bClick("Checkout confirmed!");
    } else {
        bClick("Check your inputs!");
    }
}

bt_redeem.addEventListener("click", () => bClick("Promo code redeemed!"));

bt_confirm.addEventListener("click", validate_integrated);
