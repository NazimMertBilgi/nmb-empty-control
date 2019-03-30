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
            let cssDisplay = "none";
            let insertHtml = "<p class='required-ec-message' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
            var appendHtml = false;
            if (required_ec[i].getAttribute("required-ec") === "warning") { // show required-ec-message
                // defined above.
                // appendHtml = true;

                // if value not empty = display:none
                if (required_ec[i].value === "" || required_ec[i] === null) cssDisplay = "";

                var currentMinLength = 0;
                // min length
                try {
                    let minLength = parseInt(required_ec[i].getAttribute("minlength-ec"));
                    if (!isNaN(minLength)) {
                        htmlInText = "Minimum " + minLength + " karakter giriniz.";

                        if (required_ec[i].value.length < minLength) cssDisplay = "";

                        insertHtml = "<p class='required-ec-message' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
                        appendHtml = true;
                        currentMinLength = minLength; // to use in maximum length message.
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }

                // max length
                try {
                    let maxLength = parseInt(required_ec[i].getAttribute("maxlength-ec"));
                    if (!isNaN(maxLength)) {
                        if (currentMinLength !== 0) {
                            if (required_ec[i].value.length > maxLength) cssDisplay = "";
                            htmlInText = "Minimum " + currentMinLength + ", maximum " + maxLength + " karakter giriniz.";
                        }
                        else {
                            if (required_ec[i].value.length > maxLength) cssDisplay = "";
                            htmlInText = "Maximum " + maxLength + " karakter giriniz.";
                        }
                        insertHtml = "<p class='required-ec-message' style='display:" + cssDisplay + "'>" + htmlInText + "</p>"; // default display: none
                        appendHtml = true;
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }
            }

            if (appendHtml === false) {
                insertHtml = "<p class='required-ec-message' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
                appendHtml = true;
            }

            if (appendHtml) required_ec[i].insertAdjacentHTML("afterend", insertHtml);
            required_ec[i].onkeyup = function () { detectValues(); }; // onkeyup event created.
            required_ec[i].onchange = function () { detectValues(); }; // onchange event created.
        }
    }

    emptycontrol.fire = fire;

    function reFire() {
        var els = document.querySelectorAll('.required-ec-message');
        for (var i = 0; i < els.length; i++) {
            els[i].remove();
        }
        fire(); // re-fire!
    }

    emptycontrol.reFire = reFire;

    function detectValues() {
        var required_ec = document.querySelectorAll('[required-ec="warning"]');

        var reason = 0;

        for (var i = 0; i < required_ec.length; i++) {
            // warning message show or none.
            var next = required_ec[i].nextElementSibling;
            if (required_ec[i].value !== "" && required_ec[i].value !== null) {
                // minlength control
                var currentMinLength = 0;
                if (required_ec[i].getAttribute("minlength-ec") !== null) {

                    let minLength = parseInt(required_ec[i].getAttribute("minlength-ec"));
                    currentMinLength = minLength;

                    if (required_ec[i].getAttribute("maxlength-ec") === null) { // no maximum length attribute.
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
                }
                // maxlength control
                if (required_ec[i].getAttribute("maxlength-ec") !== null) {
                    let maxLength = parseInt(required_ec[i].getAttribute("maxlength-ec"));
                    try {
                        if (!isNaN(maxLength)) {
                            if (required_ec[i].value.length >= maxLength) {
                                next.style.display = "";
                                reason++;
                            }
                            else {
                                if (currentMinLength !== 0) { // no minimum length
                                    if (required_ec[i].value.length < currentMinLength) {
                                        next.style.display = "";
                                        reason++;
                                    }
                                    else {
                                        next.style.display = "none";
                                    }
                                }
                                else {
                                    next.style.display = "none";
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        //string or empty value.
                    }

                }

                //only empty control.
                if (required_ec[i].getAttribute("minlength-ec") === null
                    && required_ec[i].getAttribute("maxlength-ec") === null) {
                    if (next !== undefined) {
                        next.style.display = "none"; // display:none
                    }
                }
            }
            else {
                //only empty control.
                if (next !== undefined) {
                    if (required_ec[i].getAttribute("maxlength-ec") !== null) { // maxlength attr value == "" => display:none
                        next.style.display = "none";
                    }
                    else {
                        next.style.display = ""; // display:show
                    }
                }
            }
        }
        if (reason === 0) {
            // find.
            // required-ec != "warning"
            required_ec = document.querySelectorAll('[required-ec]');
            var finder = Array.from(required_ec)
                .find(el => el.value === '');

            if (finder !== undefined) reason++; // there is still a space with a null value.

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

            // max length finder
            var finderMaxLength = Array.from(required_ec)
                .find(el => el.getAttribute("maxlength-ec") !== null);
            let maxLength = parseInt(finderMaxLength.getAttribute("maxlength-ec"));
            try {
                if (!isNaN(maxLength)) {
                    if (finderMaxLength.value.length >= maxLength) {
                        reason++;
                        // reason +1
                    }
                    else {
                        // no problem.
                    }
                }
            } catch (e) {
                console.log(e);
                //string or empty value.
            }
            //

            if (reason === 0) {
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