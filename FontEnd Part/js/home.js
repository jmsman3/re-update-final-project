// Token ta check kori
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); 
};


// const placeOrder = (cartId, event) => {
//     console.log('Sending request with cartId:', cartId);
// console.log('Token:', localStorage.getItem('token'));

//     event.preventDefault();

//     if (!isAuthenticated()) {
//         alert('Please log in to place an order.');
//         window.location.href = 'login.html';
//         return;
//     }

//     fetch(`http://127.0.0.1:8000/order/order_now`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ cart_id: cartId })
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Failed to place order');
//         }
//     })
//     .then(data => {
//         console.log('Order placed successfully:', data);
//         window.location.href = 'order.html';  // Redirect korlam history page
//     })
//     .catch(error => {
//         console.error('Error placing order:', error);
//     });
// };

// const placeOrder = (cartId, event) => {
//     event.preventDefault();

//     if (!isAuthenticated()) {
//         alert('Please log in to place an order.');
//         window.location.href = 'login.html';
//         return;
//     }

//     console.log('Placing order with cartId:', cartId);
//     console.log('Token:', localStorage.getItem('token'));

//     fetch('http://127.0.0.1:8000/order/order_now', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ product : cartId })
//     })
//     .then(response => {
//         console.log('Response status:', response.status);
//         return response.json().then(data => ({ response, data }));
//     })
//     .then(({ response, data }) => {
//         if (response.ok) {
//             console.log('Order placed successfully:', data);
//             window.location.href = 'order.html';
//         } else {
//             console.error('Response data:', data);
//             throw new Error('Failed to place order');
//         }
//     })
//     .catch(error => {
//         console.error('Error placing order:', error);
//     });
// };


const placeOrder = (cartId, event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
        alert('Please log in to place an order.');
        window.location.href = 'login.html';
        return;
    }

    const quantity = 1; // Default quantity, or retrieve from user input if needed

    console.log('Placing order with cartId:', cartId);
    console.log('Token:', localStorage.getItem('token'));
    console.log({ product: cartId, quantity: quantity });

    fetch('http://127.0.0.1:8000/order/order_now', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ product: cartId, quantity: quantity })  // Include quantity
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json().then(data => ({ response, data }));
    })
    .then(({ response, data }) => {
        console.log(response);
        console.log(data);
        if (response.ok) {
            console.log('Order placed successfully:', data);
            window.location.href = 'order.html';
        } else {
            console.error('Response data:', data);
            throw new Error('Failed to place order');
        }
    })
    .catch(error => {
        console.error('Error placing order:', error);
    });
};



const homePageCart = () => {
    
    console.log('acdddddddd')
    fetch("http://127.0.0.1:8000/menu/products/")
        .then(res => res.json())
        .then((data) => homePage_cart_Detail(data))
        .catch((error) => {
            console.log("Error fetching data:", error);
        });
};



const homePage_cart_Detail = (data) => {
    console.log("Full Product detail:", data);
    const parent = document.getElementById("home_Cart_Show");
    parent.innerHTML = '';

    let savedCartIds = JSON.parse(localStorage.getItem("SavedCartIds")) || [];

    data.data.forEach((cart) => {
        const cart_id = cart.id;
        if (!savedCartIds.includes(cart_id)) {
            savedCartIds.push(cart_id);
            localStorage.setItem("SavedCartIds", JSON.stringify(savedCartIds));
        }
        
        const div = document.createElement("div");
        div.classList.add("card", "mb-4");
        div.style.width = '18rem';

        const imageUrl = `http://127.0.0.1:8000${cart.image}`;

        div.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="${cart.product_name}">
            <div class="card-body">
                <h5 class="card-title">Food name: ${cart.product_name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Category: ${cart.category.category_name}</h6>
                <p class="card-text">Description: ${cart.description.slice(0, 30)}...</p>
                <p class="card-text"><strong>Price:</strong>${cart.price}</p>
              
                <p class="card-text"><strong>Stock:</strong> ${cart.stock}</p>
                <p class="card-text"><strong>Discount:</strong> Available</p>
                <a href="#" class="btn btn-primary" onclick="placeOrder('${cart.id}', event)">Order Now</a>
                <a href="food_Details.html?id=${cart.id}" class="btn btn-primary">Details</a>

                <a href="#" class="btn btn-primary mt-1" onclick="handle_AddToCart('${cart.id}', '${cart.product_name}', '${cart.price}', '${cart.stock}', '${cart.category.category_name}', '${imageUrl}', event)">Add to Cart</a>
            </div>
        `;
        parent.appendChild(div);
    });

    if (isAuthenticated()) {
        document.querySelector('main.container.mt-4').style.display = 'block';
    } else {
        document.querySelector('main.container.mt-4').style.display = 'none';
    }

    if (isAuthenticated()) {
        document.getElementById('display-profile-button').style.display = 'block';
    } else {
        document.getElementById('display-profile-button').style.display = 'none';
    }
};


const handle_AddToCart = (id, name, price, stock, category_name, image, event) => {
    event.preventDefault();

    if (!isAuthenticated()) {
        alert('Please log in to add items to the cart.');
        return;
    }
 
    const parent = document.getElementById("cart-table-body");
    console.log("Adding to cart:", name, price, stock, category_name, id); 

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${name}</td>
    <td><img src="${image}" alt="${name}" style="width: 50px; height: 50px;"></td>
        <td class="each_price">${price}</td>
        <td>${stock}</td>
        <td>${category_name}</td>
        <td>
             <a href="#" class="btn btn-primary" onclick="placeOrder('${id}', event)">Order Now</a>
            <a href="#" class="btn btn-danger" onclick="handle_RemoveFromCart(event)">Remove from Cart</a>
        </td>
    `;
    
    parent.appendChild(row);
    console.log(parent);
    
    UpdateTotal();
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ id, name, price, stock, category_name, image });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log("Row appended to table body");
};


const handle_RemoveFromCart = (event) => {
    event.preventDefault();
    const row = event.target.closest('tr'); // Get the closest table row
    const price = parseFloat(row.querySelector('.each_price').innerText);

    // Remove row from the table
    row.remove();

    UpdateTotal();

    // Update cartItems in localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const name = row.querySelector('td').innerText; 
    cartItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log("Row removed from table body");
};

const UpdateTotal = () =>{
    const allPrice = document.getElementsByClassName("each_price");
    let count = 0;
    for(const element of allPrice){
        count = count + parseFloat(element.innerText);
    }
    document.getElementById("total").innerText = count;
};

homePageCart();

