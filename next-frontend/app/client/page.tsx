"use client";

import { useEffect, useState } from "react";

type Dog = { id: number; name: string; type: string; image: string };

export default function ClientPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  const getDogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pets");
      const data = await response.json();
      setDogs(data);
    } catch {
      setDogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-slate-800 px-5 py-4 text-white">
        <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <h1 className="text-2xl font-bold">PetCare</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm"><a href="/">SSR</a><a href="#pets">Pets</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div>
        </nav>
      </header>

      <section className="flex min-h-[55vh] items-center justify-center bg-cover bg-center px-5 text-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517849845537-4d257902454a')" }}>
        <div className="rounded-lg bg-black/60 p-7 text-white sm:p-10"><p className="mb-3">CLIENT-SIDE RENDERING</p><h2 className="mb-4 text-4xl font-bold sm:text-5xl">PetCare CSR</h2><p className="mb-5">Pet data is fetched in the browser.</p><a className="m-1 inline-block rounded bg-orange-500 px-5 py-3" href="/">Back to SSR</a><button className="m-1 rounded bg-orange-500 px-5 py-3" onClick={getDogs}>Refresh Data</button></div>
      </section>

      <section id="pets" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Available Pets - CSR</h2>
        {loading && <p className="text-center">Loading pets...</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{dogs.map((dog) => <div className="rounded-lg bg-white p-4 text-center shadow" key={dog.id}><img className="mb-3 h-52 w-full rounded object-cover" src={dog.image} alt={dog.name} /><h3 className="text-xl font-semibold capitalize">{dog.name}</h3><p className="mt-2">Type: {dog.type}</p></div>)}</div>
        {!loading && dogs.length === 0 && <p className="text-center">Data could not be loaded.</p>}
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-16"><h2 className="mb-8 text-center text-3xl font-bold">Our Services</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><div className="rounded-lg bg-white p-5 text-center shadow"><h3 className="text-xl font-semibold">Pet Adoption</h3><p className="mt-2">Adopt healthy and happy pets.</p></div><div className="rounded-lg bg-white p-5 text-center shadow"><h3 className="text-xl font-semibold">Vaccination</h3><p className="mt-2">Regular health checkups for pets.</p></div><div className="rounded-lg bg-white p-5 text-center shadow"><h3 className="text-xl font-semibold">Pet Grooming</h3><p className="mt-2">Professional grooming services.</p></div></div></section>
      <section id="gallery" className="mx-auto max-w-6xl px-5 py-16"><h2 className="mb-8 text-center text-3xl font-bold">Pet Gallery</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><img className="h-56 w-full rounded object-cover" src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="Dog" /><img className="h-56 w-full rounded object-cover" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131" alt="Cat" /><img className="h-56 w-full rounded object-cover" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b" alt="Pet" /><img className="h-56 w-full rounded object-cover" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" alt="Pet" /></div></section>
      <section id="contact" className="mx-auto max-w-6xl px-5 py-16"><h2 className="mb-8 text-center text-3xl font-bold">Contact Us</h2><div className="flex flex-col gap-7 rounded-lg bg-white p-6 shadow md:flex-row"><div className="md:w-1/3"><h3 className="text-xl font-semibold">PetCare Center</h3><p className="mt-3">Bangalore, Karnataka</p><p>+91 9876543210</p><p>petcare@gmail.com</p></div><form className="flex flex-1 flex-col gap-3"><input className="rounded border p-3" placeholder="Enter Name" /><input className="rounded border p-3" placeholder="Enter Email" /><textarea className="rounded border p-3" rows={5} placeholder="Enter Message" /><button className="rounded bg-slate-800 p-3 text-white">Send Message</button></form></div></section>
      <footer className="bg-slate-800 p-5 text-center text-white">© 2026 PetCare. All Rights Reserved.</footer>
    </main>
  );
}
