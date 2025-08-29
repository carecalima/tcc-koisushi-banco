// rodizio.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const cartButton = document.querySelector('.cart-button:not([href])');
    const menuItems = document.querySelectorAll('.menu-item');
    const contentDiv = document.querySelector('.content');
    
    // Estado do carrinho
    let cartItems = [];
    let isCartOpen = false;
    
    // Função para criar/atualizar o carrinho
    function updateCart() {
        // Remove o carrinho existente se estiver aberto
        const existingCart = document.querySelector('.cart-overlay');
        if (existingCart) {
            existingCart.remove();
        }
        
        if (!isCartOpen) return;
        
        // Cria o overlay do carrinho
        const cartOverlay = document.createElement('div');
        cartOverlay.className = 'cart-overlay';
        
        // Cria o conteúdo do carrinho
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
                                <div class="item-price">
                                    R$ ${item.price.toFixed(2)} x ${item.quantity}
                                </div>
                                <button class="remove-item">-</button>
                            </div>
                        `).join('') : 
                        '<p class="empty-cart">Seu carrinho está vazio</p>'
                    }
                </div>
                
                <div class="cart-total">
                    Total: R$ ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </div>
                
                <div class="cart-actions">
                    <button class="clear-cart">Limpar Carrinho</button>
                    <button class="checkout">Finalizar Pedido</button>
                </div>
            </div>
        `;
        
        // Adiciona ao DOM
        document.body.appendChild(cartOverlay);
        
        // Event listeners para os botões do carrinho
        cartOverlay.querySelector('.close-cart').addEventListener('click', toggleCart);
        cartOverlay.querySelector('.clear-cart').addEventListener('click', clearCart);
        
        // Event listeners para remover itens
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                removeFromCart(itemId);
            });
        });
    }
    
    // Função para alternar o carrinho
    function toggleCart() {
        isCartOpen = !isCartOpen;
        updateCart();
    }
    
    // Função para adicionar ao carrinho
    function addToCart(item) {
        const existingItem = cartItems.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...item,
                quantity: 1
            });
        }
        
        updateCart();
    }
    
    // Função para remover do carrinho
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
    
    // Função para limpar o carrinho
    function clearCart() {
        cartItems = [];
        updateCart();
    }
    
    // Adiciona evento ao botão do carrinho
    cartButton.addEventListener('click', toggleCart);
    
    // Adiciona eventos aos itens do menu
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const name = this.querySelector('strong').textContent;
            const description = this.querySelector('p').textContent;
            
            // IDs e preços fictícios - você deve ajustar conforme seu sistema
            const itemId = `item-${index}`;
            const price = getPriceForItem(name); // Função fictícia
            
            addToCart({
                id: itemId,
                name: name,
                description: description,
                price: price
            });
        });
    });
    
    // Função auxiliar para obter preços (substitua pelos seus preços reais)
    function getPriceForItem(itemName) {
        const prices = {
            'Sunomono': 16.90,
            'Carpaccio de Salmão': 25.00,
            'Camarão': 28.00,
            'Jow': 22.00,
            'Hot Roll': 18.00,
            'Niguiri': 15.00
        };
        
        return prices[itemName] || 0;
    }
});