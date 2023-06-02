sap.ui.define([
	"sap/ui/core/format/DateFormat"
], function (DateFormat) {
	"use strict";

	return {

		getInitials: function (sName, sSurname) {
			if (sName && sSurname) {
				return sName + " " + sSurname + " (" + sName.charAt(0).toUpperCase() + sSurname.charAt(0).toUpperCase() + ")";
			}
			return "";
		},

		formatDate: function (oDate) {
			if (oDate) {
				return DateFormat.getDateInstance({ style: "short" }).format(oDate);
			}
		}

	};
});