package com.lab2.servlets;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedList;

@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    HttpServletRequest request;
    HttpServletResponse response;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = request.getServletContext();

        String check = request.getParameter("check");
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        if (check.equals("clear")) {
            LinkedList<String> answer = new LinkedList<>();
            answer.clear();
            servletContext.setAttribute("answer", answer);
            response.sendRedirect("update.jsp");
        }else if(check.equals("reload")){
            response.sendRedirect("update.jsp");
        }
        else {
            if ((x != null && y != null && r != null) && (!x.trim().equals("") && !y.trim().equals("") && !r.trim().equals(""))) {
                request.getRequestDispatcher("/AreaCheckServlet").forward(request, response);
            } else {
                response.setStatus(422);
            }
        }
    }
    }
