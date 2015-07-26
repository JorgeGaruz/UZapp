package com.uzapp.rest.busquedas;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/busquedas")
public class BusquedasRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(BusquedasRestController.class);
	
	@RequestMapping(
			value = "/codigoespacios", 
			method = RequestMethod.GET,
			produces = "application/json")
	public String codigoEspacios(){
		
		
		return null;
		
	}

}
