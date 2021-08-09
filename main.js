const items = document.querySelectorAll(".item");

document.body.addEventListener("click", (e) => {
  const targetClassList = e.target.classList;

  targetClassList.contains("context") && return0;

  if (targetClassList.contains("item")) {
    targetClassList.toggle("open");
    items.forEach((item) => {
      item !== e.target && item.classList.remove("open");
    });
    return;
  }

  items.forEach((item) => {
    item.classList.remove("open");
  });
});
