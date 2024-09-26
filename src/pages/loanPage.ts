import {IWidgetParams} from "../myfiwidget";
import {
    determineSexType,
    formatNumberWithSpaces,
    numberWithSpaces,
    onDomContentLoaded,
    setInputFilter,
    setInputFilterWithWhitespaces,
} from "../helpers";
import {AsYouType, isValidPhoneNumber} from "libphonenumber-js";
import "../styles/loan.scss";

const pj = require("../../package.json")
const pageTemplate = require("../templates/loan.html")

export function loanPage(
    container: IWidgetParams["container"],
    inn: IWidgetParams["inn"],
    apiUrl: IWidgetParams["apiUrl"],
    partnerCompanyId: IWidgetParams["partnerCompanyId"],
    partnerUserId: IWidgetParams["partnerUserId"],
    agreements: IWidgetParams["agreements"],
    successMessage: IWidgetParams["successMessage"]
) {
    let html = pageTemplate.default;
    html = html.replace("{{inn}}", inn);

    let checkboxesCreated = false;

    container.innerHTML = html;

    const wcontainer = container.querySelector(".w-container");

    const wgrid: HTMLElement = container.querySelector(".w-grid");

    const phoneInput: HTMLInputElement = wcontainer.querySelector(".w-phone")!;

    phoneInput.addEventListener("input", function () {
        const value = this.value.replaceAll(" ", "");
        if (value.length < 15) {
            this.value = new AsYouType().input(this.value);
        } else this.value = value.substring(0, value.length - 1);

        if (!this.value) {
            this.value = "+";
        }
    });

    const digits = /^[0-9\b]+$/;
    const email = /.+@.+\.[A-Za-z]+$/;

    const multiplier = 1e3;

    const termSlider = wcontainer.querySelector(".w-slider.w-term");
    !!termSlider && termSlider.addEventListener("input", handleTermSliderChange);
    const termSliderActivePart: HTMLElement = wcontainer.querySelector(
        ".w-term .w-slider-active-portion"
    );

    const termInput: HTMLInputElement = wcontainer.querySelector(".w-input.w-term")!;
    termInput.value = "3 месяца";

    const sumSlider: HTMLInputElement = wcontainer.querySelector(".w-slider.w-sum");
    !!sumSlider && sumSlider.addEventListener("input", handleSumSliderChange);
    const sumSliderActivePart: HTMLInputElement = wcontainer.querySelector(
        ".w-sum .w-slider-active-portion"
    );

    const firstnameInput: HTMLInputElement = wcontainer.querySelector(".w-1stname")!;
    const secondnameInput: HTMLInputElement = wcontainer.querySelector(".w-2ndname")!;
    const lastnameInput: HTMLInputElement = wcontainer.querySelector(".w-lastname")!;
    const innInput: HTMLInputElement = wcontainer.querySelector(".w-inn")!;
    innInput.value = inn;

    const emailInput: HTMLInputElement = wcontainer.querySelector(".w-email")!;

    const sumInput: HTMLInputElement = wcontainer.querySelector(".w-input.w-sum")!;
    !!sumInput && sumInput.addEventListener("input", handleSumInputChange);

    [
        sumInput,
        firstnameInput,
        secondnameInput,
        lastnameInput,
        innInput,
        phoneInput,
        emailInput,
    ].forEach((item) => item.addEventListener("focus", handleFocusChange));
    [
        sumInput,
        firstnameInput,
        secondnameInput,
        lastnameInput,
        innInput,
        phoneInput,
        emailInput,
    ].forEach((item) => item.addEventListener("blur", handleFocusChange));

    const submitBtn: HTMLInputElement = wcontainer.querySelector(".w-submit")!;

    (async function () {
        await onDomContentLoaded();
        if (!checkboxesCreated) {
            const agreementWrap = document.querySelector(".w-agreement-wrap");
            if (agreementWrap) {
                agreements.forEach((checkboxInfo, index) => {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = "agree" + `${index + 1}`;
                    checkbox.name = "agree" + `${index + 1}`;
                    checkbox.value = "true";
                    checkbox.className = "w-checkbox";

                    const label = document.createElement("label");
                    label.htmlFor = checkbox.id;

                    if (checkboxInfo.url !== undefined && checkboxInfo.url.length > 0) {
                        label.innerHTML =
                            `<a class="w-link" href="${checkboxInfo.url}" target="_blank" rel="nofollow">` +
                            checkboxInfo.label +
                            "</a>";
                    } else {
                        label.innerHTML = checkboxInfo.label;
                    }

                    label.className = "w-agreement";

                    agreementWrap.appendChild(checkbox);
                    agreementWrap.appendChild(label);
                });
                checkboxesCreated = true;
            }
        }
    })();

    (async function () {
        await new Promise((resolve) => setTimeout(resolve, 0));
        await onDomContentLoaded();
        const agreements: Array<HTMLInputElement> = Array.from(
            wcontainer.querySelectorAll(".w-checkbox")
        );

        if (agreements.length > 0) {
            agreements.forEach((el) =>
                el.addEventListener("change", function () {
                    const hasAgreedToAll = agreements.every((checkbox) => checkbox.checked);
                    if (!hasAgreedToAll) {
                        submitBtn.classList.add("disabled");
                    } else {
                        submitBtn.classList.remove("disabled");
                    }
                })
            );
        }
        submitBtn.addEventListener("click", handleSubmit);

        async function handleSubmit() {
            try {
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
                const trimmedInn = innInput.value.toString().replaceAll(" ", "");
                if (!(trimmedInn.length === 10 || trimmedInn.length === 12)) {
                    throw new Error("ИНН должен состоять из 10 или 12 цифр");
                }
                if (phoneInput.value === "+") {
                    throw new Error("Заполните поле телефона");
                }

                if (!isValidPhoneNumber(phoneInput.value)) {
                    throw new Error("Некорректный формат номера телефона");
                }
                if (!emailInput.value) {
                    throw new Error("Заполните поле электронной почты");
                }
                if (!email.test(emailInput.value)) {
                    throw new Error("Некорректный формат электронной почты");
                }

                const values = {
                    agreements: {
                        bki: false,
                        personal: true,
                        sharing: true,
                    },
                    applicant_info: {
                        email: emailInput.value,
                        inn: trimmedInn,
                        first_name: firstnameInput.value,
                        second_name: secondnameInput.value,
                        last_name: lastnameInput.value,
                        phone: phoneInput.value.replaceAll(" ", ""),
                    },
                    application_info: {
                        amount: parseInt(sumInput.value.replaceAll(" ", "")),
                        term: parseInt(termInput.value),
                    },
                    partner_user_id: partnerUserId,
                    partner_company_id: partnerCompanyId,
                    service_code: "CREDIT",
                };

                const res = await fetch(`${apiUrl}/widget/request/`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json", "X-Widget-Version": pj.version},
                    body: JSON.stringify(values),
                });

                if (!res.ok) {
                    const detail = (await res.json()).detail;
                    let error = "";
                    if (Array.isArray(detail)) {
                        detail.forEach((item) => (error += item.msg + "\n"));
                    } else {
                        error = detail;
                    }
                    throw new Error(error);
                }

                const data = await res.json();
                const banks = data.map((item) => item.to_company.brand_name);

                const fio = [
                    values.applicant_info.first_name,
                    values.applicant_info.second_name,
                    values.applicant_info.last_name
                ];
                const sexType = determineSexType(fio);

                let userNames = fio.filter(e => e);
                const partOfName = userNames.join(" ");
                const amount = formatNumberWithSpaces(values.application_info.amount)
                const term = getValueWithMonths(values.application_info.term)

                resetForm();
                const banksUl = banks
                    .map((item: string) => `<li class="w-bank-item">${item}</li>`)
                    .join("");
                wcontainer.querySelector(".w-agreement-wrap").innerHTML =
                    successMessage.replace("{partOfName}", `${partOfName}`)
                        .replace("{firstName}", `${values.applicant_info.first_name}`)
                        .replace("{lastName}", `${values.applicant_info.last_name}`)
                        .replace("{secondName}", `${values.applicant_info.second_name}`)
                        .replace("{amount}", `${amount}`)
                        .replace("{term}", `${term}`)
                        .replace("{banks}", `${banksUl}`)
                        .replace("{sextype}", `${sexType}`);
                wgrid.outerHTML = "";
                wcontainer.querySelector(".w-submit").outerHTML = "";
            } catch (e) {
                if (!!e.message && e.message.trim() === "value is not a valid email address") {
                    alert("Недействительный адрес электронной почты");
                } else {
                    alert(e.response?.data?.message ?? e.message);
                }
            }
        }
    })();

    setInputFilterWithWhitespaces(
        sumInput,
        function (value) {
            return (
                (digits.test(value.replaceAll(" ", "")) && parseInt(value.replaceAll(" ", "")) < 1e9) ||
                !value.length
            );
        },
        "Разрешены только числовые символы. Вручную можно ввести сумму до 1 млрд."
    );

    setInputFilter(
        innInput,
        function (value) {
            return (digits.test(value) && value.replaceAll(" ", "").length < 13) || !value.length;
        },
        "Разрешены только числовые символы. Длина ИНН 10 или 12 цифр."
    );

    const getValueWithMonths = (value: number) => {
        let suffix = "";
        if (value % 10 > 1 && value % 10 < 5) suffix = "а";
        if (value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 15)) suffix = "ев";
        return value + " месяц" + suffix;
    };

    function handleTermSliderChange(e) {
        const value = e.target.value;
        const min = parseInt(e.target.getAttribute("min"));
        const max = parseInt(e.target.getAttribute("max"));

        const steps = max - min;

        const valueStep = 1;
        const percentageStep = 100 / steps;

        const fraction = percentageStep * ((value - min) * valueStep);

        termInput.value = getValueWithMonths(value);
        termSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;
    }

    function handleSumSliderChange(e: InputEvent) {
        const value = (e.target as HTMLInputElement).value;
        const steps =
            parseInt((e.target as HTMLInputElement).getAttribute("max")) -
            parseInt((e.target as HTMLInputElement).getAttribute("min"));

        const valueStep = (parseInt((e.target as HTMLInputElement).getAttribute("max")) - 1) / steps;

        const percentageStep = 100 / steps;

        const fraction = percentageStep * ((parseInt(value) - 1) * valueStep);

        sumSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;
        sumInput.value = `${numberWithSpaces(parseInt(value) * multiplier)}`;
    }

    function handleSumInputChange(e: InputEvent) {
        const value = (e.target as HTMLInputElement).value.replaceAll(" ", "");
        const steps = parseInt(sumSlider.getAttribute("max")) - parseInt(sumSlider.getAttribute("min"));
        const valueStep = (parseInt(sumSlider.getAttribute("max")) - 1) / steps;
        const percentageStep = 100 / steps;
        const fraction = (percentageStep * (parseInt(value) - 1) * valueStep) / multiplier;

        sumSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;

        const sliderValue = parseInt(value) / multiplier + 1;

        sumSlider.value = `${sliderValue}`;
    }

    function handleFocusChange(e) {
        let isFocused = document.activeElement === e.target;

        let parent = e.target.parentElement;

        if (![...parent.classList].includes("w-field-wrap"))
            parent = parent.parentElement.parentElement;

        if (isFocused) {
            parent.classList.add("w-focused");
            parent.querySelector(".w-field-name").classList.add("w-active");
        } else {
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

    return html;
}
