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
import entity.Bill;
import entity.Transactions;
import entity.Transactions.TransactionsBuilder;
import entity.Bill.BillBuilder;


public class MySQLConnection {
	private Connection conn;

	public MySQLConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").getDeclaredConstructor().newInstance();
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
//		Set<String> BeersID = getBeers();

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
	
	
	
	
	public Set<String> getBillID(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}

		Set<String> bill_id = new HashSet<>();

		try {
			String sql = "SELECT Bills.bill_id FROM  Bills left join Transactions on Bills.bill_id = Transactions.bill_id Where Bills.drinker = ? group by bill_id Order By Bills.bar, bill_id, Bills.date, Bills.time;";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				String beerN = rs.getString("bill_id");
				bill_id.add(beerN);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return bill_id;
	}
	
	public Set<Transactions> getTransactions(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Transactions> transaction = new HashSet<>();
		Set<String> bill_id = getBillID(username);

		for (String a : bill_id) {
			Set<Bill> bill_detail = getBillDetail(a);
			TransactionsBuilder builder = new TransactionsBuilder();
			builder.setTransactions_id(a);
			builder.setBills(bill_detail);
			transaction.add(builder.build());
		}
		return transaction;
	}
	
	
	public Set<Bill> getBillDetail(String bill_id) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new HashSet<>();
		}
		Set<Bill> bill = new HashSet<>();

		String sql = "SELECT Bills.bill_id,Bills.bar,Bills.time,Bills.date,Bills.drinker,Transactions.item,Transactions.quantity,Transactions.type,Transactions.price,Bills.total_price FROM  Bills left join Transactions on Bills.bill_id = Transactions.bill_id Where Bills.bill_id = ? Order By Bills.date;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, bill_id);
			ResultSet rs = statement.executeQuery();

			BillBuilder builder = new BillBuilder();
			while (rs.next()) {
				builder.setBillId(rs.getString("bill_id"));
				builder.setBar(rs.getString("bar"));
				builder.setDate(rs.getString("date"));
				builder.setItem(rs.getString("item"));
				builder.setQuantity(rs.getString("quantity"));
				builder.setType(rs.getString("type"));
				builder.setPrice(rs.getString("price"));
				builder.setTotalPrice(rs.getString("total_price"));
				builder.setTime(rs.getString("time"));
				bill.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return bill;
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
