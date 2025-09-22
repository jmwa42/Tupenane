// src/pages/Contributions.jsx
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Button, TextField,
  Card, CardContent, List, ListItem
} from "@mui/material";
import axios from "axios";

export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [amount, setAmount] = useState("");

  const fetchContributions = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8001/api/contributions/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContributions(res.data));
  };

  const addContribution = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8001/api/contributions/add/",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setAmount("");
        fetchContributions();
      });
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Contributions</Typography>

      <Card sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add Contribution</Typography>
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={addContribution}>
          Add
        </Button>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Contribution History</Typography>
          <List>
            {contributions.map((c) => (
              <ListItem key={c.id}>
                {c.amount} on {new Date(c.created_at).toLocaleString()}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

