import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../utils/logger";
export default function NotificationsPage() {
  const {
    notifications,
    loading,
    error,
    search,
    setSearch,
    sort,
    setSort,
    addNotification,
  } = useNotifications();
  const [urlForms, setUrlForms] = useState([
    { longUrl: "", validity: 30, shortcode: "" },
    { longUrl: "", validity: 30, shortcode: "" },
    { longUrl: "", validity: 30, shortcode: "" },
    { longUrl: "", validity: 30, shortcode: "" },
    { longUrl: "", validity: 30, shortcode: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...urlForms];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setUrlForms(updated);
  };
  const handleShortenUrls = async () => {
    let createdCount = 0;
    let failedCount = 0;
    for (const form of urlForms) {
      if (!form.longUrl.trim()) continue;

      const result = addNotification(
        form.longUrl.trim(),
        Number(form.validity) || 30,
        form.shortcode.trim(),
      );

      if (result.success) {
        createdCount++;
      } else {
        failedCount++;
      }
    }
    if (createdCount > 0) {
      setMessage(`${createdCount} URL(s) shortened successfully`);
      setUrlForms([
        { longUrl: "", validity: 30, shortcode: "" },
        { longUrl: "", validity: 30, shortcode: "" },
        { longUrl: "", validity: 30, shortcode: "" },
        { longUrl: "", validity: 30, shortcode: "" },
        { longUrl: "", validity: 30, shortcode: "" },
      ]);

      try {
        await Log("frontend", "info", "page", `${createdCount} URLs shortened`);
      } catch (err) {
        console.error(err);
      }
    }

    if (failedCount > 0) {
      setMessage(`${failedCount} URL(s) could not be created`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        URL Shortener
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create up to 5 shortened URLs simultaneously.
      </Typography>

      {message && (
        <Alert sx={{ mb: 3 }} severity="success">
          {message}
        </Alert>
      )}

      {error && (
        <Alert sx={{ mb: 3 }} severity="error">
          {error}
        </Alert>
      )}
      {/* URL INPUT CARDS */}
      <Grid container spacing={2}>
        {urlForms.map((form, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  URL {index + 1}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Long URL"
                      placeholder="https://example.com"
                      value={form.longUrl}
                      onChange={(e) =>
                        handleChange(index, "longUrl", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Validity (Minutes)"
                      value={form.validity}
                      onChange={(e) =>
                        handleChange(index, "validity", e.target.value)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Custom Shortcode"
                      placeholder="abc123"
                      value={form.shortcode}
                      onChange={(e) =>
                        handleChange(index, "shortcode", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, mb: 4 }}>
        <Button variant="contained" size="large" onClick={handleShortenUrls}>
          Shorten URLs
        </Button>
      </Box>

      {/* FILTERS */}

      <NotificationFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {/* STATISTICS */}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Chip label={`Total URLs: ${notifications.length}`} color="primary" />

          <Chip
            label={`Total Clicks: ${notifications.reduce(
              (sum, item) => sum + (item.clicks || 0),
              0,
            )}`}
            color="success"
          />
        </Stack>
      </Paper>

      {/* URL TABLE */}

      <Paper sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>

              <TableCell>Original URL</TableCell>

              <TableCell>Created</TableCell>

              <TableCell>Expiry</TableCell>

              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No URLs found
                </TableCell>
              </TableRow>
            ) : (
              notifications.map((item) => (
                <TableRow key={item.shortcode}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {window.location.origin}/{item.shortcode}
                    </Typography>
                  </TableCell>

                  <TableCell>{item.longUrl}</TableCell>

                  <TableCell>
                    {new Date(item.creationTime).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(item.expiryTime).toLocaleString()}
                  </TableCell>

                  <TableCell>{item.clicks || 0}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
    </Container>
  );
}
