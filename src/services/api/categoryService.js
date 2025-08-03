import categoriesData from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await this.delay(200);
    return [...this.categories];
  }

  async getById(id) {
    await this.delay(150);
    const category = this.categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  async getByType(type) {
    await this.delay(200);
    return this.categories.filter(c => c.type === type).map(c => ({ ...c }));
  }

  async create(categoryData) {
    await this.delay(300);
    
    const maxId = this.categories.length > 0 
      ? Math.max(...this.categories.map(c => c.Id))
      : 0;
    
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      isCustom: true
    };
    
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updateData) {
    await this.delay(250);
    
    const index = this.categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = {
      ...this.categories[index],
      ...updateData,
      Id: parseInt(id)
    };
    
    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay(200);
    
    const index = this.categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const category = this.categories[index];
    if (!category.isCustom) {
      throw new Error("Cannot delete default category");
    }
    
    this.categories.splice(index, 1);
    return true;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const categoryService = new CategoryService();