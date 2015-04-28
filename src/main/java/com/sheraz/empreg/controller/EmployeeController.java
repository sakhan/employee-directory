package com.sheraz.empreg.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmployeeController {

	@RequestMapping("/user")
	public @ResponseBody Principal user(Principal user) {
	    return user;
	}
	
}
