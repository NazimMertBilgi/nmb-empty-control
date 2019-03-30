"use strict";
// Module
var emptycontrol;
(function (emptycontrol) {
    var defaultSelector = 'input[required-ec],textarea[required-ec]';

    // Default settings.
    emptycontrol.initSettings = {
        languageCode: "en", // default languageCode
        selector: defaultSelector, // default selector integrated.
        dependentButton: "#finish" // default dependentButton
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
            let htmlInText = "Lütfen doldurun.";
            let insertHtml = "<p class='required-ec-message'>" + htmlInText + "</p>";
            var appendHtml = false;
            if (required_ec[i].getAttribute("required-ec") === "warning") { // show required-ec-message
                // defined above.
                appendHtml = true;
                try {
                    let minLength = parseInt(required_ec[i].getAttribute("minlength-ec"));
                    if (!isNaN(minLength)) {
                        htmlInText = "Minimum " + minLength + " karakter giriniz.";
                        insertHtml = "<p class='required-ec-message'>" + htmlInText + "</p>";
                        appendHtml = true;
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }
            }

            if (appendHtml) required_ec[i].insertAdjacentHTML("afterend", insertHtml);
            required_ec[i].onkeypress = function () { detectValues(); }; // onkeypress event created.
            required_ec[i].onchange = function () { detectValues(); }; // onchange event created.
        }
    }

    emptycontrol.fire = fire;

    function detectValues() {
        var required_ec = document.querySelectorAll('[required-ec="warning"]');

        var reason = 0;

        for (var i = 0; i < required_ec.length; i++) {
            // warning message show or none.
            var next = required_ec[i].nextElementSibling;
            if (required_ec[i].value !== "" && required_ec[i].value !== null) {
                // minlength control
                if (required_ec[i].getAttribute("minlength-ec") !== null) {
                    let minLength = parseInt(required_ec[i].getAttribute("minlength-ec"));
                    try {
                        if (!isNaN(minLength)) {
                            if (required_ec[i].value.length >= minLength) {
                                next.style.display = "none";
                            }
                            else {
                                next.style.display = "";
                                reason++;
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        //string or empty value.
                    }
                }
                else {
                    //only empty control.
                    if (next !== undefined) {
                        next.style.display = "none"; // display:none
                    }
                }

            }
            else {
                next.style.display = ""; // display:show
                reason++;
            }
        }
        if (reason === 0) {
            // find.
            // required-ec != "warning"
            required_ec = document.querySelectorAll('[required-ec]');
            var finder = Array.from(required_ec)
                .find(el => el.value === '');

            // min length finder
            var finderMinLength = Array.from(required_ec)
                .find(el => el.getAttribute("minlength-ec") !== null);

                let minLength = parseInt(finderMinLength.getAttribute("minlength-ec"));
                try {
                    if (!isNaN(minLength)) {
                        if (finderMinLength.value.length >= minLength) {
                            // no problem.
                        }
                        else {
                            reason++;
                            // reason +1
                        }
                    }
                } catch (e) {
                    console.log(e);
                    //string or empty value.
                }
            //

            if (finder === undefined && reason === 0) {
                buttonActive(); // 0 empty input, textarea. button activated.
            }
            else {
                buttonDisable();
            }
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

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

})(emptycontrol || (emptycontrol = {}));