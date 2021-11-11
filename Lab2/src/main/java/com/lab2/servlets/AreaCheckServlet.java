package com.lab2.servlets;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;

@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    LinkedList<String> answer = new LinkedList<>();
    String message;
    Double x, y, r;
    String check;
    String xFormat, yFormat;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = request.getServletContext();
        check = request.getParameter("check");
        if (check.equals("clear")) {
            answer = new LinkedList<>();
            servletContext.setAttribute("answer", answer);
            response.sendRedirect("update.jsp");
            return;
        }
        x = Double.parseDouble(request.getParameter("x"));
        y = Double.parseDouble(request.getParameter("y"));
        r = Double.parseDouble(request.getParameter("r"));

            if (checkRange()) {
                String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                long startTime = System.nanoTime();

                checkResult(x, y, r);
                long timeResponse = (System.nanoTime() - startTime);
                answer.addFirst("<tr><td>" + x + "</td>" +
                        "<td>" + y + "</td>" +
                        "<td>" + r + "</td>" +
                        "<td>" + message + "</td>" +
                        "<td>" + timeResponse + " ns" + "</td>" +
                        "<td>" + currentTime + "</td></tr>");
            } else {
                message = "<td>Значение некорректно!</td>";
                answer.addFirst("<tr>" + message + message + message + message + message + message + "</tr>");
            }


            servletContext.setAttribute("answer", answer);
            response.sendRedirect("update.jsp");
        }


        //calculation
        private void checkResult ( double x, double y, double r){
            if ((x <= 0 && y >= 0 && x * x + y * y <= r * r) ||
                    (x >= 0 && y <= 0 && x <= r / 2 && y <= r) ||
                    (x >= 0 && y >= 0 && y <= (-2 * x + r))) {
                message = "Да";
            } else {
                message = "Нет";
            }
        }


        //checking for unwanted values
        private boolean checkRange() {
            if (x < -4 || x > 4 || y <= -3 || y >= 5 || r < 1 || r > 5) {
                return false;
            }
            return true;
        }

    }

