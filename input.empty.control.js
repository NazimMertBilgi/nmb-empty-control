"use strict";
// Module
var emptycontrol;
(function (emptycontrol) {
    var defaultSelector = 'input[required-ec][type="text"],textarea[required-ec]'; 

    // Default settings.
    emptycontrol.initSettings = {
        languageCode: "en", // default languageCode
        selector: defaultSelector, // default selector integrated.
        dependentButton : "#finish" // default dependentButton
    };

    function settings(modification) {
        for (var modifKey in modification) {
            emptycontrol.initSettings[modifKey] = modification[modifKey];
        }
    }

    emptycontrol.settings = settings;

    function fire() {
        // Button disabled.
        buttonDisable();
        // others
        if (emptycontrol.initSettings.selector === "" || emptycontrol.initSettings.selector === null) emptycontrol.initSettings.selector = defaultSelector;
        var required_ec = document.querySelectorAll(emptycontrol.initSettings.selector);
        for (var i = 0; i < required_ec.length; i++) {
            let insertHtml = "<p required-ec-message ec-id='"+i+"' style='color:red'>Lütfen doldurun.</p>";
            if (required_ec[i].getAttribute("required-ec") === "warning") {
                required_ec[i].insertAdjacentHTML("afterend", insertHtml);
            }
            required_ec[i].onkeypress = function () { detectValues(); }; // onkeypress event created.
            required_ec[i].onchange = function () { detectValues(); }; // onkeypress event created.
        }
    }

    emptycontrol.fire = fire;

    function detectValues() {
       var required_ec = document.querySelectorAll(emptycontrol.initSettings.selector);

        // find.
        var finder = Array.from(required_ec)
            .find(el => el.value === '');
        if (finder === undefined) {
            buttonActive(); // 0 empty input, textarea. button activated.
        }
        else {
            buttonDisable();
        }
    }

    function buttonActive() {
        var button = document.querySelector(emptycontrol.initSettings.dependentButton);
        if (button !== null) button.disabled = false;
    }

    function buttonDisable() {
        var button = document.querySelector(emptycontrol.initSettings.dependentButton);
        if (button !== null) button.disabled = true;
    }

    function languageChange(languageCode) { // string: en, de, tr ..
        emptycontrol.settings.languageCode = languageCode;
        var required_ec_message = document.querySelectorAll('p[required-ec-message]');
        for (var i = 0; i < required_ec_message.length; i++) {
            required_ec_message[i].innerText = "warning";
        }
        console.log("Language change successfully!");
    }

    emptycontrol.languageChange = languageChange;

})(emptycontrol || (emptycontrol = {}));