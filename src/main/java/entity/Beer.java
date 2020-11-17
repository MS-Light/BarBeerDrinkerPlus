package entity;

import org.json.JSONArray;
import org.json.JSONObject;

public class Beer {
	private String name;
	private String manf;
	
	private Beer(BeerBuilder builder) {
		this.name = builder.name;
		this.manf = builder.manf;
		
	}
	public static class BeerBuilder {
		private String name;
		private String manf;

		public void setName(String name) {
			this.name = name;
		}

		public void setManf(String manf) {
			this.manf = manf;
		}

		public Beer build() {
			return new Beer(this);
		}
		
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getManf() {
		return manf;
	}
	public void setmanf(String manf) {
		this.manf = manf;
	}
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("name", name);
		obj.put("manf", manf);
		return obj;
	}
}
