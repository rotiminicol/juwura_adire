export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
  category: string;
  sizes?: string[]; // Optional: available sizes for the product
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}