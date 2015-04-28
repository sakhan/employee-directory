package com.sheraz.empreg.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.sheraz.empreg.domain.Employee;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

	public Page<Employee> findByFirstNameContainsOrLastNameContainsAllIgnoreCase(
									@Param("firstname") String firstname, 
									@Param("firstname") String lastname, 
									Pageable pageable);
	
}
