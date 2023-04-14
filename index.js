import { services, bullets } from "./services.js";

const bulletDropdown = document.querySelector(".bullet-dropdown");
const serviceDropdown = document.querySelector(".service-dropdown");
const bulletQuantityInput = document.querySelector("#bullet-quantity");
const serviceQuantityInput = document.querySelector("#service-quantity");
const bulletPricePerItem = document.querySelector(".bullet-price-per-item");
const servicePricePerItem = document.querySelector(".service-price-per-item");
const bulletAddButton = document.querySelector(".bullet-add-button");
const serviceAddButton = document.querySelector(".service-add-button");
const addedItemsWrapper = document.querySelector(".added-items");
const tableBody = document.querySelector("tbody");
const totalTableCell = document.getElementById("total");
const deleteButton = document.querySelector(".delete-button");
const choosenItems = [];

bullets.forEach(bullet => {
  const option = document.createElement("option");
  option.value = bullet.id;
  option.textContent = `${bullet.name}`;
  bulletDropdown.appendChild(option);
});

services.forEach(service => {
  const option = document.createElement("option");
  option.value = service.id;
  option.textContent = `${service.name}`;
  serviceDropdown.appendChild(option);
});

bulletDropdown.addEventListener("change", () => {
  resetValues({
    quantityInput: bulletQuantityInput,
    itemTotal: bulletPricePerItem,
  });
});

serviceDropdown.addEventListener("change", () => {
  resetValues({
    quantityInput: serviceQuantityInput,
    itemTotal: servicePricePerItem,
  });
});

bulletQuantityInput.addEventListener("change", function () {
  setItemTotal({
    dropdownInput: bulletDropdown,
    quantityInput: bulletQuantityInput,
    dataCollection: bullets,
    itemTotal: bulletPricePerItem,
  });
});

serviceQuantityInput.addEventListener("change", function () {
  setItemTotal({
    dropdownInput: serviceDropdown,
    quantityInput: serviceQuantityInput,
    dataCollection: services,
    itemTotal: servicePricePerItem,
  });
});

bulletAddButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  addItem({
    dropdownInput: bulletDropdown,
    quantityInput: bulletQuantityInput,
    dataCollection: bullets,
    itemTotal: bulletPricePerItem,
  });
});

serviceAddButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  addItem({
    dropdownInput: serviceDropdown,
    quantityInput: serviceQuantityInput,
    dataCollection: services,
    itemTotal: servicePricePerItem,
  });
});

deleteButton.addEventListener("click", () => {
  choosenItems.pop();
  addTableData();
  totalTableCell.textContent = calculateTotal(choosenItems);
  if (choosenItems.length <= 0) {
    addedItemsWrapper.setAttribute("hidden", true);
  }
});

function setItemTotal(parameters) {
  const selectedItem = parameters.dropdownInput.value;
  const dataInstance = parameters.dataCollection.find(
    data => data.id === selectedItem
  );
  const quantity = parameters.quantityInput.valueAsNumber;
  parameters.itemTotal.textContent = `Итог: ${
    dataInstance.price * quantity
  } лей`;
}

function addItem(parameters) {
  const dropdownValue = parameters.dropdownInput.value;
  const quantity = parameters.quantityInput.valueAsNumber;
  const dataInstance = parameters.dataCollection.find(
    data => data.id === dropdownValue
  );
  const data = {
    name: dataInstance.name,
    quantity: quantity,
    price: quantity * dataInstance.price,
  };
  choosenItems.push(data);
  addedItemsWrapper.removeAttribute("hidden");
  totalTableCell.textContent = calculateTotal(choosenItems);
  resetValues({
    quantityInput: parameters.quantityInput,
    itemTotal: parameters.itemTotal,
  });
  addTableData();
}

function calculateTotal(items) {
  const total = items.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  return total;
}

function addTableData() {
  tableBody.innerHTML = "";
  console.log(choosenItems);
  choosenItems.forEach((item, index) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>`;
    tableBody.appendChild(tableRow);
  });
}

function resetValues(parameters) {
  parameters.quantityInput.value = 0;
  parameters.itemTotal.textContent = "";
}
