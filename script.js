      const slides = document.querySelectorAll(".hero-image");
      const dots = document.querySelectorAll(".dots");
      let current = 0 ; 


        
      function slideshow(i){
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = (i + slides.length) % slides.length;
        
        slides[current].classList.add("active");
        dots[current].classList.add("active");
      }

      setInterval(function() {
        slideshow(current+1) ;} , 5500); 


      const header = document.querySelector(".mainHeader");
      const hero = document.querySelector(".mainHero-container");
      function updateHeader(){
        const heroBottom = hero.offsetTop + hero.offsetHeight - header.offsetHeight;

        header.classList.toggle("scrolled" , window.scrollY > heroBottom);

      }
      window.addEventListener("scroll" , updateHeader);
      updateHeader();




            // products now come from the database (get_products.php)
      let products = [];

      fetch("products.php")
        .then(response => response.json())
        .then(data => {
          products = data;
          changeGrid("all");
        });
      

      // filter buttons 
      function highlightButton(button , category){
        document.querySelector(".filter-button.active").classList.remove("active");

        button.classList.add("active");

        changeGrid(category);
      }

      // shop filter

      const shopGrid = document.getElementById("shopContainer");


      function changeGrid(category){
        let list = [];

        for(let i = 0 ; i <products.length ; i++){
          if (category === "all" || products[i].category === category){
            list.push(products[i]);
          }}


          shopGrid.innerHTML= list.map(function (p,i){
            return `
            <div class="product-card" style="animation-delay: ${i * 40}ms">
                <div class="product-image-container">
                  <img src="${p.image}" class="product-image" alt="${p.name}">
                  <div class="product-badge">${p.mood}</div>
                </div>  

                <div class="product-text-container">
                  <p class="product-name">${p.name}</p>
                  <p class="product-type">${p.type}</p>
                  <p class="product-notes">${p.notes}</p>
                </div>

                <div class="product-button-container">
                  <button class="product-button" onclick="addToCart('${p.name}')">Rs ${p.price} • Add to Bag →</button>
                </div>

            </div> `;
          }).join("");
        
      }
      







    
      




      // cart pop up section
      let cart = [];  

      
      function openCart() {
        document.getElementById("drawer").classList.add("open");
      }

      function closeCart() {
        document.getElementById("drawer").classList.remove("open");
      }
      function addToCart(name) {
        const product = products.find(p => p.name === name);
        if (!product) return;
        cart.push(product);
        showCart();
        
      }
      function removeItem(index) {
        cart.splice(index, 1);
        showCart();
      }

      function showCart() {
        let html = "";
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
          total += cart[i].price;
          html += `
            <div class="cart-item">
              <img src="${cart[i].image}">
              <h4>${cart[i].name}</h4>
              <div class="cart-item__right">
                <strong>Rs ${cart[i].price}</strong><br>
                <button class="remove" onclick="removeItem(${i})">Remove</button>
              </div>
            </div>`;
        }

        if (cart.length === 0) {
          html = `<p class="drawer__empty">Your bag is empty.</p>`;
        }

        document.getElementById("cartItems").innerHTML = html;
        document.getElementById("cartTotal").textContent = "Rs " + total;
        document.querySelector(".cartCount").textContent = String(cart.length).padStart(2, "0");
      }
      showCart();

            // checkout: send the bag to place_order.php with AJAX
      function checkout() {
        if (cart.length === 0) {
          alert("Your bag is empty");
          return;
        }

        const data = new FormData();
        data.append("items", JSON.stringify(cart.map(p => p.name)));

        fetch("place_order.php", { method: "POST", body: data })
          .then(response => response.text())
          .then(result => {
            if (result === "success") {
              alert("Thank you! Your order has been placed.");
              cart = [];
              showCart();
              closeCart();
            } else {
              alert(result);
            }
          });
      }


            
      fetch("check_session.php")
        .then(response => response.json())
        .then(data => {
          if (data.loggedIn) {
            document.querySelector(".login-button-container").style.display = "none";
            document.querySelector(".signup-button-container").style.display = "none";
            document.querySelector(".profile-icon-container").style.display = "flex";
          }
        });