import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// npm i react-toastify

export default function About() {
  const [users, setUsers] = useState([]);

  const [errors, setErrors] = useState({});

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log("res of get method", response);
        setUsers(response.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  function addUsers() {
    setEditUserId(null);
    setNewName("");
    setNewEmail("");
    setShowModal(true);
  }

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
        axios
          .put(`https://jsonplaceholder.typicode.com/users/${editUserId}`, {
            name,
            email,
          })
          .then((response) => {
            setUsers(
              users.map((user) =>
                user.id === editUserId ? { ...user, name, email } : user
              )
            );
            setEditUserId(null);
            setNewName("");
            setNewEmail("");
            setShowModal(false);
            toast.success("User Updated");
          })
          .catch((error) => {
            toast.error("Failed to updated the user");
          });
      } else {
        const maxId =
          users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
        const newId = maxId + 1;
        const newUser = {
          id: newId,
          name,
          email,
        };
        axios
          .post("https://jsonplaceholder.typicode.com/users", newUser)
          .then((response) => {
            console.log("response of post method", response);
            setUsers([...users, newUser]);
            setNewName("");
            setNewEmail("");

            setShowModal(false);
            toast.success("User added successfully!");
          })
          .catch(
            (error) => (
              console.log("error", error), toast.error("Failed to add the user")
            )
          );
      }
    }
  };

  const UpdateUser = (user) => {
    console.log("update button clicked", user);
    setEditUserId(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
    setShowModal(true);
  };

  const deleteUser = (userID) => {
    console.log("Delete button clicked", userID);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userID}`)

      .then((response) => {
        setUsers(users.filter((user) => user.id !== userID));
        toast.success("User deleted");
      })
      .catch((err) => {
        console.log("error while deleting the user");
        toast.error("Failed to delete the user");
      });
  };

  return (
    <>
      <ToastContainer />

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
                    onClick={() => UpdateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="ms-2 btn btn-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                // className="form-control"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                value={newName}
                // value="viveka"
                name="name"
                onChange={handleChanges}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                type="email"
                name="email"
                value={newEmail}
                id="email"
                onChange={handleChanges}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
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
    </>
  );
}
