# Установка

npm i @aavoronov/myfiwidget

# Использование

## Со сборщиком

```
import {createMYFIWidget} from @aavoronov/myfiwidget;
//
createMYFIWidget(params);
```

## CDN

```
<body>
    <!--  -->
    <script src="https://unpkg.com/@aavoronov/myfiwidget@0.0.5/dist/_bundles/myfiwidget.js"></script>
    <script>
      myfiwidget(params);
    </script>
  </body>
```

## Интерфейс объекта параметров

```
params: {
  container?: string;
  inn?: string;
  partnerId?: string;
  fontFamily?: string;
  style?: string;
}
```

Если container не передан, по умолчанию скрипт ищет элемент с классом .w-wrap.

inn - ИНН авторизованного пользователя.

partnerId - ID партнера.

fontFamily - шрифт, применяемый во всем блоке.

style - стили контейнера.
