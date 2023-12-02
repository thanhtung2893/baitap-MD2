import React, { useState, useEffect } from "react";
import axios from "axios";
/* import "./App.css" */
import "./style.css"
function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", age: "", address: "", phone: "", email: "" });
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getData = async() => {
   await axios.get("http://localhost:3000/students").then((response) => {
      setStudents(response.data);
    });
  }
  useEffect(() => {
getData()

  }, [students]);

  const addStudent = () => {
    axios.post("http://localhost:3000/students", newStudent).then((response) => {
      setStudents([...students, response.data]);
      setNewStudent({/* id:Math.floor(Math.random)*9999999, */ name: "", age: "", address: "", phone: "", email: "" });
    }); 
  };

  const updateStudent = async () => {
    console.log(editingStudent);
    await axios.put(`http://localhost:3000/students/${editingStudent.id}`, editingStudent)
  }

  const deleteStudent = () => {
    axios.delete(`http://localhost:3000/students/${selectedStudent.id}`).then(() => {
      const updatedStudents = students.filter((student) => student.id !== selectedStudent.id);
      setStudents(updatedStudents);
      setDeleteModalOpen(false);
      setSelectedStudent(null);
    });
  };
  /*  */

  const toggleDeleteModal = (student) => {
    setSelectedStudent(student);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <div className="body">
      <h2>Student Manager</h2>
      <div className="students_edit">

        { <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2> }
        {editingStudent ? (
          <button onClick={updateStudent} className="button__editingStudent">Update</button>
        ) : (
          <button onClick={addStudent} className="button__editingStudent">Add</button>
        )}
        <input className="input__editingStudent"
          type="text"
          placeholder="Name"
          value={editingStudent ? editingStudent.name : newStudent.name}
          onChange={(e) => {
            if (editingStudent) {
              setEditingStudent({ ...editingStudent, name: e.target.value });
            } else {
              setNewStudent({ ...newStudent, name: e.target.value });
            }
          }}
        />
        <input className="input__editingStudent"
          type="number"
          placeholder="Age"
          value={editingStudent ? editingStudent.age : newStudent.age}
          onChange={(e) => {
            if (editingStudent) {
              setEditingStudent({ ...editingStudent, age: e.target.value });
            } else {
              setNewStudent({ ...newStudent, age: e.target.value });
            }
          }}
        />
        <input className="input__editingStudent"
          type="text"
          placeholder="Address"
          value={editingStudent ? editingStudent.address : newStudent.address}
          onChange={(e) => {
            if (editingStudent) {
              setEditingStudent({ ...editingStudent, address: e.target.value });
            } else {
              setNewStudent({ ...newStudent, address: e.target.value });
            }
          }}
        />
        <input className="input__editingStudent"
          type="text"
          placeholder="Phone"
          value={editingStudent ? editingStudent.phone : newStudent.phone}
          onChange={(e) => {
            if (editingStudent) {
              setEditingStudent({ ...editingStudent, phone: e.target.value });
            } else {
              setNewStudent({ ...newStudent, phone: e.target.value });
            }
          }}
        />
        <input className="input__editingStudent"
          type="email"
          placeholder="Email"
          value={editingStudent ? editingStudent.email : newStudent.email}
          onChange={(e) => {
            if (editingStudent) {
              setEditingStudent({ ...editingStudent, email: e.target.value });
            } else {
              setNewStudent({ ...newStudent, email: e.target.value });
            }
          }}
        />


      </div>
      <input className="search"
        type="text"
        placeholder="Search students"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* render danh sách sinh viên  */}
      <div className="students_render">
        {/* <ul>
        {students
          .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((student) => (
            <li key={student.id}>
              {student.name} ({student.age} years old) (Email:{student.email})
              <button onClick={() => setEditingStudent(student)}>Edit</button>
              <button onClick={() => toggleDeleteModal(student)}>Delete</button>
            </li>
          ))}
      </ul> */}
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>address</th>
              <th>phone</th>
              <th>email</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>

            {students
              .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((student,index) => (
                <tr key={index}>
                  <td >{student.name} </td>
                  <td >{student.age}</td>                
                  <td > {student.address} </td>                
                  <td > {student.phone}</td>                 
                  <td >{student.email}</td>
                  <td><button className="button__render-edit" onClick={() => setEditingStudent(student)}>Edit</button>
                    <button className="button__render-delete" onClick={() => toggleDeleteModal(student)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* ******************************************************************************** */}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete {selectedStudent.name}?</h3>
            <button onClick={deleteStudent}>Yes</button>
            <button onClick={() => setDeleteModalOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;