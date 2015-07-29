package com.uzapp.dominio;

public class Edificio {
	
	private String ID_Edificio;	
	private String edificio;

		
		public Edificio(String ID,String edificio){
			this.ID_Edificio=ID;
			this.edificio=edificio;
		}

		public String getCampus() {
			return edificio;
		}

		public void setCampus(String campus) {
			this.edificio = campus;
		}

		public String getID() {
			return ID_Edificio;
		}

		public void setID(String iD) {
			ID_Edificio = iD;
		}

}
