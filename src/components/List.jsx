import { useState } from "react";

function List() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);

  function addItem() {
    const itemName = "Item" + count;
    setList((prevState) => [...prevState, itemName]);
    setCount((prevState) => prevState + 1);
  }

  // [1,2,3,4,5,5,6]

  function remove() {
    setList((prevState) => {
      const newList = [...prevState];
      newList.pop();
      return newList;
    });
  }

  return (
    <>
      <button className="btn btn-primary" onClick={addItem}>
        Add Item
      </button>
      <button onClick={remove}>Remove Item</button>
      <ul>
        {list.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </>
  );
}

export default List;
