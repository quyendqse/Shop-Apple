import {
  Add,
  Cancel,
  Create,
  Delete,
  Edit,
  NoteAdd,
  Save,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Grid,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const ProductsManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      url: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg",
      name: "Iphone 13 pro max",
      price: 10.99,
      description: "Product 1 description...",
    },
    {
      id: 2,
      url: "https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg",
      name: "Iphone 12 pro max",
      price: 15.99,
      description: "Product 2 description...",
    },
    {
      id: 3,
      url: "https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg",
      name: "Iphone XS max",
      price: 12.99,
      description: "Product 3 description...",
    },
    {
      id: 4,
      url: "https://prices.vn/storage/photos/7/product/1603023702-djien-thoai-iphone-12.jpg",
      name: "Iphone 15 Pro Max",
      price: 10.99,
      description: "Product 1 description...",
    },
    {
      id: 5,
      url: "https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg",
      name: "Iphone 13 Promax Blue",
      price: 15.99,
      description: "Product 2 description...",
    },
    {
      id: 6,
      url: "https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg",
      name: "Iphone X",
      price: 12.99,
      description: "Product 3 description...",
    },
    {
      id: 7,
      url: "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg",
      name: "Iphone 12",
      price: 10.99,
      description: "Product 1 description...",
    },
    {
      id: 8,
      url: "https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg",
      name: "Product 2",
      price: 15.99,
      description: "Product 2 description...",
    },
    {
      id: 9,
      url: "https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg",
      name: "Product 3",
      price: 12.99,
      description: "Product 3 description...",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductPrice, setEditProductPrice] = useState(0);
  const [editProductDescription, setEditProductDescription] = useState("");
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductDescription, setNewProductDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const handleEditProduct = (id: any) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setEditProductId(id);
      setEditProductName(product.name);
      setEditProductPrice(product.price);
      setEditProductDescription(product.description);
    }
  };

  const handleAddProduct = () => {
    setIsAddDialogOpen(true);
  };

  const handleCancelAdd = () => {
    setIsAddDialogOpen(false);
    setNewProductImage(null);
    setNewProductName("");
    setNewProductPrice(0);
    setNewProductDescription("");
  };
  const handleSaveProduct = () => {
    if (editProductId !== null) {
      // Editing an existing product
      const updatedProducts = products.map((product) => {
        if (product.id === editProductId) {
          return {
            ...product,
            name: editProductName,
            price: editProductPrice,
            description: editProductDescription,
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      handleCancelEdit();
    } else {
      // Adding a new product
      const newProduct = {
        id: Date.now(),
        url: newProductImage ? URL.createObjectURL(newProductImage) : "",
        name: newProductName,
        price: newProductPrice,
        description: newProductDescription,
      };

      setProducts([newProduct, ...products]);
      handleCancelAdd();
    }
  };

  const handleDeleteProduct = (id: any) => {
    setDeleteProductId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedProducts = products.filter(
      (product) => product.id !== deleteProductId
    );
    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditProductName("");
    setEditProductPrice(0);
    setEditProductDescription("");
  };
  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleSearchSuggestions = (event:any, value:any) => {
  setSearchTerm(value);
};



  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
      <Box sx={{ marginRight: 2 }}>
      <Autocomplete
 
      sx={{ width: 300 }}
        options={products.map((product) => product.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        )}
        value={searchTerm}
        onChange={handleSearchSuggestions}
       
      />
      </Box>
        <Button sx={{width:'5px', borderRadius:'60px', border:'20px' }} variant="contained" onClick={handleAddProduct}>
           <Add/>
        </Button>
      </Box>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: "1px solid #ccc", p: 2 }}>
              <img
                style={{ width: "100%", height: "auto" }}
                src={product.url}
                alt={`Image ${product.id}`}
              />
              {editProductId === product.id ? (
                <>
                  <Box sx={{ textAlign: "center" }}>
                    <Input
                      type="text"
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                    />
                    <Input
                      type="number"
                      value={editProductPrice}
                      onChange={(e) =>
                        setEditProductPrice(parseFloat(e.target.value))
                      }
                    />
                    <Input
                      type="text"
                      value={editProductDescription}
                      onChange={(e) =>
                        setEditProductDescription(e.target.value)
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      mt: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Button variant="contained" onClick={handleSaveProduct}>
                      <Save />
                    </Button>
                    <Button variant="contained" onClick={handleCancelEdit}>
                      <Cancel />
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      mt: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isAddDialogOpen} onClose={handleCancelAdd}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gridGap: "16px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNewProductImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                } else {
                  setNewProductImage(null);
                  setPreviewImage(null);
                }
              }}
            />
            {previewImage && (
              <img
                style={{ width: "100%", height: "auto" }}
                src={previewImage}
                alt="Preview"
              />
            )}
            <Input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              placeholder="Product Name"
            />
            <Input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
              placeholder="Product Price"
            />
            <Input
              type="text"
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              placeholder="Product Description"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
