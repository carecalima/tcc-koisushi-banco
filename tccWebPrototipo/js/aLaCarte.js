document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('.cart-button');
    const cartModal = createCartModal();
    document.body.appendChild(cartModal);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartButton.addEventListener('click', function() {
        updateCartModal();
        cartModal.style.display = 'block';
    });
    
    cartModal.querySelector('.close').addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    document.querySelectorAll('.menu-item').forEach(item => {
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.textContent = '+';
        addButton.addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(item);
        });
        item.appendChild(addButton);
    });
    
    function addToCart(menuItem) {
        const itemName = menuItem.querySelector('strong').textContent;
        const itemDescription = menuItem.querySelector('p').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace(',', '.'));
        
        const existingItem = cart.find(item => item.name === itemName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        showAddedFeedback(menuItem);
        updateCartCounter();
    }
    
    function showAddedFeedback(item) {
        const feedback = document.createElement('div');
        feedback.className = 'added-feedback';
        feedback.textContent = 'Adicionado!';
        item.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }
    
    function updateCartCounter() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalItems > 0) {
            cartButton.innerHTML = `Carrinho (${totalItems})`;
        } else {
            cartButton.textContent = 'Carrinho';
        }
    }
    
    function createCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-content">
                <span class="close">&times;</span>
                <h2>Seu Carrinho</h2>
                <div class="cart-items"></div>
                <div class="cart-total">
                    <strong>Total: R$ <span class="total-value">0,00</span></strong>
                </div>
                <button class="checkout-button">Finalizar Pedido</button>
                <button class="clear-cart">Limpar Carrinho</button>
            </div>
        `;
        
        modal.querySelector('.clear-cart').addEventListener('click', function() {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartModal();
            updateCartCounter();
        });
        
        modal.querySelector('.checkout-button').addEventListener('click', function() {
            alert('Pedido finalizado com sucesso! Obrigado pela compra.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartModal();
            updateCartCounter();
            modal.style.display = 'none';
        });
        
        return modal;
    }
    
    function updateCartModal() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalValueElement = document.querySelector('.total-value');
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
            totalValueElement.textContent = '0,00';
            return;
        }
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <p>${item.description}</p>
                    <div class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</div>
                </div>
                <div class="item-total">R$ ${itemTotal.toFixed(2).replace('.', ',')}</div>
                <div class="item-actions">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
        
        totalValueElement.textContent = total.toFixed(2).replace('.', ',');
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartModal();
                updateCartCounter();
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartModal();
                updateCartCounter();
            });
        });
    }
    
    updateCartCounter();
});