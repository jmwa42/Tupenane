import { useEffect, useState } from "react";
import api from "../api";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function Investments() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    api.get("investments/").then((res) => setInvestments(res.data)).catch(() => setInvestments([]));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>My Investments</Typography>
      <Grid container spacing={3}>
        {investments.length === 0 && <Typography>No investments yet.</Typography>}
        {investments.map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  <b>Project:</b> {i.project}
                </Typography>
                <Typography variant="body1">
                  <b>Amount:</b> {i.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(i.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

