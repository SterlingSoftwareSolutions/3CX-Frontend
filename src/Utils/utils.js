import moment from "moment";

export const fetchArray = async (api, setData) => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    res = await res.json();
    setData(res.data);
  } catch (error) {
    alert("Only Admins View");
  }
};

export const getDate = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY");
};
