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




      const products = [{name : "give me a break" , type : "Bath bomb" , notes:"Lavender • Vanilla • Ashwagandha" , mood:"Calming", price : 449 , category:"bath-bombs" , image:"images/image-1791465554938.jpg"},
      { name: "pinklady",         type: "Bath Bomb",                 notes: "Rosehip • Patchouli • Neroli",       mood: "Uplifting",     price: 449, category: "bath-bombs", image: "images/filter product2.jpg" },
      { name: "bad bombs",        type: "Imperfect Bath Bombs",      notes: "Assorted scents",                    mood: "Great value",   price: 50,  category: "bath-bombs", image: "images/filter product3.jpg" },
      { name: "lavender dream",   type: "Seaweed Pedicure Bomb",     notes: "Lavender • Tamanu Oil",              mood: "Deep Sleep",    price: 475, category: "pedicure",   image: "images/filter product4.jpg" },
      { name: "cica bomb",        type: "Seaweed Pedicure Bomb",     notes: "Cica • Neroli • Ylang-Ylang",        mood: "Cracked Heels", price: 500, category: "pedicure",   image: "images/filter product5.jpg" },
      { name: "sole savior",      type: "Seaweed Pedicure Bomb",     notes: "Tea Tree • Ashwagandha • Cedarwood", mood: "Varices",       price: 525, category: "pedicure",   image: "images/filter product6.jpg" },
      { name: "serenity blossom", type: "Magnesium & Sea Salt Soak", notes: "Ylang Ylang • Lemongrass • Neroli",  mood: "Detoxifying",   price: 500, category: "bath-salts", image: "images/filter product7.jpg" },
      { name: "shower performer", type: "Foaming Shower Scrub",      notes: "Coconut • Oats • Bakuchiol",         mood: "Ingrown Hairs", price: 500, category: "shower",     image: "images/filter product8.jpg" },
      { name: "relief",           type: "Inhalation Tabs",           notes: "Menthol • Eucalyptus • Camphor",     mood: "Sinus Relief",  price: 650, category: "inhalation", image: "images/filter product9.jpg" },
      { name: "inhale",           type: "Inhalation Tabs",           notes: "Menthol • Eucalyptus • Lavender",    mood: "Unblocks Nose", price: 600, category: "inhalation", image: "images/filter product10.jpg" },
      { name: "gift pouch",       type: "Cotton Gift Pouch",         notes: "Natural cotton • Drawstring",        mood: "Add-on",        price: 40,  category: "gifts",      image: "images/filter product11.jpg" }
    ];
      

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
      changeGrid("all");







    
      




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