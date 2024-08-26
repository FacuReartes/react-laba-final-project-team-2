"use client";
import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Products from "@/components/Products";

type MockUser = {
  name: string;
  totalPoints: number;
};

const mockUser: MockUser = {
  name: "Jane Meldrum",
  totalPoints: 1374,
};

export default function ProductsPage() {
  const isDesktop = useMediaQuery("(min-width: 700px)");
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        pb: "48px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Image
          src={"/products-hero-img.png"}
          alt="hero-img"
          width={700}
          height={isDesktop ? 262 : 132}
          sizes="100vw"
          style={{ width: "100%" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-35%", md: "-25%" },
            left: "54px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: { xs: "60px", md: "120px" },
              height: { xs: "60px", md: "120px" },
            }}
          />
          <Box
            sx={{
              alignSelf: "flex-end",
              ml: "26px",
              mb: "15px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#000",
                fontWeight: "500",
                fontSize: { xs: "14px", md: "20px" },
              }}
            >
              {mockUser.name}
            </Typography>
            <Typography
              color={"#5C5C5C"}
              sx={{ fontSize: { xs: "12px", md: "15px" } }}
            >
              {mockUser.totalPoints} bonus points
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "120px" }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#000",
            fontSize: { xs: "30px", md: "45px" },
            fontWeight: "500",
            pl: { xs: "20px", md: "0" },
          }}
        >
          My products
        </Typography>
        <Button
          variant="contained"
          disableElevation
          size="large"
          sx={{
            display: {
              xs: "none",
              md: "inline",
            },
            bgcolor: "secondary.light",
            color: "#fff",
            height: "40px",
            textTransform: "capitalize",
            transition: "opacity .2s ease",
            ":hover": { bgcolor: "secondary.light", opacity: ".9" },
            borderRadius: 2,
          }}
        >
          Add product
        </Button>
      </Box>
      <Products />
    </Box>
  );
}
