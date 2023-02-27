import React, { useEffect, useState } from "react";
import Table from "../table/table";
import "./inquiries.css";
import { fetchArray, getDate } from "../../Utils/utils";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button } from "antd";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AllInquiries = () => {
  //popup the page in this section
  const [data, setData] = useState([
    {
      id: 1,
      brand: "",
      brand_availability: "",
      product_category: "",
      action: "",
      status_remark: "",
      open: "",
      user_id: "",
      customer_id: "",
      call_type_id: "",
      created_at: "",
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
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "age",
    },
    {
      title: "Brand Availability",
      dataIndex: "brand_availability",
      key: "address",
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "address",
    },
    {
      title: "Status Remark",
      dataIndex: "status_remark",
      key: "address",
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "address",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "address",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "address",
    },
    {
      title: "Call Type ID",
      dataIndex: "call_type_id",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "address",
      render: (key, record) => {
        return <span>{getDate(record)}</span>;
      },
    },
  ];
  //Get api url
  const api = "/api/inquiries";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

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
    fetch("/api/inquiries" + phone, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        alert("Removed successfully.");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const totalPages = Math.ceil(
    data.filter((row) => {
      const brand = row.brand.toLowerCase();
      const query = searchQuery.toLowerCase();
      return brand.includes(query);
    }).length / itemsPerPage
  );

  return (
    <div className="table-container">
      <div className="table-head">
        <Link to="/">
          {" "}
          <h6 className="link01"> Home </h6>{" "}
        </Link>
        <h6 className="link02"> / Inquiriesr</h6>
        <div className="table-name">
          <h3>Inquiries Page</h3>
          <form className="search">
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
          {/* add button page */}
          <Link to="/inquiryadd">
            <div className="btn">
              <input type="button" value="Add Inquiry" />
            </div>
          </Link>
          <div className="btn-icon">
            <MdPersonAddAlt1 style={{ width: "25px", height: "25px" }} />
          </div>
          <div className="col-12">
            <div className="card card-body">
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Brand</th>
                      <th>Brand Availability</th>
                      <th>Product Category</th>
                      <th> Status Remark</th>
                      <th> Open</th>
                      <th>User Id</th>
                      <th>Customer Id</th>
                      <th>Call Type Id</th>
                      <th>Create At</th>

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
                        const brand = row.brand.toLowerCase();
                        const query = searchQuery.toLowerCase();
                        return brand.includes(query);
                      })
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.brand}</td>
                          <td>{row.brand_availability} </td>
                          <td>{row.product_category}</td>
                          <td>{row.status_remark}</td>
                          <td>{row.open}</td>
                          <td>{row.user_id}</td>
                          <td>{row.customer_id}</td>
                          <td>{row.call_type_id}</td>
                          <td>{row.created_at}</td>
                          <td>
                            <Link to={`/editinquiry/${row.id}`}>
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
              <div className="pagination-btn">
                <button
                  className="btn-preview"
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
        </div>
        {/* <Table users={data} columns={columns} /> */}
      </div>
    </div>
  );
};

export default AllInquiries;
