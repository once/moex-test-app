# MOEX Test App

## Постановка задачи
Необходимо сделать панель мониторинга, на которой будет выведен веб-ресурс
На веб-ресурс выведено 2 списка - компании и зависимый список контактов (предпочтительно React+MaterialUI).
1 список - имя компании и ее ИНН/КПП
При выборе компании во втором гриде показать список ее контактов:
Имя/Фамилия/Телефон/Емейл/Должность

Над гридом контактов кнопка плюс - при ее нажатии открывать стандартное окно создания контакта, с заполненым лукапом на компанию

Предусмотреть валидацию данных контактов: проверку корректности емейл и телефона +7 и 10 цифп, а так же уникальность внутри компании.
При разработке проверки учесть, что эти данные могут быть занесены  из разных мест, но контроль должен срабатывать всегда

## Описание решения
Реализация предполагает:
1. Создание в решении компонента Dashboard, размещение на него веб-ресурса.
Код веб-ресурса реализован как react-приложение (см. папку frontend). В index.html включена ссылка на системный скрипт /WebResources/ClientGlobalContext.js.aspx для получения возможности обращения к объектам Xrm и GlobalContext из модуля CrmService.


2. Создание плагинов для Create и Update на сущности Contact, реализующих необходимые валидации (см. папка backend)
Для проверки уникальность внутри компании принимаем условие, что дубликатами считаются контакты, у которых все перечисленные в задании поля совпадают (Имя, Фамилия, Телефон, Еmail, Должность, AccountId)

В рамках данного тестового задания реализована только логика в плагине Create



## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
