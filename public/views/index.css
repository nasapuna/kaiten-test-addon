const iframe = Addon.iframe();

const submitButton = document.getElementById('submit');
const cancelButton = document.getElementById('cancel');
const testLogField = document.getElementById('logText');

iframe.render(() => {
  iframe.fitSize('#timerLogContent');
  iframe.getData('card', 'private', 'timerLog')
    .then((response) => {
      if (response) {
        testLogField.value = response;
      }
    });
});

cancelButton.addEventListener('click', () => {
  console.log('this is theme: ', iframe.getThemeType());
  iframe.closePopup();
});

submitButton.addEventListener('click', async () => {
  const logText = testLogField.value;

  if (!logText || !logText.length) {
    return;
  }

  const data = {
    timerLog: logText,
  };

  const currentUser = await iframe.getCurrentUser();

  await iframe.setData('card', 'private', data);
  await iframe.showSnackbar(`${currentUser.full_name || currentUser.username}, your log saved!`);
  await iframe.closePopup();
});
