const pets = [
  { id: 1, name: "Buddy", type: "Dog", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a" },
  { id: 2, name: "Milo", type: "Cat", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
  { id: 3, name: "Rocky", type: "Dog", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b" },
  { id: 4, name: "Bella", type: "Dog", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" },
  { id: 5, name: "Luna", type: "Cat", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
  { id: 6, name: "Max", type: "Dog", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a" }
];

export async function GET() {
  return Response.json(pets);
}
