import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { formatter, getColor, labelFormatter } from './util';
import { useQuery } from 'urql';
import { actions, measurementSelector, selectedMetricsSelector } from './reducer';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Typography from '@material-ui/core/Typography';

const multipleMeasurementsQuery = `
query($metrics: [MeasurementQuery]!) {
  heartBeat,
  getMultipleMeasurements(input: $metrics) {
    metric
    measurements {
      metric
      value
      at
    }
  }
}
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#FFFFFF',
      padding: '20px',
      margin: '20px auto'
    },
    title: {
      textAlign: 'center'
    },
  }),
);

const Graph = () => {
  const dispatch = useDispatch();
  const measurementsData = useSelector(measurementSelector);
  const selectedMetrics = useSelector(selectedMetricsSelector);

  const [result] = useQuery({
    requestPolicy: 'cache-and-network',
    pollInterval: 1300,
    query: multipleMeasurementsQuery,
    variables: {
      metrics: selectedMetrics,
    },
    pause: selectedMetrics.length === 0 && measurementsData.length === 0,
  });

  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    dispatch(actions.setHeartBeat(data.heartBeat));
    dispatch(actions.measurementDataRecevied(data.getMultipleMeasurements));
  }, [dispatch, data, error]);

  const classes = useStyles();

  return (
    <div>
      {measurementsData.length ? (
        <div>
          <ResponsiveContainer width="90%" height={600} className={classes.container}>
            <LineChart
              data={measurementsData}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="name" interval="preserveStartEnd" minTickGap={100} tickFormatter={formatter} />
              <YAxis />
              <Tooltip labelFormatter={labelFormatter} />
              {selectedMetrics.map((metric, i) => {
                return (
                  <Line
                    type="monotone"
                    isAnimationActive={false}
                    dot={false}
                    dataKey={metric.metricName}
                    stroke={getColor(metric.metricName)}
                    key={i}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>
          <Typography  component="h4" className={classes.title}>
            Please Choose the Metrics to Display the Graph
          </Typography>
        </div>
      )}
    </div>

  );
};

export default Graph;
