import { expect, Locator, Page } from "@playwright/test";
import { PO } from "../../../src/fixtures/pageObjects.ts";

interface CartItem {
  name: string;
  description: string;
  price: number;
}

export function addToCartHelper(po: PO) {

    const verifySingleCartItem = async (
        index: number,
      ): Promise<CartItem> => {
        const allNames = await po.shopPg.itemName.all();
        const allDescs = await po.shopPg.itemDescription.all();
        const allPrices = await po.shopPg.itemPrice.all();
    
        const nameLocator = allNames[index];
        const descLocator = allDescs[index];
        const priceLocator = allPrices[index];
    
        await expect(nameLocator).toBeVisible();
        const name = await nameLocator.textContent();
        await expect(descLocator).toBeVisible();
        const description = await descLocator.textContent();
        await expect(priceLocator).toBeVisible();
        const priceText = await priceLocator.textContent();
        const price = parseFloat(priceText?.replace("$", "") || "0");
        expect(price).toBeGreaterThan(0);
        expect(priceText).toMatch(/^\$\d+\.\d{2}$/);
    
        const verifiedCartItem: CartItem = {
          name: name || "",
          description: description || "",
          price,
        };
    
        console.log(`✓ Verified: ${name} - $${price}`);
    
        return verifiedCartItem;
      };

    const verifyCartItems = async (): Promise<CartItem[]> => {
        // Get all inventory items
        const cartItems = await po.shopPg.inventoryItem.all();
    
        console.log(`Found ${cartItems.length} inventory items`);
        expect(cartItems.length).toBeGreaterThan(0);
    
        const verifiedItems: CartItem[] = [];
    
        for (let i = 0; i < cartItems.length; i++) {
          console.log(`\nVerifying item ${i + 1}/${cartItems.length}`);
    
          const verifiedItem = await verifySingleCartItem(i);
          verifiedItems.push(verifiedItem);
        }
    
        return verifiedItems;
      };

    return {
        verifyCartItems,
    };
}