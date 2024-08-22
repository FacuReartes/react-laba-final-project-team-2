import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button
        variant="contained"
        sx={{
          p: "32px",
          bgcolor: "secondary.main",
          ":hover": {
            bgcolor: "secondary.light",
          },
        }}
      >
        Hello World
      </Button>
    </main>
  );
}
