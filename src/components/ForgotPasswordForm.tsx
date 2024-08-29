import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

const ForgotPasswordForm = () => {
  return (
    <Box
      sx={{
        m: "auto",
        width: { xs: "100%", md: "50%" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: { md: "436px", xs: "320px" },
      }}
    >
      <Typography variant="h1">Forgot password?</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        Don’t worry, we’ll send you reset instructions.
      </Typography>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Box maxWidth="436px" sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 2, color: "#ffffff", bgcolor: "secondary.light", fontSize: "16px" }}
            color="secondary"
          >
            Reset password
          </Button>
          <Link
            href="/sign-in"
            style={{ margin: "auto", textDecoration: "none", color: "#494949", fontSize: "15px" }}
          >
            Back to log in
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
