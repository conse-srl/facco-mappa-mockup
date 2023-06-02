sap.ui.define([
	"openui5-calendar/controller/BaseController",
	"openui5-calendar/model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Label",
	"sap/m/Select",
	"sap/m/Popover",
	"sap/ui/core/Item",
	"sap/ui/core/Fragment",
	"sap/ui/core/ValueState",
	"sap/ui/layout/form/SimpleForm",
	"sap/ui/unified/CalendarDayType"
], function (BaseController, formatter, JSONModel, Device, Button, Dialog, Label, Select, Popover, Item,
	Fragment, ValueState, SimpleForm, CalendarDayType) {
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

		_aDialogTypes: [
			{ title: "Create Appointment", type: "create_appointment_with_context" },
			{ title: "Edit Appointment", type: "edit_appointment" }],

		onInit: function () {
			this.getLogger(this.getControllerName()).info("onInit");
			BaseController.prototype.onInit.apply(this, arguments);

			this.getView().setBusy(true);

			let aPeople = {
				themeSelected: "",
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
				start.setDate(start.getDate() - 15);

				var end = new Date();
				end.setDate(start.getDate() + 90);

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
					appointments.info = appointments.title + " " + aPeople.people[index].name;
					//appointments.type = oAppointments[appointments.title];

					aPeople.people[index].appointments.push(appointments);
					aPeople.people[index].appointments.push(appointments);
				}
			}

			var oModel = new JSONModel();
			oModel.setData(aPeople);
			this.setModel(oModel);

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
						selectedKey: "{/themeSelected}",
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
						var sTheme = this.getModel().getProperty("/themeSelected");
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
					this.getModel().setProperty("/themeSelected", sTheme);
				}.bind(this),
				afterClose: function () {
					this.getView().removeDependent(oDialog);
					oDialog.destroy();
				}.bind(this)
			});

			this.getView().addDependent(oDialog);
			oDialog.open();
		},

		handleAppointmentSelect: function (oEvent) {
			var oAppointment = oEvent.getParameter("appointment");

			if (!oAppointment) {
				return;
			}

			if (!oAppointment.getSelected() && this._pDetailsPopover) {
				this._pDetailsPopover.close();
				return;
			}

			if (!this._pDetailsPopover) {
				this._pDetailsPopover = Fragment.load({
					id: this.getView().getId(),
					name: "openui5-calendar.view.Details",
					controller: this
				}).then(function (oDetailsPopover) {
					this.getView().addDependent(oDetailsPopover);
					return oDetailsPopover;
				}.bind(this));
			}

			this._pDetailsPopover.then(function (oDetailsPopover) {
				oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
				oDetailsPopover.openBy(oAppointment);
			});
		},

		_addNewAppointment: function (oAppointment) {
			var oModel = this.getModel(),
				sPath = "/people/" + this.byId("selectPerson").getSelectedIndex().toString() + "/appointments",
				oPersonAppointments;

			oPersonAppointments = oModel.getProperty(sPath);
			oPersonAppointments.push(oAppointment);

			oModel.setProperty(sPath, oPersonAppointments);
		},

		handleCancelButton: function () {
			this.byId("detailsPopover").close();
		},

		handleAppointmentAddWithContext: function (oEvent) {
			this.oClickEventParameters = oEvent.getParameters();
			this._arrangeDialogFragment(this._aDialogTypes[0].type);
		},

		_validateDatePicker: function (oDatePickerStart, oDatePickerEnd) {
			var oStartDate = oDatePickerStart.getDateValue(),
				oEndDate = oDatePickerEnd.getDateValue(),
				sValueStateText = "Start date should be before End date";

			if (oStartDate && oEndDate && oEndDate.getTime() <= oStartDate.getTime()) {
				oDatePickerStart.setValueState(ValueState.Error);
				oDatePickerEnd.setValueState(ValueState.Error);
				oDatePickerStart.setValueStateText(sValueStateText);
				oDatePickerEnd.setValueStateText(sValueStateText);
			} else {
				oDatePickerStart.setValueState(ValueState.None);
				oDatePickerEnd.setValueState(ValueState.None);
			}
		},

		updateButtonEnabledState: function (oDialog) {
			var oStartDate = this.byId("startDate"),
				oEndDate = this.byId("endDate"),
				bEnabled = oStartDate.getValueState() !== ValueState.Error
					&& oStartDate.getValue() !== ""
					&& oEndDate.getValue() !== ""
					&& oEndDate.getValueState() !== ValueState.Error;

			oDialog.getBeginButton().setEnabled(bEnabled);
		},

		handleCreateChange: function (oEvent) {
			var oDatePickerStart = this.byId("startDate"),
				oDatePickerEnd = this.byId("endDate");

			if (oEvent.getParameter("valid")) {
				this._validateDatePicker(oDatePickerStart, oDatePickerEnd);
			} else {
				oEvent.getSource().setValueState(ValueState.Error);
			}

			this.updateButtonEnabledState(this.byId("createDialog"));
		},

		_removeAppointment: function (oAppointment, sPersonId) {
			var oModel = this.getModel(),
				sTempPath,
				aPersonAppointments,
				iIndexForRemoval;

			if (!sPersonId) {
				sTempPath = this.sPath.slice(0, this.sPath.indexOf("appointments/") + "appointments/".length);
			} else {
				sTempPath = "/people/" + sPersonId + "/appointments";
			}

			aPersonAppointments = oModel.getProperty(sTempPath);
			iIndexForRemoval = aPersonAppointments.indexOf(oAppointment);

			if (iIndexForRemoval !== -1) {
				aPersonAppointments.splice(iIndexForRemoval, 1);
			}

			oModel.setProperty(sTempPath, aPersonAppointments);
		},

		handleDeleteAppointment: function () {
			var oDetailsPopover = this.byId("detailsPopover"),
				oBindingContext = oDetailsPopover.getBindingContext(),
				oAppointment = oBindingContext.getObject(),
				iPersonIdStartIndex = oBindingContext.getPath().indexOf("/people/") + "/people/".length,
				iPersonId = oBindingContext.getPath()[iPersonIdStartIndex];

			this._removeAppointment(oAppointment, iPersonId);
			oDetailsPopover.close();
		},

		handleEditButton: function () {
			var oDetailsPopover = this.byId("detailsPopover");
			this.sPath = oDetailsPopover.getBindingContext().getPath();
			oDetailsPopover.close();
			this._arrangeDialogFragment(this._aDialogTypes[1].type);
		},

		_arrangeDialogFragment: function (iDialogType) {
			var oView = this.getView();

			if (!this._pNewAppointmentDialog) {
				this._pNewAppointmentDialog = Fragment.load({
					id: oView.getId(),
					name: "openui5-calendar.view.Create",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pNewAppointmentDialog.then(function (oDialog) {
				this._arrangeDialog(iDialogType, oDialog);
			}.bind(this));
		},

		_arrangeDialog: function (sDialogType, oDialog) {
			var sTempTitle = "";
			oDialog._sDialogType = sDialogType;

			if (sDialogType === "edit_appointment") {
				this._setEditAppointmentDialogContent(oDialog);
				sTempTitle = this._aDialogTypes[1].title;
			} else {
				this._setCreateWithContextAppointmentDialogContent();
				sTempTitle = this._aDialogTypes[0].title;
			}

			this.updateButtonEnabledState(oDialog);
			oDialog.setTitle(sTempTitle);
			oDialog.open();
		},

		handleDialogCancelButton: function () {
			this.byId("createDialog").close();
		},

		_editAppointment: function (oAppointment, iPersonId, oNewAppointmentDialog) {
			var sAppointmentPath = this._appointmentOwnerChange(oNewAppointmentDialog),
				oModel = this.getModel();

			if (this.sPath !== sAppointmentPath) {
				this._addNewAppointment(oNewAppointmentDialog.getModel().getProperty(this.sPath));
				this._removeAppointment(oNewAppointmentDialog.getModel().getProperty(this.sPath));
			}
			oModel.setProperty(sAppointmentPath + "/title", oAppointment.title);
			oModel.setProperty(sAppointmentPath + "/info", oAppointment.info);
			oModel.setProperty(sAppointmentPath + "/type", oAppointment.type);
			oModel.setProperty(sAppointmentPath + "/start", oAppointment.start);
			oModel.setProperty(sAppointmentPath + "/end", oAppointment.end);
		},

		handleDialogSaveButton: function () {
			var oStartDate = this.byId("startDate"),
				oEndDate = this.byId("endDate"),
				sInfoValue = this.byId("moreInfo").getValue(),
				sInputTitle = this.byId("inputTitle").getValue(),
				iPersonId = this.byId("selectPerson").getSelectedIndex(),
				oModel = this.getModel(),
				oNewAppointmentDialog = this.byId("createDialog"),
				oNewAppointment;

			if (oStartDate.getValueState() !== ValueState.Error
				&& oEndDate.getValueState() !== ValueState.Error) {
				if (this.sPath && oNewAppointmentDialog._sDialogType === "edit_appointment") {
					this._editAppointment({
						title: sInputTitle,
						info: sInfoValue,
						type: this.byId("detailsPopover").getBindingContext().getObject().type,
						start: oStartDate.getDateValue(),
						end: oEndDate.getDateValue()
					}, iPersonId, oNewAppointmentDialog);
				} else {
					oNewAppointment = {
						tentative: false,
						title: sInputTitle,
						info: sInfoValue,
						start: new Date(oStartDate.getDateValue().setHours(1)),
						end: new Date(oEndDate.getDateValue().setHours(23))
					};

					oNewAppointment.color = oAppointments[oNewAppointment.title];
					this._addNewAppointment(oNewAppointment);
				}

				oModel.updateBindings();
				oNewAppointmentDialog.close();
				this.byId("PC1").rerender();
			}
		},

		_appointmentOwnerChange: function (oNewAppointmentDialog) {
			var iSpathPersonId = this.sPath[this.sPath.indexOf("/people/") + "/people/".length],
				iSelectedPerson = this.byId("selectPerson").getSelectedIndex(),
				sTempPath = this.sPath,
				iLastElementIndex = oNewAppointmentDialog.getModel().getProperty("/people/" + iSelectedPerson.toString() + "/appointments/").length.toString();

			if (iSpathPersonId !== iSelectedPerson.toString()) {
				sTempPath = "".concat("/people/", iSelectedPerson.toString(), "/appointments/", iLastElementIndex.toString());
			}

			return sTempPath;
		},

		_setCreateAppointmentDialogContent: function () {
			var oDatePickerStart = this.byId("startDate"),
				oDatePickerEnd = this.byId("endDate"),
				oTitleInput = this.byId("inputTitle"),
				oMoreInfoInput = this.byId("moreInfo"),
				oPersonSelected = this.byId("selectPerson");

			//Set the person in the first row as selected.
			oPersonSelected.setSelectedItem(this.byId("selectPerson").getItems()[0]);
			oDatePickerStart.setValue("");
			oDatePickerEnd.setValue("");
			oDatePickerStart.setValueState(ValueState.None);
			oDatePickerEnd.setValueState(ValueState.None);
			oTitleInput.setValue("");
			oMoreInfoInput.setValue("");
		},

		_setCreateWithContextAppointmentDialogContent: function () {
			var aPeople = this.getModel().getProperty("/people/"),
				oSelectedIntervalStart = this.oClickEventParameters.startDate,
				oStartDate = this.byId("startDate"),
				oSelectedIntervalEnd = this.oClickEventParameters.endDate,
				oEndDate = this.byId("endDate"),
				oDatePickerStart = this.byId("startDate"),
				oDatePickerEnd = this.byId("endDate"),
				oTitleInput = this.byId("inputTitle"),
				oMoreInfoInput = this.byId("moreInfo"),
				sPersonName,
				oPersonSelected;

			if (this.oClickEventParameters.row) {
				sPersonName = this.oClickEventParameters.row.getTitle();
				oPersonSelected = this.byId("selectPerson");
				oPersonSelected.setSelectedIndex(aPeople.indexOf(aPeople.filter(function (oPerson) { return oPerson.name === sPersonName; })[0]));
			}

			oStartDate.setDateValue(oSelectedIntervalStart);
			oEndDate.setDateValue(oSelectedIntervalEnd);
			oTitleInput.setValue("");
			oMoreInfoInput.setValue("");
			oDatePickerStart.setValueState(ValueState.None);
			oDatePickerEnd.setValueState(ValueState.None);

			delete this.oClickEventParameters;
		},

		_setEditAppointmentDialogContent: function (oDialog) {
			var oAppointment = oDialog.getModel().getProperty(this.sPath),
				oSelectedIntervalStart = oAppointment.start,
				oSelectedIntervalEnd = oAppointment.end,
				oDatePickerStart = this.byId("startDate"),
				oDatePickerEnd = this.byId("endDate"),
				sSelectedInfo = oAppointment.info,
				sSelectedTitle = oAppointment.title,
				iSelectedPersonId = this.sPath[this.sPath.indexOf("/people/") + "/people/".length],
				oPersonSelected = this.byId("selectPerson"),
				oStartDate = this.byId("startDate"),
				oEndDate = this.byId("endDate"),
				oMoreInfoInput = this.byId("moreInfo"),
				oTitleInput = this.byId("inputTitle");

			oPersonSelected.setSelectedIndex(iSelectedPersonId);
			oStartDate.setDateValue(oSelectedIntervalStart);
			oEndDate.setDateValue(oSelectedIntervalEnd);
			oMoreInfoInput.setValue(sSelectedInfo);
			oTitleInput.setValue(sSelectedTitle);
			oDatePickerStart.setValueState(ValueState.None);
			oDatePickerEnd.setValueState(ValueState.None);
		}

	});
});