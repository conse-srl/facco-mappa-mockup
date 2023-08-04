sap.ui.define([
	"facco-mappa-2/controller/BaseController",
	"facco-mappa-2/model/formatter",
	"sap/ui/model/json/JSONModel"
], function (BaseController, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("facco-mappa-2.controller.Home", {
		formatter: formatter,

		onInit: function () {
			this.getLogger(this.getControllerName()).info("onInit");
			BaseController.prototype.onInit.apply(this, arguments);

			this.setMapColor(1);

			var oModel = new JSONModel();
			var oDateENd = new Date();
			oDateENd.setFullYear(2022);

			oModel.setData({
				oDRS4Start: oDateENd,
				oDRS4End: new Date()
			});
			this.getView().setModel(oModel);
		},

		buttonPress: function () {

			if (this.getView().byId("vbi").getVisible() === true) {
				this.getView().byId("vbi").setVisible(false);
				this.getView().byId("table").setVisible(true);
			} else {
				this.getView().byId("vbi").setVisible(true);
				this.getView().byId("table").setVisible(false);
			}
		},

		onRegionClick: function (oEvent) {
			sap.m.MessageToast.show("onRegionClick " + oEvent.getParameter("code"));
		},

		selectionChange: function (oEvent) {
			switch (oEvent.getParameter("item").getKey()) {
				case "ODA":
					this.setMapColor(1);
					break;

				case "EM":
					this.setMapColor(2);
					break;

				case "FATT":
					this.setMapColor(3);
					break;
			}
		},

		setMapColor: function (color) {
			var aList = this.getView().byId("vbi").mNames;

			function getRandomInt(max) {
				return Math.floor(Math.random() * max);
			}

			for (const key in aList) {

				let sColor;
				switch (getRandomInt(3)) {
					case 0:
						switch (color) {
							case 1:
								sColor = "rgb(3, 252, 28)";
								break;
							case 2:
								sColor = "rgb(250, 120, 120)";
								break;
							case 3:
								sColor = "rgb(115, 167, 250)";
								break;
						}

						break;

					case 1:
						switch (color) {
							case 1:
								sColor = "rgb(112, 255, 127)";
								break;
							case 2:
								sColor = "rgb(250, 120, 120)";
								break;
							case 3:
								sColor = "rgb(132, 142, 250)";
								break;
						}

						break;

					case 2:
						switch (color) {
							case 1:
								sColor = "rgb(160, 250, 169)";
								break;
							case 2:
								sColor = "rgb(247, 72, 72)";
								break;
							case 3:
								sColor = "rgb(47, 125, 250)";
								break;
						}

						break;

					case 3:
						switch (color) {
							case 1:
								sColor = "rgb(196, 242, 201)";
								break;
							case 2:
								sColor = "rgb(255, 0, 0)";
								break;
							case 3:
								sColor = "rgb(0, 98, 255)";
								break;
						}
						break;

				}

				let oRegion = new sap.ui.vbm.Region({
					code: key,
					color: sColor
				});

				this.getView().byId("vbi").addRegion(oRegion);
			}
		}

	});
});