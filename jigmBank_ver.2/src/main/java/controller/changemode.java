package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.AccountDao;
import dao.OtpDao;

/**
 * Servlet implementation class changemode
 */
@WebServlet("/changemode")
public class changemode extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public changemode() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	System.out.println("확인");
		try {
			request.setCharacterEncoding("UTF-8");
			String acidno = request.getParameter("acidno");
			int result = AccountDao.getAccountDao().changemode(acidno);
			
			
			if(result==1) {
				response.getWriter().print(1);
			}else {
				response.getWriter().print(2);
			}
		}catch (Exception e) {
			System.out.print(e);
		}
	}

}
