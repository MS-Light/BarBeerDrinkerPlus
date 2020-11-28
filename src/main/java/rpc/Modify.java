package rpc;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import db.MySQLConnection;

/**
 * Servlet implementation class Modify
 */
public class Modify extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Modify() {
        super();
        // TODO Auto-generated constructor stub
    }
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	MySQLConnection connection = new MySQLConnection();
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		String sql = input.getString("query");
		int resp = connection.insertFunction(sql);
		connection.close();
		RpcHelper.writeJsonObject(response, new JSONObject().put("result", resp));
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MySQLConnection connection = new MySQLConnection();
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		String sql = input.getString("query");
		int resp = connection.updateFunction(sql);
		connection.close();
		RpcHelper.writeJsonObject(response, new JSONObject().put("result", resp));
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MySQLConnection connection = new MySQLConnection();
		JSONObject input = new JSONObject(IOUtils.toString(request.getReader()));
		String sql = input.getString("query");
		int resp = connection.deleteFunction(sql);
		connection.close();
		RpcHelper.writeJsonObject(response, new JSONObject().put("result", resp));
	}

}
