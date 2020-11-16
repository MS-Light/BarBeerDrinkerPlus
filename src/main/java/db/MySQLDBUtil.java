package db;

public class MySQLDBUtil {
	private static final String INSTANCE = "127.0.0.1";
	private static final String PORT_NUM = "3306";
	public static final String DB_NAME = "LocalConnection";
	private static final String USERNAME = "root";
	private static final String PASSWORD = "jj79722356";
	public static final String URL = "jdbc:mysql://"
			+ INSTANCE + ":" + PORT_NUM + "/" + DB_NAME
			+ "?user=" + USERNAME + "&password=" + PASSWORD
			+ "&autoReconnect=true&serverTimezone=UTC";

}
