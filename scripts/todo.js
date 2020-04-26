let dataSet = [];
let addButton = document.getElementById("addButton");
let modal = document.getElementById("modalId");
let successError = document.getElementById("successError");
let hiddenId = document.getElementById("hiddenId");
let inputBox = document.getElementById("inputBox");
let inputDetailsBox = document.getElementById("inputDetails");
let cencelButtunStyles =
  "font-size: 23px; position: absolute;top: 10px;right: 10px;width: 29px;outline: none;box-shadow: 0 0 2px #ccc;border: 1px solid #ccc;cursor: pointer;";

window.addEventListener("load", () => getData());

addButton.addEventListener("click", e => {
  let innerHtml = "New Data Added Successfully.";
  let addButtonText = addButton.innerText;
  let newData = {};
  let name = inputBox.value;
  let details = inputDetailsBox.value;

  if (name.length > 3 && details.length > 3) {
    if (addButtonText === "ADD" || addButtonText === "Add") {
      newData = {
        id: Math.ceil(Math.random() * 50),
        name: name,
        details: details
      };
    } else if (addButtonText === "UPDATE" || addButtonText === "Update") {
      updateHandler(+hiddenId.innerText);
      return false;
    }
  } else {
    styles = "color: yellow;box-shadow: 0 0 5px yellow;opacity: .7";
    innerHtml = "Name or Details can't be less than three characters.";
    successErrorHandler(innerHtml, styles);
    return false;
  }

  parseData() !== null
    ? setData(newData, parseData())
    : setData(newData, dataSet);
  successErrorHandler(
    innerHtml,
    "color: green;box-shadow: 0 0 5px green;opacity: .7"
  );
  callFunctions();
});

let updateHandler = id => {
  let allData = parseData();
  let editingData = allData.find(d => d.id == id);
  editingData.name = inputBox.value;
  editingData.details = inputDetailsBox.value;
  setData(null, allData);
  addButton.innerText = "add";
  successErrorHandler(
    "Updated Successfully!",
    "color: green; box-shadow: 0 0 5px green;opacity: 1"
  );
  callFunctions();
};

let deleteHandler = id => {
  let styles = "color: red; box-shadow: 0 0 5px red;opacity: .8";
  let innerHtml = "Data Deleted Successfully";
  let data = parseData();
  data.splice(data.map(d => d.id).indexOf(id), 1);
  successErrorHandler(innerHtml, styles);
  clearInputBox();
  addButton.innerText = "add";
  setData(null, data);
};

let cancelHandler = () => {
  callFunctions();
  addButton.innerText = "add";
};

let setData = (newData, oldData) => {
  if (newData !== null) {
    oldData.push(newData);
  }
  localStorage.setItem("data", JSON.stringify(oldData));
  getData();
};

let getData = () => {
  let template = "";
  if (parseData() !== null) {
    let allData = parseData().reverse();
    for (data in allData) {
      template += templateBulder(allData[data].id, allData[data]);
    }
    document.getElementById("sectionWrapper").innerHTML = template;
  }
};

let parseData = () =>
  JSON.parse(localStorage.getItem("data")) != null
    ? JSON.parse(localStorage.getItem("data"))
    : null;

let populateFormData = id => {
  let sigleData = parseData().find(x => x.id == id);
  inputBox.value = sigleData.name;
  inputDetailsBox.value = sigleData.details;
  addButton.innerText = "Update";
  hiddenId.innerText = sigleData.id;
};

let populateModalData = id => {
  let data = parseData();
  toggleModal();
  modalContent(data.splice(data.map(d => d.id).indexOf(id), 1));
};

let successErrorHandler = (innerHtml, styles) => {
  successError.classList.add("active");
  successError.innerHTML = innerHtml;
  successError.style.cssText = styles;
  setTimeout(() => {
    successError.classList.remove("active");
  }, 3000);
};

let clearInputBox = () => {
  inputBox.value = "";
  inputDetailsBox.value = "";
  inputBox.focus();
};

let callFunctions = () => {
  clearInputBox();
  getData();
};

let templateBulder = (id, dataElement) => `
    <div class="templateElements" id="${id}">
        <div class="image" onclick="populateModalData(${id})">
          <h2>
            ${dataElement.name[0]}
          </h2>
        </div>
        <div class="content">
          <h4 style="font-family: Verdana;">${dataElement.name}</h4>
          <p>${dataElement.details}</p>
        </div>
    </div>
`;

let mouseOverHandler = id => {
  document.querySelector("#" + id + " .content").classList.add("active");
  let templateContents = document.querySelectorAll(".content");
  typeof templateContents;
};

//MODAL
let modalIsShow = false;
modal.addEventListener("click", e => toggleModal());

let toggleModal = () => {
  modalIsShow = !modalIsShow;
  modalIsShow
    ? (modal.style.display = "block")
    : (modal.style.display = "none");
};

let modalContent = modalElement => {
  let mc = `
    <div class="mc">
      <h3>Want to delete?</h3>
      <p><b>User Id: ${modalElement[0].id}</b><br /><b>User Name: </b>${modalElement[0].name}<br></p>
    </div>
    
    <br />
    
    <div class="mc-buttons">
      <button onclick="deleteHandler(${modalElement[0].id})">Ok</button>
      <button onclick="populateFormData(${modalElement[0].id})">Update</button>
    </div>
    <div>
      <button onclick="cancelHandler()" style="${cencelButtunStyles}">&times;</button>
    </div>

  `;

  document.getElementById("modalContent").innerHTML = mc;
};

//let getSplicedData = id => parseData().splice(parseData().map(d => d.id).indexOf(id), 1);
