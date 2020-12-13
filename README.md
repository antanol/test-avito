# Тестовое задание для стажёра в команду VAS

### Соискатель:
Антонова Анна.

### Поставленная задача:
```
Написать приложение-редактор, для создания баннеров. За основу нужно взять баннер из stories на главной Авито. Баннер создаётся из формы, которую можно заполнить на странице и сериализовать в json. Получившийся баннер можно экспортировать картинкой, а также как разметку.

### Приложение состоит из:
* Превью баннера
* Формы ввода параметров баннера
* 3 кнопок экспорта:
    * сохранить картинку в `png`
    * скопировать баннер в буфер обмена, как `html`
    * скопировать конфигурацию баннера в буфер обмена, как `json` строку

### Критерии приёмки
Зайдя в папку banner-maker, можно запустить генератор локально (`npm start`), оно откроется на 
После запуска приложение должно быть доступно по адресу `localhost:3999`.
```

### Дизайн и технологии
Использовала:
   vanilla.js,
   node, чтобы поднять сервер,
   canvas, чтобы отрисовывать баннер.

Так же использовала webpack, чтобы сгенерировать единый js, а сам код разбила на отдельные модули.
Это мой первый опыт использования вебпэка, так что я была бы рада любому фидбеку о том, как правильно было бы его структурировать и т.д.

