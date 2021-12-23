package entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "RESULTS")
public class Result implements Serializable {
        @Id
        @Column(name = "ID")
        @SequenceGenerator(name = "idSequence", sequenceName = "idSequence", allocationSize = 1, initialValue = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idSequence")
        private int id;

        @Column(name = "X")
        private double x;

        @Column(name = "Y")
        private double y;

        @Column(name = "R")
        private double r;

        @Column(name = "currentTime")
        private String currentTime;

        @Column(name = "executionTime")
        private String executionTime;

        @Column(name = "RESULT")
        private boolean result;

    public Result() {}

    public Result(double x, double y, double r, String currentTime, String executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
    }

    @Override
        public String toString() {
            return "Result{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", currentTime='" + currentTime +
                ", executionTime=" + executionTime +
                ", result=" + result +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
                return x;
        }

        public void setX(double x) {
                this.x = x;
        }
        public double getY() {
                return y;
        }

        public void setY(double y) {
                this.y = y;
        }

        public double getR() {
                return r;
        }

        public void setR(double r) {
                this.r = r;
        }

        public String getCurrentTime() {
                return currentTime;
        }

        public void setCurrentTime(String currentTime) {
                this.currentTime = currentTime;
        }

        public String getExecutionTime() {
                return executionTime;
        }

        public void setExecutionTime(String executionTime) {
                this.executionTime = executionTime;
        }

        public boolean isResult() {
                return result;
        }

        public void setResult(boolean result) {
                this.result = result;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Result result1 = (Result) o;
                return executionTime == result1.executionTime && result == result1.result &&
                        Objects.equals(x, result1.x) && Objects.equals(y, result1.y) &&
                        Objects.equals(r, result1.r) && Objects.equals(currentTime, result1.currentTime);
        }

}