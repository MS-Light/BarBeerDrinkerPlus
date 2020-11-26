package entity;

import org.json.JSONObject;

public class DrinkerSpending {
	private Beer first;
	private Beer second;
	
	private DrinkerSpending(DrinkerSpendingBuilder builder) {
		this.first = builder.first;
		this.second = builder.second;
		
	}
	public static class DrinkerSpendingBuilder {
		private Beer first;
		private Beer second;

		public void setfirst(Beer first) {
			this.first = first;
		}

		public void setsecond(Beer second) {
			this.second = second;
		}

		public DrinkerSpending build() {
			return new DrinkerSpending(this);
		}
		
	}
	
	public Beer getfirst() {
		return first;
	}
	public void setfirst(Beer first) {
		this.first = first;
	}
	public Beer getsecond() {
		return second;
	}
	public void setsecond(Beer second) {
		this.second = second;
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("first", first);
		obj.put("second", second);
		return obj;
	}
}
