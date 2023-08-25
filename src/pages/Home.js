import React, { useEffect, useState } from "react";
// Bootsrap Import Datas
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  // New Date and Time for the first time  to initialize
  const date = new Date();

  // start the date pick with the current date
  const start = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");

  // End the date pick with the End date

  const nextDay = new Date(new Date(start).getTime() + 24 * 60 * 60 * 1000);

  const end = nextDay
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");

  // Max date pick with the End date

  const maxDay = new Date(new Date(start).getTime() + 7 * 24 * 60 * 60 * 1000);

  const max = maxDay
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");
  console.log(max);
  // State for MinDate pick with the Min date

  const [minDate, setMinDate] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    startdate: start,
    enddate: end,
    category: "",
    value: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  // Handle Change For the Input Field

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submission Form for Data

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
        startdate: start,
        enddate: end,
        category: "",
        value: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        startdate: start,
        enddate: end,
        category: "",
        value: "",
      });
    }
  };

  // Handle Delete Button

  // const handleDelete = (index) => {
  //   const filterData = tableData.filter((item, i) => i !== index);
  //   setTableData(filterData);
  // };

  // Handle Edit Button

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

  // Format the date to YYYY-MM-DD

  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("/");
  const Min = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .reverse()
    .join("-");

  // Format the date to YYYY-MM-DD useEffect
  useEffect(() => {
    setMinDate(formattedDate);
  });

  return (
    // Container for the Page object

    <div className="min-h-screen container">
      {/* Booking Form Section Start */}

      <div className="card p-6">
        <h1 className="text-center">Booking Form</h1>
        <div className="max-w-fit m-auto p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              {/* Name Input Field Section Start */}

              <label>Name</label>
              <span>
                <input
                  className="form-control"
                  name="name"
                  required="required"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </span>
            </div>
            <div className="flex flex-col">
              {/* StartDate Input Field Section Start */}

              <label>Start Date</label>
              <span>
                <input
                  placeholder="DD/MM/YYYY"
                  type="date"
                  className="form-control"
                  name="startdate"
                  // placeholder={date}
                  min={Min}
                  value={inputs.startdate}
                  onChange={handleChange}
                  format="mm/dd/yyyy"
                  data-date-format="DD MMMM YYYY"
                />
              </span>
            </div>
            {/* <span className="datepicker-icon">📅</span> */}
            {/* <DatePicker /> */}
            <div className="flex flex-col">
              {/* EndDate Input Field Section Start */}

              <label>End Date</label>
              <span>
                <input
                  type="date"
                  className="form-control"
                  name="enddate"
                  value={inputs.enddate}
                  onChange={handleChange}
                  min={Min}
                  max={max}
                  selected="22-08-2023"
                />
              </span>
            </div>
            <div className="flex flex-col">
              {/* Category Input Field Section Start */}

              <label>Category</label>
              <span>
                <select
                  value={inputs.category}
                  onChange={handleChange}
                  name="category"
                  className="select form-control"
                  required="required"
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
              {/* Value Input Field Section Start */}

              <label>Value</label>
              <span>
                <input
                  name="value"
                  required="required"
                  id="patternAttr"
                  pattern="[0-9.]+"
                  className="form-control"
                  value={inputs.value}
                  onChange={handleChange}
                />
              </span>
            </div>

            {/* Submit Button Section Start */}

            <button
              type="submit"
              className="w-full bg-[#014d64] text-white mt-3"
            >
              {editClick ? "Update" : "Booking Now"}
            </button>
          </form>
        </div>
      </div>

      {/* Table Field Starts With  */}

      <div className="table">
        <Table className="w-full text-center" striped bordered>
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
                <td>
                  {/* Start Date Change to Another Format */}

                  {new Date(item.startdate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>
                  {/* End Date Change to Another Format */}

                  {new Date(item.enddate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>{item.category}</td>

                {/* Value Change to Another Format */}

                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>
                  {/* Handle Edit Button Section */}

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
