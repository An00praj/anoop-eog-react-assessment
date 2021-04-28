import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { CardProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#40E0D0',
      display: 'inline-flex',
      color: '#FFFFFF',
      justifyContent: 'center',
      margin: '10px',
      width: 200,
      [theme.breakpoints.down('xs')]: {
        width: '40%',
        fontSize: 24
      },
    },
    title: {
      fontSize: 16,
    },
    textValue: {
      fontSize: 32,
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        width: '40%',
        fontSize: 24,
      },
    },
  }),
);

const CurrentMetricCard = ({ measurement }: CardProps) => {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} component="h6" gutterBottom>
            {measurement.name}
          </Typography>
          <Typography component="h4" className={classes.textValue}>
            {measurement.value}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default CurrentMetricCard;
