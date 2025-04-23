type FromerrorProps = {
  error: string | undefined;
};

const FormError = ({ error }: FromerrorProps) => {
  return <div>{error}</div>;
};

export default FormError;
