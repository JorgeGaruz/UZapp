package com.uzapp.dominio;

public class Espacios {
	
	private String ID_espacio;
	private String ID_centro;
	
	public Espacios(String ID_espacio){
		this.ID_espacio=ID_espacio;
	}
	
	public Espacios(String ID_espacio,String ID_centro){
		this.ID_espacio=ID_espacio;
		this.ID_centro=ID_centro;
	}

	
	public String getID_centro() {
		return ID_centro;
	}


	public void setID_centro(String iD_centro) {
		ID_centro = iD_centro;
	}


	public String getID_espacio() {
		return ID_espacio;
	}

	public void setID_espacio(String iD_espacio) {
		ID_espacio = iD_espacio;
	}
	

}
