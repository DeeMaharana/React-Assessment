import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [lists, setLists] = useState([
    { id: 1, name: "List 1", items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"] },
    { id: 2, name: "List 2", items: ["Item A", "Item B", "Item C", "Item D", "Item E", "Item F", "Item G"] },
  ]);

  const [checkedLists, setCheckedLists] = useState([]);
  const [tempLists, setTempLists] = useState([...lists]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (id) => {
    const updatedCheckedLists = checkedLists.includes(id)
      ? checkedLists.filter((listId) => listId !== id)
      : [...checkedLists, id];
    setCheckedLists(updatedCheckedLists);
  };

  const handleCreateNewList = () => {
    if (checkedLists.length !== 2) {
      setErrorMessage("Exactly two lists should be selected to create a new list.");
      return;
    }

    const newListName = `List ${tempLists.length + 1}`; // Dynamically name the new list
    const newList = { id: Date.now(), name: newListName, items: [] };
    const [list1Index, list2Index] = checkedLists.map((id) =>
      tempLists.findIndex((list) => list.id === id)
    );

    const updatedLists = [
      ...tempLists.slice(0, list1Index + 1),
      newList,
      ...tempLists.slice(list1Index + 1, list2Index),
      ...tempLists.slice(list2Index),
    ];

    setTempLists(updatedLists);
    setErrorMessage("");
  };

  const handleItemMove = (item, fromListId, toListId) => {
    const fromList = tempLists.find((list) => list.id === fromListId);
    const toList = tempLists.find((list) => list.id === toListId);

    if (fromList && toList) {
      const updatedFromList = {
        ...fromList,
        items: fromList.items.filter((i) => i !== item),
      };

      const updatedToList = { ...toList, items: [...toList.items, item] };

      const updatedLists = tempLists.map((list) => {
        if (list.id === fromListId) return updatedFromList;
        if (list.id === toListId) return updatedToList;
        return list;
      });

      setTempLists(updatedLists);
    }
  };

  const handleCancelChanges = () => {
    setTempLists([...lists]);
    setErrorMessage("");
  };

  const handleUpdateChanges = () => {
    setLists([...tempLists]);
    setErrorMessage("");
  };

  return (
    <div className="app">
      <h1>List Management</h1>
      <button onClick={handleCreateNewList} className="create-btn">
        Create New List
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="lists-container">
        {tempLists.map((list, index) => (
          <div key={list.id} className="list">
            <div className="list-header">
              <input
                type="checkbox"
                checked={checkedLists.includes(list.id)}
                onChange={() => handleCheckboxChange(list.id)}
              />
              <span>{`${list.name} (${list.items.length})`}</span>
            </div>
            <div className="items-container">
              {list.items.map((item) => (
                <div key={item} className="item">
                  <div className="arrows">
                    {/* Left Arrow */}
                    {index > 0 && (
                      <button
                        onClick={() =>
                          handleItemMove(item, list.id, tempLists[index - 1].id)
                        }
                        className="arrow-btn"
                      >
                        ←
                      </button>
                    )}
                    {/* Right Arrow */}
                    {index < tempLists.length - 1 && (
                      <button
                        onClick={() =>
                          handleItemMove(item, list.id, tempLists[index + 1].id)
                        }
                        className="arrow-btn"
                      >
                        →
                      </button>
                    )}
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={handleCancelChanges} className="cancel-btn">
          Cancel
        </button>
        <button onClick={handleUpdateChanges} className="update-btn">
          Update
        </button>
      </div>
    </div>
  );
};

export default App;