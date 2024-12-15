function openDeleteContextMenu() {
  document.querySelectorAll("[data-date]").forEach((element) => {
    element.addEventListener("contextmenu", function (e) {
      if (e.target.closest("[data-event-id]")) {
        e.preventDefault();
        const contextmenu = document.getElementById("contextmenu");

        contextmenu.style.left = e.pageX + "px";
        contextmenu.style.top = e.pageY + "px";
        contextmenu.style.display = "block";
        contextmenu.dataset.deleteId =
          e.target.closest("[data-event-id]").dataset.eventId;
      }
    });
  });
}

function closeDeleteContextMenu() {
  document.body.addEventListener("click", function (e) {
    document.getElementById("contextmenu").style.display = "none";
  });
}

function deleteBtn() {
  document
    .getElementById("contextmenu")
    .addEventListener("click", function (e) {
      if (e.target.closest("[data-delete-id]")) {
        e.preventDefault();
        const id = e.target.closest("[data-delete-id]").dataset.deleteId;
        deleteEvent(id);
      }
    });
}

function deleteEvent(id) {
  fetch("/calendar/delete?id=" + id, {
    method: "DELETE",
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  location.reload();
}

export {
  openDeleteContextMenu,
  closeDeleteContextMenu,
  deleteBtn,
  deleteEvent,
};
