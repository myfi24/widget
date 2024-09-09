import {IWidgetParams} from "../myfiwidget";

const pj = require("../../package.json");


export function bankGuaranteePage(
    container: IWidgetParams["container"],
    inn: IWidgetParams["inn"],
    apiUrl: IWidgetParams["apiUrl"],
    partnerCompanyId: IWidgetParams["partnerCompanyId"],
    partnerUserId: IWidgetParams["partnerUserId"],
    successMessage: IWidgetParams["successMessage"]
) {
    const css = `
  .w-bank {
    font-family: "Roboto", sans-serif;
  }

  .header {
    width: 100%;
    text-align: center;
  }
  
  .w-bank-title {
      margin: 0 0 60px;
  }
  
  .w-bank-titleMini {
  margin-bottom: 30px;
  }
  
  .w-field-container {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .w-field-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    position: relative;
  }
  
  .w-input {
    border: none;
    display: grid;
    grid-column: 2 / 4;
    font-size: 16px;
    line-height: 16px;
    padding: 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);

  }
  
  .w-input::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
  
  .w-field-left {
    padding: 14px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 16px;
  }
  
  .option {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="640"><polygon points="0,0 1024,0 512,640" fill="grey"/></svg>');
    background-repeat: no-repeat;
    background-position: right 18px top 50%;
    background-size: 0.65em auto;
  }
  
  .option option {
    color: black;
  }
  
  .option::-moz-focus-inner {
    border: 0;
  }
  
  .option:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 black;
  }
  
  .w-field-download {
    width: 100%;
    height: auto;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  

  .download-text {
    color: blueviolet;
    font-size: 18px;
    margin: 0;
  }
  
  .download-files {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    margin: 0;
  }
  
  .download-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    gap: 20px;
  }
  .download-save {
    color: blueviolet;
    border: none;
    background-color: transparent;
    width: 30%;
    padding: 10px 0;
    border-radius: 10px;
    font-size: 18px;
  }
  
  .download-send {
    color: rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    border: none;
    width: 30%;
    padding: 10px 0;
    font-size: 18px;
  }

  .arrowheader,
 {
    display: flex;
    align-items: center;
    margin: 50px 0 30px;
  }

  .arrow,
  .arrow2,
  .arrow3 {
    display: inline-block;
    transform: rotate(90deg);
    transform-origin: center;
    font-size: 30px;
    margin-left: 20px;
    margin-top: 4px;
    cursor: pointer;
  }
  
  .arrow.up,
  .arrow2.up,
  .arrow3.up {
    transform: rotate(270deg);
    transform-origin: center;
  }
  
  @media (max-width: 768px) {

    .error-message {
      position: absolute;
      right: 20px;
      top: 75% !important;
      transform: translate(0,-50%);
      font-size: 12px;
    }

    .w-field-download {
      justify-content: center;
      
    }
    .w-field-wrap {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  
    .w-input {
      display: grid;
      grid-column: 1;
    }
  
    .download-buttons {
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      gap: 20px;
    }
  
    .download-save,
    .download-send {
      width: 60%;
    }
    .download-files {
      padding: 0 10px;
      text-align: center;

    }
  }  
  .security {
  margin: 0;
}

#uploadBtn,
#uploadBtn2,
#uploadBtn3,
#uploadBtn4 {
  color: blueviolet;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 34px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  cursor: pointer;
  background-color: transparent;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; 
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}

.error-message {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0,-50%)
}
  `;

    const html = `<div style="width: 100%; max-width: 1080px; margin: 0 auto">
  <div class="w-bank">
    <h1>Заявка на гарантию</h1>
  
    <p class="w-bank-title">
      Заполните поля. Мы подберём для вас лучшие предложения от партнёров.
    </p>
  
    <div class="w-field-container">
      <div class="w-field-wrap">
        <span class="w-field-left">Вид закупки</span>
  
        <select class="w-input option option-type">
          <option value="state" selected>Государственная</option>
          <option value="commercial">Коммерческая</option>
        </select>
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Вид гарантии</span>
  
        <select class="w-input option option-guarantee">
          <option value="execution" selected>На исполнение</option>
          <option value="participate">На участие в конкурсе/тендере</option>
          <option value="advance">Возврат аванса</option>
          <option value="warranty">Гарантийные обязательства</option>
        </select>
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Федеральный закон</span>
  
        <select class="w-input option option-low">
          <option value="223" selected>223 ФЗ</option>
          <option value="44">44 ФЗ</option>
          <option value="615">615 ПП</option>
          <option value="notState">Неизвестно</option>
        </select>
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Номер закупки</span>
  
        <input
          type="text"
          class="w-input w-term buy-number"
          placeholder="Введите номер, если он у вас есть"
        />
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Ссылка на страницу конкурса/тендера</span>
  
        <input
          type="text"
          class="w-input w-term link-tender"
          placeholder=""
        />
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Способ предоставления гарантии</span>
  
        <select class="w-input option option-guarantee-method">
          <option value="paper" selected>Бумажная</option>
          <option value="electronic">Электронная</option>
          <option value="undefined">Неизвестно</option>
        </select>
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">ИНН заказчика</span>
  
        <input
          type="number"
          class="w-input w-term customer-inn"
          placeholder="Введите ИНН заказчика"
        />
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Сумма контракта</span>
  
        <input
          type="text"
          class="w-input w-term sum-contract"
          placeholder="0 ₽"
        />
      </div>
      <div class="w-field-wrap">
        <span class="w-field-left">Сумма банковской гарантии</span>
  
        <input
          type="text"
          class="w-input w-term sum-guarantee"
          placeholder="0 ₽"
        />
      </div>
  
      <div class="w-field-wrap">
        <span class="w-field-left">Требуемый период выдачи</span>
  
        <input
          type="text"
          class="w-input w-term period"
          placeholder="__.__.____-__.__.____"
          id="dateMask"
          required
        />

      </div>
      <div class="w-field-wrap">
        <span class="w-field-left">Наличие обеспечения</span>
        <div
          style="display: flex; justify-content: flex-start; gap: 10px"
          class="w-input"
        >
          <div style="display: flex; align-items: center; gap: 5px">
            <input
              id="yes"
              type="radio"
              name="security"
              class="security"
              value="yes"
            />
            <label for="yes">Да</label>
          </div>
          <div style="display: flex; align-items: center; gap: 5px">
            <input
              id="no"
              type="radio"
              name="security"
              class="security"
              value="no"
            />
            <label for="no">Нет</label>
          </div>
        </div>
      </div>
    </div>


  <h2 class="arrowheader1">
    Информация о получателе <span class="arrow">&#8250;</span>
  </h2>
  
  <div class="w-field-container" id="recipientInfo">
    <div class="w-field-wrap">
      <span class="w-field-left">ИНН вашей компании/ИП</span>
  
      <input
        type="text"
        class="w-input w-term inn"
        value="${inn}"
        placeholder="ИНН вашей компании/ИП"
      />
    </div>
    
    <div class="w-field-wrap">
      <span class="w-field-left">Фамилия</span>
  
      <input
        type="text"
        class="w-input w-term last-name"
        placeholder="Иванов"
      />
    </div>
    
    <div class="w-field-wrap">
      <span class="w-field-left">Имя</span>
  
      <input
        type="text"
        class="w-input w-term first-name"
        placeholder="Иван"
      />
    </div>
    
    <div class="w-field-wrap">
      <span class="w-field-left">Отчество (если есть)</span>
  
      <input
        type="text"
        class="w-input w-term second-name"
        placeholder="Иванович"
      />
    </div>
    
    <div class="w-field-wrap">
      <span class="w-field-left">Электронная почта</span>
  
      <input
        type="text"
        class="w-input w-term email"
        placeholder="you@email.tld"
      />
    </div>
  
    <div class="w-field-wrap">
      <span class="w-field-left">Мобильный телефон</span>
  
      <input
        type="text"
        class="w-input w-term phone"
        placeholder="Телефон в формате: +79876543210"
      />
    </div>
  </div>
  
  <h2 class="arrowheader2">
    Сумма выручки <span class="arrow2">&#8250;</span>
  </h2>
  
  <p class="w-bank-titleMini">
    Заполните, если у вас есть данные. Если нет - заполнять не обязательно.
  </p>
  
  <div class="w-field-container" id="recipientInfo2">
    <div class="w-field-wrap">
      <span class="w-field-left"
        >Сумма выручки за предшествующий закончившийся период (3,6,9 мес,
        год) текущего года</span
      >
  
      <input type="text" class="w-input w-term sum-first" placeholder="0 ₽"/>
    </div>
  
    <div class="w-field-wrap">
      <span class="w-field-left"
        >Сумма выручки за аналогичный период (3,6,9 мес, год )
        предшествующего года</span
      >
  
      <input type="text" class="w-input w-term whole-year" placeholder="0 ₽"/>
    </div>
  
    <div class="w-field-wrap">
      <span class="w-field-left"
        >Сумма выручки за закончившийся календарный год
      </span>
  
      <input type="text" id="sum-last" class="w-input w-term sum-last" placeholder="0 ₽"/>
    </div>
  </div>
  
  <h2 class="arrowheader3">
    Документы <span class="arrow3">&#8250;</span>
  </h2>
  
  <div class="w-field-download" id="recipientInfo3" style="display: flex">
        <div
          style="
            width: 260px;
            height: 170px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 30px;
            gap: 10px;
          "
        >
          <input
            type="file"
            class="w-input w-term files1"
            multiple
            accept=".pdf,.zip"
            style="display: none"
          />
          <button id="uploadBtn">+</button>
          <p class="download-text">Загрузить файлы</p>
          <p class="download-files" style="text-align:center">Бухгалтерский баланс за полные 12 месяцев + текущий</p>
          <div id="fileNames" style="text-align:center; font-size:10px;"></div> 
          <p class="download-files" style="font-size:10px; color: rgba(0, 0, 0, 0.4);">PDF или ZIP не более 20 МБ</p>
        </div>

        <div
          style="
            width: 260px;
            height: 170px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 30px;
            gap: 10px;
          "
        >
          <input
            type="file"
            class="w-input w-term files2"
            multiple
            accept=".pdf,.zip"
            style="display: none"
          />
          <button id="uploadBtn2">+</button>
          <p class="download-text">Загрузить файлы</p>
          <p class="download-files" style="text-align:center">Скан паспорта ген. директора или индивидуального предпринимателя</p>
          <div id="fileNames2" style="text-align:center; font-size:10px;"></div> 
          <p class="download-files" style="font-size:10px; color: rgba(0, 0, 0, 0.4);">PDF или ZIP не более 20 МБ</p>
        </div>

        <div
          style="
            width: 260px;
            height: 170px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 30px;
            gap: 10px;
          "
        >
          <input
            type="file"
            class="w-input w-term files3"
            multiple
            accept=".pdf,.zip"
            style="display: none"
          />
          <button id="uploadBtn3">+</button>
          <p class="download-text">Загрузить файлы</p>
          <p class="download-files" style="text-align:center">Шаблон документа банковской гарантии </p>
          <div id="fileNames3" style="text-align:center; font-size:10px;"></div> 
          <p class="download-files" style="font-size:10px; color: rgba(0, 0, 0, 0.4);">PDF или ZIP не более 20 МБ</p>
        </div>

        <div
          style="
            width: 260px;
            height: 170px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 30px;
            gap: 10px;
          "
        >
          <input
            type="file"
            class="w-input w-term files4"
            multiple
            accept=".pdf,.zip"
            style="display: none"
          />
          <button id="uploadBtn4">+</button>
          <p class="download-text">Загрузить файлы</p>
          <p class="download-files" style="text-align:center">Иные документы по выбору заявителя, упакованные в Zip архив</p>
          <div id="fileNames4" style="text-align:center; font-size:10px;"></div> 
          <p class="download-files" style="font-size:10px; color: rgba(0, 0, 0, 0.4);">PDF или ZIP не более 20 МБ</p>
        </div>

       
      </div>

  <div class="download-buttons">
    <button class="download-save" type="button" style="cursor: pointer">
      Сохранить как черновик
    </button>
    <button class="download-send" type="button">
      Отправить
    </button>
  </div>

  </div>
  </div>
  <style>
  
    ${css}
    
    </style>
  </div>`;

    //Начало куки
    // function saveDataToCookies() {
    //   const inputs = document.querySelectorAll(".w-input") as NodeListOf<
    //     HTMLInputElement | HTMLSelectElement
    //   >;
    //   inputs.forEach((input) => {
    //     document.cookie = `${input.className}=${input.value}; path=/; max-age=86400`;
    //   });
    // }

    // function restoreDataFromCookies() {
    //   const inputs = document.querySelectorAll(".w-input") as NodeListOf<
    //     HTMLInputElement | HTMLSelectElement
    //   >;
    //   inputs.forEach((input) => {
    //     const cookieValue = getCookie(input.className);
    //     if (cookieValue) {
    //       input.value = cookieValue;
    //     }
    //   });
    // }

    // function getCookie(name) {
    //   let cookieArr = document.cookie.split(";");
    //   for (let i = 0; i < cookieArr.length; i++) {
    //     let cookiePair = cookieArr[i].split("=");
    //     if (name == cookiePair[0].trim()) {
    //       return decodeURIComponent(cookiePair[1]);
    //     }
    //   }
    //   return null;
    // }

    // function checkDataInCookies() {
    //   console.log("Checking cookies:", document.cookie);
    //   if (document.cookie) {
    //     console.log("Cookies found, showing prompt.");
    //     if (confirm("Восстановить данные из черновика?")) {
    //       restoreDataFromCookies();
    //     }
    //   } else {
    //     console.log("No cookies found.");
    //   }
    // }

    // document.addEventListener("DOMContentLoaded", () => {
    //   console.log("DOM fully loaded and parsed");
    //   checkDataInCookies();
    // });
    //конец куки

    container.innerHTML = html;
    const icontainer = container.querySelector(".w-bank");

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

    function toggleContent1() {
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
        const draftBtn = document.querySelector(".download-save");

        if (submitBtn) {
            submitBtn.addEventListener("click", handleSubmit);
        } else {
            console.error('Кнопка "Отправить" не найдена.');
        }

        if (draftBtn) {
            draftBtn.addEventListener("click", handleSaveDraft);
        } else {
            console.error('Кнопка "Сохранить как черновик" не найдена.');
        }
    });

    //Отправка формы
    const submitBtn = icontainer.querySelector(".download-send");
    submitBtn.addEventListener("click", handleSubmit);
    const draftBtn = icontainer.querySelector(".download-save");
    draftBtn.addEventListener("click", handleSaveDraft);

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


        if (res.ok) {
            resetForm();
            alert("Заявка отправлена!");

            this.innerHTML = oldText;
            setSubmitButtonDisabled(false);
        } else {
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

    function handleSaveDraft(event: any) {
        event.preventDefault();
        const values = collectValues();
        console.log("Сохранение черновика:", values);
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

    return html;
}
