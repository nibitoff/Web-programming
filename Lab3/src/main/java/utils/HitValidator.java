package utils;

public class HitValidator {
    public boolean checkResult(double x, double y, double r){
        return (x >= 0 && y >= 0 && x * x + y * y <= r * r) ||
                (x <= 0 && y <= 0 && x >= -r/2 && y >= -r) ||
                (x >= 0 && y <= 0 && y >= (2 * x - r));
    }

    //checking for unwanted values
    public boolean checkRange(double x, double y, double r) {
        if (x <= -3 || x >= 3 || y < -3 || y > 5 || r < 1 || r > 5) {
            return false;
        }
        return true;
    }

    public boolean checkNull(double x, double y, double r){
        if (String.valueOf(x) != null && String.valueOf(y) != null && String.valueOf(r) != null){
            return true;
        }
        return false;
    }

}
