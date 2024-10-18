import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const OrdersFilters = () => {
  const rows: any = [];

  const [status, setStatus] = useState("");
  const [marketplace, setMarketplace] = useState("");

  const handleMarketplaceChange = (event: any) => {
    setMarketplace(event.target.value as string);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
      <TextField
        id="order-start"
        label="Order start"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="order-end"
        label="Order end"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
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
    </Box>
  );
};

export default OrdersFilters;