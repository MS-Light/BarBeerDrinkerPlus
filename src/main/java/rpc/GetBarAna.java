package rpc;

import java.io.IOException;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import db.MySQLConnection;
import entity.Beer;

/**
 * Servlet implementation class GetBarAna
 */
public class GetBarAna extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetBarAna() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String beername = request.getParameter("beer");
		String day = request.getParameter("day");
		MySQLConnection connection = new MySQLConnection();
		LinkedList<Beer> beers;
		if (day.equals("EveryDay")) {
			beers = connection.getBarAna(beername);
		}else {
			beers = connection.getBarAnaDay(beername,day);
		}
		connection.close();
		
		JSONArray array = new JSONArray();
		for (Beer beer : beers) {
			JSONObject obj = beer.toJSONObject();
			array.put(obj);
		}
		RpcHelper.writeJsonArray(response, array);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}