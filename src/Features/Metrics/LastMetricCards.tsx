import React from 'react';
import { useSelector } from 'react-redux';
import { lastMeasurementSelector } from './reducer';
import CurrentMetricCard from './CurrentMetricCard';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: 'center',
      padding: '10px',
    },
  }),
);


const LastMetricCards = () => {
  const lastMeasurements = useSelector(lastMeasurementSelector);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {lastMeasurements.map((measurement, i) => {
        return <CurrentMetricCard  key={i} measurement={measurement} />;
      })}
    </div>
  );
};

export default LastMetricCards;
