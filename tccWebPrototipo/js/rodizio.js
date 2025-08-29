document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('.cart-button');
    const addButtons = document.querySelectorAll('.add-to-rodizio');
    let cartItems = [];
    let isCartOpen = false;

    function updateCart() {
        const existingCart = document.querySelector('.cart-overlay');
        if (existingCart) existingCart.remove();
        if (!isCartOpen) return;

        const cartOverlay = document.createElement('div');
        cartOverlay.className = 'cart-overlay';
        cartOverlay.innerHTML = `
            <div class="cart-container">
                <div class="cart-header">
                    <h2>Seu Carrinho</h2>
                    <button class="close-cart">×</button>
                </div>
                <div class="cart-items">
                    ${cartItems.length > 0 ? 
                        cartItems.map(item => `
                            <div class="cart-item" data-id="${item.id}">
                                <div class="item-info">
                                    <strong>${item.name}</strong>
                                    <p>${item.description}</p>
                                </div>
                                <div class="item-quantity">
                                    Quantidade: ${item.quantity}
                                </div>
                                <button class="remove-item">-</button>
                            </div>
                        `).join('') : 
                        '<p class="empty-cart">Seu carrinho está vazio</p>'
                    }
                </div>
                <div class="cart-total">
                    Valor fixo do rodízio: R$ 110,00 por pessoa
                </div>
                <div class="cart-actions">
                    <button class="clear-cart">Limpar Carrinho</button>
                    <button class="checkout">Finalizar Pedido</button>
                </div>
            </div>
        `;
        document.body.appendChild(cartOverlay);

        cartOverlay.querySelector('.close-cart').addEventListener('click', toggleCart);
        cartOverlay.querySelector('.clear-cart').addEventListener('click', clearCart);
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                removeFromCart(itemId);
            });
        });
        // Evento do botão Finalizar Pedido
        cartOverlay.querySelector('.checkout').addEventListener('click', function() {
            if (cartItems.length === 0) {
                alert('Seu carrinho está vazio!');
            } else {
                alert('Pedido finalizado! Obrigado por escolher o Koi Sushi.');
                clearCart();
                toggleCart();
            }
        });
    }

    function toggleCart() {
        isCartOpen = !isCartOpen;
        updateCart();
    }

    function addToCart(item) {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
        if (existingItem.quantity > 5) {
            alert('Atenção com a quantidade de itens, seja mais consciente!');
        }
    } else {
        cartItems.push({
            ...item,
            quantity: 1
        });
    }
    updateCart();
}

    function removeFromCart(itemId) {
        const itemIndex = cartItems.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantity > 1) {
                cartItems[itemIndex].quantity -= 1;
            } else {
                cartItems.splice(itemIndex, 1);
            }
        }
        updateCart();
    }

    function clearCart() {
        cartItems = [];
        updateCart();
    }

    if (cartButton) cartButton.addEventListener('click', toggleCart);

    addButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = btn.closest('.menu-item');
            const name = parent.querySelector('strong') ? parent.querySelector('strong').textContent : '';
            const description = parent.querySelector('p') ? parent.querySelector('p').textContent : '';
            const itemId = `${name}-${index}`;
            addToCart({
                id: itemId,
                name: name,
                description: description
            });
        });
    });
});