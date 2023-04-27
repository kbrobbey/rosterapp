import React from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function RobotCard({
  leftButtonAction,
  leftButtonText,
  rightButtonText,
  rightButtonAction,
  robot
}) {
  const { first_name: firstName, last_name: lastName, avatar, username } = robot;
  return (
    <Card sx={{ width: 150 }}>
      <CardMedia component="img" alt={username} height="150" src={avatar} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {firstName?.[0]} {lastName}
        </Typography>
        <Typography variant="body2">ipsum lorem</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={leftButtonAction}>
          {leftButtonText}
        </Button>
        <Button size="small" onClick={rightButtonAction}>
          {rightButtonText}
        </Button>
      </CardActions>
    </Card>
  );
}

RobotCard.propTypes = {
  leftButtonAction: PropTypes.func.isRequired,
  leftButtonText: PropTypes.string.isRequired,
  rightButtonAction: PropTypes.func.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  robot: PropTypes.shape({
    avatar: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};
