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
	public Set<String> getBeers(String beerName) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}

		Set<String> beer = new HashSet<>();

		try {
			String sql = "SELECT * FROM beers WHERE name = ?";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beerName);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				String beerM = rs.getString("manf");
				beer.add(beerM);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return beer;
	}
	public Set<Beer> getBeersInfo(String beerName) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Beer> BeersInfo = new HashSet<>();
		Set<String> BeersID = getBeers(beerName);

		String sql = "SELECT * FROM beers WHERE name = ?";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			for (String name : BeersID) {
				statement.setString(1, name);
				ResultSet rs = statement.executeQuery();

				BeerBuilder builder = new BeerBuilder();
				if (rs.next()) {
					builder.setName(rs.getString("name"));
					builder.setManf(rs.getString("manf"));
					BeersInfo.add(builder.build());
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}

}
