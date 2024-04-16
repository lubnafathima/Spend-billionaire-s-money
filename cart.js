document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var src = urlParams.get("src");
  var name = decodeURIComponent(urlParams.get("name"));
  var amount = urlParams.get("amount");

  let cartImg = document.querySelector(".cart-img");
  cartImg.src = `./img/${src}`;
  let cartTitle = document.querySelector(".cart-title");
  cartTitle.innerHTML = name;
  let cartMoney = document.querySelector(".cart-money");
  cartMoney.innerHTML = `₹ ${amount}`;
  let cartTotal = parseInt(amount.replace(/[^\d.]/g, ""));

  function updateCartTotal() {
    cartMoney.innerHTML = `₹ ${parseInt(cartTotal.toFixed(2))}`;
  }

  const items = [
    { name: "Tesla", imgSrc: "./img/tesla.svg", price: "&#x20b9; 60,00,000" },
    {
      name: "Helicopter",
      imgSrc: "./img/helicopter.svg",
      price: "&#x20b9; 15,00,00,000",
    },
    {
      name: "McDonald's",
      imgSrc: "./img/mcD.svg",
      price: "&#x20b9; 34,00,00,00022",
    },
    {
      name: "Boeing",
      imgSrc: "./img/boeing.svg",
      price: "&#x20b9; 300,00,00,000",
    },
    {
      name: "Formula-1",
      imgSrc: "./img/formula.svg",
      price: "&#x20b9; 80,00,00,000",
    },
    {
      name: "Cruise",
      imgSrc: "./img/cruise.svg",
      price: "&#x20b9; 10,00,00,000",
    },
    {
      name: "Mansion",
      imgSrc: "./img/mansion.svg",
      price: "&#x20b9; 20,00,00,000",
    },
    { name: "NBA", imgSrc: "./img/nba.svg", price: "&#x20b9; 3,500,00,00,000" },
    { name: "Jet Ski", imgSrc: "./img/jet.svg", price: "&#x20b9; 10,00,000" },
    { name: "Hot Tub", imgSrc: "./img/hottub.svg", price: "&#x20b9; 5,00,000" },
    {
      name: "Diamond",
      imgSrc: "./img/diamond.svg",
      price: "&#x20b9; 5,00,000",
    },
    {
      name: "Ferrari",
      imgSrc: "./img/ferrari.svg",
      price: "&#x20b9; 10,00,00,000",
    },
  ];

  const cartContent = document.getElementById("cart-content");

  items.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.imgSrc}" alt="cart item" class="cart-item-img" />
      <h3 class="item-name">${item.name}</h3>
      <h2 class="item-price">${item.price}</h2>
      <div class="cart-button-group">
        <button class="cart-button sell">SELL</button>
        <input type="number" value="0" class="cart-input" inputmode="numeric" pattern="[0-9]*" readonly />
        <button class="cart-button buy">BUY</button>
      </div>
    `;

    cartContent.appendChild(cartItem);

    const sellButton = cartItem.querySelector(".sell");
    const buyButton = cartItem.querySelector(".buy");
    const cartInput = cartItem.querySelector(".cart-input");
    const itemPrice = cartItem.querySelector(".item-price");

    function updateButtonColor() {
      let currentValue = parseInt(cartInput.value);
      let itemPriceValue = parseInt(itemPrice.innerText.replace(/[^\d.]/g, ""));

      if (currentValue > 0) {
        sellButton.style.backgroundColor = "#e06565";
      } else {
        sellButton.style.backgroundColor = "#c6c6c6";
      }
      if (cartTotal >= itemPriceValue) {
        buyButton.style.backgroundColor = "#67c07a";
      } else {
        buyButton.style.backgroundColor = "#c6c6c6";
      }
    }

    let addedItems = [];

    function totalAmountCalculator() {
      let totalAmountCalc = 0;
      const tableQuantityArray = document.querySelectorAll(".table-quantity");
      const tablePriceArray = document.querySelectorAll(".table-price");
      const totalAmount = document.querySelector(".total-amount");

      if(tableQuantityArray.length === 0) {
        document.querySelector(".cart-bottom").style.display = "none";
      }

      tableQuantityArray.forEach((quantity, index) => {
        document.querySelector(".cart-bottom").style.display = "flex";
        const tableQuantityValue = parseInt(
          quantity.textContent.replace(/[^\d.]/g, "")
        );
        const tablePriceValue = parseInt(
          tablePriceArray[index].textContent.replace(/[^\d.]/g, "")
        );
        totalAmountCalc += tableQuantityValue * tablePriceValue;
      });
      totalAmount.innerText = totalAmountCalc;
    }

    buyButton.addEventListener("click", () => {
      let itemPriceValue = parseInt(itemPrice.innerText.replace(/[^\d.]/g, ""));
      
      if (cartTotal >= itemPriceValue) {
        currentValue = parseInt(cartInput.value);
        cartInput.value = currentValue + 1;
        cartTotal -= itemPriceValue;
        updateCartTotal();

        let quantityInput;

        if (addedItems.includes(item.name)) {
          const existingRow = document.querySelector(
            `.table-item[data-name="${item.name}"]`
          ).parentNode;
          quantityInput = existingRow.querySelector(".table-quantity");
          let currentQuantity = parseInt(
            quantityInput.textContent.replace(/[^\d.]/g, "")
          );
          quantityInput.textContent = `x ${currentQuantity + 1}`;
        } else {
          const tableRow = document.createElement("div");
          tableRow.classList.add("table-row");

          const itemName = document.createElement("div");
          itemName.classList.add("table-item");
          itemName.textContent = item.name;
          itemName.dataset.name = item.name;

          const itemPrice = document.createElement("div");
          itemPrice.classList.add("table-price");
          itemPrice.textContent = `₹ ${itemPriceValue}`;
          itemPrice.style.display = "flex";

          quantityInput = document.createElement("div");
          quantityInput.classList.add("table-quantity");
          quantityInput.textContent = `x ${currentValue + 1}`;

          tableRow.appendChild(itemName);
          tableRow.appendChild(quantityInput);
          tableRow.appendChild(itemPrice);

          const table = document.querySelector(".cart-table");
          const resultRow = table.querySelector(".result");
          table.insertBefore(tableRow, resultRow);

          addedItems.push(item.name);
        }
        totalAmountCalculator();
      }
      updateButtonColor();
    });

    sellButton.addEventListener("click", () => {
      let currentValue = parseInt(cartInput.value);
      if (currentValue > 0) {
        cartInput.value = currentValue - 1;
        cartTotal += parseInt(itemPrice.innerText.replace(/[^\d.]/g, ""));
        updateCartTotal();

        const existingRow = document.querySelector(
          `.table-item[data-name="${item.name}"]`
        ).parentNode;
        let currentQuantity = parseInt(
          existingRow
            .querySelector(".table-quantity")
            .textContent.replace(/[^\d.]/g, "")
        );
        currentQuantity--;

        if (currentQuantity === 0) {
          existingRow.remove();
          const index = addedItems.indexOf(item.name);
          if (index > -1) {
            addedItems.splice(index, 1);
          }
        } else {
          existingRow.querySelector(
            ".table-quantity"
          ).textContent = `x ${currentQuantity}`;
        }
      }
      totalAmountCalculator();
      updateButtonColor();
    });
  });
});