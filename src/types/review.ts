export type Review = {
  id: number;
  name: string;
  role: string;
  category: "client" | "partner" | "intern" | "vendor" | "contractor";
  rating: number;
  content: string;
  date: string;
  project: string;
  featured?: boolean;
};
