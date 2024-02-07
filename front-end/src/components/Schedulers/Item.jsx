export default function itemTemplate(data) {
  if (data.scheduled === 'N')
    return `<div id="cmpt-sched-wo-bg-unscheduled">${data.text2}</div>`;
  else
    return `<div id="cmpt-sched-wo-bg-scheduled">${data.text2}</div>`;

}