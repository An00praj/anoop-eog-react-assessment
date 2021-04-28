import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { actions, availableMetricsSelector } from '../Features/Metrics/reducer';

const getMetricsQuery = `query { getMetrics }`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      margin: '40px auto',
      textAlign: 'center',
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        width: 600,
      },
    },
  }),
);

export default function SelectMetric() {
  const dispatch = useDispatch();
  const metrics = useSelector(availableMetricsSelector);

  const [result] = useQuery({
    query: getMetricsQuery,
  });

  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    dispatch(actions.setAvailableMetrics(data.getMetrics));
  }, [dispatch, data, error]);

  const handleOnchange = (_event: React.FormEvent<HTMLInputElement>, value: string[]) => {
    const selectedMetrics = value.map(val => {
      return {
        metricName: val,
      };
    });
    dispatch(actions.setSelectedMetrics(selectedMetrics));
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="autocomplete-metrics"
        options={metrics}
        getOptionLabel={option => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select a metrics"
            placeholder="Select..."
          />
        )}
        onChange={(e: any, value: string[]) => handleOnchange(e, value)}
      /> 
    </div>
  );
}
