package db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

import entity.Bartender;
import entity.Bartender.BartenderBuilder;
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
	
	public LinkedList<String> getBeers() {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}

		LinkedList<String> beer = new LinkedList<>();

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
	public LinkedList<Beer> getBeersInfo() {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();

		String sql = "SELECT * FROM Beer";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
				ResultSet rs = statement.executeQuery();

				BeerBuilder builder = new BeerBuilder();
				while (rs.next()) {
					builder.setName(rs.getString("name"));
					builder.setManf(rs.getString("manf"));
					BeersInfo.add(builder.build());
				}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	public LinkedList<Beer> getLargestSpenders(String barname) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT b.drinker, sum(total_price) From Bills b" + 
				" Where b.bar = ?" + 
				" Group By b.drinker" + 
				" Order By sum(total_price)" + 
				" DESC" + 
				" limit 10;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, barname);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("sum(total_price)"));
				builder.setManf(rs.getString("drinker"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getPopularBeers(String barname) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Beer.name, sum(Transactions.quantity)FROM Beer, Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" Where Transactions.item = Beer.name and Bills.bar = ?" + 
				" Group by Transactions.item" + 
				" Order By sum(Transactions.quantity)" + 
				" DESC" + 
				" LIMIT 10;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, barname);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("name"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	public LinkedList<Beer> getBestManufacturers(String barname) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Beer.manf, sum(Transactions.quantity) FROM Beer, Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" Where Transactions.item = Beer.name and Bills.bar = ?" + 
				"Group by Beer.manf " + 
				"Order By sum(Transactions.quantity) " + 
				"DESC " + 
				"LIMIT 10;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, barname);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("manf"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	
	public LinkedList<String> getBillID(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}

		LinkedList<String> bill_id = new LinkedList<String>();

		try {
			String sql = "SELECT Bills.bar, Bills.date, Bills.time, Bills.bill_id FROM  Bills left join Transactions on Bills.bill_id = Transactions.bill_id Where Bills.drinker = ? group by bill_id Order By Bills.bar, Bills.date, Bills.time;";
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
	
	public LinkedList<String> getBestSellBar(String beer) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}

		LinkedList<String> bar = new LinkedList<String>();

		try {
			String sql = "SELECT Beer.name , Beer.manf,sum(Transactions.quantity),Bills.bar from Beer , Transactions left join Bills on Transactions.bill_id = Bills.bill_id" + 
					" Where Transactions.item = ? and Transactions.item = Beer.name" + 
					" Group By Bills.bar" + 
					" Order By sum(Transactions.quantity)" + 
					" Desc" + 
					" Limit 5;";
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beer);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				String beerN = rs.getString("bar");
				bar.add(beerN);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return bar;
	}
	
	public LinkedList<Transactions> getTransactions(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Transactions> transaction = new LinkedList<>();
		LinkedList<String> bill_id = getBillID(username);

		for (String a: bill_id) {
			LinkedList<Bill> bill_detail = getBillDetail(a);
			TransactionsBuilder builder = new TransactionsBuilder();
			builder.setTransactions_id(a);
			builder.setBills(bill_detail);
			transaction.add(builder.build());
		}
		return transaction;
	}
	
	
	public LinkedList<Bill> getBillDetail(String bill_id) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Bill> bill = new LinkedList<>();

		String sql = "SELECT Bills.bill_id,Bills.bar,Bills.time,Bills.date,Bills.drinker,Transactions.item,Transactions.quantity,Transactions.type,Transactions.price,Bills.total_price FROM  Bills left join Transactions on Bills.bill_id = Transactions.bill_id Where Bills.bill_id = ?";
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
	
	public LinkedList<Bartender> getBartenderShifts(String name, String bar) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Bartender> BartenderInfo = new LinkedList<>();
		String sql = "SELECT  Shifts.* From Beer,(Bills left join Shifts on Bills.bartender = Shifts.bartender) Left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" WHERE Bills.bartender = ? and Bills.bar = ? and Beer.name = Transactions.item" + 
				" Group by Beer.manf,Shifts.date;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, name);
			statement.setString(2, bar);
			ResultSet rs = statement.executeQuery();
			BartenderBuilder builder = new BartenderBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("bartender"));
				builder.setBar(rs.getString("bar"));
				builder.setStart(rs.getString("start"));
				builder.setEnd(rs.getString("end"));
				builder.setDay(rs.getString("day"));
				builder.setDate(rs.getString("date"));
				BartenderInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BartenderInfo;
	}
	public LinkedList<Beer> getBartenderSold(String name, String bar) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT distinct Beer.manf, sum(Transactions.quantity)From Beer,(Bills left join Shifts on Bills.bartender = Shifts.bartender) Left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" WHERE Bills.bartender = ? and Bills.bar = ?" + 
				"and Beer.name = Transactions.item " + 
				"Group by Beer.manf,Bills.bartender " + 
				"Order by sum(Transactions.quantity) " + 
				"Desc ;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, name);
			statement.setString(2, bar);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("manf"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	
	public LinkedList<Beer> getHighestRegion(String manufacture) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Drinker.state,sum(Transactions.quantity * Transactions.price) From ((Bills left join Transactions on Bills.bill_id = Transactions.bill_id)left join Beer on Transactions.item = Beer.name)left join Drinker on Drinker.name = Bills.drinker" + 
				" Where Transactions.type = 'beer' and Beer.manf = ?" + 
				" group by Drinker.state" + 
				" Order by sum(Transactions.quantity * Transactions.price)" + 
				" DESC;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, manufacture+"\n");
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("state"));
				builder.setManf(rs.getString("sum(Transactions.quantity * Transactions.price)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getHighestLikes(String manufacture) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "Select Drinker.state,count(Beer.name) FROM (Likes left join Drinker on Likes.drinker = Drinker.name) left join Beer on Likes.beer = Beer.name" + 
				" where Beer.manf = ?" + 
				" Group by Drinker.state" + 
				" Order by count(Beer.name)" + 
				" DESC;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, manufacture+"\n");
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("state"));
				builder.setManf(rs.getString("count(Beer.name)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	public LinkedList<Beer> getDrinkerOrderMost(String name) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Bills.drinker,Transactions.item,sum(Transactions.quantity) FROM Transactions left join Bills on Transactions.bill_id = Bills.bill_id" + 
				" Where Transactions.bill_id = Bills.bill_id and Bills.drinker = ? and Transactions.type = 'beer'" + 
				" Group By Transactions.item" + 
				" Order By sum(Transactions.quantity)" + 
				" DESC;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, name);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("item"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	
	public LinkedList<Beer> getBusiestPeriods(String bar) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "Select LEFT(Bills.time, 2),sum(Bills.time) From Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" WHERE Bills.bar = ?" + 
				" Group By LEFT(Bills.time, 2)" + 
				" Order By LEFT(Bills.time, 2)";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, bar);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("LEFT(Bills.time, 2)"));
				builder.setManf(rs.getString("sum(Bills.time)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getDrinkerSpendingDay(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT b.day,sum(b.total_price) from Bills b where b.drinker = ?" + 
				" group by b.day;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("day"));
				builder.setManf(rs.getString("sum(b.total_price)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getDrinkerSpendingMonth(String username) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT LEFT(date,7),sum(b.total_price) from Bills b where b.drinker = ?" + 
				"group by LEFT(date,7);";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, username);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("LEFT(date,7)"));
				builder.setManf(rs.getString("sum(b.total_price)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getDistributionSales(String bar) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "Select Bills.date,sum(Bills.total_price) From Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" WHERE Bills.bar = ?" + 
				" Group By Bills.date" + 
				" Order By Bills.date" + 
				" ASC;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, bar);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("date"));
				builder.setManf(rs.getString("sum(Bills.total_price)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getBiggestConsumer(String beer) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Bills.drinker , sum(Transactions.quantity),Transactions.item from (Bills left join Transactions on Transactions.bill_id = Bills.bill_id)left join Drinker on Drinker.name = Bills.drinker" + 
				" Where Transactions.item = ?" + 
				" Group By Bills.drinker" + 
				" Order By sum(Transactions.quantity)" + 
				" Desc;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beer);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("drinker"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getBeerTimeDistribution(String beer) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Bills.date, sum(Transactions.quantity) from  Transactions left join Bills on Transactions.bill_id = Bills.bill_id" + 
				" Where Transactions.item = ?" + 
				" Group By Bills.date" + 
				" Order By Bills.date";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beer);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("date"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<String> getInfo(String query, String title) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<String> info = new LinkedList<>();
		try {
			PreparedStatement statement = conn.prepareStatement(query);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				info.add(rs.getString(title));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return info;
	}
	
	public LinkedList<Beer> getBarAna(String beer) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Transactions.item,Bills.bar,sum(Transactions.quantity) from Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" where Transactions.item = ?" + 
				" group by Bills.bar" + 
				" order by sum(Transactions.quantity)" + 
				" DESC" + 
				" limit 10;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beer);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("bar"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getBarAnaDay(String beer, String day) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Transactions.item,Bills.bar,sum(Transactions.quantity) from Bills left join Transactions on Bills.bill_id = Transactions.bill_id" + 
				" where Transactions.item = ? and Bills.day = ?" + 
				" Group by Bills.bar" + 
				" Order by sum(Transactions.quantity)" + 
				" DESC limit 10;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, beer);
			statement.setString(2, day);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("bar"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	public LinkedList<Beer> getBartenderAnalytics(String day, String bar, String start, String end) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return new LinkedList<>();
		}
		LinkedList<Beer> BeersInfo = new LinkedList<>();
		String sql = "SELECT Shifts.bartender,Shifts.day,sum(Transactions.quantity) From (Bills left join Transactions on Bills.bill_id = Transactions.bill_id) left join Shifts on Bills.bartender = Shifts.bartender" + 
				" where  Shifts.day = ? and Bills.bar = ? and IF(start < end, Shifts.start > ? and Shifts.end < ? , Shifts.start > ? and Shifts.end > ?) and Shifts.day = Bills.day" + 
				" group by Shifts.bartender;";
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.setString(1, day);
			statement.setString(2, bar);
			statement.setString(3, start);
			statement.setString(4, end);
			statement.setString(5, start);
			statement.setString(6, end);
			ResultSet rs = statement.executeQuery();
			BeerBuilder builder = new BeerBuilder();
			while (rs.next()) {
				builder.setName(rs.getString("bartender"));
				builder.setManf(rs.getString("sum(Transactions.quantity)"));
				BeersInfo.add(builder.build());
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return BeersInfo;
	}
	
	
	
	
	
	
	
	
	
	public Integer insertFunction(String query) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return 0;
		}
		String sql = "INSERT INTO " + query;
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	public Integer updateFunction(String query) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return 0;
		}
		String sql = "UPDATE " + query;
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	public Integer deleteFunction(String query) {
		if (conn == null) {
			System.err.println("DB connection failed");
			return 0;
		}
		String sql = "DELETE FROM " + query;
		try {
			PreparedStatement statement = conn.prepareStatement(sql);
			statement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
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
