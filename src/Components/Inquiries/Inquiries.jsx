import React, { useEffect, useState,useRef } from "react";
import Table from "../table/table";
import "./inquiries.css";
import { fetchArray, getDate } from "../../Utils/utils";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button } from "antd";
import { MdDelete } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDownloadExcel } from 'react-export-table-to-excel';

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
      location: "",
      feedback: "",
    },
  ]);

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
})

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // reset current page when search query changes
  };





  //Get api url
  const api = "/api/inquiries";
  const customerapi = "/api/customers";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  if (data.length > 0) {
    data.forEach((inquiry) => {
      if (inquiry.customer !== undefined && inquiry.call_type !== undefined) {
        inquiry["customer_name"] = inquiry.customer.name;
        inquiry["phone"] = inquiry.customer.phone;

        inquiry["location"] = inquiry.customer.location;
        inquiry["user_name"] = inquiry.user.name;
        inquiry["call_type_name"] = inquiry.call_type.name;
       
      
        if (inquiry.feedback !== null) {
          if (inquiry.feedback.feedback !== null) {
             
             inquiry["feedback_customer"] = inquiry.feedback.feedback;
          }
           
          // inquiry["feedback_customer"] = ;
        }
      
        if (inquiry.open === 1) {
          inquiry["open"] = "Open";
        } else {
          inquiry["open"] = "Closed";
        }
      }
    });
  }

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
    fetch("/api/inquiries/" + phone, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
       window.location.reload();
      })
      .catch((err) => {
        console.warn(err.message);
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
        <h6 className="link02"> / Inquiries</h6>
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
          {/* <Link to="/inquiryadd">
            <div className="btn">
              <input type="button" value="Add Inquiry" />
            </div>
          </Link>
          <div className="btn-icon">
            <MdPersonAddAlt1 style={{ width: "25px", height: "25px" }} />
          </div> */}
        {/* add button page end */}
        
          {/* export excel btn */}
          <div className="btn_export">
         
              <input type="button"  value="Export" onClick={onDownload} /> 
            </div>
          <div className="btn_exporticon">
            <BiExport style={{ width: "25px", height: "25px" }}/>
          </div>
          {/* export excel btn end */}
          <div className="col-12">
            <div className="card card-body">
              <div className="table-responsive" data-table="both">
                <table className="table " ref={tableRef} >
                  <thead >
                    <tr style={{Position:"sticky"}}>
                      <th>Id</th>
                      <th>Create At</th>
                      <th>User Name</th>
                      <th>Location</th>
                      <th>Customer Name</th>
                      <th>Customer Phone</th>
                      <th>Call Type</th>
                      <th>Product Category</th>
                      <th>Brand</th>
                      <th>Brand Availability</th>
                      <th>FeedBack</th>
                      <th>Open</th>
                      <th>Status Remark</th>
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
                      // .slice(
                      //   (currentPage - 1) * itemsPerPage,
                      //   currentPage * itemsPerPage
                      // )
                      .map((row, index) => (
                        <tr key={index}>
                          <td>{row.id}</td>
                          <td>{row.created_at}</td>
                          <td>{row.user_name} </td>
                          <td>{row.location}</td>
                          <td>{row.customer_name}</td>
                          <td>{row.phone}</td>
                          <td>{row.call_type_name}</td>
                          <td>{row.product_category}</td>
                          <td>{row.brand}</td>
                          <td>{row.brand_availability}</td>
                          <td>{row.feedback_customer}</td>
                          <td>{row.open}</td>
                          <td>{row.status_remark}</td>
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

                            
                              
                            </Link>
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
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div>
          
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
            </div> */}
          </div>
        </div>
        {/* <Table users={data} columns={columns} /> */}
      </div>
    </div>
  );
};

export default AllInquiries;
