import {type Page, type Locator} from '@playwright/test'

export class InventoryPage{
    readonly page:Page
    readonly pageTitle:Locator
    readonly shoppingCartLink:Locator
    readonly shoppingCartBadge:Locator
    readonly productSortContainer:Locator
    readonly inventoryItems:Locator
    readonly burgerMenuButton:Locator
    readonly logoutLink:Locator

    constructor(page:Page){
        this.page = page
        this.pageTitle=page.locator('[data-test="title"]')
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.productSortContainer = page.locator('[data-test="product-sort-container"]')
        this.inventoryItems = page.locator('[data-test="inventory-item"]')
        this.burgerMenuButton = page.locator('#react-burger-menu-btn')
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]')

    }

    async addProductToCart(productName:string){
        await this.inventoryItems.filter({hasText:productName}).getByRole('button', {name:'Add to cart'}).click()
    }

    async removeProductFromCart(productName:string){
        await this.inventoryItems.filter({hasText:productName}).getByRole('button', {name:'Remove'}).click()

    }

    async logout(){
        await this.burgerMenuButton.click()
        await this.logoutLink.click()
    }
}