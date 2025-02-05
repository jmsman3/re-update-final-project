// const displayOrderHistory = async () => {
//     const tbody = document.querySelector('#order-history tbody');
//     if (!tbody) {
//         console.error('Tbody element not found.');
//         return;
//     }
//     tbody.innerHTML = '';
//     try {
//         const response = await fetch('http://127.0.0.1:8000/order/order_now', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${localStorage.getItem('token')}` // Include token if authentication is needed
//             }
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const orders = await response.json();
         
//         orders.forEach(order => {
//             const row = document.createElement('tr');
//             const imageUrl = `http://127.0.0.1:8000${order.product.image}`;
//             row.innerHTML = `
//                 <td>
//                     <img src="${imageUrl || 'default-image.jpg'}" alt="${order.product.product_name}" style="width: 50px; height: auto;">
//                     ${order.product.product_name}
//                 </td>
//                 <td>$${order.price.toFixed(2)}</td>
//                 <td>${order.quantity}</td>
//                 <td>$${(order.price * order.quantity).toFixed(2)}</td>
//                 <td>${order.order.delivery_status}</td>
//             `;
//             tbody.appendChild(row);
           
//         });

//     } catch (error) {
//         console.error('Error fetching order data:', error);
//         const errorRow = document.createElement('tr');
//         errorRow.innerHTML = `
//             <td colspan="4" class="text-danger text-center">Failed to load order history.</td>
//         `;
//         tbody.appendChild(errorRow);
//     }
// };

// Ensure the function is called after DOM is fully loaded
const displayOrderHistory = async () => {
    const tbody = document.querySelector('#order-history tbody');
    if (!tbody) {
        console.error('Tbody element not found.');
        return;
    }

    tbody.innerHTML = '';

    // Check for the authentication token
    const token = localStorage.getItem('token');
    if (!token) {
        // Display a message if the user is not logged in
        const errorRow = document.createElement('tr');
        errorRow.innerHTML = `
            <td colspan="5" class="text-danger text-center">Please log in to see your order history.</td>
        `;
        tbody.appendChild(errorRow);
        return; // Exit the function
    }

    try {
        const response = await fetch(' http://127.0.0.1:8000/order/order_now', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Include token if authentication is needed
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const orders = await response.json();

        orders.forEach(order => {
            const row = document.createElement('tr');
            const imageUrl = `http://127.0.0.1:8000${order.product.image}`;
            row.innerHTML = `
                <td>
                    <img src="${imageUrl || 'default-image.jpg'}" alt="${order.product.product_name}" style="width: 50px; height: auto;">
                    ${order.product.product_name}
                </td>
                <td>$${order.price.toFixed(2)}</td>
                <td>${order.quantity}</td>
                <td>$${(order.price * order.quantity).toFixed(2)}</td>
                <td>${order.order.delivery_status}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching order data:', error);
        const errorRow = document.createElement('tr');
        errorRow.innerHTML = `
            <td colspan="5" class="text-danger text-center">Failed to load order history.</td>
        `;
        tbody.appendChild(errorRow);
    }
};

// Ensure the function is called after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayOrderHistory();
});

