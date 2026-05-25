import { expect, Locator, Page } from "@playwright/test";
import { PO } from "../../../src/fixtures/pageObjects.ts";
import { EXPECTED_ITEMS, ExpectedItem } from "./data/inventory-items.ts";

interface InventoryItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
}

export function shopProductsHelper(po: PO) {
  const verifySingleInventoryItem = async (
    //itemLocator: Locator,
    index: number,
  ): Promise<InventoryItem> => {
    const allNames = await po.shopPg.itemName.all();
    const allDescs = await po.shopPg.itemDescription.all();
    const allPrices = await po.shopPg.itemPrice.all();
    const allImages = await po.shopPg.itemImage.all();

    const nameLocator = allNames[index];
    const descLocator = allDescs[index];
    const priceLocator = allPrices[index];
    const imgLocator = allImages[index];

    await expect(nameLocator).toBeVisible();
    const name = await nameLocator.textContent();

    await expect(descLocator).toBeVisible();
    const description = await descLocator.textContent();

    await expect(priceLocator).toBeVisible();
    const priceText = await priceLocator.textContent();
    const price = parseFloat(priceText?.replace("$", "") || "0");

    // Verify price is valid
    expect(price).toBeGreaterThan(0);
    expect(priceText).toMatch(/^\$\d+\.\d{2}$/);

    // Verify image
    await expect(imgLocator).toBeVisible();
    const imageUrl = await imgLocator.getAttribute("src");
    const imageAlt = await imgLocator.getAttribute("alt");

    // Verify image attributes
    expect(imageUrl).toBeTruthy();
    expect(imageUrl).toMatch(/\.(jpg|jpeg|png|gif|webp)$/i);
    expect(imageAlt).toBeTruthy();
    expect(imageAlt).toBe(name); // Alt should match product name

    // Verify image is loaded
    const naturalWidth = await imgLocator.evaluate(
      (img: any) => img.naturalWidth,
    );
    expect(naturalWidth).toBeGreaterThan(0);

    const verifiedItem: InventoryItem = {
      name: name || "",
      description: description || "",
      price,
      imageUrl: imageUrl || "",
      imageAlt: imageAlt || "",
    };

    console.log(`✓ Verified: ${name} - $${price}`);

    return verifiedItem;
  };

  const verifyInventoryItems = async (): Promise<InventoryItem[]> => {
    // Get all inventory items
    const inventoryItems = await po.shopPg.inventoryItem.all();

    console.log(`Found ${inventoryItems.length} inventory items`);
    expect(inventoryItems.length).toBeGreaterThan(0);

    const verifiedItems: InventoryItem[] = [];

    for (let i = 0; i < inventoryItems.length; i++) {
      const item = inventoryItems[i];
      console.log(`\nVerifying item ${i + 1}/${inventoryItems.length}`);

      const verifiedItem = await verifySingleInventoryItem(i);
      verifiedItems.push(verifiedItem);
    }

    return verifiedItems;
  };

  const verifyItemAgainstExpected = async (
    actual: InventoryItem,
    expected: ExpectedItem,
  ): Promise<void> => {
    const verifiedItems = await verifyInventoryItems();
    console.log(`\n🔍 Detailed verification of: ${actual.name}`);

    for (let i = 0; i < verifiedItems.length; i++) {
      const actual = verifiedItems[i];
      const expected = EXPECTED_ITEMS[i];

      expect(actual.name).toBe(expected.name);
      expect(actual.description).toBe(expected.description);
      expect(actual.price).toBe(expected.price);
      expect(actual.imageUrl).toContain(expected.imageUrl);
      expect(actual.imageAlt).toBe(expected.imageAlt);
    }

    console.log(`✅ All verifications passed for: ${expected.name}`);
  };

  const verifyItemOrder = async (
    expectedItems: ExpectedItem[],
  ): Promise<void> => {
    const itemNames = await po.shopPg.itemName.allTextContents();
    const expectedOrder = expectedItems.map((item) => item.name);

    expect(itemNames).toEqual(expectedOrder);
  };

  return {
    verifyInventoryItems,
    verifyItemAgainstExpected,
    verifyItemOrder,
  };
}
