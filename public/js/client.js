// 1) Инициализируем аддон и объявляем capability card_buttons
Addon.initialize({
  // Эта функция должна вернуть массив кнопок, которые увидите в карточке в "Действия дополнений"
  card_buttons: (buttonsContext) => {
    // Полезно один раз посмотреть, что Kaiten реально кладёт в контекст
    console.log("card_buttons context:", buttonsContext);

    return [
      {
        text: "Моё действие",
        // callback вызывается по клику по кнопке
        callback: async () => {
          // Здесь ваша логика (API-запросы, открытие UI аддона и т.д.)
          console.log("Clicked. Context:", buttonsContext);

          // Для теста — обычный alert
          alert("Кнопка работает ✅");
        },

        // Если нужно, чтобы кнопку видел “читатель” (read-only доступ)
        // В доках это поле упоминается явно
        isVisibleForReader: true,
      },
    ];
  },
});