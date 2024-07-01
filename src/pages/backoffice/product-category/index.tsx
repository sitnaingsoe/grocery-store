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
import {ProductCategory} from "@prisma/client";

const ProductCategoryPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const productCategory = useAppSelector((state) => state.productCategory.productCategory);
  const {company} = useAppSelector((state) => state.company);
  const [newProductCategory, setNewProductCategory] = useState<ProductCategoryPayload>({
    name: "",
    isAvailable: true,
    companyId: undefined,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (!productCategory || !company) {
    return null; // Return null to avoid rendering the component if there's no data
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", p: 5}}>
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
        companyId={company.id}
      />

      <Box sx={{display: "flex", flexWrap: "wrap", pl: 10}}>
        {productCategory.map((item) => (
          <Box key={item.id}>
            <Card name={item.name} href={`/backoffice/product-category/${item.id}`} />
          </Box> // Assuming each item has a unique 'id'
        ))}
      </Box>
    </Box>
  );
};

export default ProductCategoryPage;
