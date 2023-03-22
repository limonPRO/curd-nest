import { Injectable, NotFoundException } from "@nestjs/common"

@Injectable()
export class ProductsService {
  products = []

  constructor(productSchema) {
    this.productSchema = productSchema
  }

  async insertProduct(title, desc, price) {
    const newProduct = new this.productSchema({
      title: title,
      description: desc,
      price: price
    })
    const result = await newProduct.save()
    console.log(result)
    return "prodId"
  }

  getProducts() {
    return [...this.products]
  }

  getSingleProduct(productId) {
    const product = this.findProduct(productId)[0]
    return { ...product }
  }

  updateProduct(productId, title, desc, price) {
    const [product, index] = this.findProduct(productId)
    const updatedProduct = { ...product }
    if (title) {
      updatedProduct.title = title
    }
    if (desc) {
      updatedProduct.description = desc
    }
    if (price) {
      updatedProduct.price = price
    }
    //  this.products[index] = updatedProduct;
  }

  deleteProduct(prodId) {
    const index = this.findProduct(prodId)[1]
    this.products.splice(index, 1)
  }

  findProduct(id) {
    const productIndex = this.products.findIndex(prod => prod.id === id)
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException("Could not find product.")
    }
    return [product, productIndex]
  }
}
