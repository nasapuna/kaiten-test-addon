function generateArrayWithObjects(length, search = '') {
  const array = [];

  for (let i = 0; i < length; i++) {
    const text = `Item ${i}`;
    array.push({
      text,
      secondaryText: search.length ? `search: ${search}` : undefined,
      callback: function () {
        console.log(`${text} clicked!`);
      }
    });
  }

  return array;
}

Addon.initialize({
  /**
   * card_buttons — кнопки/действия аддона, которые видны в карточке в секции Addon Actions
   * Возвращаем массив: [{ text, callback }, ...]
   */
  card_buttons: (ctx) => {
    // ctx = контекст + доступ к SDK (по доке). Можно логировать и посмотреть, что внутри.
    console.log("card_buttons ctx:", ctx);

    return [
      {
        text: "Ping",
        callback: () => {
          alert("Ping from addon button");
        },
      },
      {
        text: "Call backend (/api/ping)",
        callback: async () => {
          try {
            const r = await fetch("/api/ping", { method: "POST" });
            const data = await r.json().catch(() => ({}));
            alert(`Backend ok: ${r.status} ${JSON.stringify(data)}`);
          } catch (e) {
            console.error(e);
            alert("Backend error (see console)");
          }
        },
      },
    ];
  },
});
