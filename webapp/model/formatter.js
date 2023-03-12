sap.ui.define([], function () {
	"use strict";

	return {

		getInitials: function (sName, sSurname) {
			if (sName && sSurname) {
				return sName + " " + sSurname + " (" + sName.charAt(0).toUpperCase() + sSurname.charAt(0).toUpperCase() + ")";
			}
			return "";
		}

	};
});