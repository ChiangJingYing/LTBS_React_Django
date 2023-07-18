import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  let [data, setData] = useState(null);
  let [isPending, setPending] = useState(true);
  let [error, setError] = useState(null);

  let { authTokens, updateToken } = useContext(AuthContext);
  let navigate = useNavigate();

  const TABLE_HEAD = [
    "ID",
    "姓名",
    "性別",
    "生日",
    "證明號碼",
    "證明到期日",
    "障礙等級",
    "障礙類別",
    "地址",
    "電話",
    "電子郵箱",
    "聯絡人電話",
    "聯絡人關係",
    "帳號",
    "密碼",
    "輔具",
    "輔具ID",
    "輔具名稱",
    "最小尺寸",
  ];

  useEffect(() => {
    fetch("http://0.0.0.0:8000/api/manager/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.statusText === "Forbidden") {
            updateToken();
            throw Error("reget token");
          } else throw Error("fetch data from api error!");
        }
        return response.json();
      })
      .then((datas) => {
        setData(datas);
        setPending(false);
        setError(null);
      })
      .catch((e) => {
        if (e.message !== "reget token") {
          setPending(false);
          setError(e.message);
        } else {
          navigate("/");
          alert("請重新進入本頁面")
        }
      });
  }, []);

  const handelSearch = () => {
    const searchUsername = document.getElementById("username").value;
    setPending(true);
    fetch(`http://0.0.0.0:8000/api/manager/users?username=${searchUsername}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          if (response.statusText === "Forbidden")
            throw Error("User Certification Error");
          else throw Error("fetch data from api error!");
        }
        return response.json();
      })
      .then((datas) => {
        setData(datas);
        setPending(false);
        setError(null);
      })
      .catch((e) => {
        setPending(false);
        setError(e.message);
      });
  };

  return (
    <div className="flex h-screen justify-center overflow-y-scroll">
      {
        <Card className="max-w-screen-xl table-fixed overflow-scroll max-h-[400px]">
          {/* search form */}
          <div className="mt-5 ml-10 max-w-[200px]">
            <div className="flex gap-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-initial w-[100px] block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="username"
              />
              <Button onClick={handelSearch} className="flex-initial">
                Search
              </Button>
            </div>
          </div>

          {/* data table */}
          <table className="mt-5 mr-10 ml-10 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b p-4 border-blue-gray-100 bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {!isPending && data != null && (
              <tbody>
                {data.map(
                  (
                    {
                      id,
                      name,
                      genders,
                      birthday,
                      certificate_number,
                      certificate_expiry_date,
                      disability_level,
                      disability_category,
                      address,
                      phone,
                      email,
                      contact_person_phone,
                      contact_relationship,
                      username,
                      password,
                      auxiliary_tool,
                      tool_id,
                      tool_name,
                      min_size,
                    },
                    index,
                  ) => (
                    <tr key={id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {genders}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {birthday}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {certificate_number}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {certificate_expiry_date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {disability_level}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {disability_category}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {address}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {contact_person_phone}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {contact_relationship}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {username}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {password}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {auxiliary_tool}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tool_id}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tool_name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {min_size}
                        </Typography>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            )}
          </table>
          {isPending && (
            <div className={"flex items-center justify-center h-screen"}>
              Loading...
            </div>
          )}
          {error && (
            <div className={"flex items-center justify-center h-screen"}>
              {error}
            </div>
          )}
        </Card>
      }
    </div>
  );
};

export default ManageUser;
