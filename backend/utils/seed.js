


const getProductsData = async () => {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=200");
        if(!res.ok)  return null;

        const products = await res.json();
        for(let product of products) {
              console.log(`product ${product.id} ${product.title} ${product.category.name}`)
        }
    }catch (e) {
        console.error("failed when fetching product data")
    }
}

module.exports = getProductsData;
