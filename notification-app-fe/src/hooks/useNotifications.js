import { useEffect, useMemo, useState } from "react";
import { fetchNotifications, createShortUrl } from "../api/notifications";
import { Log } from "../utils/logger";
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const loadNotifications = () => {
    try {
      setLoading(true);
      const data = fetchNotifications();
      setNotifications(data.notifications || []);
      setError("");
      Log("frontend", "info", "hook", "Loaded URL data");
    } catch (err) {
      setError("Unable to load URLs");
      Log("frontend", "error", "hook", "Failed to load URL data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadNotifications();
  }, []);
  const addNotification = (longUrl, validity, shortcode) => {
    const result = createShortUrl(longUrl, validity, shortcode);
    if (result.success) {
      loadNotifications();
      Log("frontend", "info", "hook", "New short URL created");
    }
    return result;
  };
  const filteredNotifications = useMemo(() => {
    let data = [...notifications];
    if (search.trim() !== "") {
      const value = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.longUrl.toLowerCase().includes(value) ||
          item.shortcode.toLowerCase().includes(value),
      );
    }
    switch (sort) {
      case "clicks":
        data.sort((a, b) => b.clicks - a.clicks);
        break;
      case "expiry":
        data.sort((a, b) => new Date(a.expiryTime) - new Date(b.expiryTime));
        break;
      case "oldest":
        data.sort(
          (a, b) => new Date(a.creationTime) - new Date(b.creationTime),
        );
        break;
      default:
        data.sort(
          (a, b) => new Date(b.creationTime) - new Date(a.creationTime),
        );
    }
    return data;
  }, [notifications, search, sort]);
  return {
    notifications: filteredNotifications,
    loading,
    error,
    search,
    setSearch,
    sort,
    setSort,
    addNotification,
    reload: loadNotifications,
  };
}
