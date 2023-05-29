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
exports.createMYFIWidget = void 0;
var intl_tel_input_1 = require("intl-tel-input");
require("../node_modules/intl-tel-input/build/css/intlTelInput.css");
// require("../node_modules/intl-tel-input/build/css/intlTelInput.css");
require("./index.css");
// require("./index.css");
// const intlTelInput = require("intl-tel-input");
// require("./node_modules/intl-tel-input/build/css/intlTelInput.css");
// import "./node_modules/intl-tel-input/build/css/intlTelInput.css";
var countries = {
    au: "Австралия",
    at: "Австрия",
    az: "Азербайджан",
    ax: "Аландские о-ва",
    al: "Албания",
    dz: "Алжир",
    as: "Американское Самоа",
    ai: "Ангилья",
    ao: "Ангола",
    ad: "Андорра",
    aq: "Антарктида",
    ag: "Антигуа и Барбуда",
    ar: "Аргентина",
    am: "Армения",
    aw: "Аруба",
    af: "Афганистан",
    bs: "Багамы",
    bd: "Бангладеш",
    bb: "Барбадос",
    bh: "Бахрейн",
    by: "Беларусь",
    bz: "Белиз",
    be: "Бельгия",
    bj: "Бенин",
    bm: "Бермудские о-ва",
    bg: "Болгария",
    bo: "Боливия",
    bq: "Бонэйр, Синт-Эстатиус и Саба",
    ba: "Босния и Герцеговина",
    bw: "Ботсвана",
    br: "Бразилия",
    io: "Британская территория в Индийском океане",
    bn: "Бруней-Даруссалам",
    bf: "Буркина-Фасо",
    bi: "Бурунди",
    bt: "Бутан",
    vu: "Вануату",
    va: "Ватикан",
    gb: "Великобритания",
    hu: "Венгрия",
    ve: "Венесуэла",
    vg: "Виргинские о-ва (Великобритания)",
    vi: "Виргинские о-ва (США)",
    um: "Внешние малые о-ва (США)",
    tl: "Восточный Тимор",
    vn: "Вьетнам",
    ga: "Габон",
    ht: "Гаити",
    gy: "Гайана",
    gm: "Гамбия",
    gh: "Гана",
    gp: "Гваделупа",
    gt: "Гватемала",
    gn: "Гвинея",
    gw: "Гвинея-Бисау",
    de: "Германия",
    gg: "Гернси",
    gi: "Гибралтар",
    hn: "Гондурас",
    hk: "Гонконг (САР)",
    gd: "Гренада",
    gl: "Гренландия",
    gr: "Греция",
    ge: "Грузия",
    gu: "Гуам",
    dk: "Дания",
    je: "Джерси",
    dj: "Джибути",
    dm: "Доминика",
    do: "Доминиканская Республика",
    eg: "Египет",
    zm: "Замбия",
    eh: "Западная Сахара",
    zw: "Зимбабве",
    il: "Израиль",
    in: "Индия",
    id: "Индонезия",
    jo: "Иордания",
    iq: "Ирак",
    ir: "Иран",
    ie: "Ирландия",
    is: "Исландия",
    es: "Испания",
    it: "Италия",
    ye: "Йемен",
    cv: "Кабо-Верде",
    kz: "Казахстан",
    kh: "Камбоджа",
    cm: "Камерун",
    ca: "Канада",
    qa: "Катар",
    ke: "Кения",
    cy: "Кипр",
    kg: "Киргизия",
    ki: "Кирибати",
    cn: "Китай",
    kp: "КНДР",
    cc: "Кокосовые о-ва",
    co: "Колумбия",
    km: "Коморы",
    cg: "Конго - Браззавиль",
    cd: "Конго - Киншаса",
    cr: "Коста-Рика",
    ci: "Кот-д’Ивуар",
    cu: "Куба",
    kw: "Кувейт",
    cw: "Кюрасао",
    la: "Лаос",
    lv: "Латвия",
    ls: "Лесото",
    lr: "Либерия",
    lb: "Ливан",
    ly: "Ливия",
    lt: "Литва",
    li: "Лихтенштейн",
    lu: "Люксембург",
    mu: "Маврикий",
    mr: "Мавритания",
    mg: "Мадагаскар",
    yt: "Майотта",
    mo: "Макао (САР)",
    mw: "Малави",
    my: "Малайзия",
    ml: "Мали",
    mv: "Мальдивы",
    mt: "Мальта",
    ma: "Марокко",
    mq: "Мартиника",
    mh: "Маршалловы Острова",
    mx: "Мексика",
    mz: "Мозамбик",
    md: "Молдова",
    mc: "Монако",
    mn: "Монголия",
    ms: "Монтсеррат",
    mm: "Мьянма (Бирма)",
    na: "Намибия",
    nr: "Науру",
    np: "Непал",
    ne: "Нигер",
    ng: "Нигерия",
    nl: "Нидерланды",
    ni: "Никарагуа",
    nu: "Ниуэ",
    nz: "Новая Зеландия",
    nc: "Новая Каледония",
    no: "Норвегия",
    bv: "о-в Буве",
    im: "о-в Мэн",
    nf: "о-в Норфолк",
    cx: "о-в Рождества",
    sh: "о-в Св. Елены",
    pn: "о-ва Питкэрн",
    tc: "о-ва Тёркс и Кайкос",
    hm: "о-ва Херд и Макдональд",
    ae: "ОАЭ",
    om: "Оман",
    ky: "Острова Кайман",
    ck: "Острова Кука",
    pk: "Пакистан",
    pw: "Палау",
    ps: "Палестинские территории",
    pa: "Панама",
    pg: "Папуа — Новая Гвинея",
    py: "Парагвай",
    pe: "Перу",
    pl: "Польша",
    pt: "Португалия",
    pr: "Пуэрто-Рико",
    kr: "Республика Корея",
    re: "Реюньон",
    ru: "Россия",
    rw: "Руанда",
    ro: "Румыния",
    sv: "Сальвадор",
    ws: "Самоа",
    sm: "Сан-Марино",
    st: "Сан-Томе и Принсипи",
    sa: "Саудовская Аравия",
    mk: "Северная Македония",
    mp: "Северные Марианские о-ва",
    sc: "Сейшельские Острова",
    bl: "Сен-Бартелеми",
    mf: "Сен-Мартен",
    pm: "Сен-Пьер и Микелон",
    sn: "Сенегал",
    vc: "Сент-Винсент и Гренадины",
    kn: "Сент-Китс и Невис",
    lc: "Сент-Люсия",
    rs: "Сербия",
    sg: "Сингапур",
    sx: "Синт-Мартен",
    sy: "Сирия",
    sk: "Словакия",
    si: "Словения",
    us: "Соединенные Штаты",
    sb: "Соломоновы Острова",
    so: "Сомали",
    sd: "Судан",
    sr: "Суринам",
    sl: "Сьерра-Леоне",
    tj: "Таджикистан",
    th: "Таиланд",
    tw: "Тайвань",
    tz: "Танзания",
    tg: "Того",
    tk: "Токелау",
    to: "Тонга",
    tt: "Тринидад и Тобаго",
    tv: "Тувалу",
    tn: "Тунис",
    tm: "Туркменистан",
    tr: "Турция",
    ug: "Уганда",
    uz: "Узбекистан",
    ua: "Украина",
    wf: "Уоллис и Футуна",
    uy: "Уругвай",
    fo: "Фарерские о-ва",
    fm: "Федеративные Штаты Микронезии",
    fj: "Фиджи",
    ph: "Филиппины",
    fi: "Финляндия",
    fk: "Фолклендские о-ва",
    fr: "Франция",
    gf: "Французская Гвиана",
    pf: "Французская Полинезия",
    tf: "Французские Южные территории",
    hr: "Хорватия",
    cf: "Центрально-Африканская Республика",
    td: "Чад",
    me: "Черногория",
    cz: "Чехия",
    cl: "Чили",
    ch: "Швейцария",
    se: "Швеция",
    sj: "Шпицберген и Ян-Майен",
    lk: "Шри-Ланка",
    ec: "Эквадор",
    gq: "Экваториальная Гвинея",
    er: "Эритрея",
    sz: "Эсватини",
    ee: "Эстония",
    et: "Эфиопия",
    gs: "Южная Георгия и Южные Сандвичевы о-ва",
    za: "Южно-Африканская Республика",
    ss: "Южный Судан",
    jm: "Ямайка",
    jp: "Япония",
};
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
function createMYFIWidget(_a) {
    var container = _a.container, inn = _a.inn, partnerId = _a.partnerId, fontFamily = _a.fontFamily;
    if (typeof window !== "undefined") {
        document.addEventListener("DOMContentLoaded", function () {
            var wrapper = document.querySelector(container || ".w-wrap");
            console.log("wrapper", wrapper);
            if (!wrapper)
                return;
            wrapper.innerHTML = " <div class=\"w-container\">\n\n    <div class=\"w-field-wrap w-term\">\n      <span class=\"w-field-name\">\u0421\u0440\u043E\u043A</span>\n      <input type=\"text\" class=\"w-input w-term\" value=\"1 \u043C\u0435\u0441\u044F\u0446\" />\n      <input type=\"range\" min=\"1\" max=\"48\" value=\"1\" class=\"w-slider w-term\" id=\"myRange\" />\n      <div class=\"w-term w-slider-active-portion\"></div>\n    </div>\n    <div class=\"w-field-wrap w-sum\">\n      <span class=\"w-field-name\">\u0421\u0443\u043C\u043C\u0430, \u20BD</span>\n      <input type=\"text\" class=\"w-input w-sum\" value=\"100000\" />\n      <input type=\"range\" min=\"1\" max=\"50\" value=\"1\" class=\"w-slider w-sum\" id=\"myRange\" />\n      <div class=\"w-sum w-slider-active-portion\"></div>\n    </div>\n\n    <div class=\"w-field-wrap\">\n      <span class=\"w-field-name\">\u0424\u0418\u041E*</span>\n      <input type=\"text\" class=\"w-input w-name\" />\n    </div>\n    <div class=\"w-field-wrap\">\n      <span class=\"w-field-name\">\u0418\u041D\u041D*</span>\n      <input type=\"text\" class=\"w-input w-inn\" />\n    </div>\n\n    <div class=\"w-field-wrap\">\n      <span class=\"w-field-name\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D*</span>\n      <input type=\"text\" class=\"w-input w-phone\" />\n    </div>\n    <div class=\"w-field-wrap\">\n      <span class=\"w-field-name\">\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430*</span>\n      <input type=\"text\" class=\"w-input w-email\" />\n    </div>\n    <button class=\"w-submit\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n    <style>.w-container * {font-family: ".concat(fontFamily, "}</style>\n\n  </div>");
            var wcontainer = document.querySelector(".w-container");
            var phoneInput = document.querySelector(".w-phone");
            (0, intl_tel_input_1.default)(phoneInput, {
                utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
            });
            ["DOMContentLoaded", "resize"].forEach(function (item) {
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
            var digitsWithWhitespace = /^[0-9\b]|\t+$/;
            var digits = /^[0-9\b]+$/;
            // const phone = /^\+[1-9]\d{1,14}$/;
            var email = /.+@.+\.[A-Za-z]+$/;
            //   const span = document.createElement("span");
            //   span.innerHTML = "js generated";
            //   span.classList.add("test");
            //   body.append(span);
            var multiplier = 1e5;
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
            innInput.value = inn;
            var emailInput = document.querySelector(".w-email");
            var iti = (0, intl_tel_input_1.default)(phoneInput, {
                initialCountry: "ru",
                localizedCountries: countries,
                preferredCountries: ["ru"],
            });
            var sumInput = document.querySelector(".w-input.w-sum");
            !!sumInput && sumInput.addEventListener("input", handleSumInputChange);
            // sumInput.addEventListener("focus", handleFocusChange);
            // sumInput.addEventListener("blur", handleFocusChange);
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
                    if (!iti.isValidNumber()) {
                        throw new Error("Некорректный формат номера телефона");
                    }
                    if (!emailInput.value) {
                        throw new Error("Заполните поле электронной почты");
                    }
                    if (!email.test(emailInput.value)) {
                        throw new Error("Некорректный формат электронной почты");
                    }
                    var values = {
                        partnerId: partnerId,
                        term: termInput.value,
                        sum: sumInput.value.replaceAll(" ", ""),
                        name: nameInput.value,
                        inn: trimmedInn,
                        phone: iti.getNumber(intl_tel_input_1.default.numberFormat.E164),
                        email: emailInput.value,
                    };
                    alert(JSON.stringify(values));
                }
                catch (e) {
                    alert(e.message);
                }
            }
        });
    }
}
exports.createMYFIWidget = createMYFIWidget;
// export function createMYFIWidget() {
// if (typeof window !== "undefined") {
// document.addEventListener("DOMContentLoaded", () => {
// console.log("test");
// });
// }
// }
// module.exports = createMYFIWidget;
