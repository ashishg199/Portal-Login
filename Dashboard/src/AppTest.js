import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", dob: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/students?page=1&limit=10");
    setStudents(response.data.students);
  };

  const handleShow = (student = null) => {
    setShow(true);
    if (student) {
      setFormData(student);
      setEditId(student.student_id);
    } else {
      setFormData({ first_name: "", last_name: "", dob: "", email: "", phone: "" });
      setEditId(null);
    }
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, formData);
      Swal.fire("Updated!", "Student data has been updated.", "success");
    } else {
      await axios.post("http://localhost:5000/students", formData);
      Swal.fire("Added!", "New student added successfully.", "success");
    }
    fetchStudents();
    handleClose();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents();
      Swal.fire("Deleted!", "Student record has been removed.", "success");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Student Records</h2>
      <Button onClick={() => handleShow()} className="mb-3">Add Student</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(student)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(student.student_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
