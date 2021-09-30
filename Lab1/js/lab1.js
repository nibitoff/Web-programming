var x = document.getElementById("x");
var r = document.getElementById("r");
var y = document.getElementById("y");

const maxLength = 15;

function test(){
    let ok1 = testMyNumber(y,-5, 5);
    let ok2 = testMyNumber(r,1, 4);
    let ok = ok1 && ok2;

    if(ok){
        $('[submit]').removeAttr('disabled').removeClass("disabled_1").addClass("submit");
          }
    else {
        $('[submit]').removeClass("submit").addClass("disabled_1").attr('disabled', true);
    }
    return ok;
}

function testMyNumber(el, min, max){
    let check = true;
    try {
        check = el.value > min && el.value < max && el.value.length > 0 && el.value.length < 13;
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


$(document).ready(function () {
    $('[clear_table]').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: "php/clear.php",
            type: "GET",
            success: function() {
                let table = document.getElementById("answer_table");
                table.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Попадание</th>
                    <th>Время запроса</th>
                    <th>Время выполнения</th>
                </tr>
                `
            },
        });
    location.reload();
    })

})



$(document).ready(function() {
        $('[submit]').on('click',function(e) {
            e.preventDefault();
            let check = test();
            if (check) {
                $.ajax({
                    url: "php/new.php",
                    type: "GET",
                    data: {"x": x.value, "y": y.value, "r": r.value},
                    success: function (response) {
                        let table = document.getElementById("answer_table");
                        table.insertAdjacentHTML('afterend', response);
                    },
                    //web errors checking
                    error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        alert(msg);
                    }

                });
            }
        })
    });

$(document).ready(function () {
    $.ajax({
        url: "php/save_session.php",
        type: "GET",
        success: function (response){
            let table = document.getElementById("answer_table");
            table.insertAdjacentHTML('afterend', response);
        }
    })
});


