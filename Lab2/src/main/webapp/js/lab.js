var x = document.getElementById("x");
var r = document.getElementById("r");
var y = document.getElementById("y");
var coordinatesX;
var coordinatesY;
const maxLength = 15;


$(".checkGroup").change(function() {
    $(".checkGroup").prop('checked', false);
    $(this).prop('checked', true);

});
//checking R parameter
function testR(){
    if ($("#r").val() == -1){
        $(".error_text#errorR").html("Выберите R!");
        return false;
    }
    else {
        r = $("#r").val();
        $(".error_text#errorR").html("");
        return true;
    }
}

//checking checkboxes
function testCheckbox(){
    let checkB = false;
    $(".checkGroup").each(function () {
        console.log($(this).prop("checked"));
        if ($(this).prop("checked") == true) {
            $(".error_text#errorX").html("");
            checkB = true;
            return false;
        }
        else {
            $(".error_text#errorX").html("Выберите X!");
        }
    });
    return checkB;
}


function testMyNumber(el, min, max){
    let check = false;
    try {
        check = el.value > min && el.value < max && el.value.length > 0 && el.value.length < 17;
    }catch (e){
        check = false;
    }
    if (!check){
        $(el).parent().find(".error_text").html("Введите правильное значение!");
    }
    else {
        $(el).parent().find(".error_text").html("");
    }
    return check;
}

function testInputs() {
    let ok1 = testMyNumber(y, -3, 5);
    let ok2 = testCheckbox();
    let ok3 = testR();
    let ok = ok1 && ok2 && ok3;
    if (ok){
        let X;
        $('input.checkGroup:checkbox:checked').each(function () {
            X = $("label[for='"+$(this).attr("id")+"']").text();
        });
        coordinatesX = X * 120 / r + 150;
        coordinatesY = y.value * -120 / r + 150;
        console.log(coordinatesX + " " + coordinatesY);
        setPoints();
        try {
            sendRequest("no", X, y.value, r);
        }catch (e){
            console.log(e.message);
        }
    }
}

function sendToClearContext(){
    sendRequest("clear",0,0,0);
    unsetPoints();
}

function setPoints(){
    let point = document.getElementById("point");
    point.setAttribute('cx', coordinatesX)
    point.setAttribute('cy', coordinatesY)
    point.setAttribute("visibility","visible")
}

function unsetPoints(){
    let point = document.getElementById("point")
    point.setAttribute("visibility","hidden")
}


document.getElementsByClassName("mySvg")[0].addEventListener("mousedown", function (e){
    if ($("#r").val() == -1){
        alert("Выберите параметр R!");
        return;
    }
    r = $("#r").val();
    coordinatesX = e.offsetX;
    coordinatesY = e.offsetY;
    setPoints();
    click()
});
window.onload = sendRequest("reload",0,0,0);

function sendRequest(check, x, y, r){
    $.ajax({
        url: "./ControllerServlet",
        type: "GET",
        data: {"check": check, "x": x, "y": y, "r": r},
        success: function (response) {
            document.getElementById('tbody1').innerHTML = response;
        },
        error :function (){
            alert("Ошибка при передаче!");
        }
    });
    }









