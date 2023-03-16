import React, { useEffect, useState } from "react";
import Table from "../../Components/table/table";
import { fetchArray, getDate } from "../../Utils/utils";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button } from "antd";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./index1.css";

const Users = () => {
  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
      role:"",
      password:"",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // reset current page when search query changes
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "User Created Date",
      dataIndex: "created_at",
      render: (key, record) => {
        return <span>{getDate(record)}</span>;
      },
    },
    {
      role: "Role",
      dataIndex: "role",
      key:"role"
    },
    {
      password: "Password",
      dataIndex: "password",
      key:"password"
    },

  ];

  //delete function
  const deleteCustomer = async (phone) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }
    fetch("/api/users/" + phone, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // alert('Removed successfully.')
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Get api url
  const api = "/api/users";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const totalPages = Math.ceil(
    data.filter((row) => {
      const name = row.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    }).length / itemsPerPage
  );

  return (
    <div className="table_container">
      <div className="table_head">
        <Link to="/">
          {" "}
          <h6 className="link_01"> Home </h6>{" "}
        </Link>

        <h6 className="link_02"> / User</h6>
        <div className="table-name">
          <h4>User Page </h4>

       
          <form className="search_bar">
            <input
              type="text"
              name="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Name ...."
            />
            <div className="serach-icon">
              <BsSearch style={{ width: "20px", height: "20px" }} />
            </div>
          </form>

          <Link className="add-user" to="/addnewuser">
          <button className="btn_btnAdd">Add User</button>
          </Link>

          <div className="btn_icon">
            <MdPersonAddAlt1 style={{ width: "25px", height: "25px" }} />
          </div>

          </div>

          <div className="col-12">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Projects</th>
                      <th>User Created Date</th>
                      {/* <th>Password</th> */}
                      <th
                        style={{
                          textAlign: "center",
                          paddingLeft: "80px",
                          justifyContent: "center",
                        }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row length & filtered data*/}
                    {data
                      .filter((row) => {
                        const name = row.name.toLowerCase();
                        const query = searchQuery.toLowerCase();
                        return name.includes(query);
                      })
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.email} </td>
                          <td>{row.role}</td>
                          <td>{row.project}</td>
                          <td>{row.created_at}</td>
                          {/* <td>{row.password}</td> */}
                          <td>
                            {/* `/edituser/${row.id}` */}
                            <Link to={`/edituser/${row.id}`}>
                              {/* edit button */}
                              <Button
                                className="edit-btn"
                                style={{
                                  border: "none",
                                }}>
                                <FiEdit
                                  style={{ width: "30px", height: "30px" }}
                                />
                              </Button>

                              {/* delete button */}
                              <Button
                                className="delete-btn"
                                onClick={() => deleteCustomer(row.id)}
                                style={{
                                  border: "none",
                                }}>
                                <MdDelete
                                  style={{ width: "30px", height: "30px" }}
                                />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              {/* table content */}
              <div className="pagination_btnbtn">
                <button
                  className="btn_preview"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}>
                  Previous
                </button>
                <button
                  className="btn-next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </div>
       
          {/* <Table users={data} columns={columns} /> */}
      </div>
    </div>
  );
};

export default Users;
