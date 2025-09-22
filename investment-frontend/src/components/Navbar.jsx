// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import axios from "axios";

export default function Navbar() {
  const [balance, setBalance] = useState({ available_balance: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8001/api/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBalance(res.data))
        .catch(() => {});
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          InvestCloud
        </Typography>
        <Button color="inherit" href="/projects">Projects</Button>
        <Button color="inherit" href="/projects/mine">My Projects</Button>
        <Button color="inherit" href="/projects/create">Create</Button>
        <Button color="inherit" href="/investments">Investments</Button>
        <Button color="inherit" href="/contributions">Contributions</Button>
        <Box sx={{ mx: 2 }}>
          <Typography variant="body2">
            Balance: {balance.available_balance}
          </Typography>
        </Box>
        <Button color="error" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

