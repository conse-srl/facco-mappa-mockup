sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/base/Log"
], function (Controller, History, Log) {
	"use strict";

	return Controller.extend("facco-mappa-2.controller.BaseController", {
		_oLogger: null,

		onInit: function () {

		},

		getLogger: function (sController) {
			this._oLogger = Log.getLogger(sController);
			return this._oLogger;
		},

		getControllerName: function () {
			return this.getView().getControllerName();
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getI18nText: function (sText, a) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText, a);
		},

		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		onNavBack: function (oEvent) {
			var oHistory,
				sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/);
			}
		}

	});
});