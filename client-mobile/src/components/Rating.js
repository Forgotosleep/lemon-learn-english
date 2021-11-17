import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Useless+',
  2: 'Poor+',
  3: 'Ok+',
  4: 'Good+',
  5: 'Excellent+',
};

function Ratings(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const { handleRate, status } = props
  console.log(status)
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    > {
        status === 'incomplete' ? (
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onClick={handleRate}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        ) :
          (
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onClick={handleRate}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              disabled
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          )
      }

      {value !== null && (
        <Box sx={{ ml: 2 }}>{status !== 'complete' ? (labels[hover !== -1 ? hover : value]) : 'You already give ratings to this class'}</Box>
      )}
    </Box>
  );
}

// {value !== null && (
//   <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
// )}
export default Ratings