const VKPointAPI = require('vkpoint-api') // Импортируем библиотеку.
const vkpoint = new VKPointAPI({ // Создаем новый экземпляр VKPoint
  token: 'my-secret-token', // Укажите токен VK Point (https://vkpoint.vposter.ru/api/method/token)
  userId: 1, // ID бота.
})

const { VK } = require('vk-io') // Импортируем библиотеку для работы с VK API
const vk = new VK()

vk.setOptions({
  token: 'user-or-group-secret-token',
}) // Устанавливаем токен для работы API

vk.updates.on(['new_message'], async (context, next) => { // Отлавливаем новые сообщения
  if (context.text === 'бонус') { //
    await vkpoint.api.sendPayment(context.senderId, 100000)

    return context.reply('Мы отправили Вам 100 VK Points!')
  }

  await next()
})

vk.updates.start().catch(console.error)
