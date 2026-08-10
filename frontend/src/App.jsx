import { useEffect, useState } from "react";

function App() {
  const [pets, setPets] = useState([]);
  const [owner, setOwner] = useState("");
  const [pet, setPet] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [searchField, setSearchField] = useState("type");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState("");

  const getPets = async () => {
    const response = await fetch("http://localhost:8000/api");
    const data = await response.json();
    setPets(data);
  };

  const searchPets = async () => {
    if (!searchTerm) {
      getPets();
      return;
    }

    const response = await fetch(
      `http://localhost:8000/api/${searchField}/${searchTerm}`
    );

    const data = await response.json();
    setPets(data);
  };

  const addPet = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner,
        pet,
        type,
        email
      })
    });

    const data = await response.json();
    alert(data.message);

    setOwner("");
    setPet("");
    setType("");
    setEmail("");

    getPets();
  };

  const updatePet = async () => {
    const response = await fetch(`http://localhost:8000/api/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner,
        pet,
        type,
        email
      })
    });

    const data = await response.json();
    alert(data.message);

    setEditId("");
    setOwner("");
    setPet("");
    setType("");
    setEmail("");

    getPets();
  };

  const deletePet = async (id) => {
    const response = await fetch(`http://localhost:8000/api/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();
    alert(data.message);

    getPets();
  };

  const editPet = (selectedPet) => {
    setEditId(selectedPet._id);
    setOwner(selectedPet.owner);
    setPet(selectedPet.pet);
    setType(selectedPet.type);
    setEmail(selectedPet.email || "");
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>PetCare</h1>

      <h2>{editId ? "Update Pet" : "Add Pet"}</h2>

      <form
        onSubmit={
          editId
            ? (e) => {
                e.preventDefault();
                updatePet();
              }
            : addPet
        }
      >
        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pet Name"
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pet Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {editId ? "Update Pet" : "Add Pet"}
        </button>
      </form>

      <h2>Search Pets</h2>

      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      >
        <option value="type">Type</option>
        <option value="owner">Owner</option>
        <option value="pet">Pet</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={searchPets}>Search</button>
      <button onClick={getPets}>Show All</button>

      <h2>Pets</h2>

      {pets.map((item) => (
        <div key={item._id}>
          <p>
            <strong>Owner:</strong> {item.owner}
          </p>

          <p>
            <strong>Pet:</strong> {item.pet}
          </p>

          <p>
            <strong>Type:</strong> {item.type}
          </p>

          <p>
            <strong>Email:</strong> {item.email || "Not provided"}
          </p>

          <button onClick={() => editPet(item)}>Edit</button>

          <button onClick={() => deletePet(item._id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;