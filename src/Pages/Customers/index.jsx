import React, { useEffect, useState,} from "react";
import { fetchArray } from "../../Utils/utils";
import "./index.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button } from "antd";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link ,useParams} from "react-router-dom";
import Swal from "sweetalert2";


const CustomerTable = () => {

  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
      location: "",
    },
  ]);

  //Get api url
  const api = "/api/customers";
  const token = localStorage.getItem("token");

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
    fetch("/api/customers/" + phone, {
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





  return (
    <div className="table-container">
      <div className="table-head">
        <Link to="/">
          {" "}
          <h6 className="link01"> Home </h6>{" "}
        </Link>
        <h6 className="link02">/ Customer</h6>
        <div className="table-name">
          <h3>Customers</h3>
          <form className="search">
            <input type="text" name="text" placeholder="Search Name"   />
            <div className="serach-icon">
              <Button>
                <BsSearch />
              </Button>
            </div>
          </form>
          <Link to="/AddCustomer">
            <div className="btn">
              <input type="button" value="Add Customer" />
            </div>
          </Link>
          <div className="btn-icon">
            <MdPersonAddAlt1 style={{ width: "25px", height: "25px" }} />
          </div>
          <div className="col-12">
            <div className="card card-body">
              <div className="table-responsive">
                <table className="table table-bordered mb-0 text-center">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Remark</th>
                      <th style={{paddingLeft:'80px',justifyContent:'center'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody> 
                    {/* row length  */}
                    {data.length > 1 &&
                      data.slice(0, 6).map((row, key) => (
                        <tr key={key}>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.email} </td>
                          <td>{row.phone}</td>
                          <td>{row.comment}</td>
                          <td >
                            <Link
                             
                              to={"/editcustomer"}>
                         
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
                                onClick={() => deleteCustomer(row.phone)}
                                style={{
                                  border: "none",
                                }}>
                                <MdDelete 
                                  style={{ width: "30px", height: "30px",}}
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
          </div>
        </div>
        {/* <Table className="data-table" users={data}  /> */}
      </div>
    </div>
  );
};
export default CustomerTable;
