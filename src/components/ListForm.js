import React, { useState } from "react";

function ListForm({ addList }) {
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() === "") return;

    const newList = {
      id: Date.now(), // Unique ID
      name: listName,
    };

    addList(newList);
    setListName(""); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="list-form">
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter list name"
        required
      />
      <button type="submit">Add List</button>
    </form>
  );
}

export default ListForm;