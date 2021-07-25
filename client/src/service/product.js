export default class ProductService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getProduct(id) {
    // Todo: id가 없는 상황은 어디서 에러 핸들을 하는게 좋은걸까
    if (!id) {
      console.error(
        'You are using getProduct function without id. It will return multiple products.'
      );
    }
    return this.http.fetch(`/product/${id}`, {
      method: 'GET',
    });
  }

  async getProducts(category) {
    const query = category ? `?category=${category}` : '';
    return this.http.fetch(`/product${query}`, {
      method: 'GET',
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
