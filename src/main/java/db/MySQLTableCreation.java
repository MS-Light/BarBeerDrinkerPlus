package db;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.Connection;

public class MySQLTableCreation {
	// Run this as Java application to reset the database.
	public static void main(String[] args) {
		try {
	// Step 1 Connect to MySQL.
			System.out.println("Connecting to " + MySQLDBUtil.URL);
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			Connection conn = DriverManager.getConnection(MySQLDBUtil.URL);
			
			if (conn == null) {
				return;
			}
			// Step 2 Drop tables in case they exist.
//			Statement statement = conn.createStatement();
//			String sql = "DROP TABLE IF EXISTS Sells";
//			statement.executeUpdate(sql);
//
//			sql = "DROP TABLE IF EXISTS Beers";
//			statement.executeUpdate(sql);
//
//			sql = "DROP TABLE IF EXISTS Bars";
//			statement.executeUpdate(sql);
//
//			sql = "DROP TABLE IF EXISTS Drinkers";
//			statement.executeUpdate(sql);
//			
//			conn.close();
//			System.out.println("Import done successfully");
//			
//	// Step 3 Create new tables
//			sql = "CREATE TABLE Beers ("
//								+ "manf VARCHAR(50),"
//								+ "name VARCHAR(255) NOT NULL,"
//								+ ")";
//			statement.executeUpdate(sql);


		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
