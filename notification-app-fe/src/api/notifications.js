import { Log } from "../utils/logger";
const STORAGE_KEY = "url_db";
export function fetchNotifications() {
  try {
    const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    Log("frontend", "info", "api", "Fetched URL records successfully");
    return {
      notifications: urls,
      total: urls.length,
    };
  } catch (error) {
    Log("frontend", "error", "api", "Failed to fetch URL records");
    return {
      notifications: [],
      total: 0,
    };
  }
}
export function createShortUrl(longUrl, validity = 30, shortcode = "") {
  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (urls.length >= 5) {
    Log("frontend", "warn", "api", "Maximum URL limit reached");
    return {
      success: false,
      message: "Maximum of 5 URLs allowed",
    };
  }
  let code = shortcode.trim();
  if (!code) {
    code = Math.random().toString(36).substring(2, 8);
  }
  const exists = urls.find((item) => item.shortcode === code);
  if (exists) {
    Log("frontend", "warn", "api", "Duplicate shortcode detected");
    return {
      success: false,
      message: "Shortcode already exists",
    };
  }
  const created = new Date();
  const expiry = new Date(created.getTime() + Number(validity) * 60000);
  const newUrl = {
    id: Date.now(),
    longUrl,
    shortcode: code,
    shortLink: `${window.location.origin}/${code}`,
    creationTime: created.toLocaleString(),
    expiryTime: expiry.toLocaleString(),
    clicks: 0,
    clickHistory: [],
  };
  urls.push(newUrl);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  Log("frontend", "info", "api", "Short URL created successfully");
  return {
    success: true,
    data: newUrl,
  };
}
export function incrementClicks(shortcode) {
  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  urls.forEach((item) => {
    if (item.shortcode === shortcode) {
      item.clicks += 1;
      item.clickHistory.push({
        timestamp: new Date().toLocaleString(),
        source: "Application",
      });
      Log("frontend", "debug", "api", "Short URL clicked");
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}
export function getUrl(shortcode) {
  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  return urls.find((item) => item.shortcode === shortcode);
}
