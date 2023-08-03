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
}
```

partnerCompanyId - обязательный параметр.

partnerUserId - обязательный параметр.

container - селектор контейнера, в котором будет создана форма. Если параметр не передан, по умолчанию скрипт ищет элемент с классом .w-wrap.

inn - ИНН авторизованного пользователя.

fontFamily - шрифт, применяемый во всем блоке.

style - стили контейнера.

markerStyle - стили маркеров элементов маркированного списка.

apiUrl - базовый url API. По умолчанию https://api.mirmyfi.ru/v3

## Пример вызова

```
 myfiwidget({
        partnerUserId: "745357c3-9fa5-4b28-xxxx-xxxxxxxxxxxx",
        partnerCompanyId: "c6654a23-bdd4-4d3b-xxxx-xxxxxxxxxxxx",
        container: "#widget-container-id",
        inn: "0123456789",
        fontFamily: "Roboto",
        style: "padding: 10; margin: 10",
        markerStyle: "color: red; content: '+'; font-size: 1.2em;",
        apiUrl: "https://api.mirmyfi.ru/v3"
      });
```
