const iframe = Addon.iframe();

const showDateEl = document.getElementById('show-date');
const showTestButtonEl = document.getElementById('show-test-button');
const submitButton = document.getElementById('submit');

iframe.render(() => {
  iframe.fitSize('#settingsContent');

  iframe.getSettings()
    .then(([response]) => {
      if (!response) {
        return;
      }

      showDateEl.checked = !!response.showDate;
      showTestButtonEl.checked = !!response.showTestButton;
    });
});

submitButton.addEventListener('click', () => {
  const showDate = showDateEl.checked;
  const showTestButton = showTestButtonEl.checked;

  iframe.setSettings({
    showDate,
    showTestButton,
  }).then(() => {
    iframe.closePopup();
    iframe.showSnackbar('Settings succesfully saved!', 'success');
  });
});


