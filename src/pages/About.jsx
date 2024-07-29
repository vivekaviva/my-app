import { useState, useEffect } from "react";
import axios from "axios";
export default function About() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log("res of get method", response);
        setUsers(response.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  function addUsers() {
    const newUser = {
      name: "Kgisl",
      email: "kgisl@gmail.com",
      phone: "234567890",
    };
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((response) => {
        console.log("response of post method", response);
        setUsers([...users, newUser]);
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <div className="container mt-5">
        <h3>Users List - About</h3>
        <button onClick={addUsers} className="btn btn-primary">
          Add new User
        </button>
        <table className="table table-bordred">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
