import { Typography } from "@material-tailwind/react";

const TableColumnTypography = ({ content }) => {
  return (
    <Typography variant="small" color="blue-gray" className="font-normal">
      {content}
    </Typography>
  );
};

export default TableColumnTypography;
