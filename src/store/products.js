class ProductStore {
    constructor() {
      if (ProductStore._instance) {
        return ProductStore._instance;
      }
  
      ProductStore._instance = this;
      return this;
    }
    const 
  }
  export default new ProductStore();