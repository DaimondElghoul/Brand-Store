// made by Menna Abd-Elaziz

let storedData = localStorage.getItem("item");
let actialProduct = JSON.parse(localStorage.getItem("item"));
console.log(actialProduct[0].id);

console.log(storedData);
if (storedData) {
  var product = JSON.parse(storedData);
  var Product = product[0];
  var productDisplayDiv = document.getElementById("product-display");
  console.log(Product);

  var productDiv = document.getElementById("container");
  var productName = document.getElementById("p_name");
  productName.textContent = Product.product_name;
  productName.style.textAlign = "center";
  productDiv.appendChild(productName);

  var productImage = document.getElementById("main-image");
  productImage.src = Product.image[0];
  productImage.style.display = "block";
  productImage.style.marginLeft = "20px";
  productImage.style.marginRight = "auto";
  productImage.alt = Product.product_name;
  productImage.style.width = "50%";
  productImage.style.marginLeft = "20px";
  // productImage.style.borderRadius = "20px";

  productDiv.appendChild(productImage);

  var thumbnails = document.getElementsByClassName("thumbnails")[0];

  thumbnails.style.marginTop = "20px";

  var img1 = document.getElementById("img1");
  img1.src = Product.image[1];
  img1.style.cursor = "pointer";
  img1.style.width = "130px";
  img1.style.height = "130px";

  thumbnails.appendChild(img1);
  productDiv.appendChild(thumbnails);
  //    thumbnails.appendChild(img1);

  var img2 = document.getElementById("img2");
  img2.src = Product.image[2];
  img2.style.cursor = "pointer";
  img2.style.width = "130px";
  img2.style.height = "130px";

  thumbnails.appendChild(img2);
  productDiv.appendChild(thumbnails);

  // thumbnails.appendChild(img2);

  var img3 = document.getElementById("img3");
  img3.style.cursor = "pointer";
  img3.style.width = "130px";
  img3.style.height = "130px";
  img3.src = Product.image[0];
  // thumbnails.appendChild(img3);

  thumbnails.appendChild(img3);
  productDiv.appendChild(thumbnails);

  var thumbnaills = document.querySelectorAll(".thumbnails img");
  console.log(thumbnaills);

  var mainImage = document.getElementById("main-image");

  thumbnaills.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Change the main image source
      console.log(this);

      mainImage.src = this.src;

      // Remove the active class from all thumbnails
      thumbnaills.forEach((img) => img.classList.remove("active-thumbnail"));

      // Add the active class to the clicked thumbnail
      this.classList.add("active-thumbnail");
    });
  });

  // var productCategory = document.getElementById('p_category');
  // productCategory.innerHTML = `<strong>Category:</strong> ${Product.category}`;
  // // productCategory.style.display='inline-block';
  // productDiv.appendChild(productCategory);

  var paras = document.getElementById("pras");

  var productDescription = document.getElementById("p_decsription");
  productDescription.innerHTML = `<strong>Description:</strong> ${Product.description}`;
  paras.appendChild(productDescription);

  productDiv.appendChild(paras);

  // var productPrice = document.getElementById('p_price');
  // productPrice.textContent= "Price: "+ Product.price+"  LE";
  // productDiv.appendChild(productPrice);

  var productSize = document.getElementById("p_size");
  productSize.innerHTML = `<strong>Size:</strong> ${Product.size}`;

  paras.appendChild(productSize);
  productDiv.appendChild(paras);

  //productDiv.appendChild(productSize);

  var productQuantity = document.createElement("p");
  productQuantity.innerHTML = `<strong>Quantity:</strong> ${Product.quantity}`;

  paras.appendChild(productQuantity);
  productDiv.appendChild(paras);

  var productDiscount = document.createElement("p");

  if (!Product.discount) {
    var productPrice = document.getElementById("p_price");
    productPrice.innerHTML = `<strong>Price : </strong> ${Product.price} LE `;
    productDiv.appendChild(productPrice);
    paras.appendChild(productPrice);

    productDiv.appendChild(paras);
  } else {
    var discount = document.getElementById("discound");
    discount.innerHTML = `<strong>Sale: </strong> -15%`;
    //discount.style.textAlign="center";

    paras.appendChild(discount);

    var productPrice = document.getElementById("p_price");
    productPrice.innerHTML = `<strong>Price After Sale : </strong> ${
      Product.price - (Product.price * 15) / 100
    }LE `;
    //  productDiv.appendChild(productPrice);

    paras.appendChild(productPrice);

    productDiv.appendChild(paras);

    //     var productPrice = document.getElementById('p_price');
    //     productPrice.innerHTML = ` `;
    //     productDiv.appendChild(productPrice);

    //     var markForDis = document.createElement("div")
    //     var dicountedtext=document.createElement("p")
    //     // var dicounted = document.createElement("p");
    //     markForDis.innerHTML =  `<strong>Sale : </strong>  -15%  `;
    //     // markForDis.setAttribute("class","markForDis")
    //     // dicounted.setAttribute("class", "dicounted")
    //     productPrice.style.width = "35%";
    //     productPrice.style.textDecorationLine = "line-through";
    //     dicountedtext .innerHTML=` <strong>Price After Sale:</strong> ${(Product.price - Product.price * 15/100)} LE `;
    //     productDiv.appendChild(markForDis)
    //     dicounted.appendChild(dicountedtext);
    //    // productDiv.appendChild(dicounted);
    //     paras.appendChild(dicounted);
    //     productDiv.appendChild(paras);
  }

  //productDiv.appendChild(productDiscount);

  // Append the productDiv to the document body or any other container
  document.getElementById("product-display").appendChild(productDiv);
} else {
  // console.log("Product with ID", productID, "not found in local storage");
}
let cartStorge = JSON.parse(localStorage.getItem("cartStorge")) || [];
let productsOnCart = JSON.parse(localStorage.getItem("numOfProducts")) || 0;
let quantityStorage = JSON.parse(localStorage.getItem("quantityStorage")) || {};

const selectedProduct = actialProduct[0];
console.log(selectedProduct.id);
const addcart = document.getElementById("addcart");
addcart.addEventListener("click", function () {
  function isItemInCart(item) {
    for (let i = 0; i < cartStorge.length; i++) {
      console.log(item);
      if (cartStorge[i].id == item.id) {
        return true;
      }
    }
    return false;
  }
  if (!isItemInCart(selectedProduct)) {
    console.log(cartStorge);
    productsOnCart += 1;
    cartStorge.push(actialProduct[0]);
    localStorage.setItem("cartStorge", JSON.stringify(cartStorge));
    localStorage.setItem("numOfProducts", JSON.stringify(productsOnCart));
    quantityStorage[actialProduct[0].id] = 1;
    localStorage.setItem("quantityStorage", JSON.stringify(quantityStorage));
  } else {
    productsOnCart += 1;
    localStorage.setItem("numOfProducts", JSON.stringify(productsOnCart));
    quantityStorage[actialProduct[0].id] =
      (quantityStorage[actialProduct[0].id] || 0) + 1;
    localStorage.setItem("quantityStorage", JSON.stringify(quantityStorage));
  }
});

//start of header

var Div = document.createElement("div");
Div.style.display = "flex";
Div.id = "MyDiv";
Div.style.width = "100%";
Div.style.height = "100px";
Div.style.backgroundColor = "#14202E";
Div.style.position = "absolute";
Div.style.top = "0px";
Div.style.zIndex = "1000";
Div.style.left = "0px";
Div.style.padding = "0px";
Div.style.margin = "0px";

document.body.append(Div);
// logo
var logo = document.createElement("img");
logo.src = "../rss/White-Logo.png";
logo.style.height = "140px";
logo.style.width = "220px";
logo.style.position = "absolute";

logo.style.left = "5%";
logo.style.top = "-13px";

logo.style.cursor = "pointer";
logo.id = "logo";
logo.addEventListener("click", function () {
  window.location.href = "../index.html";
});
Div.appendChild(logo);

// categories
var LIST = document.createElement("div");
LIST.style.display = "inline-block";
LIST.style.width = "fit-content";
LIST.style.backgroundColor = "rgba(245, 222, 179, 0)";
LIST.style.Color = "#f6ead9";

var C1 = document.createElement("button");
var C2 = document.createElement("button");
var C3 = document.createElement("button");
var C4 = document.createElement("button");
var C5 = document.createElement("button");
var C6 = document.createElement("button");
var C7 = document.createElement("button");

C1.textContent = "All Products";
C2.textContent = "Jackets";
C3.textContent = "Hoodies";
C4.textContent = "jeans";
C5.textContent = "Shirts";
C6.textContent = "T-shirts";
C7.textContent = "Accessories";

C1.style.display = "inline";
C2.style.display = "inline";
C3.style.display = "inline";
C4.style.display = "inline";
C5.style.display = "inline";
C6.style.display = "inline";
C7.style.display = "inline";

C1.style.margin = "7px";
C2.style.margin = "7px";
C3.style.margin = "7px";
C4.style.margin = "7px";
C5.style.margin = "7px";
C6.style.margin = "7px";
C7.style.margin = "7px";

C2.style.backgroundColor = "rgba(245, 222, 179, 0)";
C1.style.backgroundColor = "rgba(245, 222, 179, 0)";
C3.style.backgroundColor = "rgba(245, 222, 179, 0)";
C4.style.backgroundColor = "rgba(245, 222, 179, 0)";
C5.style.backgroundColor = "rgba(245, 222, 179, 0)";
C6.style.backgroundColor = "rgba(245, 222, 179, 0)";
C7.style.backgroundColor = "rgba(245, 222, 179, 0)";

C2.style.border = "0";
C1.style.border = "0";
C3.style.border = "0";
C4.style.border = "0";
C5.style.border = "0";
C6.style.border = "0";
C7.style.border = "0";

C1.onclick = function () {
  localStorage.removeItem("category");
  window.open("../products/Products.html", "_self");
};
C2.onclick = function () {
  sending("Jackets");
};
C3.onclick = function () {
  sending("Hoodies");
};
C4.onclick = function () {
  sending("Jeans");
};
C5.onclick = function () {
  sending("Shirts");
};
C6.onclick = function () {
  sending("T-shirts");
};
C7.onclick = function () {
  sending("Accessories");
};

function sending(category) {
  localStorage.setItem("category", category);
  window.open("../products/Products.html", "_self");
}

function HoverEffect(element) {
  element.style.color = "#f6ead9";
  element.addEventListener("mouseover", function () {
    element.style.transition =
      "transform 0.2s ease-in-out, color 0.2s ease-in-out";
    element.style.transform = "scale(1.05)";
    element.style.color = "#E1A140";
  });

  element.addEventListener("mouseout", function () {
    element.style.transform = "scale(1)";
    element.style.color = "white";
  });
}

HoverEffect(C1);
HoverEffect(C2);
HoverEffect(C3);
HoverEffect(C4);
HoverEffect(C5);
HoverEffect(C6);
HoverEffect(C7);

C1.style.fontSize = "15px";
C2.style.fontSize = "15px";
C3.style.fontSize = "15px";
C4.style.fontSize = "15px";
C5.style.fontSize = "15px";
C6.style.fontSize = "15px";
C7.style.fontSize = "15px";

LIST.style.position = " absolute";
LIST.style.left = "31%";
LIST.style.top = "30px";
LIST.style.color = "#f4f4f4";

LIST.appendChild(C1);
C1.after(C2);
C2.after(C3);
C3.after(C4);
C4.after(C5);
C5.after(C6);
C6.after(C7);

LIST.style.transition = "transform";

Div.appendChild(LIST);

// cart icon
var CrtIcon = document.createElement("img");
CrtIcon.src = "../rss/Cart2.png";
CrtIcon.style.height = "22px";
CrtIcon.style.position = "absolute";
CrtIcon.style.cursor = "pointer";
CrtIcon.style.bottom = "40px";
CrtIcon.style.right = "120px";

Div.appendChild(CrtIcon);

//heart icon
var HeartIcon = document.createElement("img");
HeartIcon.src = "../rss/Heart2.png";
HeartIcon.style.height = "23px";
HeartIcon.style.position = "absolute";
HeartIcon.style.right = "170px";
HeartIcon.style.bottom = "40px";
HeartIcon.style.cursor = "pointer";
Div.appendChild(HeartIcon);

function applyHoverEffect(element, url) {
  element.addEventListener("mouseover", function () {
    element.style.filter = "invert(50%) hue-rotate(180deg)";
  });

  element.addEventListener("mouseout", function () {
    element.style.filter = "none";
  });

  element.addEventListener("click", function () {
    window.location.href = url;
  });
}

applyHoverEffect(CrtIcon, "../cart/cart.html");
applyHoverEffect(HeartIcon, "../fav/favourite.html");

//end of header
