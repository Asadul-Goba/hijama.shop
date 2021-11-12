(function() {
    $("#nav_toggle").on("click", function(event) {
		event.preventDefault();

		$(this).toggleClass("active");
		$("#nav").toggleClass("active");
	});

	
    $("#header-content__items").on("click", function(event) {
        event.preventDefault();
    
        $(this).toggleClass("active");
        $(".cart-content-block").toggleClass("active");
    });
    $(".cart-content-close").on("click", function(event) {
        event.preventDefault();
    
        $(this).toggleClass("active");
        $("#cart-content-none").toggleClass("active");
        $(".modals-content").removeClass("active");
        $(".cart-content-block").removeClass("active");

    });

    $(".cart-content-close").on("click", function(event) {
        event.preventDefault();
    
        $(this).toggleClass("active");
        $("#cart-content-none").toggleClass("active");
        $(".modals-content").removeClass("active");
        $("#modals-content__thank").removeClass("active");
        $(".cart-content-block").removeClass("active");

    });

    $("#close").on("click", function(event) {
        event.preventDefault();
    
        $(this).toggleClass("active");
        $("#cart-content-none").toggleClass("active");
        $(".modals-content").removeClass("active");
        $("#modals-content__thank").removeClass("active");
        $(".cart-content-block").removeClass("active");

    });

    $(".order-btn").on("click", function(event) {
        event.preventDefault();
    
        $(".cart-content-block").removeClass("active");
        $(".modals-content").toggleClass("active");
    });

    $("#dropdownMenuButton").click(function () {
    $(".rolls").toggleClass("active");

    });
    $("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset = $(blockId).offset().top;

			$("#nav a").removeClass("active");
			$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 900);
	});
    const cartDOMElement = document.querySelector('.js-cart');
    let productArray = []
    
    if (!cartDOMElement) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartProductsList = document.querySelector('.cart-content__list');
    const cartItemsCounterDOMElement = document.querySelector('.js-cart-total-count-items');
    const cartItemsCounterModalsDOMElement = document.querySelector('.js-cart-total-count-items-modals');
    const cartTotalPriceDOMElement = document.querySelector('.js-cart-total-price');
    const cartTotalPriceCounterDOMElement = document.querySelector('.js-cart-total-price-counter');
    const cartTotalPriceModalsDOMElement = document.querySelector('.js-cart-total-price-modals');

    

    const renderCartItem = ({ id, name, weight, src, price, quantity }) => {
        const cartItemDOMElement = document.createElement('div');

        const weightTemplate = weight
        ? `<p class="cart-product__weight">${weight}</p>` 
        : '';

        const cartItemTemplate = `
        <li class="cart-content__item">
		    <article class="cart-content__product cart-product">
				<img src="${src}" alt="Краб" class="cart-product__img">
				<div class="cart-product__text">
				    <h5 class="cart-product__title">${name}</h5>
                    ${weightTemplate}
			    </div>
				<div class="cart-product__actions">
				    <button class="cart-product__minus js-btn-product-decrease-quantity" type="button">-</button>
					<span class="cart-product__quantity js-cart-item-quantity">${quantity}</span>
					<button class="cart-product__plus js-btn-product-increase-quantity" type="button">+</button>
				</div>
					<p class="cart-product__price"><span class="js-cart-item-price">${price * quantity}</span> ₽</p>
                    <div class="cart-product-delete" type="button">
					    <button class="cart-product-delete__item" aria-label="Удалить товар" type="button"></button>
                    </div>
			</article>
	    </li>
        `;
        cartItemDOMElement.innerHTML = cartItemTemplate;
        cartItemDOMElement.setAttribute('data-product-id', id);
        cartItemDOMElement.classList.add('js-cart-item');

        cartDOMElement.appendChild(cartItemDOMElement);
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));   
    };

    const updateCartTotalItemsCounter = () => {
        const totalQuantity = Object.keys(cart).reduce((acc, id) => {
            const { quantity } = cart[id];
            return acc + quantity;
        }, 0);

        if (cartItemsCounterDOMElement) {
            cartItemsCounterDOMElement.textContent = totalQuantity;
        }
    }

    const updateCartTotalItemsCounterModals = () => {
        const totalQuantity = Object.keys(cart).reduce((acc, id) => {
            const { quantity } = cart[id];
            return acc + quantity;
        }, 0);

        if (cartItemsCounterModalsDOMElement) {
            cartItemsCounterModalsDOMElement.textContent = totalQuantity;
        }
    }
   

    const updateCartTotalPrice = () => {
        const totalPrice = Object.keys(cart).reduce((acc, id) => {
            const { quantity, price } = cart[id];
            return acc + price * quantity;
        }, 0);

        if (cartTotalPriceDOMElement) {
            cartTotalPriceDOMElement.textContent = totalPrice;
        }
    }

    const updateCartTotalPriceCounter = () => {
        const totalPriceCounter = Object.keys(cart).reduce((acc, id) => {
            const { quantity, price } = cart[id];
            return acc + price * quantity;
        }, 0);

        if (cartTotalPriceCounterDOMElement) {
            cartTotalPriceCounterDOMElement.textContent = totalPriceCounter;
        }
    }
    const updateCartTotalPriceModals = () => {
        const totalPriceModals = Object.keys(cart).reduce((acc, id) => {
            const { quantity, price } = cart[id];
            return acc + price * quantity;
        }, 0);

        if (cartTotalPriceModalsDOMElement) {
            cartTotalPriceModalsDOMElement.textContent = totalPriceModals;
        }
    }
    

    const updateCart = () => {
        updateCartTotalItemsCounter();
        updateCartTotalItemsCounterModals();
        updateCartTotalPrice();
        updateCartTotalPriceModals();
        updateCartTotalPriceCounter();
        saveCart();
    };

    const deleteCartItem = (id) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
        cartDOMElement.removeChild(cartItemDOMElement);
        delete cart[id];
        updateCart();
    };

    const addCartItem = (data) => {
        const { id } = data;

        if (cart[id]) {
            increaseQuantity(id);
            return;
        }

        cart[id] = data;

        renderCartItem(data);
        
        updateCart();
    };
    
    let globalVar = 0;
    const updateQuantity = (id, quantity) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
        const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-item-quantity');
        const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-item-price');

        cart[id].quantity = quantity;
        cartItemQuantityDOMElement.textContent = quantity;
        cartItemPriceDOMElement.textContent = quantity * cart[id].price;
       updateCart();
    };



let somename ="test";
let someprice="0";
    const decreaseQuantity = (id) => {
        const newQuantity = cart[id].quantity - 1;
   
   for(var i=0; i<productArray.length;i++){
   
   if(id==productArray[i].id){
   productArray[i].quantity=newQuantity;
   }
   }
   
for(var i=0; i<productArray.length; i++){


}

   
     /*   
     
obj.name = somename;
        obj.price = someprice;
        obj.quantity = globalVar;
        productArray.push(obj);
   console.log(productArray);

*/
       
       

        if (newQuantity >= 1) {
            
            updateQuantity(id, newQuantity);
        }
    };


    const increaseQuantity = (id) => {
        const newQuantity = cart[id].quantity + 1;

        updateQuantity(id, newQuantity);
        globalVar = newQuantity;
        

   
   for(var i=0; i<productArray.length;i++){
   
   if(id==productArray[i].id){
   productArray[i].quantity=newQuantity;
   }
   }
   
for(var i=0; i<productArray.length; i++){
}

    


};
    const generateID = (string1, string2) => {
        const secondParam = string2 ? `-${string2}`: '';
        return `${string1}${secondParam}`;
    };
    
    
// здесь обж массив        
    const getProductData = (productDOMElement) => {
        const name = productDOMElement.getAttribute('data-product-name');
        const weight = productDOMElement.getAttribute('data-product-weight');
        const price = productDOMElement.getAttribute('data-product-price');
        const src = productDOMElement.getAttribute('data-product-src');
        const quantity = 1;
        const id = generateID(name, weight); 
       
        somename = productDOMElement.getAttribute('data-product-name');

someprice=productDOMElement.getAttribute('data-product-price');

let obj = {};
        obj.name = productDOMElement.getAttribute('data-product-name');
        obj.price = productDOMElement.getAttribute('data-product-price');
        obj.quantity = quantity;
        obj.id=id;
        productArray.push(obj);
        
        
        
        
        return { name, weight, price, src, quantity, id };
    };
    
    const renderCart = () => {
        const ids = Object.keys(cart);
        ids.forEach((id) => renderCartItem(cart[id]));
        
    };

    const cartInit = () => {
        renderCart();
        updateCart();
        document.querySelector('body').addEventListener('click', (e) => {
        const target = e.target;

        if(target.classList.contains('btn-product')) {
            e.preventDefault();
            const productDOMElement = target.closest('.js-product');
            const data = getProductData(productDOMElement);
            addCartItem(data);
        }

        if(target.classList.contains('cart-product-delete__item')) {
            e.preventDefault();
            const cartItemDOMElement = target.closest('.js-cart-item');
            const productID = cartItemDOMElement.getAttribute('data-product-id');
            deleteCartItem(productID);
        }

        if(target.classList.contains('js-btn-product-increase-quantity')) {
            e.preventDefault();
            const cartItemDOMElement = target.closest('.js-cart-item');
            const productID = cartItemDOMElement.getAttribute('data-product-id');
            increaseQuantity(productID);
        }

        if(target.classList.contains('js-btn-product-decrease-quantity')) {
            e.preventDefault();
            const cartItemDOMElement = target.closest('.js-cart-item');
            const productID = cartItemDOMElement.getAttribute('data-product-id');
            decreaseQuantity(productID);
        }
        });
    };
    cartInit();

    document.querySelector('.order').addEventListener('submit', (e) => {
        e.preventDefault();
        let self = e.currentTarget;
        let formData = new FormData(self);
        let name = self.querySelector('[name="Имя"]').value;
        let tel = self.querySelector('[name="Телефон"]').value;
        let delivery = self.querySelector('[name="Куда доставить"]').value;
        formData.append('Товары', JSON.stringify(productArray));
        formData.append('Имя', name);
        formData.append('Телефон', tel);
        formData.append('Куда доставить', delivery);
    
        let xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) { 
                window.location.href = 'thank.html';
            }
        }
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
        self.reset();
    });
    

})();