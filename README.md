# Установка и использование

## Со сборщиком

```
npm i @aavoronov/myfiwidget
```

```
import createMYFIWidget from @aavoronov/myfiwidget;
//
createMYFIWidget(params);
```

## CDN

```
<body>
    <!--  -->
    <script src="https://unpkg.com/@aavoronov/myfiwidget/dist/_bundles/myfiwidget.js"></script>
    <script>
      myfiwidget(params);
    </script>
</body>
```

## Интерфейс объекта параметров

```
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
