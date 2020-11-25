package entity;

import org.json.JSONObject;

public class Bartender {
	private String name;
	private String bar;
	private String start;
	private String end;
	private String day;
	private String date;
	
	private Bartender(BartenderBuilder builder) {
		this.bar = builder.bar;
		this.date = builder.date;
		this.name = builder.name;
		this.start = builder.start;
		this.end = builder.end;
		this.day = builder.day;
	}
	public static class BartenderBuilder {
		private String name;
		private String bar;
		private String start;
		private String end;
		private String day;
		private String date;
		
		public void setBar(String bar) {
			this.bar = bar;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public void setName(String name) {
			this.name = name;
		}
		public void setDay(String day) {
			this.day = day;
		}
		public void setStart(String start) {
			this.start = start;
		}
		public void setEnd(String end) {
			this.end = end;
		}
		public Bartender build() {
			return new Bartender(this);
		}
	}
	public void setBar(String bar) {
		this.bar = bar;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getBar() {
		return bar;
	}
	public String getDate() {
		return date;
	}
	public String getName() {
		return name;
	}
	public String getDay() {
		return day;
	}
	public String getStart() {
		return start;
	}
	public String getEnd() {
		return end;
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("name", name);
		obj.put("bar", bar);
		obj.put("start", start);
		obj.put("end", end);
		obj.put("day", day);
		obj.put("date", date);
		return obj;
	}
	
}
