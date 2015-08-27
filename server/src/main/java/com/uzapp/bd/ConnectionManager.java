package com.uzapp.bd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;





import javax.naming.Context;




import javax.servlet.ServletContext;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;

public class ConnectionManager {
	
	static Context initContext;
	private final static String DRIVER_CLASS_NAME = "org.postgresql.Driver";
	private static DataSource datasource ;
	static {

		try {
		Class.forName(DRIVER_CLASS_NAME);
		Scanner sc = new Scanner(new File("src/main/resources/bd.txt"));//Usado en local
		//Scanner sc = new Scanner(new File("WEB-INF/classes/bd.txt"));//Usado en el servidor

        PoolProperties p = new PoolProperties();
        p.setUrl("jdbc:postgresql://155.210.14.31:5432/pruebadb");
        p.setDriverClassName("org.postgresql.Driver");
        p.setUsername(sc.next());
        p.setPassword(sc.next());//contrasena de la BD
        p.setJmxEnabled(true);
        p.setTestWhileIdle(false);
        p.setTestOnBorrow(true);
        p.setValidationQuery("SELECT 1");
        p.setTestOnReturn(false);
        p.setValidationInterval(30000);
        p.setTimeBetweenEvictionRunsMillis(30000);
        p.setMaxActive(20);
        p.setInitialSize(10);
        p.setMaxWait(5000);
        p.setMaxIdle(10);
        p.setRemoveAbandonedTimeout(60);
        p.setMinEvictableIdleTimeMillis(30000);
        p.setMinIdle(10);
        p.setLogAbandoned(true);
        p.setRemoveAbandoned(true);
        p.setJdbcInterceptors(
          "org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;"+
          "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");
        
        datasource = new DataSource();
        datasource.setPoolProperties(p);
		} catch (ClassNotFoundException e) {
			e.printStackTrace(System.err);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	

	public static Connection getConnection() {
		try {
			
			return datasource.getConnection();
		
			
		} catch (SQLException e) {
			System.out.println("Driver no encontrado."); 
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	 /*// Pruebas de conexion
	  public static void main(String[] args){
		Connection c = ConnectionManager.getConnection();
		String queryString = "SELECT * FROM \"TB_ESPACIOS\"";    
		
		
        try {
			PreparedStatement preparedStatement = c.prepareStatement(queryString);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()){
				System.out.println("Espacio: "+rs.getString("ID_ESPACIO"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
}