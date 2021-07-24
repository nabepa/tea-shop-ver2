export default class ProductService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getProducts(category) {
    const query = category ? `?product?category=${category}` : '';
    return this.http.fetch(`/product${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async postProduct(category, name, price, stock, description, image) {
    return this.http.fetch(`/product`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        category,
        name,
        price,
        stock,
        description,
        image,
      }),
    });
  }

  async updateProduct(
    productId,
    category,
    name,
    price,
    stock,
    description,
    image
  ) {
    return this.http.fetch(`/product/${productId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({
        category,
        name,
        price,
        stock,
        description,
        image,
      }),
    });
  }

  async deleteProduct(productId) {
    return this.http.fetch(`/product/${productId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
