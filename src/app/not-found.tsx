"use client";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  const isDesktop = useMediaQuery("(min-width: 700px)");
  return isDesktop ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          flexGrow: 4,
          display: "flex",
          flexDirection: "column",
          pl: "250px",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "500", textAlign: "left", fontSize: "45px" }}
        >
          Error 404
        </Typography>
        <Typography
          sx={{
            color: "#5C5C5C",
            textAlign: "left",
            pt: "12px",
            fontSize: "20px",
            width: "538px",
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            mt: "25px",
            width: "320px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "secondary.light",
              borderColor: "secondary.light",
              ":hover": { borderColor: "secondary.light" },
              flexGrow: 1,
            }}
          >
            Go back
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "secondary.light",
              ":hover": { bgcolor: "secondary.light", opacity: ".9" },
              flexGrow: 1,
            }}
          >
            <Link href={"/"} style={{ textDecoration: "none", color: "#fff" }}>
              Home
            </Link>
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Image
          src={"/404-img.svg"}
          alt="404-img"
          width={960}
          height={992}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  ) : (
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
