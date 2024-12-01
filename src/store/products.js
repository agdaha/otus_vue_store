class ProductStore {
    constructor() {
      if (ProductStore._instance) {
        return ProductStore._instance;
      }
  
      ProductStore._instance = this;
      const products = [];
      return this;
    }

    Add(product) {
      this.products.push(product)
    }
  
  }
  export default new ProductStore();