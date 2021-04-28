import React from 'react';
import { createClient, Provider } from 'urql';
import SelectMetric from '../../components/SelectMetric';
import { serverUrl } from '../dataCaptureUrl';
import Graph from './GraphqlQuery';
import LastMetricCards from './LastMetricCards';

const client = createClient({
  url: serverUrl,
});

const Measurements = () => {
  return (
    <Provider value={client}>
      <SelectMetric />
      <Graph />
      <LastMetricCards />
    </Provider>
  );
};

export default Measurements;