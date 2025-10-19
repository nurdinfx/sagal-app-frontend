export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: any; // Changed to any for require()
  description?: string;
}

export const Products: Product[] = [
  {
    id: 1,
    name: 'Haanta 25 KG',
    price: 38,
    category: 'gas',
    image: require('../assets/images/gas1.jpg'),
    description: 'Standard 20kg LPG gas cylinder for home use'
  },
  {
    id: 2,
    name: 'Haanta 11 KG',
    price: 22,
    category: 'gas',
    image: require('../assets/images/gas4.jpg'),
    description: 'Medium 11kg LPG gas cylinder'
  },
  {
    id: 3,
    name: 'Haanta 6 KG',
    price: 12,
    category: 'gas',
    image: require('../assets/images/gas5.jpg'),
    description: 'Small 6kg LPG gas cylinder'
  },
  {
    id: 4,
    name: 'Kuukarka Dhaladaa',
    price: 45,
    category: 'cooker',
    image: require('../assets/images/cooker2.jpg'),
    description: 'High-quality premium gas cooker'
  },
  {
    id: 5,
    name: 'kuukarka cadiga ah',
    price: 35,
    category: 'cooker',
    image: require('../assets/images/cooker1.jpg'),
    description: 'Reliable standard gas cooker'
  },
  {
    id: 6,
    name: 'Tuubada Madow',
    price: 4,
    category: 'pipes',
    image: require('../assets/images/menu2.jpg'),
    description: 'Durable black gas pipe'
  },
  {
    id: 7,
    name: 'Tuubada Huruuda ah',
    price: 4,
    category: 'pipes',
    image: require('../assets/images/menu1.jpg'),
    description: 'High-quality copper gas pipe'
  }
];