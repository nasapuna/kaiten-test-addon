const iframe = Addon.iframe();

const fetchingWrapper = document.getElementById('fetchingWrapper');
const mainWrapper = document.getElementById('timeLogsContent');

let oldUl = null;

function formatDuration(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  const hoursDisplay = hours < 10 ? '0' + hours : hours;
  const minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
  const secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

  return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}

iframe.render(() => {
  iframe.getData('card', 'private', 'timerLogs')
    .then(async (response) => {
      fetchingWrapper.style.display = 'none';

      // mainWrapper.innerHTML = '';

      const addonSettings = await iframe.getSettings();

      let shouldShowDate = false;

      if (addonSettings && addonSettings[0]) {
        const currentSettings = addonSettings[0];
        shouldShowDate = !!currentSettings.showDate;
      }

      if (!response || !response.length) {
        const noLogsDiv = document.createElement('div');
        noLogsDiv.textContent = 'No logs present for current card';
        mainWrapper.appendChild(noLogsDiv);
        return;
      }

      const ul = document.createElement('ul');

      response.forEach((log) => {
        const li = document.createElement('li');
        const workMs = log.endTime - log.startTime;
        const formattedDuration = formatDuration(workMs);
        const date = new Date(log.startTime);
        let text;

        if (shouldShowDate) {
          text = log.log ? `${date} ${formattedDuration}: ${log.log}` : `${date} ${formattedDuration}`;
        } else {
          text = log.log ? `${formattedDuration}: ${log.log}` : formattedDuration;
        }

        li.textContent = text;
        ul.appendChild(li);
      });

      if (!oldUl) {
        mainWrapper.appendChild(ul);
      } else {
        mainWrapper.replaceChild(ul, oldUl);
      }

      oldUl = ul;

      iframe.fitSize(mainWrapper);
    });
});
