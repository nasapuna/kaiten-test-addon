const iframe = Addon.iframe();

const secondPopupContentContainer = document.getElementById('secondPopupContent');
const closeBtn = document.getElementById('close');

closeBtn.addEventListener('click', () => {
  iframe.closePopup();
});

iframe.render(() => {
  iframe.fitSize(secondPopupContentContainer);
})
