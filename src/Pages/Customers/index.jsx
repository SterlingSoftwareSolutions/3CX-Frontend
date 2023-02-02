import React, { useEffect, useState, swall } from "react";
import Table from "../../Components/table/table";
import { fetchArray } from "../../Utils/utils";
import "./index.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Button, Popconfirm, Space, Form } from "antd";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import {} from "@mui/icons-material";
import axios from "axios";

const editURl = "";

const CustomerTable = (history) => {
  const [editRowKey, setEditRowKey] = useState("");
  const [form] = Form.useForm();

  const [data, setData] = useState([
    {
      id: 1,
      email: "",
      name: "",
      created_at: "",
      location: "",
    },
  ]);

  function onEdit(history, endURL) {
    let tempURL = endURL;
    return function (data) {
      history.push({ pathname: tempURL, state: { ...data } });
    };
  }
  const editItem = onEdit(history, editURl);

  const isEditing = (record) => {
    return record.key === editRowKey;
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      message: "",
      ...record,
    });
    setEditRowKey(record.key);
  };

  const deleteCatagory = (e, customerAddress) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    api.delete(`/api/customers/CustomerAddress${customerAddress}`).then((res) => {
      if (res.data.status === 200) {
        swall("success", res.data.message, "success");
        thisClicked.closest("columns").remove();
      } else if (res.data.status === 404) {
        swall("success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "address",
    },
    {
      title: "Remarks",
      dataIndex: "comment",
      key: "address",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (key, record) => {
        const editable = isEditing(record);
        return data.length >= 1 ? (
          <Space>
            {/* <Popconfirm
              title="Are you sure want to delete?"
              > */}
            {/* delete button */}
            <Button style={{ width: "47px", height: "47px", border: "none" }}>
              <MdDelete
                style={{ width: "40px", height: "40px" }}
                onClick={(e) => deleteCatagory(e, data.id)}
              />
            </Button>
            {/* </Popconfirm> */}
            {editable ? (
              <span>
                <Space size={"middle"}>
                  {/* edit button */}

                  <Button
                    style={{ width: "50px", height: "50px", border: "none" }}>
                    <FiEdit style={{ width: "40px", height: "40px" }} />
                  </Button>
                </Space>
              </span>
            ) : (
              <Link to="/Editcustomer">
                <Button
                  onClick={() => editItem}
                  style={{ width: "50px", height: "50px", border: "none" }}>
                  <FiEdit style={{ width: "40px", height: "40px" }} />
                </Button>
              </Link>
            )}
          </Space>
        ) : null;
      },
    },
  ];
  //Get api url
  const api = "/api/customers";

  //calling Api get method
  useEffect(() => {
    fetchArray(api, setData);
  }, []);

  //delete action row

  //search data
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    //our api to fetch the search result
    console.log("search", searchTerm);
  };


  //search item 
  
    const [query, setQuery] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`/api/customers?q=${query}`);
        setData(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);
console.log(query);

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
            <input
              type="text"
              name="text"
              placeholder="Search Name"
              value={value}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <div className="serach-icon">
              {/* globalSearch */}
              <Button onClick={() => onSearch(value)}>
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
        </div>

        <Table className="data-table" users={data} columns={columns} />
      </div>
    </div>
  );
};
export default CustomerTable;
