import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#E5E5E7",
          borderRadius: "0 0 32px 32px",
          pt: "32px",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "500" }}>
          Error 404
        </Typography>
        <Typography
          sx={{
            color: "#5C5C5C",
            textAlign: "center",
            pt: "12px",
            px: "28px",
            fontSize: "12px",
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
        </Typography>
        <Image src={"/404-img.svg"} alt="404-img" width={360} height={459} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          mt: "25px",
          px: "20px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "secondary.light",
            borderColor: "secondary.light",
            flexGrow: 1,
            ":hover": { borderColor: "secondary.light" },
          }}
        >
          Go back
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "secondary.light",
            flexGrow: 1,
            ":hover": { bgcolor: "secondary.light", opacity: ".9" },
          }}
        >
          <Link href={"/"} style={{ textDecoration: "none", color: "#fff" }}>
            Home
          </Link>
        </Button>
      </Box>
    </Box>
  );
}
