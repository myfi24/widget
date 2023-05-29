import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";

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

interface IWidgetParams {
  container?: string;
  inn?: string;
  partnerId?: string;
  fontFamily?: string;
  style?: string;
}

export default function createMYFIWidget(params: IWidgetParams) {
  const html = `
<div class="w-container">
  <div class="w-field-wrap w-term">
    <span class="w-field-name">Срок</span>
    <input type="text" class="w-input w-term" value="1 месяц" />
    <input type="range" min="1" max="36" value="1" class="w-slider w-term" id="myRange" />
    <div class="w-term w-slider-active-portion"></div>
  </div>
  <div class="w-field-wrap w-sum">
    <span class="w-field-name">Сумма, ₽</span>
    <input type="text" class="w-input w-sum" value="100000" />
    <input type="range" min="1" max="50" value="1" class="w-slider w-sum" id="myRange" />
    <div class="w-sum w-slider-active-portion"></div>
  </div>

  <div class="w-field-wrap">
    <span class="w-field-name">ФИО*</span>
    <input type="text" class="w-input w-name" />
  </div>
  <div class="w-field-wrap">
    <span class="w-field-name">ИНН*</span>
    <input type="text" class="w-input w-inn" />
  </div>

  <div class="w-field-wrap">
    <span class="w-field-name">Телефон*</span>
    <input type="text" class="w-input w-phone" />
  </div>
  <div class="w-field-wrap">
    <span class="w-field-name">Электронная почта*</span>
    <input type="text" class="w-input w-email" />
  </div>
  <button class="w-submit">Отправить</button>


<style>.w-container {
${params.style};
}

.w-container * {
  box-sizing: border-box;
  font-family: ${params.fontFamily} || Roboto;
}

.test {
font-size: 16px;
color: salmon;
}

.w-container {
width: 100%;
height: 100%;
display: grid;
gap: 10px;
// border: 1px solid white;
border-radius: 15px;
grid-template-columns: 1fr 1fr;
}

.w-field-wrap {
display: flex;
flex-direction: column;
background-color: rgb(220, 220, 220);
border: 1px solid rgb(220, 220, 220);
border-radius: 10px;
padding: 5px;
position: relative;
width: 100%;
transition: all 0.2s;
}

.w-field-wrap.w-focused {
border: 1px solid black;
background-color: #fff;
}

.w-field-name {
font-size: 12px;
}

.w-input {
border-width: 0;
height: 30px;
background-color: rgb(220, 220, 220);
border-radius: 5px;
transition: all 0.2s;
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
background: #000;
outline: none;
opacity: 0.8;
-webkit-transition: 0.2s;
transition: opacity 0.2s;

position: absolute;
bottom: -3px;
left: 5px;
width: calc(100% - 14px);
}

.w-slider-active-portion {
border-bottom: 1px #fff700 solid;
height: 1px;
background-color: #000;
position: absolute;
bottom: -1px;
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
width: 10px;
height: 10px;
border-radius: 50%;
background: #fff700;
cursor: pointer;
}

.w-slider::-moz-range-thumb {
width: 10px;
height: 10px;
background: #fff700;
cursor: pointer;
border-radius: 50%;
}

.w-submit {
width: 50%;
}

.iti__flag {
background-image: url("../node_modules/intl-tel-input/build/img/flags.png");
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
.iti__flag {
  background-image: url("../node_modules/intl-tel-input/build/img/flags@2x.png");
}
}
</style></div>
`;

  const wrapper = document.querySelector(params.container || ".w-wrap");
  console.log("wrapper", wrapper);
  if (!wrapper) return;
  wrapper.innerHTML = html;

  const wcontainer: HTMLElement = document.querySelector(".w-container")!;

  const phoneInput: HTMLInputElement = document.querySelector(".w-phone")!;

  // intlTelInput(phoneInput, {
  //   utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
  // });

  ["DOMContentLoaded", "resize", "load"].forEach((item) =>
    window.addEventListener(item, function () {
      const width = wcontainer.offsetWidth;
      if (width < 480) {
        wcontainer.style["grid-template-columns"] = "1fr";
      } else {
        wcontainer.style["grid-template-columns"] = "1fr 1fr";
      }
    })
  );

  phoneInput.addEventListener("input", () => {
    console.log(new AsYouType().input(phoneInput.value));
    phoneInput.value = new AsYouType().input(phoneInput.value);
    console.log("isValid", isValidPhoneNumber(phoneInput.value));
  });

  const digitsWithWhitespace = /^[0-9\b]|\t+$/;
  const digits = /^[0-9\b]+$/;
  // const phone = /^\+[1-9]\d{1,14}$/;
  const email = /.+@.+\.[A-Za-z]+$/;

  const multiplier = 1e6;

  const termSlider = document.querySelector(".w-slider.w-term");
  !!termSlider && termSlider.addEventListener("input", handleTermSliderChange);
  const termSliderActivePart: HTMLElement = document.querySelector(".w-term .w-slider-active-portion");

  const termInput: HTMLInputElement = document.querySelector(".w-input.w-term")!;
  //   !!termInput && termInput.addEventListener("input", handleTermInputChange);
  termInput.value = "1 месяц";

  const sumSlider: HTMLInputElement = document.querySelector(".w-slider.w-sum");
  !!sumSlider && sumSlider.addEventListener("input", handleSumSliderChange);
  const sumSliderActivePart: HTMLInputElement = document.querySelector(".w-sum .w-slider-active-portion");

  const nameInput: HTMLInputElement = document.querySelector(".w-name")!;
  const innInput: HTMLInputElement = document.querySelector(".w-inn")!;
  innInput.value = params.inn || "";

  const emailInput: HTMLInputElement = document.querySelector(".w-email")!;

  const sumInput: HTMLInputElement = document.querySelector(".w-input.w-sum")!;
  !!sumInput && sumInput.addEventListener("input", handleSumInputChange);

  [sumInput, nameInput, innInput, phoneInput, emailInput].forEach((item) => item.addEventListener("focus", handleFocusChange));
  [sumInput, nameInput, innInput, phoneInput, emailInput].forEach((item) => item.addEventListener("blur", handleFocusChange));
  // sumInput.value = "100 000";

  const submitBtn: HTMLInputElement = document.querySelector(".w-submit")!;
  submitBtn.addEventListener("click", handleSubmit);

  setInputFilter(
    sumInput,
    function (value) {
      return (digitsWithWhitespace.test(value) && parseInt(value) < 5000001) || !value.length; // Allow digits and '.' only, using a RegExp.
    },
    "Разрешены только числовые символы. Сумма не больше 5 000 000."
  );

  setInputFilter(
    innInput,
    function (value) {
      return (digits.test(value) && value.replaceAll(" ", "").length < 13) || !value.length; // Allow digits and '.' only, using a RegExp.
    },
    "Разрешены только числовые символы. Длина ИНН 10 или 12 цифр."
  );

  return "test";

  function handleTermSliderChange(e) {
    const value = e.target.value;
    const steps = parseInt(e.target.getAttribute("max")) - parseInt(e.target.getAttribute("min"));

    const valueStep = (e.target.getAttribute("max") - 1) / steps;
    const percentageStep = 100 / steps;

    const fraction = percentageStep * ((value - 1) * valueStep);

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
    sumInput.value = `${parseInt(value) * multiplier}`;
  }

  function handleSumInputChange(e: InputEvent) {
    if (!digits.test((e.target as HTMLInputElement).value)) {
      return;
    }
    const value = (e.target as HTMLInputElement).value;
    const steps = parseInt(sumSlider.getAttribute("max")) - parseInt(sumSlider.getAttribute("min"));
    const valueStep = (parseInt(sumSlider.getAttribute("max")) - 1) / steps;
    const percentageStep = 100 / steps;
    const fraction = (percentageStep * (parseInt(value) - 1) * valueStep) / multiplier;

    sumSliderActivePart.style.width = `calc(${fraction}% - ${fraction / 100} * 14px)`;

    const sliderValue = parseInt((e.target as HTMLInputElement).value) / multiplier + 1;

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
      const trimmedInn = innInput.value.toString().replaceAll(" ", "");
      if (!(trimmedInn.length === 10 || trimmedInn.length === 12)) {
        throw new Error("ИНН должен состоять из 10 или 12 цифр");
      }
      if (!phoneInput.value) {
        throw new Error("Заполните поле телефона");
      }
      // if (!iti.isValidNumber()) {
      //   throw new Error("Некорректный формат номера телефона");
      // }
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
        partnerId: params.partnerId,
        term: termInput.value,
        sum: sumInput.value.replaceAll(" ", ""),
        name: nameInput.value,
        inn: trimmedInn,
        // phone: iti.getNumber(intlTelInput.numberFormat.E164),
        email: emailInput.value,
      };
      alert(JSON.stringify(values));
    } catch (e) {
      alert(e.message);
    }
  }
}
