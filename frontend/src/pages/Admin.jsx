import React, { useState, useEffect } from 'react'
import axios from '../axios'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  salary: ''
}

function Admin() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(initialForm)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const getAllEmployees = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/employee/')
      if (response.data) {
        setEmployees(response.data.employees)
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const addEmployee = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/employee/', form)
      if (response.data) {
        setForm(initialForm)
        setShowModal(false)
        setError('')
        await getAllEmployees()
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const updateEmployee = async (id) => {
    setLoading(true)
    try {
      const response = await axios.patch(`/employee/${id}`, form)
      if (response.data) {
        setForm(initialForm)
        setEditId(null)
        setShowModal(false)
        setError('')
        await getAllEmployees()
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const deleteEmployee = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`/employee/${id}`)
      await getAllEmployees()
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const getSingleEmployee = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`/employee/${id}`)
      if (response.data) {
        setForm(response.data)
        setEditId(id)
        setShowModal(true)
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await updateEmployee(editId)
    } else {
      await addEmployee()
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setForm(initialForm)
    setEditId(null)
    setError('')
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Employees</h2>
          <button
            onClick={() => {
              setShowModal(true)
              setEditId(null)
              setForm(initialForm)
            }}
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>

        {loading && <div className="text-center text-gray-500 mb-4">Loading...</div>}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {employees.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No employees found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border">First Name</th>
                  <th className="py-2 px-4 border">Last Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Salary</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp._id} className="hover:bg-blue-50 border-b">
                    <td className="py-2 px-4 border">{emp.firstName}</td>
                    <td className="py-2 px-4 border"> {emp.lastName}</td>
                    <td className="py-2 px-4 border">{emp.email}</td>
                    <td className="py-2 px-4 border">{emp.phone}</td>
                    <td className="py-2 px-4 border">${emp.salary}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex gap-2">
                        <button
                          className="text-white bg-amber-400 rounded-lg px-3 py-1.5  cursor-pointer"
                          onClick={() => getSingleEmployee(emp._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-600 px-3 py-1.5 rounded-lg cursor-pointer"
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              {editId ? 'Edit Employee' : 'Add Employee'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                className="border rounded px-3 py-2"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded px-3 py-2"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded px-3 py-2"
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded px-3 py-2"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                className="border rounded px-3 py-2"
                name="salary"
                placeholder="Salary"
                type="number"
                value={form.salary}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
              >
                {editId ? 'Update Employee' : 'Add Employee'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
