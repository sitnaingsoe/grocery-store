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
import {getProductCategory} from "@/store/slices/productCategorySlice";
import {ProductCategory} from "@prisma/client";

const ProductCategoryPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [showProductCaategory, setShowProductCategory] = useState<ProductCategory[]>([]);
  const productCategory = useAppSelector((state) => state.productCategory.productCategory);
  const [newProductCategory, setNewProductCategory] = useState<ProductCategoryPayload>({
    name: "",
    isAvailable: true,
  });
  useEffect(() => {
    if (productCategory.length !== 0) {
      setShowProductCategory(productCategory);
    }
  }, [productCategory]);

  useEffect(() => {
    dispatch(getProductCategory());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (productCategory.length === 0) {
    return null; // Return null to avoid rendering the component if there's no data
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Box sx={{display: "flex", justifyContent: "flex-end"}}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
      </Box>

      <NewProductCategory
        open={open}
        setOpen={setOpen}
        newProductCategory={newProductCategory}
        setNewProductCategory={setNewProductCategory}
      />

      <Box>
        {showProductCaategory.map((item) => (
          <div key={item.id}>{item.name}</div> // Assuming each item has a unique 'id'
        ))}
      </Box>
    </Box>
  );
};

export default ProductCategoryPage;
