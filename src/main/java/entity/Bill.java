package entity;

import org.json.JSONObject;

public class Bill {
	private String bill_id;
	private String bar;
	private String date;
	private String item;
	private String quantity;
	private String type;
	private String price;
	private String totalPrice;
	private String time;
	
	private Bill(BillBuilder builder) {
		this.bill_id = builder.bill_id;
		this.bar = builder.bar;
		this.date = builder.date;
		this.item = builder.item;
		this.quantity = builder.quantity;	
		this.type = builder.type;
		this.price = builder.price;	
		this.totalPrice = builder.totalPrice;
		this.time = builder.time;
	}
	public static class BillBuilder {
		private String bill_id;
		private String bar;
		private String date;
		private String item;
		private String quantity;
		private String type;
		private String price;
		private String totalPrice;
		private String time;

		public void setBillId(String bill_id) {
			this.bill_id = bill_id;	
		}

		public void setBar(String bar) {
			this.bar = bar;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public void setItem(String item) {
			this.item = item;
		}
		public void setQuantity(String quantity) {
			this.quantity = quantity;
		}
		public void setType(String type) {
			this.type = type;
		}
		public void setPrice(String price) {
			this.price = price;
		}
		public void setTotalPrice(String totalPrice) {
			this.totalPrice = totalPrice;
		}
		public void setTime(String time) {
			this.time = time;
		}

		public Bill build() {
			return new Bill(this);
		}
		
	}
	
	public String getBillId(){
		return bill_id;
	}
	public void setBillId(String bill_id) {
		this.bill_id = bill_id;	
	}
	public String getBar(){
		return bar;
	}
	public void setBar(String bar) {
		this.bar = bar;
	}
	public String getDate(){
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getItem(){
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getQuantity(){
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}


	public String getType(){
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}


	public String getPrice(){
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}


	public String getTotalPrice(){
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getTime(){
		return time;
	}
	public void setTime(String time) {
		this.time = time;	
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("bill_id", bill_id);
		obj.put("bar", bar);
		obj.put("date", date);
		obj.put("item", item);
		obj.put("quantity", quantity);
		obj.put("type", type);
		obj.put("price", price);
		obj.put("totalPrice", totalPrice);
		obj.put("time", time);
		return obj;
		
	}
}
