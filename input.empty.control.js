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
            let className = "required-ec-message";
            let insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
            var appendHtml = false;
            var currentRequired = required_ec[i];

            if (currentRequired.getAttribute("required-ec") === "warning") { // show required-ec-message
                // defined above.

                var currentMinLength = 0;
                var currentMinNumber = 0;
                // min length
                try {
                    let minLength = parseInt(currentRequired.getAttribute("minlength-ec"));
                    if (!isNaN(minLength)) {
                        htmlInText = "Minimum " + minLength + " karakter giriniz.";

                        className = "required-ec-message-min-length";
                        insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
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
                    let maxLength = parseInt(currentRequired.getAttribute("maxlength-ec"));
                    if (!isNaN(maxLength)) {
                        if (currentMinLength !== 0) {
                            htmlInText = "Minimum " + currentMinLength + ", maximum " + maxLength + " karakter giriniz.";
                            className = "required-ec-message-min-max-length";
                        }
                        else {
                            htmlInText = "Maximum " + maxLength + " karakter giriniz.";
                            className = "required-ec-message-max-length";
                        }
                        insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>"; // default display: none
                        appendHtml = true;
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }

                // min number
                try {
                    let minNumber = parseInt(currentRequired.getAttribute("minnumber-ec"));
                    if (!isNaN(minNumber)) {
                        htmlInText = "Minimum " + minNumber + ".";


                        className = "required-ec-message-min-number";
                        insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
                        appendHtml = true;
                        currentMinNumber = minNumber; // to use in maximum length message.
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }


                // max number
                try {
                    let maxNumber = parseInt(currentRequired.getAttribute("maxnumber-ec"));
                    if (!isNaN(maxNumber)) {
                        if (currentMinNumber !== 0) {
                            htmlInText = "Minimum " + currentMinNumber + ". Maximum " + maxNumber + ".";
                            className = "required-ec-message-min-max-number";
                        }
                        else {
                            htmlInText = "Maximum " + maxNumber + ".";
                            className = "required-ec-message-max-number";
                        }
                        insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>"; // default display: none
                        appendHtml = true;
                    }
                } catch (e) {
                    console.log(e);
                    appendHtml = false;
                    //string or empty value.
                }

            }

            if (appendHtml === false) {
                insertHtml = "<p class='" + className + "' style='display:" + cssDisplay + "'>" + htmlInText + "</p>";
                appendHtml = true;
            }

            if (appendHtml) required_ec[i].insertAdjacentHTML("afterend", insertHtml);

            currentRequired.onkeyup = function () { // onkeyup event created.
                detectValues(this);
                if (this.getAttribute("maxlength-hard-ec") !== null) maxLengthHard(this);
            }; 

            currentRequired.onchange = function () { detectValues(this); }; // onchange event created.
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

    function detectValues(thisObject) {
        var reason = 0;
        // warning message show or none.
        var next = thisObject.nextElementSibling;
        if (thisObject.value !== "" && thisObject.value !== null) {
            // minlength control
            var currentMinLength = 0;
            var currentMinNumber = 0;
            if (thisObject.getAttribute("minlength-ec") !== null) {

                let minLength = parseInt(thisObject.getAttribute("minlength-ec"));
                currentMinLength = minLength;

                if (thisObject.getAttribute("maxlength-ec") === null) { // no maximum length attribute.
                    try {
                        if (!isNaN(minLength)) {
                            if (thisObject.value.length >= minLength) {
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
            if (thisObject.getAttribute("maxlength-ec") !== null) {
                let maxLength = parseInt(thisObject.getAttribute("maxlength-ec"));
                try {
                    if (!isNaN(maxLength)) {
                        if (thisObject.value.length >= maxLength) {
                            next.style.display = "";
                            reason++;
                        }
                        else {
                            if (currentMinLength !== 0) { // no minimum length
                                if (thisObject.value.length < currentMinLength) {
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

            // min number control
            if (thisObject.getAttribute("minnumber-ec") !== null) {
                let minNumber = parseInt(thisObject.getAttribute("minnumber-ec"));
                currentMinNumber = minNumber;
                if (thisObject.getAttribute("maxnumber-ec") === null) { // no maximum length attribute.
                    try {
                        if (!isNaN(minNumber)) {

                            if (thisObject.value >= minNumber) {
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

            // max number control
            if (thisObject.getAttribute("maxnumber-ec") !== null) {
                let maxNumber = parseInt(thisObject.getAttribute("maxnumber-ec"));
                try {
                    if (!isNaN(maxNumber)) {
                        if (thisObject.value > maxNumber) {
                            next.style.display = "";
                            reason++;
                        }
                        else {
                            if (currentMinNumber !== 0) { // no minimum number
                                if (thisObject.value < currentMinNumber) {
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
            if (thisObject.getAttribute("minlength-ec") === null
                && thisObject.getAttribute("maxlength-ec") === null
                && thisObject.getAttribute("minnumber-ec") === null
                && thisObject.getAttribute("maxnumber-ec") === null) {
                if (next !== undefined) {
                    next.style.display = "none"; // display:none
                }
            }
        }
        else {
            //only empty control.
            if (next !== undefined) {
                if (thisObject.getAttribute("maxlength-ec") !== null) { // maxlength attr value == "" => display:none
                    next.style.display = "none";
                }
                else {
                    next.style.display = ""; // display:show
                }
            }
        }

        if (reason === 0) {
            // find.
            // required-ec != "warning"
            var required_ec = document.querySelectorAll('[required-ec]');
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

            // min number finder
            var finderMinNumber = Array.from(required_ec)
                .find(el => el.getAttribute("minnumber-ec") !== null);
            let minNumber = parseInt(finderMinNumber.getAttribute("minnumber-ec"));
            try {
                if (!isNaN(minNumber)) {
                    if (finderMinNumber.value < minNumber) {
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

            // max number finder
            var finderMaxNumber = Array.from(required_ec)
                .find(el => el.getAttribute("maxnumber-ec") !== null);
            let maxNumber = parseInt(finderMaxNumber.getAttribute("maxnumber-ec"));
            try {
                if (!isNaN(maxNumber)) {
                    if (finderMaxNumber.value > maxNumber) {
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

    function maxLengthHard(thisObject) {
        try {
            var limitNum = thisObject.getAttribute("maxlength-hard-ec");
            if (thisObject.value.length > limitNum) {
                thisObject.value = thisObject.value.substring(0, limitNum);
            }
        } catch (e) {
            console.log(e);
        }
    }

})(emptycontrol || (emptycontrol = {}));