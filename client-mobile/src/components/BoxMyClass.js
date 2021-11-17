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
import { useNavigate } from "react-router-dom"

function BoxMyClass(props) {
  const { myClass } = props;
  const navigate = useNavigate()
  const checkLevel = () => {
    if (myClass.Class.categoryId === 1) {
      if (myClass.Class.levelId === 1) return charmander;
      if (myClass.Class.levelId === 2) return charmeleon;
      return charizard;
    } else {
      if (myClass.Class.levelId === 1) return squirtle;
      if (myClass.Class.levelId === 2) return wartortle;
      return blastoise;
    }
  };

  const toTask = (id, status) => {
    navigate(`/tasks/${id}`, { state: { status, categoryId: myClass.Class.categoryId  } })
  }

  return (
    <>
      <Card onClick={() => toTask(myClass.Class.id, myClass.status)} sx={{ display: "flex", mt: 1, mb: 1, color: brown[400], width: "50vh" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              fontSize={{
                md: 20,
                xs: 18,
              }}
            >
              {myClass?.Class.name}
            </Typography>
            <Typography
              fontSize={{
                md: 15,
                xs: 15,
              }}
              color="text.secondary"
            >
              {myClass?.Class.teacher.name}
            </Typography>
          </CardContent>
          {
            myClass?.status === 'complete' ? <h5 style={{ marginLeft: 10, color: 'white' }} className="bg-success w-100 text-center rounded">{myClass?.status.toUpperCase()}</h5> :
              <h5 style={{ marginLeft: 10, color: 'white' }} className="bg-warning w-100 text-center rounded">{myClass?.status.toUpperCase()}</h5>
          }
        </Box>
        <CardMedia component="img" sx={{ width: 151, ml: 3 }} image={checkLevel()} alt="Live from space album cover" />
      </Card>
    </>
  );
}

export default BoxMyClass;
