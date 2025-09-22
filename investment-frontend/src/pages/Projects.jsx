import { useEffect, useState } from "react";
import api from "../api";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects/").then((res) => setProjects(res.data)).catch(() => setProjects([]));
  }, []);

  const invest = async (id) => {
    const amount = prompt("Amount to invest:");
    if (!amount) return;
    await api.post(`projects/${id}/invest/`, { amount });
    alert("Investment recorded!");
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>All Projects</Typography>
      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <b>Target:</b> {p.target_amount}
                </Typography>
                <Typography variant="body2">
                  <b>Total Invested:</b> {p.total_invested}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => invest(p.id)}
                >
                  Invest
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

