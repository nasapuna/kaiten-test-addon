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
  settings: (settingsContext) => {
    return settingsContext.openPopup({
      type: 'iframe',
      title: 'Timer settings',
      url: './settings.html',
      height: 200,
      width: 300
    });
  },
  'card_body_section': async (bodySectionContext) => {
    const timerLogs = await bodySectionContext.getData('card', 'private', 'timerLogs');

    if (!timerLogs || !timerLogs.length) {
      return [];
    }

    return [{
      title: '📝 Timer logs',
      content: {
        type: 'iframe',
        url: bodySectionContext.signUrl('./timeLogs.html', { randomNumber: Math.random() }),
        height: 200,
      }
    }]
  },
  'card_facade_badges': async (context) => {
    const timerStartTime = await context.getData('card', 'private', 'timerStartTime');

    if (!timerStartTime) {
      return {
        text: '🔴 timer is off',
        color: 'red',
      }
    }

    return {
      text: '🟢 timer is on',
      color: 'green',
      // icon: 'https://github.trello.services/images/icon.svg?color=42526e&quot',
    }
  },
  'card_buttons': async (cardButtonsContext) => {
    const settings = await cardButtonsContext.getSettings();
    const buttons = [];

    if (settings && settings[0]) {
      const currentSpaceSettings = settings[0];
      
      if (currentSpaceSettings.showTestButton) {
        buttons.push({
          text: 'Open full screen modal',
          callback: (buttnCtx) => {
            return buttnCtx.openDialog(
              {
                title: 'Fullscreen dialog example',
                url: './fullscreen-dialog.html',
                fullScreen: true,
                additionalActions: [{
                  iconUrl: 'https://github.trello.services/images/icon.svg?color=42526e&quot',
                  title: 'Simply opens url in new window',
                  url: 'https://github.com',
                }, {
                  iconUrl: 'https://on_purpose_wrong_url',
                  title: 'Open snackbar action with delay',
                  callback: async (ctx) => {
                    await new Promise((resolve) => {
                      setTimeout(() => resolve(), 700);
                    });
                    ctx.showSnackbar('Test icon clicked!');
                  }
                }, {
                  iconUrl: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png',
                  title: 'Open test popup',
                  callback: async (ctx) => {
                    return ctx.openPopup({
                      type: 'iframe',
                      title: 'Popup demostration',
                      url: './secondPopup.html',
                    }); 
                  }
                }],
              }
            )
          }
        })
        buttons.push({
          text: 'Open list popup',
          callback: async (callbackContext, callbackOptions) => {
            return callbackContext.openPopup({
              type: 'staticList',
              title: 'Test static list',
              items: [{
                text: 'Open test iframe popup',
                secondaryText: 'It simply demonstrates iframe popup in current popup',
                callback: (btnContext) => {
                  return btnContext.openPopup({
                    type: 'iframe',
                    title: 'Second popup demostration',
                    url: './secondPopup.html',
                  });
                }
              }, {
                text: 'Open submit popup',
                secondaryText: 'Submit popup example',
                callback: (btnContext) => {
                  return btnContext.openPopup({
                    type: 'confirm',
                    title: 'Confirm popup',
                    text: 'Are you sure? :)',
                    confirmLabel: 'Yes, do it',
                    confirmCallback: (popupContext) => {
                      console.log('confirm clicked!');
                      popupContext.closePopup();
                    },
                    cancelLabel: 'Cancel',
                    cancelCallback: (popupContext) => {
                      console.log('cancel clicked!');
                      popupContext.closePopup();
                    }
                  })
                }
              }, {
                text: 'Simple list with search',
                secondaryText: 'Demonstrates simple list with search',
                callback: (btnContext) => {
                  return btnContext.openPopup({
                    type: 'staticList',
                    title: 'Static list with search',
                    items: generateArrayWithObjects(30, ''),
                    search: {
                      enabled: true,
                    },
                  })
                }
              }, {
                text: 'Open dynamic search popup',
                secondaryText: 'Demonstrates dynamic search',
                callback: (btnContext) => {
                  return btnContext.openPopup({
                    type: 'dynamicList',
                    title: 'Dynamic list',
                    loadingLabel: 'Searching options...',
                    items: async (context, options) => {
                      await new Promise((resolve) => {
                        setTimeout(() => {
                          resolve()
                        }, 1000);
                      });
                      if (!options.data.searchValue.length) {
                        return [];
                      }

                      return generateArrayWithObjects(20, options.data.searchValue); 
                    },
                    search: {
                      emptyLabel: 'Type something to get options',
                      enabled: true,
                      debounce: 400,
                    }
                  });
                }
              },
              {
                text: 'Open simple dialog with primary action',
                secondaryText: 'Demonstrates simple dialog with bottom actions',
                callback: async (btnContext) => {
                  await btnContext.closePopup();
                  return btnContext.openDialog({
                    title: 'Simple dialog',
                    url: './simple-dialog.html',
                    primaryActionCallback: () => {
                      console.log('primary button clicked');
                      btnContext.closeDialog();
                    },
                    primaryActionLabel: 'Primary button',
                    onCloseCallback: () => {
                      console.log('dialog closed!');
                    },
                    width: 'xs',
                    height: 220
                  })
                }
              }
            ]
            })
          }
        })
      }
    }

    const timerStartTime = await cardButtonsContext.getData('card', 'private', 'timerStartTime');
    
    if (!timerStartTime) {
      buttons.push({
        text: '🟢 Start timer',
        callback: async (buttonContext) => {
          const now = Date.now();
          await buttonContext.setData('card', 'private', 'timerStartTime', now);
        }
      })
    } else {
      buttons.push({
        text: '📝 Add log to timer',
        callback: (buttonContext) => {
          return buttonContext.openPopup({
            type: 'iframe',
            title: 'Add text log to current timer',
            url: './timerLog.html',
            height: 200,
            width: 300,
          });
        }
      })
      buttons.push({
        text: '🔴 Stop timer',
        callback: async (buttonContext) => {
          const now = Date.now();
          const allData = await buttonContext.getAllData();
          
          const privateCardData = allData.card.private;
          const {
            timerStartTime: startTime,
            timerLog: currentLog,
            timerLogs: logs,
          } = privateCardData;

          const data = {
            startTime,
            endTime: now,
            log: currentLog || null,
          };

          const updatedData = {
            timerStartTime: null,
            timerLog: null,
            timerLogs: [data, ...(logs || [])],
          };

          await buttonContext.setData('card', 'private', updatedData);
        }
      })
    }
    return buttons;
  }
})
