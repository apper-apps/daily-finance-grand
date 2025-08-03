import transactionsData from "@/services/mockData/transactions.json";

class TransactionService {
  constructor() {
    this.transactions = [...transactionsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.transactions];
  }

async getById(id) {
    await this.delay(200);
    if (!id) {
      throw new Error("Transaction ID is required");
    }
    const transaction = this.transactions.find(t => t.id === parseInt(id) || t.Id === parseInt(id));
    if (!transaction) {
      throw new Error(`Transaction not found with ID: ${id}`);
    }
    return { ...transaction };
  }

async create(transactionData) {
    await this.delay(400);
    
    const maxId = this.transactions.length > 0 
      ? Math.max(...this.transactions.map(t => t.Id))
      : 0;
    
    const newTransaction = {
      Id: maxId + 1,
      ...transactionData,
      date: transactionData.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

async update(id, updateData) {
    await this.delay(300);
    
    if (!id) {
      throw new Error("Transaction ID is required");
    }
    
    const index = this.transactions.findIndex(t => t.id === parseInt(id) || t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Transaction not found with ID: ${id}`);
    }
    
    this.transactions[index] = {
      ...this.transactions[index],
      ...updateData,
      id: parseInt(id)
    };
    
    return { ...this.transactions[index] };
  }

async delete(id) {
    await this.delay(250);
    
    if (!id) {
      throw new Error("Transaction ID is required");
    }
    
    const index = this.transactions.findIndex(t => t.id === parseInt(id) || t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Transaction not found with ID: ${id}`);
    }
    
    this.transactions.splice(index, 1);
    return true;
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const transactionService = new TransactionService();