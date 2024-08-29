import Image from "next/image";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import DeleteDialog from "./DeleteDialog";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  onDelete: () => void;
}

const ImageEdit = ({ src, alt, width, height, onDelete }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);

  const handleDeleteImage = () => {
    setOpenDialog(true);
  };

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  useEffect(() => {
    if (actionDialog) {
      onDelete();
    }
  }, [actionDialog]);

  return (
    <Box
      sx={{ width, height, position: "relative" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      {isHover && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bgcolor: "rgba(0,0,0,0.35)",
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleDeleteImage}
            size="large"
            sx={{
              color: "#494949",
              bgcolor: "#ffffff",
              ":hover": { color: "#ffffff", bgcolor: "#FE645E" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <DeleteDialog selectedValue={actionDialog} open={openDialog} onClose={handleDialogOnClose} />
    </Box>
  );
};

export default ImageEdit;
