import { Typography } from "@mui/material";
import FilesTable from "./components/FilesTable";

const Files = () => {
  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        Files
      </Typography>
      <br />
      <FilesTable />
    </div>
  );
};

export default Files;
