# Начало работы с VK Point

## Подключение библиотеки

В новом JavaScript файле произведите подключение установленной библиотки VK Point API.

```js
const VKPointAPI = require('vkpoint-api')
const vkpoint = new VKPoint(/* options = {} */)
```

|Опция |Тип   |Описание                                                                                  |
|-     |-     |-                                                                                         |
|token |String|[Ваш VK Point Token для взаимодействия с API](https://vkpoint.vposter.ru/api/method/token)|
|userId|Number|Цифровой идентификатор (ID) пользователя, который будет являться "ботом"                  |

## Использование Callback API

```js
async function run () {
  await vkpoint.updates.start(/* options = {}, */ (data) => {
    console.log(data)
  }).catch(console.error)

  vkpoint.updates.onTransfer((event) => {
    console.log(event)
  }).catch(console.error)
}

run().catch(console.error)

```

## Методы API

### Метод 'call'

`call` - вызов любого метода с любыми параметрами, может пригодиться для нововведений в API.

```js
async function run () {
  const result = await vkpoint.api.call('method.get', { method: 0, data: 'test' })

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип   |Необходимость |Описание                                                                                             |
|-     |-     |-             |-                                                                                                    |
|method|String|true          |Название метода, как оно указано в [документации к API](https://vk.com/@vposter-metody-api-vk-point).|
|params|Object|false         |Параметры, необходимые для метода. (по умолчанию {})                                                 |

### Метод 'sendPayment'

`sendPayment` - отправка VK Point пользователю.

```js
async function run () {
  const result = await vkpoint.api.sendPayment(1, 1) // Отправляем 1 VK Point пользователю с @id1 (Павел Дуров).

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип   |Необходимость |Описание                                               |
|-     |-     |-             |-                                                      |
|toId  |Number|true          |ID пользователя, которму необходимо отправить VK Coins.|
|amount|Number|true          |Количество VK Point, необходимое для отправки.         |

### Метод 'getUserData'

`getUserData` - получение данных о пользователе.

```js
async function run () {
  const result = await vkpoint.api.getUserData(1) // Получаем даныне из базы данных VK Point о пользователе с @id1 (Павел Дуров)

  console.log(result)
}

run().catch(console.error)
```

|Опция   |Тип   |Необходимость |Описание                                         |
|-       |-     |-             |-                                                |
|targetId|Number|true          |ID пользователя, о котором нужно получить данные.|

### Метод 'getUsersTop'

`getUsersTop` - получение данных о таблице рейтингов пользователей VK Point.

```js
async function run () {
  const result = await vkpoint.api.getUsersTop(5, true) // Получаем ТОП-5 ВИП пользователей

  console.log(result)
}

run().catch(console.error)
```

|Опция |Тип    |Необходимость |Описание                                                        |
|-     |-      |-             |-                                                               |
|count |Number |false         |Количество пользователей (по умолчанию 50)                      |
|vip   |Boolean|false         |Возвращает топ VIP пользователей, если true (по умолчанию false)|

### Метод 'generateLink'

`generateLink` - генерация ссылки на перевод.

```js
function run () {
  const result = vkpoint.api.generateLink(100, false) // Генерируем ссылку для перевода 100 VK Points без фиксации.

  console.log(result)
}

run()
```

|Опция   |Тип    |Необходимость |Описание                                                   |
|-       |-      |-             |-                                                          |
|amount  |Number |false         |Количество VK Point для перевода. (по умолчанию не указано)|
|fixation|Boolean|false         |Является ли фиксированной ссылка. (по умолчанию false)     |
