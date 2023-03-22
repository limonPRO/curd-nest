import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete
  } from "@nestjs/common"
  
  @Controller("products")
  export class ProductsController {
    constructor(productsService) {
      this.productsService = productsService
    }
  
    @Post()
    addProduct(
      @Body("title")
      prodTitle,
      @Body("description")
      prodDesc,
      @Body("price")
      prodPrice
    ) {
      const generatedId = this.productsService.insertProduct(
        prodTitle,
        prodDesc,
        prodPrice
      )
      return { id: generatedId }
    }
  
    @Get()
    getAllProducts() {
      return this.productsService.getProducts()
    }
  
    @Get(":id")
    getProduct(
      @Param("id")
      prodId
    ) {
      return this.productsService.getSingleProduct(prodId)
    }
  
    @Patch(":id")
    updateProduct(
      @Param("id")
      prodId,
      @Body("title")
      prodTitle,
      @Body("description")
      prodDesc,
      @Body("price")
      prodPrice
    ) {
      this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
      return null
    }
  
    @Delete(":id")
    removeProduct(
      @Param("id")
      prodId
    ) {
      this.productsService.deleteProduct(prodId)
      return null
    }
  }
  