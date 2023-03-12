sap.ui.define([
	"openui5-calendar/controller/BaseController",
	"openui5-calendar/model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Select",
	"sap/ui/core/Item",
	"sap/ui/layout/form/SimpleForm",
	"sap/ui/unified/CalendarDayType"
], function (BaseController, formatter, JSONModel, Device, Button, Dialog, Select, Item, SimpleForm, CalendarDayType) {
	"use strict";

	let keys = Object.keys(CalendarDayType);
	/* const oAppointments = {
		"WIMP": CalendarDayType[keys[3]],
		"LAM": CalendarDayType[keys[4]],
		"STAR": CalendarDayType[keys[5]],
		"TAMP": CalendarDayType[keys[6]],
		"ALIS": CalendarDayType[keys[7]],
		"ZWI": CalendarDayType[keys[8]],
		"FEC": CalendarDayType[keys[9]],
		"VALS": CalendarDayType[keys[10]],
		"AMAB": CalendarDayType[keys[11]],
		"AMSD": CalendarDayType[keys[12]],
		"OFFA": CalendarDayType[keys[13]],
		"SALR": CalendarDayType[keys[14]]
	}; */
	const oAppointments = {
		"WIMP": "#0000FF", //Blu
		"LAM": "#FF00FF", //Fuchsia
		"STAR": "#FFA500", //Arancione
		"TAMP": "#800000", //Marrone
		"ALIS": "#800080", //Purple
		"ZWI": "#000080", //Navy
		"FEC": "#00FF00", //Verde lime
		"VALS": "#008000", //Verde
		"AMAB": "#17202A", //Nero
		"AMFI": "#17202A", //Nero
		"AMSD": "#17202A", //Nero
		"OFFA": "#C0C0C0", //Silver
		"SALR": "#00FFFF", //Azzurro
		"ZOB": "#FFFF00", //Giallo
		"BLO": "#FF0000", //Rosso
		"EVR": "#FF0000", //Rosso
		"ZCA": "#FFFF00", //Giallo
		"SMS": "#FF00FF" //Rosa
	};

	return BaseController.extend("openui5-calendar.controller.Home", {
		formatter: formatter,

		onInit: function () {
			this.getLogger(this.getControllerName()).info("onInit");
			BaseController.prototype.onInit.apply(this, arguments);

			this.getView().setBusy(true);

			var oViewModel = new JSONModel({
				isPhone: Device.system.phone
			});
			this.setModel(oViewModel, "appView");

			/* this.getRouter().getRoute("home").attachMatched(function (oEvent) {
				this._attachRouteMatched(oEvent);
			}.bind(this)); */

			Device.media.attachHandler(function (oDevice) {
				this.getModel("appView").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));

			let aPeople = {
				startDate: new Date(),
				people: [{
					name: "Palmer",
					surname: "Gulnaz",
					role: "Team Leader",
					appointments: []
				}, {
					name: "Rosita",
					surname: "Horn",
					role: "Team member",
					appointments: []
				}, {
					name: "Misaki",
					surname: "Carmen",
					role: "Team member",
					appointments: []
				}, {
					name: "Donna",
					surname: "Anthony",
					role: "Team member",
					appointments: []
				}, {
					name: "Chris",
					surname: "Cervantes",
					role: "Team member",
					appointments: []
				}, {
					name: "Muhamed",
					surname: "Stevenson",
					role: "Team member",
					appointments: []
				}, {
					name: "Isla",
					surname: "Freeman",
					role: "Team member",
					appointments: []
				}, {
					name: "Alfred",
					surname: "Fowler",
					role: "Team member",
					appointments: []
				}, {
					name: "Elijah",
					surname: "Moore",
					role: "Team member",
					appointments: []
				}, {
					name: "Narayana",
					surname: "Cervantes",
					role: "team Leader",
					appointments: []
				}, {
					name: "Nestor",
					surname: "Pratima",
					role: "Team member",
					appointments: []
				}, {
					name: "Vespasien",
					surname: "Buckley",
					role: "Team member",
					appointments: []
				}, {
					name: "Albin",
					surname: "Geroald",
					role: "Team member",
					appointments: []
				}, {
					name: "Imelda",
					surname: "Casimir",
					role: "Team member",
					appointments: []
				}, {
					name: "Trym",
					surname: "Borghildr",
					role: "Team member",
					appointments: []
				}, {
					name: "Hulda",
					surname: "Livianus",
					role: "Team member",
					appointments: []
				}, {
					name: "Aamir",
					surname: "Jörmungandr",
					role: "Team member",
					appointments: []
				}, {
					name: "Dennis",
					surname: "Eavan",
					role: "Team member",
					appointments: []
				}, {
					name: "Comgal",
					surname: "Baldovino",
					role: "Team member",
					appointments: []
				}, {
					name: "Beatrice",
					surname: "Richard",
					role: "Team Leader",
					appointments: []
				}]
			};


			for (let index = 0; index < aPeople.people.length; index++) {

				const start = new Date();
				var end = new Date();
				end.setDate(start.getDate() + 60);
				let loop = new Date(start);
				while (loop <= end) {
					let newDate = loop.setDate(loop.getDate() + 1);
					loop = new Date(newDate);

					if (loop.getDay() === 0 || loop.getDay() === 6) {
						continue;
					}

					let appointments = {
						start: new Date(loop.setHours(1)),
						end: new Date(loop.setHours(23)),
						title: this.getDescr(),
						//		color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
						tentative: false
					};

					appointments.color = oAppointments[appointments.title];
					//appointments.type = oAppointments[appointments.title];

					aPeople.people[index].appointments.push(appointments);

					aPeople.people[index].appointments.push(appointments);
				}
			}

			var oModel = new JSONModel();
			oModel.setData(aPeople);
			this.getView().setModel(oModel);

			document.body.style.zoom = "80%";
			this.getView().setBusy(false);
		},

		getDescr: function () {
			var number = this.random(0, Object.keys(oAppointments).length - 1);
			return Object.keys(oAppointments)[number];
		},

		random: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		onChangeTheme: function () {

			var oDialog = new Dialog({
				title: this.getI18nText("ThemeTitle"),
				draggable: true,
				content: [new SimpleForm({
					editable: true,
					layout: "ResponsiveGridLayout",
					labelSpanXL: 2,
					labelSpanL: 2,
					labelSpanM: 2,
					labelSpanS: 12,
					emptySpanXL: 3,
					emptySpanL: 2,
					emptySpanM: 1,
					emptySpanS: 0,
					columnsXL: 1,
					columnsL: 1,
					columnsM: 1,
					backgroundDesign: "Solid",
					content: [new Select({
						width: "100%",
						editable: true,
						selectedKey: "{appView>/themeSelected}",
						change: function (oEvent) {
							var sTheme = oEvent.getParameter("selectedItem").getKey();
							sap.ui.getCore().applyTheme(sTheme);
						},
						items: {
							path: "themes>/themes",
							template: new Item({
								key: "{themes>name}",
								text: "{themes>name}"
							}),
							templateShareable: false
						}
					})]
				})],
				beginButton: new Button({
					text: this.getI18nText("ThemeConfirm"),
					type: "Accept",
					press: function (oEvent) {
						var sTheme = this.getModel("appView").getProperty("/themeSelected");
						localStorage.setItem("Calendar_UI5_Theme", sTheme);
						oDialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: this.getI18nText("ThemeClose"),
					type: "Reject",
					press: function (oEvent) {
						var sTheme = localStorage.getItem("Calendar_UI5_Theme");
						if (!sTheme) {
							sTheme = sap.ui.getCore().getConfiguration().getTheme();
						}
						sap.ui.getCore().applyTheme(sTheme);
						oDialog.close();
					}
				}),
				beforeOpen: function () {
					var sTheme = localStorage.getItem("Calendar_UI5_Theme");
					if (!sTheme) {
						sTheme = sap.ui.getCore().getConfiguration().getTheme();
					}
					this.getModel("appView").setProperty("/themeSelected", sTheme);
				}.bind(this),
				afterClose: function () {
					this.getView().removeDependent(oDialog);
					oDialog.destroy();
				}.bind(this)
			});

			this.getView().addDependent(oDialog);
			oDialog.open();
		}

	});
});