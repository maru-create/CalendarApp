// year, monthを引数としてデータベースに登録されているイベントを取得し、displayEvents関数に引数eventsを渡す。
function fetchEvents(year, month) {
  fetch("/calendar/eventsDate?year=" + year + "&month=" + (month + 1))
    .then((response) => response.json())
    .then((events) => {
      displayEvents(events);
    })
    .catch((error) => console.error("Error:", error));
}

// eventsを引数として、カレンダー上の日付とイベントの日付が一致する場合、該当する日付にイベントのタイトルが表示される。
function displayEvents(events) {
  document.querySelectorAll("#calendar td:not(.disabled)").forEach((cell) => {
    const day = parseInt(cell.dataset.date);
    const eventsForDay = events.filter((event) => {
      //eventsForDayは配列型（id, title, date, description）
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });

    if (eventsForDay.length > 0) {
      eventsForDay.forEach((event) => {
        const eventIndicator = document.createElement("div");
        eventIndicator.dataset.eventId = event.id;
        eventIndicator.textContent = event.title; // カレンダー上にイベントのタイトルを表示
        eventIndicator.title = event.description; // ホバー時にイベントの詳細を表示
        cell.appendChild(eventIndicator);
      });
    }
  });
}

export { fetchEvents, displayEvents };
