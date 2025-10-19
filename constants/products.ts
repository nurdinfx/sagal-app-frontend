export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export const Products: Product[] = [
  {
    id: 1,
    name: '20 KG LPG Cylinder',
    price: 38,
    category: 'gas',
    image: 'gas_cylinder',
    description: 'Standard 20kg LPG gas cylinder for home use'
  },
  {
    id: 2,
    name: '11 KG LPG Cylinder',
    price: 22,
    category: 'gas',
    image: 'gas_cylinder',
    description: 'Medium 11kg LPG gas cylinder'
  },
  {
    id: 3,
    name: '6 KG LPG Cylinder',
    price: 12,
    category: 'gas',
    image: 'gas_cylinder',
    description: 'Small 6kg LPG gas cylinder'
  },
  {
    id: 4,
    name: 'Premium Gas Cooker',
    price: 45,
    category: 'cooker',
    image: 'gas_cooker',
    description: 'High-quality premium gas cooker'
  },
  {
    id: 5,
    name: 'Standard Gas Cooker',
    price: 35,
    category: 'cooker',
    image: 'gas_cooker',
    description: 'Reliable standard gas cooker'
  },
  {
    id: 6,
    name: 'Gas Pipe (Black)',
    price: 4,
    category: 'pipes',
    image: 'gas_pipe',
    description: 'Durable black gas pipe'
  },
  {
    id: 7,
    name: 'Gas Pipe (Copper)',
    price: 4,
    category: 'pipes',
    image: 'gas_pipe',
    description: 'High-quality copper gas pipe'
  }
];