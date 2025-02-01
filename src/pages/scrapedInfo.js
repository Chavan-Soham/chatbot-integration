import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress, List, ListItem, ListItemText, Typography,
  Box, Paper, Button, ListItemIcon
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const dummyPages = [
  { id: 1, url: "https://dummyPage.com/about", status: "scraped", data: ["Company History", "Mission", "Vision"] },
  { id: 2, url: "https://dummyPage.com/products", status: "pending", data: ["Laptops, Smartphones, Washing Machines"] },
  { id: 3, url: "https://dummyPage.com/contact", status: "scraped", data: ["Phone Number", "Email Address", "Location"] },
];

export default function WebPagesScraperStatus() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPages(dummyPages);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Simulate scraping process by updating "pending" pages to "scraped" after 5 seconds
    const scrapeTimeout = setTimeout(() => {
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.status === "pending" ? { ...page, status: "scraped" } : page
        )
      );
    }, 5000); // Change "pending" to "scraped" after 5 seconds

    return () => clearTimeout(scrapeTimeout);
  }, [pages]);

  // Check if all pages are scraped
  const allScraped = pages.length > 0 && pages.every(page => page.status === "scraped");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Paper sx={{ padding: 3, width: "400px", textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Webpages Scraping Status: Click to view data
        </Typography>

        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <List>
            {pages.map((page) => (
              <ListItem
                key={page.id}
                button
                onClick={() => setSelectedPage(page)}
                sx={{ borderBottom: "1px solid #ddd" }}
              >
                <ListItemIcon>
                  {page.status === "scraped" ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <HourglassEmptyIcon color="warning" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={page.url}
                  secondary={page.status === "scraped" ? "Scraped" : "Pending"}
                  sx={{ cursor: "pointer" }}
                />
              </ListItem>
            ))}
          </List>
        )}

        {selectedPage && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Scraped Data from:</Typography>
            <Typography variant="body2" color="primary">{selectedPage.url}</Typography>
            <Paper sx={{ padding: 2, marginTop: 1, backgroundColor: "#eef2f6", borderRadius: 1 }}>
              {selectedPage.data.length > 0 ? (
                selectedPage.data.map((chunk, index) => (
                  <Typography key={index}>✔ {chunk}</Typography>
                ))
              ) : (
                <Typography>No data available yet.</Typography>
              )}
            </Paper>
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="secondary"
              onClick={() => setSelectedPage(null)}
            >
              Close
            </Button>
          </Box>
        )}

        {/* Show "Proceed to Chatbot" button only if all pages are scraped */}
        {allScraped && (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, width: "100%", fontWeight: "bold", boxShadow: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => navigate("/chatbot-btns")}
            startIcon={<SmartToyIcon />}
          >
            Proceed to Chatbot
          </Button>
        )}
      </Paper>
    </Box>
  );
}
