angular.module('EmployeeApp', [])
  .controller('EmployeeController', function($scope, $http) {

	// Global employee list page size
	var pageSize = 10;
	
	// default to show all employees
	var mostRecentEmployeeSearchUrl = '/employees';

	var constructPaginationUrl = function(url, page, size) {
		var paramSeparator = (url.indexOf('?') > -1) ? '&' : '?';
		return url + paramSeparator +'page=' + page 
				   + '&size=' + (size != null ? size : pageSize); 
	}; 
	
	var loadEmployees = function(url, page, size) {
		var paginationUrl = constructPaginationUrl(url, page, size);
    	console.log(paginationUrl);
		$http.get(paginationUrl)
        	 .success(function(data) {
            	$scope.employees = (data._embedded != null) ? data._embedded.employees : [];
		    	$scope.pageInfo = data.page;
        	});
		mostRecentEmployeeSearchUrl = url;
    };

	$scope.refreshCurrentEmployeeList = function() {
		var currentPage = ($scope.pageInfo != null) ? $scope.pageInfo.number : 0; 
		loadEmployees(mostRecentEmployeeSearchUrl, currentPage);
	};
	
    $scope.gotoPage = function(targetPage) {
    	loadEmployees(mostRecentEmployeeSearchUrl, targetPage);
	};
    
	var doEmployeeSaveHttpRequest = function (method, url) { 
		var empFormJson = angular.toJson($scope.empForm);
        $http({
 			method: method,
 			url: url,
 			data: empFormJson
		}).success(function(response) {
					$scope.refreshCurrentEmployeeList();
                    $scope.empForm = {};
					$scope.showEmpForm = false;
				}); 
    };

    $scope.loadEmployeeDetail = function(emp) {
		// TODO: should do a fresh fetch from back-end
		$scope.empForm = emp; 
		$scope.showEmpForm = true;
	};

	var createEmployee = function() {
		doEmployeeSaveHttpRequest('POST', '/employees');
	}
	
	var updateEmployee = function() {
		var updateUrl = $scope.empForm._links.self.href;
		doEmployeeSaveHttpRequest('PUT', updateUrl);	// should use PATCH here
	};

	$scope.processFormSubmit = function() {
    	// if empForm has the HAL Json links data, then form is in update state
		var isUpdate = ($scope.empForm._links != null);
		if(isUpdate) {
			updateEmployee();
		} else {
			createEmployee();
		}
    };

	$scope.cancelSave = function() {
		$scope.showEmpForm = false;
		$scope.empForm = {};
	};

	$scope.deleteEmployee = function(emp) {
		$http.delete(emp._links.self.href)
			    .success(function() { 
		            $scope.refreshCurrentEmployeeList(); 
				});
	};

    $scope.search = function() {
    	loadEmployees('/employees/search/findByFirstNameContainsOrLastNameContainsAllIgnoreCase?firstname=' 
    			      + $scope.searchForm.terms + '&lastname=' + $scope.searchForm.terms);
	};
	
	var userHasRole = function(authorities) {
		for(var i=0; i<authorities.length; i++) {
			if(authorities[i].authority == 'ROLE_HR') return true;
		}
		return false;
	};
	
	var loadUserDetail = function() {
		$http.get('/user').success(function(data) {
			$scope.userDetail = data;
			$scope.hasHrRole = userHasRole(data.authorities);
		});
	};
	
	// make calls to initialize page data i.e. logged in user details and all employees
	loadUserDetail();
	$scope.refreshCurrentEmployeeList();
	
  });


