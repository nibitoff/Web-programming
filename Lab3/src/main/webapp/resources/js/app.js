let paramX = "input-f:coord-x";
let paramR = "input-f:coord-r";
let paramY = "input-f:coord-y";
let y;
let r;
let x;
let coordinatesX;
let coordinatesY;
drawAll();
document.getElementById("area_svg").addEventListener("mousedown", function (e){
    if (!checkR()){
        alert("Choose R parameter!");
        return;
    }
    coordinatesX = (e.offsetX -150) / 120 * r ;
    coordinatesY = (150 - e.offsetY) / 120 *r;
    document.getElementById("input-f:coord-y").value = coordinatesY.toString().substr(0, 4);
    document.getElementById("input-f:coord-x_input").value = coordinatesX.toString().substr(0, 4);
    document.getElementById("input-f:submitBtn").click();
    setTimeout(function () {
       drawAll();
    }, 300);
});

$("#input-f").find("input[type=radio]").click(function() {
    console.log("R changed");
    let x,
        y,
        r;
    deletePoints();
    drawAll();
});



function handleYInput(){
     y = document.getElementById("input-f:coord-y").value;
        let check = false;
        try {
            check = y > -3 && y < 5 && el.value.length < 17;
        }catch (e){
            check = false;
        }
        if (!check){
            $(y).parent().find("#x-error").html("¬ведите правильное значение!");
        }
        else {
            $(y).parent().find("#x-error").html("");
        }
        return check;
    }

function checkR() {
    let check = $("#input-f").find("input:checked").length;
    if (check == 1) {
        r = $("#input-f").find("input:checked")[0].value;
        return true
    } else return false;}
    // console.log($("#input-f").find("input:checked")[0].value);


//document.getElementById("input-f:coord-x_input").value;

    function drawAll() {
        $(".outputTable tbody tr").each(function () {
            let xP = parseFloat($(this).find("td:nth-child(1)").text());
            let yP = parseFloat($(this).find("td:nth-child(2)").text());
            let rP = parseFloat($(this).find("td:nth-child(3)").text());
            let ansP = $(this).find("td:nth-child(6)").text().toString().trim().toLowerCase();
            let flagForR;
            let flagForColor;
            if (!isNaN(xP) && !isNaN(yP)) {
                if (ansP.length == 2) {
                    flagForR = (r == rP);
                    drawPoint(xP, yP, rP, "green");
                } else {
                    flagForR = (1 == rP);
                    drawPoint(xP, yP, rP, "red");
                }
            }
        });
    }

function drawPoint(x, y, r, color) {
    let point = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    point.setAttribute('cx', (120 * x / r + 150).toString());
    point.setAttribute('cy', (-120 * y / r + 150).toString());
    point.setAttribute('r', 3 .toString());
    point.setAttribute('data-x', x);
    point.setAttribute('data-y', y);
    point.classList.add("circle");
    point.style.fill = color;
    document.getElementsByTagName("svg")[0].appendChild(point);}


function deletePoints() {
   var svg = document.getElementsByTagName("svg")[0].getElementsByClassName("circle");
   $(svg).remove();
   /*
   document.querySelectorAll(".good-coord").forEach(x => x.remove());
    document.querySelectorAll(".bad-coord").forEach(x => x.remove());
    document.querySelectorAll(".old-coord").forEach(x => x.remove());

    */
}

document.getElementById("input-f:clearBtn").addEventListener('click', function (e) {
    deletePoints();
});

/*
document.getElementById("input-f:submitBtn").addEventListener('click', function (e) {
    e.preventDefault();
        drawPoint(x, y, r, checkAnswer(), true);
});
drawAll();


 */









