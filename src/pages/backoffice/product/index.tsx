import React, {useEffect, useState} from "react";
import Card from "@/components/Card";
import NewProductCategory from "@/components/NewProductCategory";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {ProductCategoryPayload} from "@/type/product-category";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const handleClickOpen = () => {
    setOpen(true);
  };

  if (!product) {
    return null; // Return null to avoid rendering the component if there's no data
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", p: 5}}>
      <Box sx={{display: "flex", justifyContent: "flex-end"}}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
      </Box>

      <Box sx={{display: "flex", flexWrap: "wrap", pl: 10}}>
        {product.map((item) => (
          <Box key={item.id}>
            {" "}
            <Card name={item.name} href="" />
          </Box> // Assuming each item has a unique 'id'
        ))}
      </Box>
    </Box>
  );
};

export default ProductPage;
