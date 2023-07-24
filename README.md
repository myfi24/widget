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
