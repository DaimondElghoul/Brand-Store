var Div = document.createElement('div');
Div.id = 'MyDiv';
Div.style.width = '100%';
Div.style.height = '100px';
// edit by Elghoul   //+  محتاجة تعديل عشان تلزق في السقف ونظب الدروب دون لست
Div.style.backgroundColor = 'wheat';
Div.style.position = 'sticky'; 
Div.style.top = '0'; 
Div.style.left="-10px";
Div.style.Top="0px";
Div.style.borderRadius="0px 0px 10px 10px";
Div.style.zIndex="1000";
main.before(Div);

var CrtIcon = document.createElement('img');
CrtIcon.src = "./rss/Cart.png";
CrtIcon.style.height = '20px';
CrtIcon.style.position = 'absolute';
CrtIcon.style.cursor='pointer';
CrtIcon.style.bottom='40px'
CrtIcon.style.right = '120px'; 
Div.appendChild(CrtIcon);
CrtIcon.addEventListener('click', function() {
    window.open("cart.html", '_blank');
});

var CartNumbDiv = document.createElement("div")
CartNumbDiv.style.height = '30px';
CartNumbDiv.style.width = '30px';
CartNumbDiv.style.position = 'absolute';
CartNumbDiv.style.bottom='60px'
CartNumbDiv.style.right = '105px'; 
CartNumbDiv.style.backgroundColor = 'red'; 
CartNumbDiv.style.borderRadius = '50%'; 
CartNumbDiv.style.textAlign = 'center'; 

var CartNumb= document.createElement("p")
CartNumb.style.marginTop = '-1px'; 

function updateCartDisplay() {
    CartNumb.textContent = cartStorge.length.toString();
}

CartNumbDiv.appendChild(CartNumb)
Div.appendChild(CartNumbDiv);



var HeartIcon = document.createElement('img');
HeartIcon.src = "./rss/Heart.png";
HeartIcon.style.height = '23px';
HeartIcon.style.position = 'absolute';
HeartIcon.style.right = '170px'; 
HeartIcon.style.bottom='40px'
HeartIcon.style.cursor='pointer';
Div.appendChild(HeartIcon);

var CatIcon = document.createElement('img');
CatIcon.src = "./rss/menu.png";
CatIcon.style.height = '23px';
CatIcon.style.position = 'absolute';
CatIcon.style.right = '70px'; 
CatIcon.style.bottom='40px'
CatIcon.style.cursor='pointer';
Div.appendChild(CatIcon);

var dropdown = document.createElement('div');
dropdown.style.position = 'absolute';
dropdown.style.display = 'none';
dropdown.style.backgroundColor = '#f9f9f9';
dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
dropdown.style.right = '70px'; 
dropdown.style.bottom = '-230px';
Div.appendChild(dropdown);
var dropvalue
var CatArr = ["jeans", "t-shirts", "shirts","hoodies","jackets","accessories"];

CatArr.forEach(function(item) {
  var a = document.createElement('a');
  a.href = '#';
  a.textContent = item;
  a.style.color = 'black';
  a.style.padding = '12px 16px';
  a.style.textDecoration = 'none'; //remove line under text
  a.style.display = 'block';
  a.addEventListener('mouseover', function() {
    a.style.backgroundColor = '#d3d3d3';
  });
  a.addEventListener('mouseout', function() {
    a.style.backgroundColor = '#f9f9f9';
  });
  a.addEventListener('click', function() {
    dropvalue = item
    console.log(dropvalue);
    loadProducts(dropvalue);
  });
  dropdown.appendChild(a);
});

CatIcon.addEventListener('click', function() { //
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
});

window.onclick = function(event) {   //close dropdownlist if click on any place in window
  if (!event.target.matches('img')) { // if you click on other icon don't close dropdownlist
    if (dropdown.style.display === 'block')
   {
      dropdown.style.display = 'none';
    }
  }
}

function applyHoverEffect(element, url) {
  element.addEventListener('mouseover', function() {
    element.style.filter = 'invert(50%) hue-rotate(180deg)';
  });

  element.addEventListener('mouseout', function() {
    element.style.filter = 'none';
  });

  
  
  element.addEventListener('click', function() {
      window.location.href = url;  
});
}
function applyHoverEffectForCategory(element)
{
  element.addEventListener('mouseover', function() {
    element.style.filter = 'invert(50%) hue-rotate(180deg)';
  });

  element.addEventListener('mouseout', function() {
    element.style.filter = 'none';
  });
}
 applyHoverEffect(HeartIcon, 'heart.html');
 applyHoverEffectForCategory(CatIcon);

//end of header

// made by mohamed 
/// resopnd and cards
let item = []
let cartStorge = JSON.parse(localStorage.getItem("cartStorge")) || [];
function loadProducts(category) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./test.json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.response);
        var main = document.getElementById("main");
        main.innerHTML = ''; 
        for (let i = 0; i < json.length; i++) {
          if (!category || json[i].category === category) {
            var card = document.createElement("div");
            card.style.display = "inline-block";
            card.style.border = " solid 1px black";
            card.style.height = " 340px";
            card.style.width = " 250px";
            card.style.float = " left";
            card.style.margin = "30px";
            var img = document.createElement("img");
            img.src = json[i].image;
            img.style.width = "250px";
            img.style.height = "250px";
            var title = document.createElement("p");
            title.style.display = "inline-block";
            title.style.width = "100%";
            title.style.marginBlock = "3px";
            var titletext = document.createTextNode(json[i].product_name);
            title.appendChild(titletext);
            var price = document.createElement("p");
            price.style.display = "inline-block";
            price.style.marginBlock = "5px";
            price.style.width = "100%";
            var pricetext = document.createTextNode(json[i].price + " EGP");
            price.appendChild(pricetext);
            var addToCart = document.createElement("button");
            addToCart.style.backgroundColor = "green";
            var addtext = document.createTextNode("add to carte");
            addToCart.appendChild(addtext);
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(addToCart);
            main.appendChild(card);
            
            const itemToAdd = json[i];
            addToCart.addEventListener("click", function (event) {
                event.stopPropagation(); 
                function isItemInCart(item) {            
                    for (let i = 0; i < cartStorge.length; i++) {
                      console.log(item);
                          if (cartStorge[i].id == item.id) {
                              return true; 
                        
                            }
                          }
                    return false;
                }
                if (!isItemInCart(itemToAdd)) {
                    console.log(itemToAdd);
                    console.log(cartStorge);
                    var curnum = parseInt(CartNumb.textContent);
                    var newnum = curnum + 1;
                    CartNumb.textContent = newnum;
                    cartStorge.push(itemToAdd);
                    localStorage.setItem("cartStorge", JSON.stringify(cartStorge));
                }
            });
  
            card.addEventListener("click", function (event) {
              if (!event.target.closest('button')) {
                const clickedProductId = json[i].id;
                const productUrl = `./product.html?id=${clickedProductId}`;
                window.open(productUrl, '_blank');
                item.push(json[i]);
                localStorage.setItem("item", JSON.stringify(item));
              }
            });
            updateCartDisplay();
          }
        }
      }
    };
    xhr.send();
  }
  loadProducts();

