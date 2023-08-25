import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    startdate: "",
    enddate: "",
    category: "",
    value: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        startdate: "",
        enddate: "",
        category: "",
        value: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        startdate: "",
        enddate: "",
        category: "",
        value: "",
      });
    }
  };

  // const handleDelete = (index) => {
  //   const filterData = tableData.filter((item, i) => i !== index);
  //   setTableData(filterData);
  // };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({
      name: tempData.name,
      startdate: tempData.startdate,
      enddate: tempData.enddate,
      category: tempData.category,
      value: tempData.value,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen container">
      <div className="card p-6">
        <h1 className="text-center">Booking Form</h1>
        <div className="max-w-fit m-auto p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Name</label>
              <span>
                <input
                  className="form-control"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="flex flex-col">
              <label>Start Date</label>
              <span>
                <input
                  type="date"
                  name="startdate"
                  value={inputs.startdate}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="flex flex-col">
              <label>Start Date</label>
              <span>
                <input
                  type="date"
                  className="form-control"
                  name="enddate"
                  value={inputs.enddate}
                  onChange={handleChange}
                />
              </span>
            </div>

            <div className="flex flex-col">
              <label>Category</label>
              <span>
                <select
                  value={inputs.category}
                  onChange={handleChange}
                  name="category"
                  className="select form-control"
                >
                  <option value="">~~~ Select Category ~~~</option>
                  <option value="Room 1">Room 1</option>
                  <option value="Room 2">Room 2</option>
                  <option value="Room 3">Room 3</option>
                  <option value="Room 4">Room 4</option>
                  <option value="Room 5">Room 5</option>
                </select>
              </span>
            </div>

            <div className="flex flex-col">
              <label>Value</label>
              <span>
                <input
                  name="value"
                  className="form-control"
                  value={inputs.value}
                  onChange={handleChange}
                />
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#014d64] text-white mt-3"
            >
              {editClick ? "Update" : "Booking Now"}
            </button>
          </form>
        </div>
      </div>
      <div className="table">
        <Table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.category}</td>
                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
