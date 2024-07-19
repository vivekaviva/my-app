import React from "react";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" };
  }
  render() {
    return (
      <>
        <p>Class componet</p>
        <p>Color is {this.state.color}</p>
        <button
          onClick={() => {
            this.setState({ color: "Blue" });
          }}
        >
          Change Color
        </button>
      </>
    );
  }
}

export default Navbar;
