import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Form() {
  //(!/\S+@\S+\.\S+/.test(data.email)
  //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$  ---> password

  //   const [username, setUsername] = useState("Kgisl");
  //   const [password, setPassword] = useState("");

  const [submittedValue, setSUbmittedValue] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);
  console.log("Current state", formData);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };
      setErrors(validateForm(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setSUbmittedValue(formData);

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSUbmittedValue(formData);
      setErrors({});
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("Form is submitted");
    if (submittedValue) {
      setShowModal(true);
    }
  }, [submittedValue]);

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

  return (
    <div className="container mt-5 mb-5">
      <h4>Form</h4>
      <form className="col-md-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            // className="form-control"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChanges}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        {/* <div>
          <label>
            User Name:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChanges}
            />
          </label>
        </div> */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChanges}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
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

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {/* {submittedValue && (
        <div>
          <p>Name is {formData.username}</p>
          <p>password is {formData.password}</p>
          <p>Email is {formData.email}</p>
        </div>
      )} */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submittedValue && (
            <div>
              <p>Name is {formData.username}</p>
              <p>password is {formData.password}</p>
              <p>Email is {formData.email}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div></div>
    </div>
  );
}

export default Form;
