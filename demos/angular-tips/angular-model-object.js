(function(angular) {
	'use strict';

	angular
		.module('app', [])
		.factory('User', ['$http', 
			function($http){
				
				function User(firstName, lastName, role, organisation) {
					this.firstName = firstName;
					this.lastName = lastName;
					this.role = role;
					this.organisation = organisation;
				}

				User.prototype.getFullName = function() {
					return this.firstName + ' ' + this.lastName;
				}

				var possibleRoles = ['admin', 'editor', 'guest'];

				function checkRole(role) {
					return possibleRoles.indexOf(role) !== -1;
				}

				User.possibleRoles = angular.copy(possibleRoles);

				User.build = function(data) {
					if (!checkRole(data.role)) {
						return;
					}

					return new User(
						data.firstName,
						data.lastName,
						data.role,
						data.organisation
					);
				};

				return User;
			}
		]);
}(angular));