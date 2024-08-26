export type ProductType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  price: number;
  gender: "Man" | "Woman" | "Unisex";
};
