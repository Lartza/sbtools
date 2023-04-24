import React from 'react';
import PropTypes from 'prop-types';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 1000,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

DebouncedInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
};

DebouncedInput.defaultProps = {
  debounce: 1000,
};

export default DebouncedInput;
