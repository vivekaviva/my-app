import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count {count} </p>
      <button onClick={() => setCount(count + 1)}> Inc count</button>
    </>
  );
}

export default Counter;
