import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const FilesFilters = ({
  rows,
  marketplace,
  setMarketplace,
  searchFree,
  setSearchFree,
  searchDate,
  setSearchDate,
}) => {
  const [status, setStatus] = React.useState("");

  const handleMarketplaceChange = (event: any) => {
    setMarketplace(event.target.value as string);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="marketplace-label">Marketplace</InputLabel>
        <Select
          labelId="marketplace-label"
          id="marketplace"
          value={marketplace}
          label="Marketplace"
          onChange={handleMarketplaceChange}
        >
          <MenuItem value=""></MenuItem>
          {rows
            .filter((row: any) => row.marketplace)
            .map((row: any) => (
              <MenuItem key={row.index} value={row.marketplace}>
                {row.marketplace}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={searchFree}
          onChange={(e) => setSearchFree(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <TextField
          id="send-date"
          label="Send Date"
          type="date"
          onChange={(e) => setSearchDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </Box>
  );
};

export default FilesFilters;
