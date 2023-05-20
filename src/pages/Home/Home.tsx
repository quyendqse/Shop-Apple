import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ChartComponent from "../../Chart/ChartComponent";
import { useAppSelector } from "../../store/hooks";
import { selectShop } from "../../store/shop/shopSlice";
function Home() {
  const shop = useAppSelector(selectShop);
  return (
    <Box
     >
      <Typography variant="h5">Welcome, {shop.name}</Typography>
      <ChartComponent/>
    </Box>
  );
}

export default Home;
