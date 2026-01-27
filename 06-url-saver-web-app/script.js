import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://url-saver-2025-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "web-addresses");

// grabbing all the buttons and inputs
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const links = Object.values(snapshotValues);
    render(links);
  }
});

// double-click to delete saved URLs
deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});

// save manually input URL
inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);

  // clear the input field for next entry
  inputEl.value = "";
});

function render(links) {
  let listItems = "";
  for (let i = 0; i < links.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
