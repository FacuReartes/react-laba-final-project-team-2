import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
import heroImg from "../../../public/products-hero-img.png";
import mockImg from "../../../public/mock-img.png";
import Product from "@/components/Product";
import { ProductType } from "@/lib/definitions";
import Products from "@/components/Products";

type MockUser = {
  name: string;
  totalPoints: number;
  img: StaticImageData;
};

const mockUser: MockUser = {
  name: "Jane Meldrum",
  totalPoints: 1374,
  img: mockImg,
};

export default async function ProductsPage() {
  return (
    <Container
      sx={{
        border: "1px solid #ff0000",
        minHeight: "100vh",
        my: 2,
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ position: "relative", height: "352px" }}>
        <Image
          src={heroImg}
          alt="hero-img"
          width={700}
          height={262}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "54px",
            display: "flex",
          }}
        >
          <Image alt="mock-img" src={mockUser.img} width={120} height={120} />
          <Box
            sx={{
              alignSelf: "flex-end",
              ml: "26px",
              mb: "15px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#000", fontWeight: "500" }}>
              {mockUser.name}
            </Typography>
            <Typography color={"#5C5C5C"}>
              {mockUser.totalPoints} bonus points
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h1"
          sx={{ color: "#000", fontSize: "45px", fontWeight: "500" }}
        >
          My products
        </Typography>
        <Button
          variant="contained"
          disableElevation
          size="large"
          sx={{
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
    </Container>
  );
}
