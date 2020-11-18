package db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.Set;

import entity.Beer;
import entity.Beer.BeerBuilder;


public class MySQLConnection {
	private Connection conn;

	public MySQLConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection(MySQLDBUtil.URL);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void close() {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public Set<String> getBeers() {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}

		Set<String> beer = new HashSet<>();

		try {
			String sql = "SELECT name FROM Beer";
			PreparedStatement statement = conn.prepareStatement(sql);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				String beerN = rs.getString("name");
				beer.add(beerN);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return beer;
	}
	public Set<Beer> getBeersInfo() {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Beer> BeersInfo = new HashSet<>();
		Set<String> BeersID = getBeers();

		String sql = "SELECT * FROM Beer";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
//			for (String name : BeersID) {
//				statement.setString(1, name);
				ResultSet rs = statement.executeQuery();

				BeerBuilder builder = new BeerBuilder();
				while (rs.next()) {
					builder.setName(rs.getString("name"));
					builder.setManf(rs.getString("manf"));
					BeersInfo.add(builder.build());
				}
//			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	public boolean addUser(String userId, String password, String firstname, String lastname) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}

		String sql = "INSERT IGNORE INTO users VALUES (?, ?, ?, ?)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			statement.setString(2, password);
			statement.setString(3, firstname);
			statement.setString(4, lastname);

			return statement.executeUpdate() == 1;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	public String getFullname(String userId) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return "";
		}
		String name = "";
		String sql = "SELECT first_name, last_name FROM users WHERE user_id = ? ";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				name = rs.getString("first_name") + " " + rs.getString("last_name");
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return name;
	}

	public boolean verifyLogin(String userId, String password) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return false;
		}
		String sql = "SELECT user_id FROM users WHERE user_id = ? AND password = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, userId);
			statement.setString(2, password);
			ResultSet rs = statement.executeQuery();
			if (rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return false;
	}
}
