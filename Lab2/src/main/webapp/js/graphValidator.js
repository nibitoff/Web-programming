function checkXArea(){
    return x <= 4 && x >= -4;
}

function checkYArea(){
    return y > -3 && y < 5;
}

function checkAreaCoordinates(){
    let errorMsg;
    if (checkXArea() && checkYArea()){
        return true;
    }
    if (!checkXArea()) {
        errorMsg = "X must be in range [-4;4]!";
    }
    if (!checkYArea()){
        errorMsg = "Y must be in range (-3;5)!";
    }
    alert(errorMsg);
}

function click(){
    if (testR()){
        convertCoordinates();
        if (checkAreaCoordinates()){
            sendRequest("no", x, y, r);
            return false;
        }
        else {
            unsetPoints();
            return false;
        }
    }
}

function changeCoordinates(){
    let centerX = 150;
    let centerY = 150;

    if (coordinatesX > centerX){
        coordinatesX = coordinatesX - centerX;
    }
    else {
        coordinatesX = -(centerX - coordinatesX);
    }

    if (coordinatesY > centerY){
        coordinatesY = -(coordinatesY - centerY);
    }
    else {
        coordinatesY = centerY - coordinatesY;
    }
}

function convertCoordinates(){
    changeCoordinates();
    x = (coordinatesX / 120)*r;
    y = (coordinatesY / 120)*r;
}

