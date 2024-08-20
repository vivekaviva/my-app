import "./App.css";

import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Student1 from "./pages/Student1";
import Student2 from "./pages/Student2";
import Parent from "./components/context";
import BlogPost from "./components/BlogPost";
import ProductsPage from "./components/ProductsPage";

function App() {
  return (
    <>
      <div className="container">
        {/* <Parent /> */}
        {/* <BlogPost /> */}
        <ProductsPage />
        {/* <Router> */}
        {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/user/1">User 1</Link>
            </li>
            <li>
              <Link to="/user/27">User 2</Link>
            </li>
            <li>
              <Link to="/user/288">User 288</Link>
            </li>
          </ul> */}
        {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/students">
              <Route path="student1" element={<Student1 />} />
              <Route path="student2" element={<Student2 />} />
            </Route>

            <Route path="/about" element={<About />} />

            <Route path="/user">
              <Route path=":ids" element={<User />}></Route>
            </Route>
          </Routes>
        </Router> */}
      </div>
    </>
  );
}

export default App;
