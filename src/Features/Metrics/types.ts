export type IProps = {
  metrics: Array<Metric>;
};

export type CardProps = {
  measurement: {
    name: string;
    value: number;
  };
};

export type Metric = {
  metricName: string;
};

export type Measurement = {
  metric: string;
  measurements: Array<{
    value: number;
    at: number;
    metric: string;
  }>;
};

export type KeyValue = {
  name: string;
  value: number;
};

export type ApiErrorAction = {
  error: string;
};