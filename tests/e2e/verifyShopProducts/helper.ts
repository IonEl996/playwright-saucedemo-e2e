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

  const selectSortOption = async (optionValue: string): Promise<void> => {
    await po.shopPg.sortDropDown.selectOption(optionValue);
  };

  const verifyProductSorting = async (
    sortType: "az" | "za" | "lohi" | "hilo",
  ): Promise<void> => {
    const uiNames = await po.shopPg.itemName.allTextContents();
    const uiPricesRaw = await po.shopPg.itemPrice.allTextContents();
    const uiPrices = uiPricesRaw.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    // Deep copy local expected array to avoid mutation side-effects
    const sortedExpectedData = [...EXPECTED_ITEMS];
    // Programmatically sort data to generate reference arrays & assert
    switch (sortType) {
      case "az": {
        console.log("Sorting by name (A-Z)");
        sortedExpectedData.sort((a, b) => a.name.localeCompare(b.name));
        const expectedNames = sortedExpectedData.map((item) => item.name);
        expect(uiNames).toEqual(expectedNames);
        break;
      }
      case "za": {
        console.log("Sorting by name (Z-A)");
        sortedExpectedData.sort((a, b) => b.name.localeCompare(a.name));
        const expectedNames = sortedExpectedData.map((item) => item.name);
        expect(uiNames).toEqual(expectedNames);
        break;
      }
      case "lohi": {
        console.log("Sorting by price (low to high)");
        sortedExpectedData.sort((a, b) => a.price - b.price);
        const expectedPrices = sortedExpectedData.map((item) => item.price);
        expect(uiPrices).toEqual(expectedPrices);
        break;
      }
      case "hilo": {
        console.log("Sorting by price (high to low)");
        sortedExpectedData.sort((a, b) => b.price - a.price);
        const expectedPrices = sortedExpectedData.map((item) => item.price);
        expect(uiPrices).toEqual(expectedPrices);
        break;
      }
    }
  };

  const getExpectedItemById = (productId: string): ExpectedItem => {
    const item = EXPECTED_ITEMS.find((i) => i.productId === productId);
    if (!item) {
      throw new Error(
        `Error: Product ID '${productId}' was not found in inventory-items.ts`,
      );
    }
    return item;
  };

  const targetProductContainer = (productName: string) => {
    return po.shopPg.inventoryItem.filter({
      has: po.shopPg.itemName.getByText(productName, { exact: true }),
    });
  };

  const addProductToCart = async (productName: string): Promise<void> => {
    console.log(`Action: Adding "${productName}" to the shopping cart.`);

    const container = targetProductContainer(productName);
    const addToCartBtn = container.locator(po.shopPg.itemAddToCartButton);
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
  };

  const openProductPage = async (productName: string): Promise<void> => {
    console.log(`Action: Open "${productName}" page.`);
    const container = targetProductContainer(productName);
    const product = container.locator(po.shopPg.itemName);
    await product.click();
  };

  const verifyProductButtonState = async (
    productName: string,
    state: "added" | "removed",
  ): Promise<void> => {
    const container = targetProductContainer(productName);
    const removeBtn = container.locator(po.shopPg.itemRemoveFromCartButton);
    const add2CartBtn = container.locator(po.shopPg.itemAddToCartButton);

    if (state === "added") {
      await expect(removeBtn).toBeVisible();
    } else {
      await expect(add2CartBtn).toBeVisible();
    }
  };

  const removeProductFromCart = async (productName: string): Promise<void> => {
    console.log(`Action: Removing "${productName}" from shopping cart`);

    const container = targetProductContainer(productName);
    const removeBtn = container.locator(po.shopPg.itemRemoveFromCartButton);
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  };

  const verifyShoppingCartBadge = async (
    expectedCount: number,
  ): Promise<void> => {
    console.log(
      `Assertion: Verify the cart badge display count: ${expectedCount}`,
    );

    if (expectedCount === 0) {
      await expect(po.shopPg.shoppingCartBadge).toBeHidden();
      console.log("No items in the cart.");
    } else {
      await expect(po.shopPg.shoppingCartBadge).toHaveText(
        expectedCount.toString(),
      );
      console.log(`${expectedCount} items in the cart.`);
    }
  };

  return {
    verifyInventoryItems,
    verifyItemAgainstExpected,
    verifyItemOrder,
    selectSortOption,
    verifyProductSorting,
    addProductToCart,
    getExpectedItemById,
    verifyProductButtonState,
    removeProductFromCart,
    verifyShoppingCartBadge,
    openProductPage,
  };
}
