export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Avimanj Assistant is running!");
    }

    const update = await request.json();


    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;


      if (text === "/start") {

        await sendMenu(
          env.BOT_TOKEN,
          chatId
        );

      }
    }


    if (update.callback_query) {

      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;


      await sendMessage(
        env.BOT_TOKEN,
        chatId,
       ` شما انتخاب کردید:\n${data}`
      );

    }


    return new Response("OK");
  },
};



async function sendMenu(token, chatId) {

  const url = `https://api.telegram.org/bot${token}/sendMessage`;


  await fetch(url, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },


    body: JSON.stringify({

      chat_id: chatId,

      text:
`🌱 به Avimanj Assistant خوش آمدید

دستیار هوشمند آویمانج برای انتخاب و سفارش توری بسته‌بندی

لطفاً یک گزینه را انتخاب کنید:`,

      reply_markup: {

        inline_keyboard: [

          [
            {
              text: "📦 محصولات آویمانج",
              callback_data: "محصولات"
            }
          ],

          [
            {
              text: "🎯 انتخاب توری مناسب",
              callback_data: "انتخاب توری"
            }
          ],

          [
            {
              text: "💰 استعلام قیمت",
              callback_data: "استعلام قیمت"
            }
          ],

          [
            {
              text: "🛒 ثبت سفارش",
              callback_data: "ثبت سفارش"
            }
          ],

          [
            {
              text: "☎️ ارتباط با کارشناس",
              callback_data: "ارتباط با کارشناس"
            }
          ],

          [
            {
              text: "🌐 سایت آویمانج",
              url: "https://avimanj.ir"
            }
          ]

        ]

      }

    })

  });

}



async function sendMessage(token, chatId, text) {

  const url = `https://api.telegram.org/bot${token}/sendMessage`;


  await fetch(url, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },


    body: JSON.stringify({

      chat_id: chatId,

      text: text,

    }),

  });

}