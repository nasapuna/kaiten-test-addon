(() => {
  if (typeof Addon === 'undefined') {
    // Если это сработало — SDK не загрузился, либо страница открыта не в контексте Kaiten.
    console.error('[addon] Kaiten Web SDK is not loaded: Addon is undefined');
    return;
  }

  console.log('[addon] initializing…');

  Addon.initialize({
    card_buttons: (buttonsContext) => {
      console.log('[addon] card_buttons called', buttonsContext);

      return [
        {
          text: 'Моё действие',
          show_if_no_edit_access: true,
          on_click: async (clickContext) => {
            console.log('[addon] card_buttons click', { buttonsContext, clickContext });
          },
        },
      ];
    },
  });
})();
