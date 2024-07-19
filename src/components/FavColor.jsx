import React, { useState } from "react";

function FavColor() {
  //   let color = "Red";
  const [color, setColor] = useState("Red");
  const [name, setName] = useState("Kgisl");

  const [students, setStudents] = useState({
    name: "kgisl",
    batch: "Morning",
    Domain: "Full stack",
  });

  console.log("color", color);
  console.log("Students", students);

  function update() {
    setColor("Blue");
    setName("batch");
    // setStudents({ batch: "Evening" });
    setStudents((prevState) => {
      return { ...prevState, batch: "Evening", name: "Karthi", time: "1 pm" };
    });
  }

  return (
    <>
      <p>Student name - {students.name}</p>
      <p>Time - {students.time}</p>

      <p>Batch - {students.batch}</p>
      <p>Domain - {students.Domain}</p>
      {/* <h3>Fav color is {color}</h3>

      <p>Name is {name}</p> */}
      <button onClick={update}>Click ME</button>
    </>
  );
}

export default FavColor;
