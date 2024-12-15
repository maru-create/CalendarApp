// クリックした日付を取得し、イベント入力フォームに日付を入力する。
function inputClickedDate(date) {
  document.querySelectorAll("#calendar td:not(.disabled)").forEach((cell) => {
    cell.addEventListener("click", function () {
      const clickedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        parseInt(this.dataset.date) + 1
      );
      document.getElementById("add-event-date").value = clickedDate
        .toISOString()
        .split("T")[0];
    });
  });
}

// イベント入力フォームから"submit"された時、入力したイベントを登録する。
function postBtn() {
  document
    .getElementById("add-event-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const eventData = {
        date: document.getElementById("add-event-date").value,
        title: document.getElementById("add-event-title").value,
        description: document.getElementById("add-event-description").value,
      };
      postEvent(eventData);
    });
}
// 指定のURLにJSON形式でイベントデータをPOST送信する。成功/エラー時にはメッセージが表示される。
function postEvent(eventData) {
  fetch("/calendar/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  location.reload();
}

export { inputClickedDate, postBtn, postEvent };
