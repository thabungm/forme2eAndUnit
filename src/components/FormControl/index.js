import { Select } from '@mui/material';
const FormControl = ({
  error,
  label,
  name,
  items = [],
  onChange,
  errorMessage,
}) => {
  return (
    <div>
      <Select
        name={name}
        label={label}
        onChange={onChange}
        variant='outlined'
        fullWidth
        required
        error={error}
        native={true}
      >
        <option value=''>Please select</option>
        {items.map((item, key) => (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      <div className='error'>{error && errorMessage}</div>
    </div>
  );
};

export default FormControl;
