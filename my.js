const btn_submit = document.querySelector(".submit");
const btn_edit = document.querySelector(".btn-edit");
const needValidate = document.querySelector(".needs-validation");
const title_del = document.querySelector(".title-delete");
const title_add = document.querySelector(".title-add");
const title_submit = document.querySelector(".title-submit");
// const all_input = needValidate.querySelectorAll("input");
// const all_textarea = needValidate.querySelectorAll("textarea");
// const all_select = needValidate.querySelectorAll("select");
// const all_date = needValidate.querySelectorAll(".datePicker");
const reg_date = /\d\d\d\d-\d\d-\d\d/;

$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});

function bClick(text) {
    alert(text);
}
$(function () {
    $("#datePicker").datepicker({
        format: "yyyy-mm-dd", //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
        autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
        calendarWeeks: false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
        clearBtn: false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
        daysOfWeekHighlighted: [0, 6], //강조 되어야 하는 요일 설정
        disableTouchKeyboard: false, //모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
        immediateUpdates: false, //사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
        multidate: false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false
        multidateSeparator: ",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
        templates: {
            leftArrow: "&laquo;",
            rightArrow: "&raquo;",
        }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
        showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
        title: "Choose Date", //캘린더 상단에 보여주는 타이틀
        todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
        weekStart: 0,
    }); //datepicker end
}); //ready end
function validate(target) {
    const _input = target.querySelectorAll("input");
    const _textarea = target.querySelectorAll("textarea");
    const _select = target.querySelectorAll("select");
    const _date = target.querySelectorAll(".datePicker");
    var done = 1;
    _input.forEach((inp) => {
        // console.log(inp);
        // console.log(inp.value.length);
        if (inp.value.length == 0) {
            var invalid = inp.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "inline";
            done = 0;
        } else {
            var invalid = inp.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    _textarea.forEach((txa) => {
        if (txa.value.length == 0) {
            var invalid = txa.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "inline";
            done = 0;
        } else {
            var invalid = txa.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    _select.forEach((sel) => {
        if (sel.value == 0) {
            var invalid = sel.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "inline";
            done = 0;
        } else {
            var invalid = sel.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    _date.forEach((dat) => {
        if (!reg_date.exec(dat.value)) {
            var invalid = dat.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "inline";
            done = 0;
        } else {
            var invalid = dat.parentNode.querySelector(".invalid-feedback");
            if (!invalid) return 0;
            invalid.style.display = "none";
        }
    });
    return done;
}
function validate_integrated(target, text) {
    var result = validate(target);
    if (result) {
        bClick(text);
        target.submit();
    } else {
        // bClick("Check your inputs!");
    }
}

function isMobile() {
    return (
        /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768
    );
}
function loadMobileCSS() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "my_mobile.css";
    document.head.appendChild(link);
}

if (isMobile()) {
    loadMobileCSS();
    if (title_del) {
        title_del.innerText = "";
    }
    if (title_add) {
        title_add.innerText = "";
    }
    if (title_submit) {
        title_submit.innerText = "";
    }
} else {
    loadDesktopCSS();
}

if (btn_submit)
    btn_submit.addEventListener("click", () =>
        validate_integrated(needValidate, "Item added")
    );
if (btn_edit)
    btn_edit.addEventListener("click", () =>
        validate_integrated(needValidate, "Item edited")
    );
