sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "openui5-calendar/model/formatter"
], function (UIComponent, JSONModel, formatter) {
    "use strict";

    return UIComponent.extend("openui5-calendar.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

            var sTheme = localStorage.getItem("Calendar_UI5_Theme");
            if (sTheme) {
                sap.ui.getCore().applyTheme(sTheme);
            }

        }

    });
});