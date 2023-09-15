"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var defaultAgreements_1 = require("./defaultAgreements");
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
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
function setInputFilterWithWhitespaces(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.value = numberWithSpaces(this.value.replaceAll(" ", ""));
                this.oldValue = numberWithSpaces(this.value.replaceAll(" ", ""));
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
    var container = params.container || ".w-wrap";
    var inn = params.inn || "";
    var partnerCompanyId = params.partnerCompanyId;
    var partnerUserId = params.partnerUserId;
    var fontFamily = params.fontFamily || "Roboto";
    var style = params.style || "";
    var markerStyle = params.markerStyle || "";
    var apiUrl = params.apiUrl || "https://api.mirmyfi.ru/v3";
    var checkboxes = params.agreements || (0, defaultAgreements_1.defaultAgreements)();
    var css = "\n  :root {\n    --bg-gray: #ecf1f7;\n    --bg-active: #ffffff;\n    --border: #000;\n    --main-gray: #828282;\n    --text: #333333;\n    --error-bg: #ffd9d9;\n    --error-main: #eb5757;\n    --main-yellow: #f2c94c;\n    --secondary-yellow: #caa536;\n    --checkbox: #27ae60;\n  }\n  \n  .w-container * {\n    box-sizing: border-box;\n  }\n  \n  .test {\n    font-size: 16px;\n    color: salmon;\n  }\n  \n  .w-container {\n    width: 100%;\n    height: 100%;\n  \n    border-radius: 15px;\n  }\n  \n  .w-grid {\n    display: grid;\n    gap: 10px;\n    grid-template-columns: 1fr 1fr;\n  }\n  \n  .w-field-wrap {\n    display: flex;\n    flex-direction: column;\n    height: 80px;\n    background-color: var(--bg-gray);\n    border-radius: 10px;\n    padding: 12px 26px;\n    position: relative;\n    width: 100%;\n    transition: all 0.2s;\n  }\n  \n  .w-field-wrap.w-focused {\n    /* border: 1px solid black; */\n  }\n  \n  .w-field-name {\n    font-size: 18px;\n    color: var(--main-gray);\n    transition: all 0.2s;\n    position: relative;\n    top: 15px;\n    pointer-events: none;\n    z-index: 10;\n  }\n  \n  .w-field-name.w-active {\n    font-size: 14px;\n    transition: all 0.2s;\n    top: 0;\n  }\n  \n  .w-input {\n    border-width: 0;\n    /* height: 30px; */\n    background-color: var(--bg-gray);\n    border-radius: 5px;\n    transition: all 0.2s;\n    margin-top: 9px;\n    font-size: 24px;\n    position: absolute;\n    height: 58px;\n    width: calc(100% - 30px);\n  }\n  \n  input:focus {\n    outline: none;\n    transition: all 0.2s;\n  }\n  \n  .w-input.w-term {\n    pointer-events: none;\n  }\n  \n  .w-slider {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 100%;\n    height: 1px;\n    border-radius: 10px;\n    background: var(--bg-gray);\n    outline: none;\n    opacity: 0.8;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n  \n    position: absolute;\n    bottom: -1px;\n    left: 5px;\n    width: calc(100% - 14px);\n    margin: 2px;\n  }\n\n\n  .w-slider-active-portion {\n    border-bottom: 2px var(--main-yellow) solid;\n    height: 2px;\n    /* background-color: #000; */\n    position: absolute;\n    bottom: 0px;\n    left: 7px;\n    z-index: 1111;\n    width: 0;\n    max-width: calc(100% - 14px);\n  }\n  \n  .w-slider:hover {\n    opacity: 1;\n  }\n  \n  .w-slider::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 14px;\n    height: 14px;\n    border-radius: 50%;\n    background: var(--main-yellow);\n    border-color: var(--main-yellow);\n    cursor: pointer;\n\n  }\n\n  \n  .w-slider::-moz-range-thumb {\n    width: 14px;\n    height: 14px;\n    background: var(--main-yellow);\n    cursor: pointer;\n    border-radius: 50%;\n    border-color: var(--main-yellow);\n  }\n  \n  .w-submit {\n    background-color: var(--main-yellow);\n    border-width: 0;\n    height: 60px;\n    width: 240px;\n    border-radius: 10px;\n    font-size: 24px;\n    cursor: pointer;\n    transition: all 0.2s;\n    margin: 0 auto;\n    display: block;\n  }\n  \n  .w-submit.disabled {\n    pointer-events: none;\n    opacity: 0.5;\n  }\n  \n  .w-agreement-wrap {\n    grid-column: span 2;\n    // width: 80%;\n    margin: 30px auto;\n  }\n  \n  .w-checkbox {\n    position: absolute;\n    z-index: -1;\n    opacity: 0;\n  }\n  \n  .w-checkbox + label {\n    user-select: none;\n  }\n  .w-checkbox + label::before {\n    content: \"\";\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    flex-shrink: 0;\n    flex-grow: 0;\n    border: 1px solid var(--secondary-yellow);\n    border-radius: 0.25em;\n    margin-right: 0.5em;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 50% 50%;\n    cursor: pointer;\n  }\n  \n  .w-checkbox:checked + label::before {\n    border-color: var(--main-yellow);\n    background-color: var(--main-yellow);\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e\");\n  }\n  \n  /* \u0441\u0442\u0438\u043B\u0438 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u043A\u0443\u0440\u0441\u043E\u0440\u0430 \u043D\u0430 checkbox */\n  .w-checkbox:not(:disabled):not(:checked) + label:hover::before {\n    border-color: var(--secondary-yellow);\n  }\n  /* \u0441\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u0430 (\u043F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u043D\u0430 \u043D\u0435\u0433\u043E) */\n  .w-checkbox:not(:disabled):active + label::before {\n    background-color: var(--secondary-yellow);\n    border-color: var(--secondary-yellow);\n  }\n  /* \u0441\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u0430, \u043D\u0430\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E\u0441\u044F \u0432 \u0444\u043E\u043A\u0443\u0441\u0435 */\n  .w-checkbox:focus + label::before {\n    box-shadow: 0 0 0 0.2rem #caa53630;\n  }\n  /* \u0441\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u0430, \u043D\u0430\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E\u0441\u044F \u0432 \u0444\u043E\u043A\u0443\u0441\u0435 \u0438 \u043D\u0435 \u043D\u0430\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E\u0441\u044F \u0432 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 checked */\n  .w-checkbox:focus:not(:checked) + label::before {\n    border-color: var(--secondary-yellow);\n  }\n  /* \u0441\u0442\u0438\u043B\u0438 \u0434\u043B\u044F \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u0430, \u043D\u0430\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E\u0441\u044F \u0432 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 disabled */\n  .w-checkbox:disabled + label::before {\n    background-color: red;\n  }\n\n  .w-agreement {\n    font-size: 16px;\n    color: var(--main-gray);\n    display: flex;\n    align-items: baseline;\n    padding: 3px 0;\n  }\n  \n  .w-link {\n    color: var(--main-gray);\n    transition: all 0.2s;\n  }\n  \n  .w-link:hover {\n    color: var(--main-yellow);\n    transition: all 0.2s;\n  }\n  \n  .w-submit:hover {\n    background-color: #fcc319;\n    transition: all 0.2s;\n  }\n\n  ul .w-bank-item::marker {\n    color: var(--main-yellow);\n    ".concat(markerStyle, "\n  }\n\n  .w-success-msg {\n    font-size: 16px;\n    display: flex;\n    align-items: baseline;\n    padding: 3px 0;\n  }\n\n  ");
    var html = "\n<div class=\"w-container\">\n<div class=\"w-grid\">\n\n<!-- <div class=\"w-field-wrap\">\n  <span class=\"w-field-name w-active\">\u041F\u0440\u043E\u0434\u0443\u043A\u0442</span>\n  <span class=\"w-selected\">\u041A\u0440\u0435\u0434\u0438\u0442</span>\n  <ul class=\"w-dropdown\">\n    <li>\u041A\u0440\u0435\u0434\u0438\u0442</li>\n    <li>\u0424\u0430\u043A\u0442\u043E\u0440\u0438\u043D\u0433</li>\n    <li>\u041B\u0438\u0437\u0438\u043D\u0433</li>\n    <li>\u0411\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0438\u0435 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438</li>\n  </ul>\n</div>\n<span></span> -->\n<div class=\"w-field-wrap w-term\">\n  <span class=\"w-field-name w-active\">\u0421\u0440\u043E\u043A</span>\n  <input type=\"text\" class=\"w-input w-term\" value=\"3 \u043C\u0435\u0441\u044F\u0446\u0430\" />\n  <input type=\"range\" min=\"3\" max=\"36\" value=\"3\" class=\"w-slider w-term\" id=\"myRange\" />\n  <div class=\"w-term w-slider-active-portion\"></div>\n</div>\n<div class=\"w-field-wrap w-sum\">\n  <span class=\"w-field-name w-active\">\u0421\u0443\u043C\u043C\u0430, \u20BD</span>\n  <input type=\"text\" class=\"w-input w-sum\" value=\"10 000\" />\n  <input type=\"range\" min=\"1\" max=\"50000\" value=\"1\" class=\"w-slider w-sum\" id=\"myRange\" />\n  <div class=\"w-sum w-slider-active-portion\"></div>\n</div>\n\n\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F*</span>\n  <input type=\"text\" class=\"w-input w-lastname\" />\n</div>\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name\">\u0418\u043C\u044F*</span>\n  <input type=\"text\" class=\"w-input w-1stname\" />\n</div>\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name\">\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E</span>\n  <input type=\"text\" class=\"w-input w-2ndname\" />\n</div>\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name  ".concat(!!inn ? "w-active" : "", "\">\u0418\u041D\u041D*</span>\n  <input type=\"text\" class=\"w-input w-inn\" />\n</div>\n\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name w-active\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D*</span>\n  <input type=\"text\" class=\"w-input w-phone\" value=\"+\" />\n</div>\n<div class=\"w-field-wrap\">\n  <span class=\"w-field-name\">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430*</span>\n  <input type=\"text\" class=\"w-input w-email\" />\n</div>\n</div>\n\n\n<div class=\"w-agreement-wrap\">\n</div>\n\n\n<button class=\"w-submit disabled\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n\n<link href=\"https://fonts.cdnfonts.com/css/roboto\" rel=\"stylesheet\" />\n\n                \n<style>.w-container {\n").concat(style, ";\n}\n\n.w-container * {\n  box-sizing: border-box;\n  font-family: ").concat(fontFamily, ";\n}\n\n").concat(css, "\n\n</style></div>\n");
    document.addEventListener("DOMContentLoaded", function () {
        var agreementWrap = document.querySelector(".w-agreement-wrap");
        if (agreementWrap) {
            checkboxes.forEach(function (checkboxInfo, index) {
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = "agree" + "".concat(index + 1);
                checkbox.name = "agree" + "".concat(index + 1);
                checkbox.value = "true";
                checkbox.className = "w-checkbox";
                var label = document.createElement("label");
                label.htmlFor = checkbox.id;
                if (checkboxInfo.url && checkboxInfo.url.length > 0) {
                    label.innerHTML =
                        "<a class='w-link' href=".concat(checkboxInfo.url, " target=\"_blank\" rel=\"nofollow\">") + checkboxInfo.label + "</a>";
                }
                else {
                    label.innerHTML = checkboxInfo.label;
                }
                label.className = "w-agreement";
                agreementWrap.appendChild(checkbox);
                agreementWrap.appendChild(label);
            });
        }
    });
    var wrapper = document.querySelector(container);
    if (!wrapper) {
        console.log("Нет контейнера");
        return;
    }
    if (!partnerUserId || !partnerCompanyId) {
        console.log("Не переданы обязательные параметры");
        return;
    }
    wrapper.innerHTML = html;
    var wcontainer = document.querySelector(".w-container");
    var wgrid = wcontainer.querySelector(".w-grid");
    var phoneInput = wcontainer.querySelector(".w-phone");
    var select = wcontainer.querySelector(".w-selected");
    var dropdown = wcontainer.querySelector(".w-dropdown");
    // let selectActive: boolean = true;
    ["DOMContentLoaded", "resize", "load"].forEach(function (item) {
        return window.addEventListener(item, function () {
            var width = wcontainer.offsetWidth;
            if (width < 480) {
                wgrid.style["grid-template-columns"] = "1fr";
            }
            else {
                wgrid.style["grid-template-columns"] = "1fr 1fr";
            }
        });
    });
    phoneInput.addEventListener("input", function () {
        var value = this.value.replaceAll(" ", "");
        if (value.length < 15) {
            this.value = new libphonenumber_js_1.AsYouType().input(this.value);
        }
        else
            this.value = value.substring(0, value.length - 1);
        if (!this.value) {
            this.value = "+";
        }
    });
    // select.addEventListener("click", function () {
    //   console.log("selectActive", selectActive);
    //   if (selectActive) {
    //     dropdown.classList.add("w-active");
    //     select.classList.add("w-active");
    //   } else {
    //     dropdown.classList.remove("w-active");
    //     select.classList.remove("w-active");
    //   }
    //   selectActive = !selectActive;
    // });
    // dropdown.addEventListener("click", function (e: MouseEvent) {
    //   const value = (e.target as HTMLSpanElement).innerHTML;
    //   console.log("value", value);
    //   select.innerText = value;
    //   selectActive = !selectActive;
    //   dropdown.classList.remove("w-active");
    //   select.classList.remove("w-active");
    // });
    // document.addEventListener("click", function (e: MouseEvent) {
    //   const target = e.target as HTMLElement;
    //   const clickAway = target !== dropdown && target !== select;
    //   if (!!selectActive && clickAway) {
    //     console.log("selectActive", selectActive);
    //     console.log("fired");
    //   }
    // });
    var digitsWithWhitespace = /^[0-9\b]|\t+$/;
    var digits = /^[0-9\b]+$/;
    var email = /.+@.+\.[A-Za-z]+$/;
    var multiplier = 1e3;
    var termSlider = wcontainer.querySelector(".w-slider.w-term");
    !!termSlider && termSlider.addEventListener("input", handleTermSliderChange);
    var termSliderActivePart = wcontainer.querySelector(".w-term .w-slider-active-portion");
    var termInput = wcontainer.querySelector(".w-input.w-term");
    termInput.value = "3 месяца";
    var sumSlider = wcontainer.querySelector(".w-slider.w-sum");
    !!sumSlider && sumSlider.addEventListener("input", handleSumSliderChange);
    var sumSliderActivePart = wcontainer.querySelector(".w-sum .w-slider-active-portion");
    var firstnameInput = wcontainer.querySelector(".w-1stname");
    var secondnameInput = wcontainer.querySelector(".w-2ndname");
    var lastnameInput = wcontainer.querySelector(".w-lastname");
    var innInput = wcontainer.querySelector(".w-inn");
    innInput.value = inn;
    var emailInput = wcontainer.querySelector(".w-email");
    var sumInput = wcontainer.querySelector(".w-input.w-sum");
    !!sumInput && sumInput.addEventListener("input", handleSumInputChange);
    [
        sumInput,
        firstnameInput,
        secondnameInput,
        lastnameInput,
        innInput,
        phoneInput,
        emailInput,
    ].forEach(function (item) { return item.addEventListener("focus", handleFocusChange); });
    [
        sumInput,
        firstnameInput,
        secondnameInput,
        lastnameInput,
        innInput,
        phoneInput,
        emailInput,
    ].forEach(function (item) { return item.addEventListener("blur", handleFocusChange); });
    var submitBtn = wcontainer.querySelector(".w-submit");
    document.addEventListener("DOMContentLoaded", function () {
        var agreements = Array.from(wcontainer.querySelectorAll(".w-checkbox"));
        if (agreements.length > 0) {
            agreements.forEach(function (el) {
                return el.addEventListener("change", function () {
                    var hasAgreedToAll = agreements.every(function (checkbox) { return checkbox.checked; });
                    if (!hasAgreedToAll) {
                        submitBtn.classList.add("disabled");
                    }
                    else {
                        submitBtn.classList.remove("disabled");
                    }
                });
            });
        }
        submitBtn.addEventListener("click", handleSubmit);
        function handleSubmit() {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var trimmedInn, values, res, detail, error_1, data, banks, banksUl, e_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 5, , 6]);
                            if (!lastnameInput.value) {
                                throw new Error("Заполните поле фамилии");
                            }
                            if (!firstnameInput.value) {
                                throw new Error("Заполните поле имени");
                            }
                            if (!innInput.value) {
                                throw new Error("Заполните поле ИНН");
                            }
                            if (!sumInput.value) {
                                throw new Error("Заполните поле суммы");
                            }
                            if (parseInt(sumInput.value.replaceAll(" ", "")) < 1e4) {
                                throw new Error("Сумма должна быть не менее 10 000 ₽");
                            }
                            trimmedInn = innInput.value.toString().replaceAll(" ", "");
                            if (!(trimmedInn.length === 10 || trimmedInn.length === 12)) {
                                throw new Error("ИНН должен состоять из 10 или 12 цифр");
                            }
                            if (phoneInput.value === "+") {
                                throw new Error("Заполните поле телефона");
                            }
                            if (!(0, libphonenumber_js_1.isValidPhoneNumber)(phoneInput.value)) {
                                throw new Error("Некорректный формат номера телефона");
                            }
                            if (!emailInput.value) {
                                throw new Error("Заполните поле электронной почты");
                            }
                            if (!email.test(emailInput.value)) {
                                throw new Error("Некорректный формат электронной почты");
                            }
                            values = {
                                agreements: {
                                    bki: false,
                                    personal: true,
                                    sharing: true,
                                },
                                amount: parseInt(sumInput.value.replaceAll(" ", "")),
                                email: emailInput.value,
                                inn: trimmedInn,
                                first_name: firstnameInput.value,
                                second_name: secondnameInput.value,
                                last_name: lastnameInput.value,
                                partner_user_id: partnerUserId,
                                partner_company_id: partnerCompanyId,
                                phone: phoneInput.value.replaceAll(" ", ""),
                                service_code: "CREDIT",
                                term: parseInt(termInput.value),
                            };
                            return [4 /*yield*/, fetch("".concat(apiUrl, "/widget/request/"), {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(values),
                                })];
                        case 1:
                            res = _d.sent();
                            if (!(res.status !== 200)) return [3 /*break*/, 3];
                            return [4 /*yield*/, res.json()];
                        case 2:
                            detail = (_d.sent()).detail;
                            error_1 = "";
                            if (Array.isArray(detail)) {
                                detail.forEach(function (item) { return (error_1 += item.msg + "\n"); });
                            }
                            else {
                                error_1 = detail;
                            }
                            throw new Error(error_1);
                        case 3: return [4 /*yield*/, res.json()];
                        case 4:
                            data = _d.sent();
                            banks = data.map(function (item) { return item.to_company.name_clear; });
                            resetForm();
                            banksUl = banks
                                .map(function (item) { return "<li class=\"w-bank-item\">".concat(item, "</li>"); })
                                .join("");
                            wrapper.querySelector(".w-agreement-wrap").innerHTML = "<h2>\u0423\u0432\u0430\u0436\u0430\u0435\u043C\u044B\u0439, ".concat(values.first_name, ".</h2>\n        <p class=\"w-success-msg\">\u0412\u0430\u043C\u0438 \u043F\u043E\u0434\u0430\u043D\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u0440\u0435\u0434\u0438\u0442\u0430 \u043D\u0430 \u0441\u0443\u043C\u043C\u0443 ").concat(values.amount, " \u0440\u0443\u0431\u043B\u0435\u0439 \u043D\u0430 \u0441\u0440\u043E\u043A ").concat(getValueWithMonths(values.term), ". \u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u0432: <ul>").concat(banksUl, "</ul> \u0412 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0441 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0443\u0442\u0441\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u044B \u0431\u0430\u043D\u043A\u043E\u0432.</p>");
                            wgrid.outerHTML = "";
                            wrapper.querySelector(".w-submit").outerHTML = "";
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _d.sent();
                            if (!!e_1.message && e_1.message.trim() === "value is not a valid email address") {
                                alert("Недействительный адрес электронной почты");
                            }
                            else {
                                alert((_c = (_b = (_a = e_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : e_1.message);
                            }
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
    });
    setInputFilterWithWhitespaces(sumInput, function (value) {
        return ((digits.test(value.replaceAll(" ", "")) && parseInt(value.replaceAll(" ", "")) < 1e9) ||
            !value.length);
    }, "Разрешены только числовые символы. Вручную можно ввести сумму до 1 млрд.");
    setInputFilter(innInput, function (value) {
        return (digits.test(value) && value.replaceAll(" ", "").length < 13) || !value.length;
    }, "Разрешены только числовые символы. Длина ИНН 10 или 12 цифр.");
    var getValueWithMonths = function (value) {
        var suffix = "";
        if (value % 10 > 1 && value % 10 < 5)
            suffix = "а";
        if (value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 15))
            suffix = "ев";
        return value + " месяц" + suffix;
    };
    {
    }
    function handleTermSliderChange(e) {
        var value = e.target.value;
        var min = parseInt(e.target.getAttribute("min"));
        var max = parseInt(e.target.getAttribute("max"));
        var steps = max - min;
        var valueStep = 1;
        var percentageStep = 100 / steps;
        var fraction = percentageStep * ((value - min) * valueStep);
        termInput.value = getValueWithMonths(value);
        termSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
    }
    function handleSumSliderChange(e) {
        var value = e.target.value;
        var steps = parseInt(e.target.getAttribute("max")) -
            parseInt(e.target.getAttribute("min"));
        var valueStep = (parseInt(e.target.getAttribute("max")) - 1) / steps;
        var percentageStep = 100 / steps;
        var fraction = percentageStep * ((parseInt(value) - 1) * valueStep);
        sumSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
        sumInput.value = "".concat(numberWithSpaces(parseInt(value) * multiplier));
    }
    function handleSumInputChange(e) {
        var value = e.target.value.replaceAll(" ", "");
        var steps = parseInt(sumSlider.getAttribute("max")) - parseInt(sumSlider.getAttribute("min"));
        var valueStep = (parseInt(sumSlider.getAttribute("max")) - 1) / steps;
        var percentageStep = 100 / steps;
        var fraction = (percentageStep * (parseInt(value) - 1) * valueStep) / multiplier;
        sumSliderActivePart.style.width = "calc(".concat(fraction, "% - ").concat(fraction / 100, " * 14px)");
        var sliderValue = parseInt(value) / multiplier + 1;
        sumSlider.value = "".concat(sliderValue);
    }
    function handleFocusChange(e) {
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
            if (!parent.querySelector(".w-input").value) {
                parent.querySelector(".w-field-name").classList.remove("w-active");
            }
        }
    }
    function resetForm() {
        termInput.value = "3 месяца";
        sumInput.value = "10 000";
        firstnameInput.value = "";
        secondnameInput.value = "";
        lastnameInput.value = "";
        innInput.value = "";
        phoneInput.value = "+";
        emailInput.value = "";
    }
}
exports.default = createMYFIWidget;
