const $title = document.querySelector("#title");
const $titleInput = document.querySelector("#titleInput");
const $titleText = document.querySelector("#titleText");
const $subTitle = document.querySelector("#subTitle");
const $subTitleInput = document.querySelector("#subTitleInput");
const $subTitleText = document.querySelector("#subTitleText");
const $content = document.querySelector("#content");
const $contentInput = document.querySelector("#contentInput");
const $contentText = document.querySelector("#contentText");
const $list = document.querySelector("#list");
const $input = document.querySelector("#input");
const $dataSave = document.querySelector("#dataSave");
const $dataLoad = document.querySelector("#dataLoad");
const $reset = document.querySelector("#reset");
const $alert = document.querySelector("#alert");
const $text = document.querySelector("#text");
const $accept = document.querySelector("#accept");
const $cancel = document.querySelector("#cancel");
const $korean = document.querySelector("#korean");
const $$input = document.querySelectorAll("input[type='text']");
// const $keydown = document.querySelector("#keydown");
// const $idx = document.querySelector("#idx");
let playList = [];
let alertType = "";

const inputWidth = e => {
  $input.style.width = `${$content.offsetWidth + 100}px`;
}

const alert = text => {
  $text.innerText = text;
  alertType = text;
  $alert.classList.remove("none");
}

const changeKorean = e => {
  // $idx.innerText = e.target.selectionEnd;
  if(korean) {
    e.target.value = enToKo(e);
  }
}

const inputText = e => {
  const target = e.target;

  switch(target.id) {
    case "titleInput" :
      $title.innerText = target.value;
      localStorage.setItem("playList-title", target.value);
    break;
    case "subTitleInput" :
      $subTitle.innerText = target.value;
      localStorage.setItem("playList-subTitle", target.value);
    break;
    case "contentInput" :
      $content.innerText = target.value;
      localStorage.setItem("playList-content", target.value);
    break;
  }
}

const deleteItem = el => {
  const items = $list.querySelectorAll(".item");
  let idx = -1;

  for(let i = 0; i < items.length; i++) {
    const item = items[i];

    if(item === el) {
      idx = i;
    }
  }

  console.log(el, idx);

  playList.splice(idx, 1);
  el.remove();
}

const appendItem = text => {
  const item = document.createElement("div");
  const deleteBtn = document.createElement("div");
  const textArea = document.createElement("div");

  item.classList.add("item");
  deleteBtn.classList.add("delete");
  textArea.classList.add("text");

  textArea.innerText = text;

  deleteBtn.addEventListener("click", e => deleteItem(item));

  item.append(deleteBtn);
  item.append(textArea);

  $list.append(item);
}

const insert = e => {
  const target = e.target;
  const key = e.key.toLowerCase();

  if(key === "enter" && target.value !== "") {
    playList.push(target.value);

    appendItem(target.value);

    target.value = "";
    $content.innerText = "";

    $list.scrollTop = $list.scrollHeight;
  }
}

const reset = e => {
  playList.length = 0;
  
  const items = $list.querySelectorAll(".item");
  items.forEach(el => el.remove());
}

const dataSave = e => {
  localStorage.setItem("playList-data", JSON.stringify(playList));
}

const dataLoad = e => {
  playList = localStorage.getItem("playList-data") === null ? playList : JSON.parse(localStorage.getItem("playList-data"));

  const items = $list.querySelectorAll(".item");
  items.forEach(el => el.remove());

  for(let i = 0; i < playList.length; i++) {
    const item = playList[i];

    appendItem(item);
  }
}

const accept = e => {
  switch(alertType) {
    case "save" :
      dataSave();
      break;
    case "load" :
      dataLoad();
      break;
    case "reset" :
      reset();
      break;
  }

  $alert.classList.add("none");
}

const cancle = e => {
  $alert.classList.add("none");
}

const koreanCheck = e => {
  korean = $korean.checked;
}

const init = e => {
  $titleInput.value = localStorage.getItem("playList-title") === null ? "?????? ?????? ??????" : localStorage.getItem("playList-title");
  $subTitleInput.value = localStorage.getItem("playList-subTitle") === null ? "?????? ?????? : " : localStorage.getItem("playList-subTitle");
  $contentInput.value = localStorage.getItem("playList-content") === null ? "" : localStorage.getItem("playList-content");
  $title.innerText = $titleInput.value;
  $subTitle.innerText = $subTitleInput.value;
  $content.innerText = $contentInput.value;

  $input.style.width = `${$title.offsetWidth + 350}px`;
  $titleInput.style.width = `${340 - $titleText.offsetWidth}px`;
  $subTitleInput.style.width = `${340 - $subTitleText.offsetWidth}px`;
  $contentInput.style.width = `${340 - $contentText.offsetWidth}px`;

  $$input.forEach(el => el.addEventListener("keydown", changeKorean));
  $$input.forEach(el => el.addEventListener("keydown", inputText));
  $$input.forEach(el => el.addEventListener("input", inputText));

  $contentInput.addEventListener("keydown", inputWidth);
  $contentInput.addEventListener("input", inputWidth);
  $contentInput.addEventListener("keydown", insert);
  $reset.addEventListener("click", e => {alert("reset")});
  $dataSave.addEventListener("click", e => {alert("save")});
  $dataLoad.addEventListener("click", e => {alert("load")});
  $accept.addEventListener("click", accept);
  $cancel.addEventListener("click", cancle);
  $korean.addEventListener("input", koreanCheck);
  document.addEventListener("keydown", e => {
    // $keydown.innerText = e.key;
  })
}

document.addEventListener("keydown", e => {
  if(e.ctrlKey && e.key === "Alt") {
    $korean.checked = korean;
  }
})

init();