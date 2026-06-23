import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
export function NotificationFilter({ search, setSearch, sort, setSort }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Search URL or Shortcode"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>

          <Select
            value={sort}
            label="Sort By"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="latest">Latest</MenuItem>

            <MenuItem value="oldest">Oldest</MenuItem>

            <MenuItem value="clicks">Most Clicks</MenuItem>

            <MenuItem value="expiry">Expiry Time</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
