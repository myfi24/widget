# Установка и использование

## Со сборщиком

```bash
npm i @myfi/widget
```

```js
import createMYFIWidget from @myfi/widget;
//
createMYFIWidget(params);
```

## CDN

```html
<body>
  <!--  -->
  <script src="https://unpkg.com/@myfi/widget/dist/_bundles/myfiwidget.js"></script>
  <script>
  	myfiwidget(params);
  </script>
</body>
```

## Интерфейс объекта параметров

```js
params: {
  partnerCompanyId: string;
  partnerUserId: string;
  container?: string;
  inn?: string;
  fontFamily?: string;
  style?: string;
  markerStyle?: string;
  apiUrl?: string;
  agreements?: {
    label: string;
    url: string;
  }[];
	successMessage?: string;
}
```

- `partnerCompanyId` - ID вашей компании в системе MYFI.
- `partnerUserId` - ID пользователя вашей компании в системе MYFI.
- `container` - селектор контейнера, в котором будет создана форма. Если параметр не передан, по умолчанию скрипт ищет элемент с классом .w-wrap *(не обязательный параметр)*.
- `inn` - ИНН авторизованного пользователя (заявителя) *(не обязательный параметр)*.
- `fontFamily` - шрифт, применяемый во всем блоке *(не обязательный параметр)*.
- `style` - стили контейнера *(не обязательный параметр)*.
- `markerStyle` - стили маркеров списка банков получателей заявки *(не обязательный параметр)*.
- `apiUrl` - базовый url API. По умолчанию https://api.mirmyfi.ru/v3
- `agreements` - массив объектов настраивающих чекбоксы соглашений на форме заявке *(не обязательный параметр)*.
  - `label` - подпись чекбокса.
  - `url` - ссылка на документ (если требуется ознакомить заявителя).
- `successMessage` - Сообщение об успешной отправке заявки в банки *(не обязательный параметр)*.

## Пример вызова

```js
myfiwidget({
  partnerUserId: "745357c3-9fa5-4b28-xxxx-xxxxxxxxxxxx",
  partnerCompanyId: "c6654a23-bdd4-4d3b-xxxx-xxxxxxxxxxxx",
  container: "#widget-container-id",
  inn: "0123456789",
  fontFamily: "Roboto",
  style: "padding: 10; margin: 10",
  markerStyle: "color: red; content: '+'; font-size: 1.2em;",
  apiUrl: "https://api.mirmyfi.ru/v3",
  successMessage: '<h2>Уважаем{sextype} {partOfName},</h2><p class="w-success-msg">Вы подали заявку на получение кредита в размере {amount} ₽ на срок {term}. Ваша заявка отправлена в:<br/> <ul>{banks}</ul> В ближайшее время с вами свяжутся менеджеры банков.</p>'
});
```

## Переменные шаблона

В финальном сообщение, которое показывается пользователю/заявителю после передачи заявки в банки, пишется сообщение, которое возможно настраивать как будет удобно именно вашей аудитории пользователей. В этом сообщении могут использоваться слудющие переменные:

- `{partOfName}` — ФИО пользователя собранное из формы заявки.
- `{firstName}` — Имя пользвоателя/заявителя из формы заявки.
- `{lastName}` — Фамилия пользователя/заявителя из формы заявки.
- `{secondName}` — Отчество пользователя/заявителя из формы заявки.
- `{amount}` — Сумма заявки (разделённая на тысячи).
- `{term}` — Срок заявки в месяцах (склоняемая).
- `{banks}` — Список банков получателей заявки.
- `{sextype}` — Окончание для слова "Уважаем**ый**/Уважаем**ая**" ставится в зависимости от ФИО пользвоателя/заявителя.
