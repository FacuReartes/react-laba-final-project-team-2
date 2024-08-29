import { Box, Typography, Button, SelectChangeEvent } from "@mui/material";

import React, { useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import PreviewImages from "./PreviewImages";
import ProductNameInput from "./ProductNameInput";
import ProductPriceInput from "./ProductPriceInput";
import ProductGenderSelect from "./ProductGenderSelect";
import ProductBrandSelect from "./ProductBrandSelect";
import ProductDescriptionInput from "./ProductDescriptionInput";
import ProductSizesButtons from "./ProductionSizeButtons";
import RejectFilesDialog from "./RejectedFilesDialog";

const MockBrands = [
  { brand_id: 1, brand_name: "Nike" },
  { brand_id: 2, brand_name: "Adidas" },
];

const MockSizes = ["EU-36", "EU-37", "EU-38", "EU-39", "EU-40"];

interface ShoeSizes {
  size: string;
  status: boolean;
}

const AddProductForm = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productGender, setProductGender] = useState<string>("");
  const [productBrand, setProductBrand] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productSizes, setProductSizes] = useState<ShoeSizes[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  useEffect(() => {
    setProductSizes(
      MockSizes.map((mockSize) => {
        return { size: mockSize, status: false };
      })
    );
  }, []);

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(Number(event.target.value));
  };

  const handleProductDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductDescription(event.target.value);
  };

  const handleProductSizesChange = (sizes: ShoeSizes[]) => {
    setProductSizes(sizes);
  };

  const handleProductGenderChange = (event: SelectChangeEvent) => {
    setProductGender(event.target.value);
  };

  const handleProductBrandChange = (event: SelectChangeEvent) => {
    setProductBrand(event.target.value);
  };

  const handleAcceptedFiles = (files: File[]) => {
    setProductImages((prev) => [...prev, ...files]);
  };

  const handleRejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleDeleteImage = (targetIndex: number) => {
    const prodImages = productImages.filter((temp, index) => index !== targetIndex);
    setProductImages(prodImages);
  };

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <form style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { lg: "row", xs: "column" },
            gap: { lg: "100px", xs: "24px" },
          }}
        >
          <Box
            sx={{
              width: { lg: "436px", xs: "100%" },
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Button
              type="submit"
              sx={{
                position: "absolute",
                top: { lg: "58px", xs: "" },
                bottom: { lg: "", xs: "24px" },
                right: { lg: "59px", xs: "20px" },
                width: { lg: "152px", xs: "calc(100% - 40px)" },
                height: "40px",
                bgcolor: "secondary.light",
                color: "#ffffff",
                fontSize: "16px",
                ":hover": { bgcolor: "secondary.main" },
              }}
            >
              Save
            </Button>
            <ProductNameInput
              productName={productName}
              onProductNameChange={handleProductNameChange}
            />
            <ProductPriceInput
              productPrice={productPrice}
              onProductPriceChange={handleProductPriceChange}
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <ProductGenderSelect
                productGender={productGender}
                onProductGenderChange={handleProductGenderChange}
              />
              <ProductBrandSelect
                brandOptions={MockBrands}
                productBrand={productBrand}
                onProductBrandChange={handleProductBrandChange}
              />
            </Box>
            <ProductDescriptionInput
              productDescription={productDescription}
              onProductDescriptionChange={handleProductDescriptionChange}
            />
            <ProductSizesButtons
              productSizes={productSizes}
              onProductSizesButtonsChange={handleProductSizesChange}
              sizeOptions={MockSizes}
            />
          </Box>

          <Box
            sx={{
              width: { lg: "100%", xs: "calc(100% - 40px)" },
            }}
          >
            <Box>
              <Typography sx={{ mb: 1 }} variant="h4">
                Product images
              </Typography>
              <PreviewImages
                gallery={productImages}
                onFileAccepted={handleAcceptedFiles}
                onFileRejected={handleRejectedFiles}
                onDelete={handleDeleteImage}
              />
            </Box>
          </Box>
        </Box>
      </form>
      <RejectFilesDialog
        selectedValue={actionDialog}
        open={openDialog}
        onClose={handleDialogOnClose}
      />
    </Box>
  );
};

export default AddProductForm;
