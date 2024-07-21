document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
  
    const sellingPrice = parseFloat(document.getElementById('sp').value);
    const productName = document.getElementById('productname').value;
    const productCategory = document.getElementById('productcat').value;
  
   
    const product = {
      price: sellingPrice,
      productname: productName,
      productcat: productCategory
    };
  
    
    axios.post('https://crudcrud.com/api/118ccabeb9bf45e4883b383817dffae9/product', product)
      .then(response => {
        console.log('Product added:', response.data);
        display(response.data);
        document.getElementById('form').reset(); 
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  });
  
 
  axios.get('https://crudcrud.com/api/118ccabeb9bf45e4883b383817dffae9/product')
    .then(response => {
      response.data.forEach(product => {
        display(product);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  
  
  function display(productdetails) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${productdetails.productname} - ${productdetails.price.toFixed(2)}
      <button class="delete-btn" data-product-id="${productdetails._id}">Delete Product</button>
    `;
  
    switch (productdetails.productcat.toLowerCase()) {
      case 'electronics':
        document.getElementById('electroniclist').appendChild(listItem);
        break;
      case 'food items':
        document.getElementById('foodlist').appendChild(listItem);
        break;
      case 'skin care':
        document.getElementById('skinlist').appendChild(listItem);
        break;
      default:
        
        break;
    }
  
   
    listItem.querySelector('.delete-btn').addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      deleteProduct(productId, listItem);
    });
  }
  

  function deleteProduct(productId, listItem) {
    axios.delete(`https://crudcrud.com/api/118ccabeb9bf45e4883b383817dffae9/product/${productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        listItem.remove();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  }