import { useState } from "react";
function List() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);

  function addItem() {
    const itemName = "Item" + count;
    setList((prevState) => [...prevState, itemName]);
    setCount((prevState) => prevState + 1);
  }

  return (
    <>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {list.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </>
  );
}

export default List;
