import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) =>
        console.log("error while getting the users array", error)
      );
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const addNewUser = () => {
    setShowModal(true);
  };

  const handleChanges = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setNewName(value);
    }
    if (name === "email") {
      setNewEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const email = newEmail.trim();
    if (name && email) {
      if (editUserId) {
        //perform the update
        const updateTheUser = {
          name: name,
          email: email,
        };
        fetch(`https://jsonplaceholder.typicode.com/users/${editUserId}`, {
          method: "PUT",
          body: JSON.stringify(updateTheUser),
          headers: { "content-type": "application/json ; charset = UTF-8" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers(
              users.map((user) =>
                user.id === editUserId ? { ...user, name, email } : user
              )
            );
            setEditUserId(null);
            setNewName("");
            setNewEmail("");
            setShowModal(false);
          });
      } else {
        //perform the new data creation
        console.log("Add new user");
        const newUser = {
          name: name,
          email: email,
        };
        fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "content-type": "application/json ; charset = UTF-8" },
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers([...users, data]);
            console.log("users", users);
            setNewName("");
            setNewEmail("");
            setShowModal(false);
          });
      }
    }
  };

  const updateUser = (user) => {
    console.log("update button clicked", user);
    setEditUserId(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
    setShowModal(true);
  };

  const deleteUser = (id) => {
    console.log("Delete ", id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.log("error while deleting the user", error));
  };

  return (
    <div className="container mt-5">
      <h3>Users List - Home page</h3>
      <button className="btn btn-info" onClick={addNewUser}>
        Add Users
      </button>
      <table className="table table-bordred">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editUserId ? "Update User" : "Add New User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  // className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  value={newName}
                  name="name"
                  onChange={handleChanges}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={newEmail}
                  id="email"
                  onChange={handleChanges}
                />
              </div>
              {/* <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                type="number"
                name="phone"
                id="phone"
                value={newPhone}
                onChange={handleChanges}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div> */}
              <button className="btn btn-primary" type="submit">
                {editUserId ? "Update User" : "Add new user"}
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
