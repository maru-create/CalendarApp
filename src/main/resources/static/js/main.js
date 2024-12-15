import { inputClickedDate, postBtn, postEvent } from "./RegisterEvents.js";
import { fetchEvents, displayEvents } from "./ViewEvents.js";
import {
  openDeleteContextMenu,
  closeDeleteContextMenu,
  deleteBtn,
  deleteEvent,
} from "./DeleteEvents.js";

const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();

// id=headerであるh1タグに「xxxx年xx月」を表示させる。
function showCalendarTable(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  document.querySelector("#header").innerHTML =
    year + "年 " + (month + 1) + "月"; // monthは0基点（0〜11）
  document.querySelector("#calendar").innerHTML = createCalendarTable(
    year,
    month
  );
  inputClickedDate(date);
  fetchEvents(year, month);
  openDeleteContextMenu();
  closeDeleteContextMenu();
}

// 今月の1日の日付データを定義
let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);

// ページの読み込みイベント(window.onload)が完了したらfirstView関数を実行して、今月のカレンダーを表示する。
window.onload = function firstView() {
  showCalendarTable(today);
  postBtn();
  deleteBtn();
};
// ボタンをクリックするとHTMLのonclick="prev()"が起動し、前の月を表示する。
window.prev = function prev() {
  firstDate.setMonth(firstDate.getMonth() - 1);
  showCalendarTable(firstDate);
};

// ボタンをクリックするとHTMLのonclick="next()"が起動し、次の月を表示する。
window.next = function next() {
  firstDate.setMonth(firstDate.getMonth() + 1);
  showCalendarTable(firstDate);
};

// カレンダー作成
function createCalendarTable(year, month) {
  let calendarTable = "<table><tr class='dayOfWeek'>";
  // 日〜土までの曜日をthとして表作成
  for (let i = 0; i < week.length; i++) {
    calendarTable += "<th>" + week[i] + "</th>";
  }
  calendarTable += "</tr>";

  let count = 1;
  let startDayOfWeek = new Date(year, month, 1).getDay(); // 今月1日の曜日
  let endDate = new Date(year, month + 1, 0).getDate(); // 今月の最後の日付
  let lastMonthEndDate = new Date(year, month, 0).getDate(); // 先月の最後の日付
  let row = Math.ceil((startDayOfWeek + endDate) / week.length); // カレンダーの表示に必要な行数(Math.ceilは小数切り上げ)

  // 1行ずつ設定
  for (let i = 0; i < row; i++) {
    calendarTable += "<tr>";
    // 1colum単位で設定
    for (let j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 【1行目】表示月の1日が表示されるまでの空欄となる曜日には先月の日付を入力する。
        calendarTable +=
          "<td class='disabled'>" +
          (lastMonthEndDate - startDayOfWeek + j + 1) +
          "</td>";
      } else if (count > endDate) {
        // 【最終行】表示月の最終日以降は翌月の日付を入力する。
        calendarTable += "<td class='disabled'>" + (count - endDate) + "</td>";
        count++;
      } else {
        // 表示月の日付を曜日に照らし合わせて入力する。
        calendarTable += "<td data-date='" + count + "'>" + count + "</td>";
        count++;
      }
    }
    calendarTable += "</tr>";
  }
  calendarTable += "</table>";
  return calendarTable; // 出来上がったcalendarTableを戻り値として返す。
}
