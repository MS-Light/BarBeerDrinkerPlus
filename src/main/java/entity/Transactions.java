package entity;

import java.util.Set;

import org.json.JSONObject;

public class Transactions {
	private String Transactions_id;
	private Set<Bill> bills;
	
	private Transactions(TransactionsBuilder builder) {
		this.Transactions_id = builder.Transactions_id;
		this.bills = builder.bills;
		
	}
	public static class TransactionsBuilder {
		private String Transactions_id;
		private Set<Bill> bills;

		public void setTransactions_id(String Transactions_id) {
			this.Transactions_id = Transactions_id;
		}

		public void setBills(Set<Bill> bills) {
			this.bills = bills;
		}

		public Transactions build() {
			return new Transactions(this);
		}
		
	}
	
	public String getTransactions_id() {
		return Transactions_id;
	}
	public void setTransactions_id(String Transactions_id) {
		this.Transactions_id = Transactions_id;
	}
	public Set<Bill> getBills() {
		return bills;
	}
	public void setBills(Set<Bill> bills) {
		this.bills = bills;
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("Transactions_id", Transactions_id);
		obj.put("Bill", bills);
		return obj;
	}
}
