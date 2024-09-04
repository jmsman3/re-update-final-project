
// const food_Detail_all = () =>{
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('id');

//     console.log({"my product id": productId});

//     // API search
//     const apiUrl = `http://127.0.0.1:8000/menu/product_detail/${productId}/`;

//     //fetch product details from  API
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             console.log({"each Product detail": data}); 
//             // Populate the HTML with product details
//             document.getElementById('product-image').src = data.image;
//             document.getElementById('product-name').innerText = data.product_name;
//             document.getElementById('product-price').innerText = `Price: $${data.price}`;
//             document.getElementById('product-description').innerText = data.description;
//             document.getElementById('product-stock').innerText = `Stock: ${data.stock} available`;
//         })
//         .catch(error => {
//             console.error('Error fetching product details:', error);
//         });
// };

const food_Detail_all = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log({"my product id": productId});

    // API search
    const apiUrl = `http://127.0.0.1:8000/menu/product_detail/${productId}/`;

    // Fetch product details from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log({"each Product detail": data}); 
            
            // Populate the HTML with product details
            document.getElementById('product-image').src = data.image;
            document.getElementById('product-name').innerText = data.product_name;
            document.getElementById('product-price').innerText = `Price: $${data.price}`;
            document.getElementById('product-description').innerText = data.description;
            document.getElementById('product-stock').innerText = `Stock: ${data.stock} available`;
            document.getElementById('product-category').innerText = data.category.category_name; // Assuming 'category' field exists

           
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
};

food_Detail_all();



