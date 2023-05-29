"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var libphonenumber_js_1 = require("libphonenumber-js");
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}
function createMYFIWidget(params) {
    var html = "\n<div class=\"w-container\">\n  <div class=\"w-field-wrap w-term\">\n    <span class=\"w-field-name\">\u0421\u0440\u043E\u043A</span>\n    <input type=\"text\" class=\"w-input w-term\" value=\"1 \u043C\u0435\u0441\u044F\u0446\" />\n    <input type=\"range\" min=\"1\" max=\"36\" value=\"1\" class=\"w-slider w-term\" id=\"myRange\" />\n    <div class=\"w-term w-slider-active-portion\"></div>\n  </div>\n  <div class=\"w-field-wrap w-sum\">\n    <span class=\"w-field-name\">\u0421\u0443\u043C\u043C\u0430, \u20BD</span>\n    <input type=\"text\" class=\"w-input w-sum\" value=\"100000\" />\n    <input type=\"range\" min=\"1\" max=\"50\" value=\"1\" class=\"w-slider w-sum\" id=\"myRange\" />\n    <div class=\"w-sum w-slider-active-portion\"></div>\n  </div>\n\n  <div class=\"w-field-wrap\">\n    <span class=\"w-field-name\">\u0424\u0418\u041E*</span>\n    <input type=\"text\" class=\"w-input w-name\" />\n  </div>\n  <div class=\"w-field-wrap\">\n    <span class=\"w-field-name\">\u0418\u041D\u041D*</span>\n    <input type=\"text\" class=\"w-input w-inn\" />\n  </div>\n\n  <div class=\"w-field-wrap\">\n    <span class=\"w-field-name\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D*</span>\n    <input type=\"text\" class=\"w-input w-phone\" />\n  </div>\n  <div class=\"w-field-wrap\">\n    <span class=\"w-field-name\">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430*</span>\n    <input type=\"text\" class=\"w-input w-email\" />\n  </div>\n  <button class=\"w-submit\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n\n\n<style>.w-container {\n".concat(params.style || "", ";\n}\n\n.w-container * {\n  box-sizing: border-box;\n  font-family: ").concat(params.fontFamily || "Roboto", ";\n}\n\n.test {\nfont-size: 16px;\ncolor: salmon;\n}\n\n.w-container {\nwidth: 100%;\nheight: 100%;\ndisplay: grid;\ngap: 10px;\n// border: 1px solid white;\nborder-radius: 15px;\ngrid-template-columns: 1fr 1fr;\n}\n\n.w-field-wrap {\ndisplay: flex;\nflex-direction: column;\nbackground-color: rgb(220, 220, 220);\nborder: 1px solid rgb(220, 220, 220);\nborder-radius: 10px;\npadding: 5px;\nposition: relative;\nwidth: 100%;\ntransition: all 0.2s;\n}\n\n.w-field-wrap.w-focused {\nborder: 1px solid black;\nbackground-color: #fff;\n}\n\n.w-field-name {\nfont-size: 12px;\n}\n\n.w-input {\nborder-width: 0;\nheight: 30px;\nbackground-color: rgb(220, 220, 220);\nborder-radius: 5px;\ntransition: all 0.2s;\n}\n\ninput:focus {\noutline: none;\ntransition: all 0.2s;\n}\n\n.w-input.w-term {\npointer-events: none;\n}\n\n.w-slider {\n-webkit-appearance: none;\nappearance: none;\nwidth: 100%;\nheight: 1px;\nborder-radius: 10px;\nbackground: #000;\noutline: none;\nopacity: 0.8;\n-webkit-transition: 0.2s;\ntransition: opacity 0.2s;\n\nposition: absolute;\nbottom: -3px;\nleft: 5px;\nwidth: calc(100% - 14px);\n}\n\n.w-slider-active-portion {\nborder-bottom: 1px #fff700 solid;\nheight: 1px;\nbackground-color: #000;\nposition: absolute;\nbottom: -1px;\nleft: 7px;\nz-index: 1111;\nwidth: 0;\nmax-width: calc(100% - 14px);\n}\n\n.w-slider:hover {\nopacity: 1;\n}\n\n.w-slider::-webkit-slider-thumb {\n-webkit-appearance: none;\nappearance: none;\nwidth: 10px;\nheight: 10px;\nborder-radius: 50%;\nbackground: #fff700;\ncursor: pointer;\n}\n\n.w-slider::-moz-range-thumb {\nwidth: 10px;\nheight: 10px;\nbackground: #fff700;\ncursor: pointer;\nborder-radius: 50%;\n}\n\n.w-submit {\nwidth: 50%;\n}\n\n.iti__flag {\nbackground-image: url(\"../node_modules/intl-tel-input/build/img/flags.png\");\n}\n\n@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n.iti__flag {\n  background-image: url(\"../node_modules/intl-tel-input/build/img/flags@2x.png\");\n}\n}\n</style></div>\n");
    var wrapper = document.querySelector(params.container || ".w-wrap");
    console.log("wrapper", wrapper);
    if (!wrapper)
        return;
    wrapper.innerHTML = html;
    var wcontainer = document.querySelector(".w-container");
    var phoneInput = document.querySelector(".w-phone");
    // intlTelInput(phoneInput, {
    //   utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
    // });
    ["DOMContentLoaded", "resize", "load"].forEach(function (item) {
        return window.addEventListener(item, function () {
            var width = wcontainer.offsetWidth;
            if (width < 480) {
                wcontainer.style["grid-template-columns"] = "1fr";
            }
            else {
                wcontainer.style["grid-template-columns"] = "1fr 1fr";
            }
        });
    });
    phoneInput.addEventListener("input", function () {
        console.log(new libphonenumber_js_1.AsYouType().input(phoneInput.value));
        phoneInput.value = new libphonenumber_js_1.AsYouType().input(phoneInput.value);
        console.log("isValid", (0, libphonenumber_js_1.isValidPhoneNumber)(phoneInput.value));
    });
    var digitsWithWhitespace = /^[0-9\b]|\t+$/;
    var digits = /^[0-9\b]+$/;
    // const phone = /^\+[1-9]\d{1,14}$/;
    var email = /.+@.+\.[A-Za-z]+$/;
    var multiplier = 1e6;
    var termSlider = document.querySelector(".w-slider.w-term");
    !!termSlider && termSlider.addEventListener("input", handleTermSliderChange);
    var termSliderActivePart = document.querySelector(".w-term .w-slider-active-portion");
    var termInput = document.querySelector(".w-input.w-term");
    //   !!termInput && termInput.addEventListener("input", handleTermInputChange);
    termInput.value = "1 месяц";
    var sumSlider = document.querySelector(".w-slider.w-sum");
    !!sumSlider && sumSlider.addEventListener("input", handleSumSliderChange);
    var sumSliderActivePart = document.querySelector(".w-sum .w-slider-active-portion");
    var nameInput = document.querySelector(".w-name");
    var innInput = document.querySelector(".w-inn");
    innInput.value = params.inn || "";
    var emailInput = document.querySelector(".w-email");
    var sumInput = document.querySelector(".w-input.w-sum");
    !!sumInput && sumInput.addEventListener("input", handleSumInputChange);
    [sumInput, nameInput, innInput, phoneInput, emailInput].forEach(function (item) { return item.addEventListener("focus", handleFocusChange); });
    [sumInput, nameInput, innInput, phoneInput, emailInput].forEach(function (item) { return item.addEventListener("blur", handleFocusChange); });
    // sumInput.value = "100 000";
    var submitBtn = document.querySelector(".w-submit");
    submitBtn.addEventListener("click", handleSubmit);
    setInputFilter(sumInput, function (value) {
        return (digitsWithWhitespace.test(value) && parseInt(value) < 5000001) || !value.length; // Allow digits and '.' only, using a RegExp.
    }, "Разрешены только числовые символы. Сумма не больше 5 000 000.");
    setInputFilter(innInput, function (value) {
        return (digits.test(value) && value.replaceAll(" ", "").length < 13) || !value.length; // Allow digits and '.' only, using a RegExp.
    }, "Разрешены только числовые символы. Длина ИНН 10 или 12 цифр.");
    return "test";
    function handleTermSliderChange(e) {
        var value = e.target.value;
        var steps = parseInt(e.target.getAttribute("max")) - parseInt(e.target.getAttribute("min"));
        var valueStep = (e.target.getAttribute("max") - 1) / steps;
        var percentageStep = 100 / steps;
        var fraction = percentageStep * ((value - 1) * valueStep);
        var suffix = "";
        if (value % 10 > 1 && value % 10 < 5)
            suffix = "а";
        if (value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 15))
            suffix = "ев";
        termInput.value = value + " месяц" + suffix;
        termSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
    }
    function handleSumSliderChange(e) {
        var value = e.target.value;
        var steps = parseInt(e.target.getAttribute("max")) - parseInt(e.target.getAttribute("min"));
        var valueStep = (parseInt(e.target.getAttribute("max")) - 1) / steps;
        var percentageStep = 100 / steps;
        var fraction = percentageStep * ((parseInt(value) - 1) * valueStep);
        // console.log("fraction", fraction);
        sumSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
        sumInput.value = "".concat(parseInt(value) * multiplier);
    }
    function handleSumInputChange(e) {
        if (!digits.test(e.target.value)) {
            return;
        }
        var value = e.target.value;
        var steps = parseInt(sumSlider.getAttribute("max")) - parseInt(sumSlider.getAttribute("min"));
        var valueStep = (parseInt(sumSlider.getAttribute("max")) - 1) / steps;
        var percentageStep = 100 / steps;
        var fraction = (percentageStep * (parseInt(value) - 1) * valueStep) / multiplier;
        sumSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
        var sliderValue = parseInt(e.target.value) / multiplier + 1;
        sumSlider.value = "".concat(sliderValue);
    }
    function handleFocusChange(e) {
        // const fraction = e.target.value * multiplier;
        // sumInput.value = sumToLocale(fraction) + " ₽";
        var isFocused = document.activeElement === e.target;
        var parent = e.target.parentElement;
        if (!__spreadArray([], parent.classList, true).includes("w-field-wrap"))
            parent = parent.parentElement.parentElement;
        if (isFocused) {
            parent.classList.add("w-focused");
            parent.querySelector(".w-field-name").classList.add("w-active");
        }
        else {
            parent.classList.remove("w-focused");
            // sumInput.value = sumToLocale(e.target.value);
        }
    }
    function handleSubmit() {
        try {
            if (!nameInput.value) {
                throw new Error("Заполните поле ФИО");
            }
            if (!innInput.value) {
                throw new Error("Заполните поле ИНН");
            }
            var trimmedInn = innInput.value.toString().replaceAll(" ", "");
            if (!(trimmedInn.length === 10 || trimmedInn.length === 12)) {
                throw new Error("ИНН должен состоять из 10 или 12 цифр");
            }
            if (!phoneInput.value) {
                throw new Error("Заполните поле телефона");
            }
            // if (!iti.isValidNumber()) {
            //   throw new Error("Некорректный формат номера телефона");
            // }
            if (!(0, libphonenumber_js_1.isValidPhoneNumber)(phoneInput.value)) {
                throw new Error("Некорректный формат номера телефона");
            }
            if (!emailInput.value) {
                throw new Error("Заполните поле электронной почты");
            }
            if (!email.test(emailInput.value)) {
                throw new Error("Некорректный формат электронной почты");
            }
            var values = {
                partnerId: params.partnerId,
                term: termInput.value,
                sum: sumInput.value.replaceAll(" ", ""),
                name: nameInput.value,
                inn: trimmedInn,
                // phone: iti.getNumber(intlTelInput.numberFormat.E164),
                email: emailInput.value,
            };
            alert(JSON.stringify(values));
        }
        catch (e) {
            alert(e.message);
        }
    }
}
exports.default = createMYFIWidget;
