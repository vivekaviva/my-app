import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log("Screen");
    checkCount();
    // setTimeout(() => {
    //   setCount((prevState) => {
    //     return prevState + 1;
    //   });
    // }, 1000);
  }, [count]);

  function checkCount() {
    if (count > 10) {
      setCount(1);
    }
  }

  function reset() {
    setCount(1);
  }

  function updateCount() {
    setCount((prevState) => {
      return prevState + 1;
    });
  }

  return (
    <>
      <h3>useEffect</h3>
      <p>Count {count}</p>
      <button onClick={updateCount}>Inc Count</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default Timer;
