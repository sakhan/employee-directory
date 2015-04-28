package com.sheraz.empreg;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.sheraz.empreg.domain.Employee;
import com.sheraz.empreg.repository.EmployeeRepository;

@SpringBootApplication
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(Application.class, args);
		
		initSeedData(ctx);
	}
	
	private static void initSeedData(ApplicationContext ctx) {
		log.info("Loading seed data into database ...");
		EmployeeRepository empRepository = ctx.getBean(EmployeeRepository.class);
		int multiFactor = 600;
		for(int i=0; i<multiFactor; i++) { // create multiFactor x 5 employees
			empRepository.save(createEmployees(i));
		}
		log.info("Data load completed.");
	}
	
	private static List<Employee> createEmployees(int uniqueSuffix) {
		List<Employee> employees = new ArrayList<Employee>();
		employees.add(new Employee(unique("Sheraz", uniqueSuffix), "Khan", "Developer", "Houston"));
		employees.add(new Employee(unique("Jeff", uniqueSuffix), "Smith", "UX guy", "San Francisco"));
		employees.add(new Employee(unique("John", uniqueSuffix), "Doe", "Business Analyst", "Austin"));
		employees.add(new Employee(unique("Susan", uniqueSuffix), "Bar", "Project Manager", "Dallas"));
		employees.add(new Employee(unique("Bob", uniqueSuffix), "Williams", "Scrum master", "San Antonio"));
		return employees;
	}
	
	private static String unique(String text, int unique) {
		return text + (unique != 0 ? unique : "");
	}
	

}
