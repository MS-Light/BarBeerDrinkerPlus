package entity;

import org.json.JSONObject;

public class BeerData {
	private int name;
	private int manf;
	
	private BeerData(BeerDataBuilder builder) {
		this.name = builder.name;
		this.manf = builder.manf;
		
	}
	public static class BeerDataBuilder {
		private int name;
		private int manf;

		public void setName(int name) {
			this.name = name;
		}

		public void setManf(int manf) {
			this.manf = manf;
		}

		public BeerData build() {
			return new BeerData(this);
		}
		
	}
	
	public int getName() {
		return name;
	}
	public void setName(int name) {
		this.name = name;
	}
	public int getManf() {
		return manf;
	}
	public void setmanf(int manf) {
		this.manf = manf;
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("name", name);
		obj.put("manf", manf);
		return obj;
	}
}
