document.addEventListener('DOMContentLoaded',function() {
   axios.get('https://crudcrud.com/api/98f75b8d553d4dc99ce9d1da815f7066/detais')
    .then(response => {
        response.data.forEach(dataproduct =>{
            display(dataproduct);
        });
    })
        .catch(error => {
            console.log(error);
        });
   
})
    const form=document.getElementById('form');
    form.addEventListener('submit',function(event){
        event.preventDefault();
   
        const productdetails = {
            price: document.getElementById('sp').value,
            name: document.getElementById('productname').value,
            category: document.getElementById('productcat').value
        };

        const productId = form.getAttribute('data-product-id'); 

        if (productId) {
            
            axios.put(`https://crudcrud.com/api/98f75b8d553d4dc99ce9d1da815f7066/detais/${productId}`, productdetails)
                .then(response => {
                    console.log('Product updated:', response.data);
                    
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        } else {
           
            axios.post('https://crudcrud.com/api/98f75b8d553d4dc99ce9d1da815f7066/detais', productdetails)
                .then(response => {
                    console.log('Product added:', response.data);
                    display(response.data); 
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        }

        form.reset(); 
    
    });


    function display(productdetails){
       const electroniclist=document.getElementById('electroniclist');
        const foodlist=document.getElementById('foodlist');
        const skinlist=document.getElementById('skinlist');

        const li=document.createElement('li');
        li.innerHTML=`${productdetails.price} | ${productdetails.name} | ${productdetails.category} |
        <button class="delete-butt" data-product-id="${productdetails._id}">Delete Product</button> |
        <button class="edit-butt" data-product-id="${productdetails._id}">Edit Product</button>`;
     
        switch(productdetails.category.toLowerCase()){
            case 'electronics':
                electroniclist.appendChild(li);
                break;
            case 'fooditems':
                foodlist.appendChild(li);
                break;
            case 'skincare':
                skinlist.appendChild(li);
                break;
            default:
                break;
        }

        li.querySelector('.delete-butt').addEventListener('click',function(){
            deleteProduct(productdetails._id,li);
        });

        li.querySelector('.edit-butt').addEventListener('click',function(){
            editProduct(productdetails);
        });

    }
    
    function deleteProduct(productId,li){
        axios.delete(`https://crudcrud.com/api/98f75b8d553d4dc99ce9d1da815f7066/detais/${productId}`)
        .then((response)=>{
            console.log(response.data);
            li.remove();
        })
        .catch(error=>{
           console.log(error);
        });
    }

    function editProduct(productdetails){
        document.getElementById('sp').value=productdetails.price;
        document.getElementById('productname').value=productdetails.name;
        document.getElementById('productcat').value=productdetails.category;

      document.getElementById('form').setAttribute('data-product-id',productdetails._id);
    }


