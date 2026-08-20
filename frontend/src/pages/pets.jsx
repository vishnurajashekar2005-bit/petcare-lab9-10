import { useEffect, useState } from "react";

function Pets() {
  const [pets, setPets] = useState([]);
  const [owner, setOwner] = useState("");
  const [pet, setPet] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [searchField, setSearchField] = useState("type");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState("");

  const API_URL = "http://localhost:8000/api/pets";

  const getPets = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPets(data.pets || data);
  };

  const searchPets = async () => {
    if (!searchTerm) {
      getPets();
      return;
    }

    const response = await fetch(
      `${API_URL}/${searchField}/${searchTerm}`
    );

    const data = await response.json();
    setPets(data.pets || data);
  };

  
}

export default Pets;