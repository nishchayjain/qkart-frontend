// CRIO_SOLUTION_START_MODULE_LOGIN
// CRIO_SOLUTION_END_MODULE_LOGIN
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
// CRIO_SOLUTION_START_MODULE_PRODUCTS
import ProductCard from "./ProductCard";
// CRIO_SOLUTION_END_MODULE_PRODUCTS
// CRIO_SOLUTION_START_MODULE_CART
import Cart, { generateCartItemsFrom } from "./Cart";
// CRIO_SOLUTION_END_MODULE_CART


/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

const Products = () => {
  // CRIO_SOLUTION_START_MODULE_CART
  const [items, setItems] = useState([]);
  // CRIO_SOLUTION_END_MODULE_CART
  // CRIO_SOLUTION_START_MODULE_PRODUCTS
  const { enqueueSnackbar } = useSnackbar();
  // NOTE - Needs to be state as timer value is to be persisted across renders
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // CRIO_SOLUTION_END_MODULE_PRODUCTS
  // CRIO_SOLUTION_START_MODULE_CART
  const token = localStorage.getItem("token");
  // CRIO_SOLUTION_END_MODULE_CART

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    // CRIO_SOLUTION_START_MODULE_PRODUCTS
    setLoading(true);

    try {
      const response = await axios.get(`${config.endpoint}/products`);

      setLoading(false);

      setProducts(response.data);
      setFilteredProducts(response.data);
      return response.data;
    } catch (e) {
      setLoading(false);

      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
    // CRIO_SOLUTION_END_MODULE_PRODUCTS
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    // CRIO_SOLUTION_START_MODULE_PRODUCTS
    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setFilteredProducts(response.data);
      return response.data;
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          setFilteredProducts([]);
        }

        if (e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
          setFilteredProducts(products);
        }
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
    // CRIO_SOLUTION_END_MODULE_PRODUCTS
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    // CRIO_SOLUTION_START_MODULE_PRODUCTS
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);

    setDebounceTimeout(timeout);
    // CRIO_SOLUTION_END_MODULE_PRODUCTS
  };

  // CRIO_SOLUTION_START_MODULE_PRODUCTS
  // useEffect(() => {
  //   performAPICall();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // CRIO_SOLUTION_END_MODULE_PRODUCTS


  // CRIO_SOLUTION_START_MODULE_CART
  const updateCartItems = (cartData, products) => {
    const cartItems = generateCartItemsFrom(cartData, products);
    setItems(cartItems);
  };
  // CRIO_SOLUTION_END_MODULE_CART



  // CRIO_SOLUTION_START_MODULE_CART
  // FIXME - On page load, two "GET /cart" requests are made
  // NOTE - Not checking direclty for page load, but products change instead
  // useEffect( () => {
  // fetchCart(token)
  // .then((cartData) => generateCartItemsFrom(cartData, products))
  // .then((cartItems) => setItems(cartItems));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [products]);

  useEffect(() => {
    const onLoadHandler = async () => {
      const productsData = await performAPICall();
      const cartData = await fetchCart(token);
      const cartDetails = await generateCartItemsFrom(cartData, productsData);
      setItems(cartDetails);
    };
    onLoadHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // CRIO_SOLUTION_END_MODULE_CART

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

        {/* CRIO_SOLUTION_START_MODULE_PRODUCTS */}
        <TextField
          className="search-desktop"
          size="small"
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, debounceTimeout)}
        />
        {/* CRIO_SOLUTION_END_MODULE_PRODUCTS */}
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        // CRIO_SOLUTION_START_MODULE_PRODUCTS
        onChange={(e) => debounceSearch(e, debounceTimeout)}
        // CRIO_SOLUTION_END_MODULE_PRODUCTS
      />
      {/* CRIO_UNCOMMENT_START_MODULE_LOGIN
      // <Grid container>
      //   <Grid item className="product-grid">
      //     <Box className="hero">
      //       <p className="hero-heading">
      //         India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
      //         to your door step
      //       </p>
      //     </Box>
      //   </Grid>
      // </Grid>
      {/* CRIO_UNCOMMENT_END_MODULE_LOGIN */}
      {/* CRIO_UNCOMMENT_START_MODULE_PRODUCTS
      // <Grid container>
      //   <Grid item className="product-grid">
      //     <Box className="hero">
      //       <p className="hero-heading">
      //         India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
      //         to your door step
      //       </p>
      //     </Box>
      //   </Grid>
      // </Grid>
      {/* CRIO_UNCOMMENT_END_MODULE_PRODUCTS */}
      {/* CRIO_SOLUTION_START_MODULE_PRODUCTS */}
      <Grid container>
        <Grid
          item
          xs={12}
          // CRIO_SOLUTION_START_MODULE_CART
          md={token && products.length ? 9 : 12}
          // CRIO_SOLUTION_END_MODULE_CART
          className="product-grid"
        >
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>

          {isLoading ? (
            <Box className="loading">
              <CircularProgress />
              <h4>Loading Products...</h4>
            </Box>
          ) : (
            <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Grid item xs={6} md={3} key={product._id}>
                    <ProductCard
                      product={product}
                      // CRIO_SOLUTION_START_MODULE_CART
                      handleAddToCart={async () => {
                        await addToCart(
                          token,
                          items,
                          products,
                          product._id,
                          1,
                          {
                            preventDuplicate: true,
                          }
                        );
                      }}
                      // CRIO_SOLUTION_END_MODULE_CART
                    />
                  </Grid>
                ))
              ) : (
                <Box className="loading">
                  <SentimentDissatisfied color="action" />
                  <h4 style={{ color: "#636363" }}>No products found</h4>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
        {/* CRIO_SOLUTION_END_MODULE_PRODUCTS */}
        {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
        {/* CRIO_SOLUTION_START_MODULE_CART */}
        {token ? (
          <Grid item xs={12} md={3} bgcolor="#E9F5E1">
            <Cart
              hasCheckoutButton
              products={products}
              items={items}
              handleQuantity={addToCart}
            />
          </Grid>
        ) : null}
        {/* CRIO_SOLUTION_END_MODULE_CART */}
        {/* CRIO_SOLUTION_START_MODULE_PRODUCTS */}
      </Grid>
      {/* CRIO_SOLUTION_END_MODULE_PRODUCTS */}
      <Footer />
    </div>
  );
};

export default Products;
