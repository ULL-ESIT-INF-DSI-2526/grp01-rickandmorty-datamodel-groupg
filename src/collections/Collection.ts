import { IEntity } from "../interfaces/IEntity.js";

/**
 * Generic abstract collection class that manages a set of objects.
 * @typeParam T - The type of objects stored in the collection.
 */
export abstract class Collection<T extends IEntity> {
  /** List of stored items */
  protected items: T[] = [];

  /**
   * Returns all the items in the collection.
   */
  getAll(): T[] {
    return [...this.items];
  }

  /**
   * Get an item by his ID.
   * @param id - The ID of the item.
   */
  getById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  /**
   * Adds a new item to the collection.
   */
  add(item: T): void {
    if (this.getById(item.id))
      throw new Error(`Item with id ${item.id} already exists`);
    this.items.push(item);
  }

  /**
   * Removes an item by his ID.
   */
  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  /**
   * Replaces an existing item with a new one.
   */
  replace(item: T): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index === -1) throw new Error("Item not found");
    this.items[index] = item;
  }

  /**
   * Loads items from an external source.
   */
  load(items: T[]): void {
    this.items = [...items];
  }

  /**
   * Converts the collection into a JSON array.
   */
  toJSON(): any[] {
    return this.items.map((item) => {
      const clean: any = {};

      for (const key in item) {
        const cleanKey = key.startsWith("_") ? key.substring(1) : key;
        clean[cleanKey] = (item as any)[key];
      }

      return clean;
    });
  }
}
