# Установка

npm i @aavoronov/myfiwidget

# Использование

```
import {createMYFIWidget} from @aavoronov/myfiwidget;
//
createMYFIWidget(params);
```

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
