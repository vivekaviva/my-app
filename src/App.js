import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Website from "./components/Website";
import FavColor from "./components/FavColor";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import List from "./components/List";
import "bootstrap/dist/css/bootstrap.min.css";

import Timer from "./components/Timer";

function App() {
  const webInfo = { page: "Home page", number: 1, content: "content" };
  const isWebsiteActive = true;
  // const webInfo = {};

  //const nums = [1, 2, 3, 4, 5, 5, 5];
  const items = [
    { id: 1, name: "Apple", color: "Red" },
    { id: 2, name: "Banana", color: "Yellow" },
    { id: 3, name: "Cherry", color: "Red" },
  ];

  return (
    <>
      {/* <Header />*/}
      {/* <Content name="website" />

      {webInfo.page !== undefined || webInfo.number !== undefined ? (
        <Website webInfo={webInfo} />
      ) : null}

      {/* {isWebsiteActive == false ? <h2>Active</h2> : <h2>Inactive</h2>} 
      {isWebsiteActive ? <h2>Active</h2> : <h2>Inactive</h2>} */}

      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}-{item.name}
          </li>
        ))}
      </ul>

      <p style={{ color: "red", background: "yellow" }}>Inline Style</p> */}

      {/* <FavColor />

      <Counter />
      <Navbar /> */}
      <div className="container">
        <List />
        <Timer />
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default App;
