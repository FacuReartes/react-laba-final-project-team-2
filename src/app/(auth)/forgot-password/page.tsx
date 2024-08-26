import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        m: 0,
        p: 0,
        minWidth: "100vw",
        minHeight: "100vh",
        position: "relative",
      }}
      disableGutters
    >
      <Box
        component="img"
        src="./assets/logo.svg"
        alt="Logo"
        sx={{
          width: "40px",
          height: "30px",
          p: 0,
          position: "absolute",
          left: { md: "40px", xs: "20px" },
          top: { md: "50px", xs: "18px" },
        }}
      ></Box>
      <Box
        component="form"
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
            href="/signin"
            sx={{ m: "auto", textDecoration: "none", color: "#494949", fontSize: "15px" }}
          >
            Back to log in
          </Link>
        </Box>
      </Box>
      <Box
        component="img"
        src="./assets/forgotpassword.png"
        alt="Sneakers"
        sx={{
          width: "50%",
          height: "100vh",
          p: 0,
          display: { xs: "none", md: "block" },
          objectFit: "cover",
        }}
      ></Box>
    </Container>
  );
}
