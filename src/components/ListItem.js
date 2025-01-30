import React from "react";

function ListItem({ list, index, deleteList }) {
  return (
    <div className="list-item">
      <span>
        {index}. {list.name}
      </span>
      <button onClick={() => deleteList(list.id)}>Delete</button>
    </div>
  );
}

export default ListItem;