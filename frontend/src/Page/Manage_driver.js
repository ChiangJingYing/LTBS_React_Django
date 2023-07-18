import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { Card, Typography } from "@material-tailwind/react";

const ManageDriver = () => {
  let [data, setData] = useState(null);
  let [isPending, setPending] = useState(true);
  let [error, setError] = useState(null);

  let { authTokens } = useContext(AuthContext);

  const TABLE_HEAD = ["ID", "姓名", "電話", "駕照號碼", "密碼"];

  useEffect(() => {
    fetch("http://0.0.0.0:8000/api/manager/drivers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("fetch data from api error!");
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
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data != null && (
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left mt-10 ml-10 mr-10">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            <tbody>
              {data.map(
                (
                  { id, name, phone, driver_license_number, password },
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
                        {phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {driver_license_number}
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
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

export default ManageDriver;
