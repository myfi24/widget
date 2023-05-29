# Установка

npm i @aavoronov/myfiwidget

# Использование

## Со сборщиком

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
  partnerId: string;
  container?: string;
  inn?: string;
  fontFamily?: string;
  style?: string;
}
```

partnerId - ID партнера. Обязательный параметр.

Если container не передан, по умолчанию скрипт ищет элемент с классом .w-wrap.

inn - ИНН авторизованного пользователя.

fontFamily - шрифт, применяемый во всем блоке.

style - стили контейнера.
