import {IWidgetParams} from "../myfiwidget";
import {determineSexType, formatNumberWithSpaces, onDomContentLoaded} from "../helpers";
import "../styles/bg.scss";

const pj = require("../../package.json");
const pageTemplate = require("../templates/bg.html");


export function bgPage(
    container: IWidgetParams["container"],
    inn: IWidgetParams["inn"],
    apiUrl: IWidgetParams["apiUrl"],
    partnerCompanyId: IWidgetParams["partnerCompanyId"],
    partnerUserId: IWidgetParams["partnerUserId"],
    agreements: IWidgetParams["agreements"],
    successMessage: IWidgetParams["successMessage"]
) {
    let checkboxesCreated = false;
    let html = pageTemplate.default;
    html = html.replace('{{inn}}', inn);
    container.innerHTML = html;
    const icontainer = container.querySelector(".w-bank");
    const wgrid: HTMLElement = container.querySelector(".w-grid");

    const optionTypeInput = icontainer.querySelector(".option-type");
    const optionGInput = icontainer.querySelector(".option-guarantee");
    const optionLowInput = icontainer.querySelector(".option-low");
    const buyNumberInput = icontainer.querySelector(".buy-number");
    const customerInnInput = icontainer.querySelector('.customer-inn')
    const sumCInput = icontainer.querySelector(".sum-contract");
    const sumGInput = icontainer.querySelector(".sum-guarantee");
    const periodInput = icontainer.querySelector(".period");
    const innInput = icontainer.querySelector(".inn");
    const emailInput = icontainer.querySelector(".email");
    const phoneInput = icontainer.querySelector(".phone");
    const lastNameInput = icontainer.querySelector(".last-name");
    const firstNameInput = icontainer.querySelector(".first-name");
    const secondNameInput = icontainer.querySelector(".second-name");
    const sumLastInput = icontainer.querySelector(".sum-last");
    const wholeYearInput = icontainer.querySelector(".whole-year");
    const sumFirstInput = icontainer.querySelector(".sum-first");
    const linkTenderInput = icontainer.querySelector(".link-tender");
    const optionGMethodInput = icontainer.querySelector(".option-guarantee-method");
    const securityInput = icontainer.querySelector(".security");

    (async function () {
        await onDomContentLoaded();
        if (!checkboxesCreated) {
            const agreementWrap = document.querySelector(".w-agreement-wrap");
            if (agreementWrap) {
                agreements.forEach((checkboxInfo, index) => {
                    const checkboxWrap = document.createElement("div");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = `agree${index + 1}`;
                    checkbox.name = `agree${index + 1}`;
                    checkbox.value = "true";
                    checkbox.className = "w-checkbox";
                    checkbox.checked = true;

                    const label = document.createElement("label");
                    label.htmlFor = checkbox.id;
                    if (checkboxInfo.url !== undefined && checkboxInfo.url.length > 0) {
                        label.innerHTML = `
                            <a class="w-link" href="${checkboxInfo.url}" target="_blank" rel="nofollow">
                                ${checkboxInfo.label}
                            </a>
                        `;
                    } else {
                        label.innerHTML = checkboxInfo.label;
                    }

                    label.className = "w-agreement";

                    checkboxWrap.appendChild(checkbox);
                    checkboxWrap.appendChild(label);
                    agreementWrap.appendChild(checkboxWrap);
                });
                checkboxesCreated = true;
            }
        }
    })();

    //Ввод даты
    initializeDateMask();

    function initializeDateMask() {
        var dateInput = document.getElementById("dateMask");
        if (!dateInput) return;

        dateInput.addEventListener("input", function (e) {
            var target = e.target as HTMLInputElement;
            var newValue = target.value.replace(/\D/g, "");
            var mask = "__.__.____-__.__.____";
            var formattedValue = "";
            var cursorPosition = target.selectionStart;
            var isDeleting = target.value.length < mask.length;

            for (var i = 0, j = 0; i < mask.length; i++) {
                if (mask[i] === "_") {
                    formattedValue += j < newValue.length ? newValue[j++] : mask[i];
                } else {
                    formattedValue += mask[i];
                }
            }

            if (isDeleting) {
                cursorPosition = findPreviousUnderscore(formattedValue, cursorPosition);
            } else {
                cursorPosition = adjustCursorPositionForInsert(formattedValue, cursorPosition);
            }

            target.value = formattedValue;
            target.selectionStart = target.selectionEnd = cursorPosition;
        });
    }

    function findPreviousUnderscore(str: any, pos: any) {
        while (pos > 0 && !/\d/.test(str[pos - 1])) {
            pos--;
        }
        return pos;
    }

    function adjustCursorPositionForInsert(str: any, pos: any) {
        while (pos < str.length && /\D/.test(str[pos])) {
            pos++;
        }
        return pos;
    }

    document.addEventListener("DOMContentLoaded", initializeDateMask);

    // Начало кнопки загрузки

    //1
    document.getElementById("uploadBtn").addEventListener("click", function () {
        var fileInput = document.querySelector(".files1");

        if (fileInput instanceof HTMLInputElement) {
            fileInput.click();
        }
    });

    document.querySelector(".files1").addEventListener("change", function () {
        var input = this as HTMLInputElement;
        var files = input.files;
        var fileNames = [];

        if (files) {
            for (var i = 0; i < files.length; i++) {
                fileNames.push(files[i].name);
            }
        }

        const fileNamesElement = document.getElementById("fileNames");
        if (fileNamesElement) {
            fileNamesElement.textContent = fileNames.join(", ") || "Бухгалтерский баланс";
        } else {
            console.error('Element with id "fileNames" not found');
        }
    });

    //2
    document.getElementById("uploadBtn2").addEventListener("click", function () {
        var fileInput = document.querySelector(".files2");

        if (fileInput instanceof HTMLInputElement) {
            fileInput.click();
        }
    });

    document.querySelector(".files2").addEventListener("change", function () {
        var input = this as HTMLInputElement;
        var files = input.files;
        var fileNames2 = [];

        if (files) {
            for (var i = 0; i < files.length; i++) {
                fileNames2.push(files[i].name);
            }
        }

        const fileNamesElement2 = document.getElementById("fileNames2");
        if (fileNamesElement2) {
            fileNamesElement2.textContent =
                fileNames2.join(", ") || "Скан паспорта ген. директора или индивидуального предпринимателя";
        } else {
            console.error('Element with id "fileNames2" not found');
        }
    });

    //3
    document.getElementById("uploadBtn3").addEventListener("click", function () {
        var fileInput = document.querySelector(".files3");

        if (fileInput instanceof HTMLInputElement) {
            fileInput.click();
        }
    });

    document.querySelector(".files3").addEventListener("change", function () {
        var input = this as HTMLInputElement;
        var files = input.files;
        var fileNames3 = [];

        if (files) {
            for (var i = 0; i < files.length; i++) {
                fileNames3.push(files[i].name);
            }
        }

        const fileNamesElement3 = document.getElementById("fileNames3");
        if (fileNamesElement3) {
            fileNamesElement3.textContent =
                fileNames3.join(", ") || "Шаблон документа банковской гарантии";
        } else {
            console.error('Element with id "fileNames3" not found');
        }
    });

    //4
    document.getElementById("uploadBtn4").addEventListener("click", function () {
        var fileInput = document.querySelector(".files4");

        if (fileInput instanceof HTMLInputElement) {
            fileInput.click();
        }
    });

    document.querySelector(".files4").addEventListener("change", function () {
        var input = this as HTMLInputElement;
        var files = input.files;
        var fileNames4 = [];

        if (files) {
            for (var i = 0; i < files.length; i++) {
                fileNames4.push(files[i].name);
            }
        }

        const fileNamesElement4 = document.getElementById("fileNames4");
        if (fileNamesElement4) {
            fileNamesElement4.textContent = fileNames4.join(", ") || "Иные документы по выбору заявителя";
        } else {
            console.error('Element with id "fileNames4" not found');
        }
    });

    //Ограничение размера загрузки
    function checkFileSize(fileInput: any) {
        if (fileInput.files && fileInput.files[0].size > 20 * 1048576) {
            alert("Файл слишком большой!");
            fileInput.value = "";
        }
    }

    document.querySelector(".files1").addEventListener("change", function () {
        checkFileSize(this);
    });

    document.querySelector(".files2").addEventListener("change", function () {
        checkFileSize(this);
    });

    document.querySelector(".files3").addEventListener("change", function () {
        checkFileSize(this);
    });

    document.querySelector(".files4").addEventListener("change", function () {
        checkFileSize(this);
    });
    //Конец кнопки загрузки файлов

    //Открытие списка
    const arrowheader1 = icontainer.querySelector(".arrowheader1");
    arrowheader1.addEventListener("click", toggleContent1);
    const arrowheader2 = icontainer.querySelector(".arrowheader2");
    arrowheader2.addEventListener("click", toggleContent2);
    const arrowheader3 = icontainer.querySelector(".arrowheader3");
    arrowheader3.addEventListener("click", toggleContent3);

    function toggleContent1(e) {
        const content = document.getElementById("recipientInfo");
        const arrow = document.querySelector(".arrow");

        if (content.style.display === "none") {
            content.style.display = "block";
            arrow.classList.add("up");
        } else {
            content.style.display = "none";
            arrow.classList.remove("up");
        }
    }

    function toggleContent2() {
        const content = document.getElementById("recipientInfo2");
        const arrow = document.querySelector(".arrow2");

        if (content.style.display === "none") {
            content.style.display = "block";
            arrow.classList.add("up");
        } else {
            content.style.display = "none";
            arrow.classList.remove("up");
        }
    }

    function toggleContent3() {
        const content = document.getElementById("recipientInfo3");
        const arrow = document.querySelector(".arrow3");

        if (content.style.display === "none") {
            content.style.display = "flex";
            arrow.classList.add("up");
        } else {
            content.style.display = "none";
            arrow.classList.remove("up");
        }
    }

    //Конец открытия списка

    [
        optionTypeInput,
        optionGInput,
        optionLowInput,
        buyNumberInput,
        linkTenderInput,
        optionGMethodInput,
        securityInput,
        sumCInput,
        sumGInput,
        periodInput,
        customerInnInput,
        innInput,
        lastNameInput,
        firstNameInput,
        secondNameInput,
        emailInput,
        phoneInput,
        sumLastInput,
        wholeYearInput,
        sumFirstInput,
    ].forEach((item) => {
        if (item) {
        } else {
            console.error("Один из элементов формы не найден.");
            console.log(
                optionTypeInput,
                optionGInput,
                optionLowInput,
                buyNumberInput,
                linkTenderInput,
                optionGMethodInput,
                securityInput,
                sumCInput,
                sumGInput,
                periodInput,
                customerInnInput,
                innInput,
                lastNameInput,
                firstNameInput,
                secondNameInput,
                emailInput,
                phoneInput,
                sumLastInput,
                wholeYearInput,
                sumFirstInput
            );
        }
    });

    //Формат полей
    phoneInput.addEventListener("input", function (e) {
        var value = e.target.value;
        value = value.replace(/[^\d+]/g, "").replace(/(^\+)|\D/g, "$1");

        if (value.startsWith("+8")) {
            value = "+7" + value.substring(2);
        }

        if (value.startsWith("+")) {
            e.target.value = value.substring(0, 12);
        } else {
            e.target.value = "+" + value.substring(0, 11);
        }
    });

    function restrictToNumbers(event: any) {
        if (
            !/[0-9]/.test(event.key) &&
            event.keyCode !== 8 &&
            event.keyCode !== 46 &&
            event.keyCode !== 37 &&
            event.keyCode !== 39
        ) {
            event.preventDefault();
        }
    }

    sumGInput.addEventListener("keydown", restrictToNumbers);
    sumFirstInput.addEventListener("keydown", restrictToNumbers);
    sumCInput.addEventListener("keydown", restrictToNumbers);
    sumLastInput.addEventListener("keydown", restrictToNumbers);
    wholeYearInput.addEventListener("keydown", restrictToNumbers);

    sumGInput.addEventListener("input", function (e: any) {
        var value = e.target.value.replace(/[^\d]/g, "");
        if (value) {
            e.target.value = value + " ₽";
        }
    });
    sumFirstInput.addEventListener("input", function (e: any) {
        var value = e.target.value.replace(/[^\d]/g, "");
        if (value) {
            e.target.value = value + " ₽";
        }
    });

    sumCInput.addEventListener("input", function (e: any) {
        var value = e.target.value.replace(/[^\d]/g, "");
        if (value) {
            e.target.value = value + " ₽";
        }
    });

    sumLastInput.addEventListener("input", function (e: any) {
        var value = e.target.value.replace(/[^\d]/g, "");
        if (value) {
            e.target.value = value + " ₽";
        }
    });

    wholeYearInput.addEventListener("input", function (e: any) {
        var value = e.target.value.replace(/[^\d]/g, "");
        if (value) {
            e.target.value = value + " ₽";
        }
    });

    //проверка кнопок
    document.addEventListener("DOMContentLoaded", (event) => {
        const submitBtn = document.querySelector(".download-send");

        if (submitBtn) {
            submitBtn.addEventListener("click", handleSubmit);
        } else {
            console.error('Кнопка "Отправить" не найдена.');
        }
    });

    //Отправка формы
    const submitBtn = icontainer.querySelector(".download-send");
    submitBtn.addEventListener("click", handleSubmit);

    let errors = [];

    //Добавление ошибки в массив
    function addError(input: any, message: any) {
        errors.push({input, message});
    }

    //Валидация
    function validateInput(inputElement: any, message: any, additionalCheck = (value: any) => true) {
        let errorContainer = inputElement.nextElementSibling;

        if (!errorContainer || !errorContainer.classList.contains("error-message")) {
            errorContainer = document.createElement("div");
            errorContainer.classList.add("error-message");
            inputElement.parentNode.insertBefore(errorContainer, inputElement.nextSibling);
        }

        const showError = !inputElement.value || !additionalCheck(inputElement.value);

        if (showError) {
            errorContainer.textContent = message;
            errorContainer.style.display = "block";
            errorContainer.style.color = "red";
            addError(inputElement, message);
        } else {
            errorContainer.style.display = "none";
        }
    }

    function validateDate(dateStr: any) {
        const [day, month, year] = dateStr.split(".").map(Number);
        if (year < 1990 || year > 2050) return false;
        if (month < 1 || month > 12) return false;

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) return false;

        return true;
    }

    function createDateObj(dateStr: any) {
        const [day, month, year] = dateStr.split(".").map(Number);
        return new Date(year, month - 1, day);
    }

    function validatePeriod(period: any): any {
        const [firstDate, secondDate] = period.split("-");
        if (!validateDate(firstDate) || !validateDate(secondDate)) return false;

        const firstDateObj = createDateObj(firstDate);
        const secondDateObj = createDateObj(secondDate);

        return firstDateObj <= secondDateObj;
    }

    function addValidationEvent(inputElement: any, message: any, validationFunction: any) {
        inputElement.addEventListener("input", () =>
            validateInput(inputElement, message, validationFunction)
        );
    }

    addValidationEvent(linkTenderInput, "Заполните поле", () => linkTenderInput.value);
    addValidationEvent(
        innInput,
        "Заполните поле ИНН",
        () =>
            innInput.value &&
            innInput.value.toString().trim().length > 9 &&
            innInput.value.toString().trim().length < 13
    );
    addValidationEvent(
        customerInnInput,
        "Заполните поле ИНН",
        () =>
            customerInnInput.value &&
            customerInnInput.value.toString().trim().length > 9 &&
            customerInnInput.value.toString().trim().length < 13
    );
    addValidationEvent(
        phoneInput,
        "Введите номер",
        () => phoneInput.value && phoneInput.value !== "+"
    );
    addValidationEvent(
        phoneInput,
        "Номер должен содержать 11 цифр",
        () => phoneInput.value.length > 9 && phoneInput.value.length < 14
    );
    addValidationEvent(sumCInput, "Введите сумму", () => sumCInput.value);
    addValidationEvent(sumFirstInput, "Введите сумму", () => sumFirstInput.value);
    addValidationEvent(sumLastInput, "Введите сумму", () => sumLastInput.value);
    addValidationEvent(sumGInput, "Введите сумму", () => sumGInput.value);
    addValidationEvent(wholeYearInput, "Введите сумму", () => wholeYearInput.value);
    addValidationEvent(periodInput, "Введите период", () => periodInput.value);
    addValidationEvent(
        periodInput,
        "Некорректный период",
        () => periodInput.value && validatePeriod(periodInput.value)
    );
    addValidationEvent(lastNameInput, "Введите фамилию завителя", () => lastNameInput.value);
    addValidationEvent(firstNameInput, "Введите имя заявителя", () => firstNameInput.value);
    addValidationEvent(emailInput, "Введите email", () => emailInput.value);
    addValidationEvent(emailInput, "Некорректный формат электронной почты", () =>
        /.+@.+\.[A-Za-z]+$/.test(emailInput.value.toLowerCase())
    );

    async function handleSubmit(event: any) {
        event.preventDefault();
        errors = [];

        validateInput(linkTenderInput, "Заполните поле", () => linkTenderInput.value);
        validateInput(
            innInput,
            "Заполните поле ИНН",
            () =>
                innInput.value &&
                innInput.value.toString().trim().length > 9 &&
                innInput.value.toString().trim().length < 13
        );
        validateInput(
            customerInnInput,
            "Заполните поле ИНН",
            () =>
                customerInnInput.value &&
                customerInnInput.value.toString().trim().length > 9 &&
                customerInnInput.value.toString().trim().length < 13
        );
        validateInput(phoneInput, "Введите номер", () => phoneInput.value && phoneInput.value !== "+");
        validateInput(
            phoneInput,
            "Номер должен содержать 11 цифр",
            () => phoneInput.value.length > 9 && phoneInput.value.length < 14
        );
        validateInput(sumCInput, "Введите сумму", () => sumCInput.value);
        validateInput(sumFirstInput, "Введите сумму", () => sumFirstInput.value);
        validateInput(sumLastInput, "Введите сумму", () => sumLastInput.value);
        validateInput(sumGInput, "Введите сумму", () => sumGInput.value);
        validateInput(wholeYearInput, "Введите сумму", () => wholeYearInput.value);
        validateInput(periodInput, "Введите период", () => periodInput.value);
        validateInput(
            periodInput,
            "Некорректный период",
            () => periodInput.value && validatePeriod(periodInput.value)
        );
        validateInput(emailInput, "Введите email", () => emailInput.value);
        validateInput(emailInput, "Некорректный формат электронной почты", () =>
            /.+@.+\.[A-Za-z]+$/.test(emailInput.value.toLowerCase())
        );

        const agreements: Array<HTMLInputElement> = Array.from(icontainer.querySelectorAll(".w-checkbox"));

        if (agreements.length > 0) {
            agreements.forEach((el) => el.addEventListener("change", function () {
                const hasAgreedToAll = agreements.every((checkbox) => checkbox.checked);
                if (!hasAgreedToAll) {
                    errors.push(el, "Необходимо отметить согласие перед отправкой заявки");
                }
            }));
        }

        if (errors.length > 0) {
            errors.forEach(({input, message}) => {
                console.error(message);
                console.log("Обнаружены ошибки валидации: ", errors);
            });
            console.log("Есть ошибки валидации");
            return;
        }

        const values = await collectValues();

        const oldText = this.innerText;
        this.innerText = 'Отправка заявки...';
        setSubmitButtonDisabled(true);
        this.style.cursor = 'wait';
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

            this.innerHTML = oldText;
            setSubmitButtonDisabled(false);

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
        const partOfName = userNames.join(' ');
        const amount = formatNumberWithSpaces(values.application_info.amount);

        resetForm();
        this.innerHTML = oldText;
        setSubmitButtonDisabled(false);
        const banksList = banks
            .map((item: string) => `<li class="w-bank-item">${item}</li>`)
            .join("");
        icontainer.querySelector(".w-agreement-wrap").innerHTML =
            successMessage.replace("{partOfName}", `${partOfName}`)
                        .replace("{firstName}", `${values.applicant_info.first_name}`)
                        .replace("{lastName}", `${values.applicant_info.last_name}`)
                        .replace("{secondName}", `${values.applicant_info.second_name}`)
                        .replace("{amount}", `${amount}`)
                        .replace("{banks}", `${banksList}`)
                        .replace("{sextype}", `${sexType}`);
        wgrid.outerHTML = "";
        setSubmitButtonDisabled(true);
    }

    function getAllFiles() {
        const inputs = icontainer.querySelectorAll(".files1, .files2, .files3, .files4");
        const allFiles = [];

        inputs.forEach((input: any) => {
            if (input.files) {
                for (let i = 0; i < input.files.length; i++) {
                    allFiles.push(input.files[i]);
                }
            }
        });

        return allFiles;
    }

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function resetForm() {
        optionTypeInput.value = "";
        optionGInput.value = "";
        optionLowInput.value = "";
        buyNumberInput.value = "";
        sumCInput.value = "";
        sumGInput.value = "";
        periodInput.value = "";
        customerInnInput.value = "";
        innInput.value = inn;
        lastNameInput.value = "";
        firstNameInput.value = "";
        secondNameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        sumLastInput.value = "";
        wholeYearInput.value = "";
        sumFirstInput.value = "";
        securityInput.value = "undefined";
        optionGMethodInput.value = "";
        linkTenderInput.value = "";
        const fileInputs = icontainer.querySelectorAll(".files1, .files2, .files3, .files4");
        fileInputs.forEach((input: any) => {
            input.value = "";
        });
        const fileNamesElements = icontainer.querySelectorAll(
            "#fileNames, #fileNames2, #fileNames3, #fileNames4"
        );
        fileNamesElements.forEach((element: any) => {
            element.textContent = "";
        });
    }

    function getSecurityValue() {
        const securityInputs = document.querySelectorAll(".security");
        for (let i = 0; i < securityInputs.length; i++) {
            const input = securityInputs[i] as HTMLInputElement;
            if (input.checked) {
                return input.value;
            }
        }
        return "undefined";
    }

    async function collectValues() {
        const files = await Promise.all(getAllFiles().map(async (file) => {
            const base64 = await fileToBase64(file);
            return {
                name: file.name,
                data: base64
            };
        }));
        return {
            applicant_info: {
                inn: innInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                last_name: lastNameInput.value,
                first_name: firstNameInput.value,
                second_name: secondNameInput.value,
            },
            application_info: {
                optionType: optionTypeInput.value,
                optionGuarantee: optionGInput.value,
                optionLowInput: optionLowInput.value,
                buyNumber: buyNumberInput.value,
                contract_amount: parseInt(sumCInput.value),
                amount: parseInt(sumGInput.value),
                period: periodInput.value,
                customer_inn: customerInnInput.value,
                sumLLast: parseInt(sumLastInput.value),
                wholeYear: parseInt(wholeYearInput.value),
                sumFirst: parseInt(sumFirstInput.value),
                security: getSecurityValue(),
                optionGMethod: optionGMethodInput.value,
                linkTender: linkTenderInput.value,
                files: files,
            },
            service_code: "BG",
            partner_user_id: partnerUserId,
            partner_company_id: partnerCompanyId,
            agreements: {
                bki: false,
                personal: true,
                sharing: true,
            },
        };
    }

    function updateSubmitButtonStyle() {
        const isOptionTypeState = optionTypeInput.value === "state";
        const isOptionLowInputFilled = optionLowInput.value.trim() !== "";

        if (isOptionTypeState && !isOptionLowInputFilled) {
            setSubmitButtonDisabled(true);
        } else {
            setSubmitButtonDisabled(!areAllFieldsFilled());
        }
    }

    function setSubmitButtonDisabled(disabled) {
        const submitBtn = icontainer.querySelector(".download-send");
        submitBtn.style.backgroundColor = disabled ? "" : "#f2c94c";
        submitBtn.style.color = disabled ? "" : "black";
        submitBtn.disabled = disabled;
        submitBtn.style.cursor = disabled ? "" : "pointer";
    }

    function areAllFieldsFilled() {
        const isOptionTypeState = optionTypeInput.value === "state";

        const fields = [
            linkTenderInput,
            optionGMethodInput,
            sumCInput,
            sumGInput,
            periodInput,
            customerInnInput,
            innInput,
            lastNameInput,
            firstNameInput,
            emailInput,
            phoneInput,
            sumLastInput,
            wholeYearInput,
            sumFirstInput,
            isOptionTypeState ? optionLowInput : null,
        ].filter(Boolean);

        return fields.every((field) => field && field.value.trim() !== "");
    }

    [
        optionTypeInput,
        optionGInput,
        linkTenderInput,
        optionGMethodInput,
        sumCInput,
        sumGInput,
        periodInput,
        customerInnInput,
        innInput,
        lastNameInput,
        firstNameInput,
        secondNameInput,
        emailInput,
        phoneInput,
        sumLastInput,
        wholeYearInput,
        sumFirstInput,
        optionLowInput,
    ].forEach((item) => {
        if (item) {
            item.addEventListener("input", updateSubmitButtonStyle);
        }
    });

    document.addEventListener("DOMContentLoaded", (event) => {
        updateSubmitButtonStyle();
    });

    return pageTemplate;
}
