"use client";

import { useState } from "react";

export default function AdoptButton() {
  const [message, setMessage] = useState("");

  return (
    <>
      <button className="m-1 rounded bg-orange-500 px-5 py-3" onClick={() => setMessage("Thank you for choosing pet adoption.")}>Adopt Now</button>
      {message && <p className="mt-3">{message}</p>}
    </>
  );
}
