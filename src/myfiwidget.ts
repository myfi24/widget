import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
// import "./index.css";

function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function setInputFilter(textbox: Element, inputFilter: (value: string) => boolean, errMsg: string) {
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
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

function setInputFilterWithWhitespaces(textbox: Element, inputFilter: (value: string) => boolean, errMsg: string) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
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
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}

interface IWidgetParams {
  container?: string;
  inn?: string;
  partnerCompanyId: string;
  partnerUserId: string;
  fontFamily?: string;
  style?: string;
  apiUrl?: string;
}

export default function createMYFIWidget(params?: IWidgetParams) {
  const container = params.container || ".w-wrap";
  const inn = params.inn || "";
  const partnerCompanyId = params.partnerCompanyId;
  const partnerUserId = params.partnerUserId;
  const fontFamily = params.fontFamily || "Roboto";
  const style = params.style || "";
  const apiUrl = params.apiUrl || "https://api.mirmyfi.ru/v3";

  const css = `
  :root {
    --bg-gray: #ecf1f7;
    --bg-active: #ffffff;
    --border: #000;
    --main-gray: #828282;
    --text: #333333;
    --error-bg: #ffd9d9;
    --error-main: #eb5757;
    --main-yellow: #f2c94c;
    --secondary-yellow: #caa536;
    --checkbox: #27ae60;
  }
  
  .w-container * {
    box-sizing: border-box;
  }
  
  .test {
    font-size: 16px;
    color: salmon;
  }
  
  .w-container {
    width: 100%;
    height: 100%;
  
    border-radius: 15px;
  }
  
  .w-grid {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
  
  .w-field-wrap {
    display: flex;
    flex-direction: column;
    height: 80px;
    background-color: var(--bg-gray);
    border-radius: 10px;
    padding: 12px 26px;
    position: relative;
    width: 100%;
    transition: all 0.2s;
  }
  
  .w-field-wrap.w-focused {
    /* border: 1px solid black; */
  }
  
  .w-field-name {
    font-size: 18px;
    color: var(--main-gray);
    transition: all 0.2s;
    position: relative;
    top: 15px;
    pointer-events: none;
    z-index: 10;
  }
  
  .w-field-name.w-active {
    font-size: 14px;
    transition: all 0.2s;
    top: 0;
  }
  
  .w-input {
    border-width: 0;
    /* height: 30px; */
    background-color: var(--bg-gray);
    border-radius: 5px;
    transition: all 0.2s;
    margin-top: 9px;
    font-size: 24px;
    position: absolute;
    height: 58px;
    width: calc(100% - 30px);
  }
  
  input:focus {
    outline: none;
    transition: all 0.2s;
  }
  
  .w-input.w-term {
    pointer-events: none;
  }
  
  .w-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1px;
    border-radius: 10px;
    background: var(--bg-gray);
    outline: none;
    opacity: 0.8;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  
    position: absolute;
    bottom: -1px;
    left: 5px;
    width: calc(100% - 14px);
  }
  
  .w-slider-active-portion {
    border-bottom: 2px var(--main-yellow) solid;
    height: 2px;
    /* background-color: #000; */
    position: absolute;
    bottom: 0px;
    left: 7px;
    z-index: 1111;
    width: 0;
    max-width: calc(100% - 14px);
  }
  
  .w-slider:hover {
    opacity: 1;
  }
  
  .w-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--main-yellow);
    border-color: var(--main-yellow);
    cursor: pointer;
  }
  
  .w-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--main-yellow);
    cursor: pointer;
    border-radius: 50%;
    border-color: var(--main-yellow);
  }
  
  .w-submit {
    background-color: var(--main-yellow);
    border-width: 0;
    height: 60px;
    width: 240px;
    border-radius: 10px;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.2s;
    margin: 0 auto;
    display: block;
  }
  
  .w-submit.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  .w-agreement-wrap {
    grid-column: span 2;
    // width: 80%;
    margin: 30px auto;
  }
  
  .w-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  
  .w-checkbox + label {
    user-select: none;
  }
  .w-checkbox + label::before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid var(--secondary-yellow);
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    cursor: pointer;
  }
  
  .w-checkbox:checked + label::before {
    border-color: var(--main-yellow);
    background-color: var(--main-yellow);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
  
  /* стили при наведении курсора на checkbox */
  .w-checkbox:not(:disabled):not(:checked) + label:hover::before {
    border-color: var(--secondary-yellow);
  }
  /* стили для активного состояния чекбокса (при нажатии на него) */
  .w-checkbox:not(:disabled):active + label::before {
    background-color: var(--secondary-yellow);
    border-color: var(--secondary-yellow);
  }
  /* стили для чекбокса, находящегося в фокусе */
  .w-checkbox:focus + label::before {
    box-shadow: 0 0 0 0.2rem #caa53630;
  }
  /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
  .w-checkbox:focus:not(:checked) + label::before {
    border-color: var(--secondary-yellow);
  }
  /* стили для чекбокса, находящегося в состоянии disabled */
  .w-checkbox:disabled + label::before {
    background-color: red;
  }
  
  .w-agreement {
    font-size: 16px;
    color: var(--main-gray);
    display: flex;
    align-items: baseline;
    padding: 3px 0;
  }
  
  .w-link {
    color: var(--main-gray);
    transition: all 0.2s;
  }
  
  .w-link:hover {
    color: var(--main-yellow);
    transition: all 0.2s;
  }
  
  .w-submit:hover {
    background-color: #fcc319;
    transition: all 0.2s;
  }
  
  ul .w-bank-item::marker {
    color: var(--main-yellow)
  }
  `;
  const html = `
<div class="w-container">
<div class="w-grid">
<div class="w-field-wrap w-term">
  <span class="w-field-name w-active">Срок</span>
  <input type="text" class="w-input w-term" value="3 месяца" />
  <input type="range" min="3" max="36" value="3" class="w-slider w-term" id="myRange" />
  <div class="w-term w-slider-active-portion"></div>
</div>
<div class="w-field-wrap w-sum">
  <span class="w-field-name w-active">Сумма, ₽</span>
  <input type="text" class="w-input w-sum" value="10 000" />
  <input type="range" min="1" max="50000" value="1" class="w-slider w-sum" id="myRange" />
  <div class="w-sum w-slider-active-portion"></div>
</div>

<div class="w-field-wrap">
  <span class="w-field-name">Фамилия*</span>
  <input type="text" class="w-input w-1stname" />
</div>
<div class="w-field-wrap">
  <span class="w-field-name">Имя*</span>
  <input type="text" class="w-input w-lastname" />
</div>
<div class="w-field-wrap">
  <span class="w-field-name">Отчество</span>
  <input type="text" class="w-input w-2ndname" />
</div>
<div class="w-field-wrap">
  <span class="w-field-name  ${!!inn ? "w-active" : ""}">ИНН*</span>
  <input type="text" class="w-input w-inn" />
</div>

<div class="w-field-wrap">
  <span class="w-field-name w-active">Телефон*</span>
  <input type="text" class="w-input w-phone" value="+" />
</div>
<div class="w-field-wrap">
  <span class="w-field-name">Электронная почта*</span>
  <input type="text" class="w-input w-email" />
</div>
</div>
<div class="w-agreement-wrap">
<input type="checkbox" class="w-checkbox" id="agree1" name="agree1" value="true" />
<label class="w-agreement" for="agree1"
  ><span
    >Я даю свое согласие на
    <a class="w-link" href="" target="_blank">запрос в БКИ</a>.</span
  ></label
>
<input type="checkbox" class="w-checkbox" id="agree2" name="agree2" value="true" />
<label class="w-agreement" for="agree2"
  ><span
    >Настоящим, в соответствии со ст. 9 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», Я выражаю свое согласие ООО «Майфи», ИНН 7702454664, на обработку и дальнейшую передачу в адрес кредитных организаций, указанных в электронной заявке персональных данных и направляемых мною в процессе рассмотрения электронной заявки документах подтверждаю, что даю такое согласие свободно, своей волей и в своем интересе. Согласие дается мной, для целей рассмотрения кредитной организацией вопросов о возможности предоставления мне кредитных продуктов.</label
>
<input type="checkbox" class="w-checkbox" id="agree3" name="agree3" value="true" />
<label class="w-agreement" for="agree3"
  ><span
    >Я даю свое согласие на
    <a class="w-link" href="" target="_blank">передачу сведений от Партнёра Банку</a>.</span
  ></label
>


</div>
<button class="w-submit disabled">Отправить</button>

<link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />

                
<style>.w-container {
${style};
}

.w-container * {
  box-sizing: border-box;
  font-family: ${fontFamily};
}

${css}

</style></div>
`;

  const wrapper = document.querySelector(container);
  // console.log("wrapper", wrapper);

  if (!wrapper) {
    console.log("Нет контейнера");
    return;
  }
  if (!partnerUserId || !partnerCompanyId) {
    console.log("Не переданы обязательные параметры");
    return;
  }
  wrapper.innerHTML = html;

  const wcontainer: HTMLElement = document.querySelector(".w-container")!;

  const wgrid: HTMLElement = wcontainer.querySelector(".w-grid");

  const phoneInput: HTMLInputElement = wcontainer.querySelector(".w-phone")!;

  // intlTelInput(phoneInput, {
  //   utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
  // });

  ["DOMContentLoaded", "resize", "load"].forEach((item) =>
    window.addEventListener(item, function () {
      const width = wcontainer.offsetWidth;
      if (width < 480) {
        wgrid.style["grid-template-columns"] = "1fr";
      } else {
        wgrid.style["grid-template-columns"] = "1fr 1fr";
      }
    })
  );

  phoneInput.addEventListener("input", function () {
    const value = this.value.replaceAll(" ", "");
    if (value.length < 15) {
      this.value = new AsYouType().input(this.value);
    } else this.value = value.substring(0, value.length - 1);

    if (!this.value) {
      this.value = "+";
    }
  });

  const digitsWithWhitespace = /^[0-9\b]|\t+$/;
  const digits = /^[0-9\b]+$/;
  // const phone = /^\+[1-9]\d{1,14}$/;
  const email = /.+@.+\.[A-Za-z]+$/;

  const multiplier = 1e3;

  const termSlider = wcontainer.querySelector(".w-slider.w-term");
  !!termSlider && termSlider.addEventListener("input", handleTermSliderChange);
  const termSliderActivePart: HTMLElement = wcontainer.querySelector(".w-term .w-slider-active-portion");

  const termInput: HTMLInputElement = wcontainer.querySelector(".w-input.w-term")!;
  //   !!termInput && termInput.addEventListener("input", handleTermInputChange);
  termInput.value = "3 месяца";

  const sumSlider: HTMLInputElement = wcontainer.querySelector(".w-slider.w-sum");
  !!sumSlider && sumSlider.addEventListener("input", handleSumSliderChange);
  const sumSliderActivePart: HTMLInputElement = wcontainer.querySelector(".w-sum .w-slider-active-portion");

  const firstnameInput: HTMLInputElement = wcontainer.querySelector(".w-1stname")!;
  const secondnameInput: HTMLInputElement = wcontainer.querySelector(".w-2ndname")!;
  const lastnameInput: HTMLInputElement = wcontainer.querySelector(".w-lastname")!;
  const innInput: HTMLInputElement = wcontainer.querySelector(".w-inn")!;
  innInput.value = inn;

  const emailInput: HTMLInputElement = wcontainer.querySelector(".w-email")!;

  const sumInput: HTMLInputElement = wcontainer.querySelector(".w-input.w-sum")!;
  !!sumInput && sumInput.addEventListener("input", handleSumInputChange);

  [sumInput, firstnameInput, secondnameInput, lastnameInput, innInput, phoneInput, emailInput].forEach((item) =>
    item.addEventListener("focus", handleFocusChange)
  );
  [sumInput, firstnameInput, secondnameInput, lastnameInput, innInput, phoneInput, emailInput].forEach((item) =>
    item.addEventListener("blur", handleFocusChange)
  );
  // sumInput.value = "100 000";

  const submitBtn: HTMLInputElement = wcontainer.querySelector(".w-submit")!;

  const agreements: Array<HTMLInputElement> = Array.from(wcontainer.querySelectorAll(".w-checkbox"));
  agreements.forEach((el) =>
    el.addEventListener("change", function () {
      const hasAgreedToAll = agreements[0].checked && agreements[1].checked && agreements[2].checked;
      if (!hasAgreedToAll) {
        submitBtn.classList.add("disabled");
      } else {
        submitBtn.classList.remove("disabled");
      }
    })
  );

  submitBtn.addEventListener("click", handleSubmit);

  setInputFilterWithWhitespaces(
    sumInput,
    function (value) {
      return (digits.test(value.replaceAll(" ", "")) && parseInt(value.replaceAll(" ", "")) < 1e13) || !value.length; // Allow digits and '.' only, using a RegExp.
      //&& parseInt(value) < 50000001
    },
    "Разрешены только числовые символы."
  );

  setInputFilter(
    innInput,
    function (value) {
      return (digits.test(value) && value.replaceAll(" ", "").length < 13) || !value.length; // Allow digits and '.' only, using a RegExp.
    },
    "Разрешены только числовые символы. Длина ИНН 10 или 12 цифр."
  );

  // return "test";

  function handleTermSliderChange(e) {
    const value = e.target.value;
    const min = parseInt(e.target.getAttribute("min"));
    const max = parseInt(e.target.getAttribute("max"));

    const steps = max - min;

    const valueStep = 1;
    const percentageStep = 100 / steps;

    const fraction = percentageStep * ((value - min) * valueStep);

    let suffix = "";
    if (value % 10 > 1 && value % 10 < 5) suffix = "а";
    if (value % 10 >= 5 || value % 10 === 0 || (value > 10 && value < 15)) suffix = "ев";
    termInput.value = value + " месяц" + suffix;
    termSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;
  }

  function handleSumSliderChange(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    const steps =
      parseInt((e.target as HTMLInputElement).getAttribute("max")) - parseInt((e.target as HTMLInputElement).getAttribute("min"));

    const valueStep = (parseInt((e.target as HTMLInputElement).getAttribute("max")) - 1) / steps;

    const percentageStep = 100 / steps;

    const fraction = percentageStep * ((parseInt(value) - 1) * valueStep);
    // console.log("fraction", fraction);

    sumSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;
    sumInput.value = `${numberWithSpaces(parseInt(value) * multiplier)}`;
  }

  function handleSumInputChange(e: InputEvent) {
    // if (!digits.test((e.target as HTMLInputElement).value)) {
    //   return;
    // }
    const value = (e.target as HTMLInputElement).value.replaceAll(" ", "");

    const steps = parseInt(sumSlider.getAttribute("max")) - parseInt(sumSlider.getAttribute("min"));
    // console.log("value", value);
    const valueStep = (parseInt(sumSlider.getAttribute("max")) - 1) / steps;
    const percentageStep = 100 / steps;
    const fraction = (percentageStep * (parseInt(value) - 1) * valueStep) / multiplier;

    sumSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;

    const sliderValue = parseInt(value) / multiplier + 1;

    sumSlider.value = `${sliderValue}`;
  }

  function handleFocusChange(e) {
    // const fraction = e.target.value * multiplier;
    // sumInput.value = sumToLocale(fraction) + " ₽";
    let isFocused = document.activeElement === e.target;

    let parent = e.target.parentElement;

    if (![...parent.classList].includes("w-field-wrap")) parent = parent.parentElement.parentElement;

    if (isFocused) {
      parent.classList.add("w-focused");
      parent.querySelector(".w-field-name").classList.add("w-active");
    } else {
      parent.classList.remove("w-focused");
      if (!parent.querySelector(".w-input").value) {
        parent.querySelector(".w-field-name").classList.remove("w-active");
      }
      // sumInput.value = sumToLocale(e.target.value);
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
          bki: !!agreements[0].checked,
          personal: !!agreements[1].checked,
          sharing: !!agreements[2].checked,
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

      const res = await fetch(`${apiUrl}/widget/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status !== 200) {
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
      const banks = data.map((item) => item.to_company.name_clear);

      resetForm();
      const banksUl = banks.map((item: string) => `<li class="w-bank-item">${item}</li>`);
      wrapper.querySelector(
        ".w-agreement-wrap"
      ).innerHTML = `<p>Ваша заявка отправлена в: <ul>${banksUl}</ul> В ближайшее время с вами свяжутся менеджеры банков.</p>`;
      wrapper.querySelector(".w-submit").outerHTML = "";
    } catch (e) {
      console.log(e);
      alert(e.response?.data?.message ?? e.message);
    }
  }
}
