import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { brown } from "@mui/material/colors";
import charmander from "../assets/image/charmander.png";
import charmeleon from "../assets/image/charmeleon.png";
import charizard from "../assets/image/charizard.png";
import squirtle from "../assets/image/squirtle.png";
import wartortle from "../assets/image/wartortle.png";
import blastoise from "../assets/image/blastoise.png";
import Rating from "@mui/material/Rating";
import ModalDetailClass from "./ModalDetailClass";
function BoxClass(props) {
  const { data } = props;
  const rate = () => {
    let temp = 0;
    if (data.ratings > 0) {
      for (const key in data.StudentClasses) {
        if (data.StudentClasses[key].status === "complete") {
          temp += 1;
        }
      }
    }
    let star = data.ratings / temp;
    return <Rating name="read-only" value={star === Infinity ? 0 : star} readOnly precision={0.5} />;
  };

  const checkLevel = () => {
    if (data.categoryId === 1) {
      if (data.levelId === 1) return charmander;
      if (data.levelId === 2) return charmeleon;
      return charizard;
    } else {
      if (data.levelId === 1) return squirtle;
      if (data.levelId === 2) return wartortle;
      return blastoise;
    }
  };

  return (
    <>
      <Card sx={{ display: "flex", mt: 1, mb: 1, color: brown[400], width: "50vh" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              fontSize={{
                md: 20,
                xs: 18,
              }}
            >
              {data.name}
            </Typography>
            <Typography
              fontSize={{
                md: 15,
                xs: 15,
              }}
              color="text.secondary"
            >
              {data.teacher.name}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>{rate()}</Box>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, mt: 1 }}>{<ModalDetailClass data={data} />}</Box>
        </Box>
        <CardMedia component="img" sx={{ width: 151, ml: 3 }} image={checkLevel()} alt="Live from space album cover" />
      </Card>
    </>
  );
}

export default BoxClass;
