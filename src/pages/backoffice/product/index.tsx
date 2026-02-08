import React, {useState} from "react";
import Card from "@/components/Card";
import NewProductCategory from "@/components/NewProductCategory";
import {useAppDispatch, useAppSelector} from "@/store/hook";
import {Box, Button} from "@mui/material";
import NewProductDialogBox from "@/components/NewProductDialogBox";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", p: 5}}>
      <Box sx={{display: "flex", justifyContent: "flex-end", mb: 2}}>
        <Button variant="contained" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap", pl: 10}}>
        {product.map((item) => (
          <Box key={item.id}>
            <Card
              name={item.name}
              href={`/backoffice/product/${item.id}`}
              assetUrl={item.assetUrl}
            />

          </Box>
        ))}
      </Box>
      <NewProductDialogBox open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ProductPage;
