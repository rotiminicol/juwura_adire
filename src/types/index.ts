export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}