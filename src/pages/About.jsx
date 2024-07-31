import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function About() {
  const [users, setUsers] = useState([]);
  const [submittedValue, setSUbmittedValue] = useState(null);
  const [errors, setErrors] = useState({});

  // const [formData, setFormData] = useState({
  //   name: "",
  //   password: "",
  //   email: "",
  // });

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
    setShowModal(true);
  }

  const validateForm = (d) => {
    console.log("data", d);
    const newErrors = {};
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!d.username) newErrors.username = "Username is required";
    if (!d.password) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(d.password)) {
      newErrors.password = "Password is invalid";
    }

    if (!d.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(d.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };

  const handleChanges = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setNewName(value);
    }
    if (name === "email") {
      setNewEmail(value);
    }
    if (name === "phone") {
      setNewPhone(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const email = newEmail.trim();
    const phone = newPhone.trim();

    if (name && email && phone) {
      const maxId =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
      const newId = maxId + 1;
      const newUser = {
        id: newId,
        name,
        email,
        phone,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/users", newUser)
        .then((response) => {
          console.log("response of post method", response);
          setUsers([...users, newUser]);
          setNewName("");
          setNewEmail("");
          setNewPhone("");
          setShowModal(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="btn btn-primary">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
                id="email"
                onChange={handleChanges}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                type="number"
                name="phone"
                id="phone"
                onChange={handleChanges}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
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
