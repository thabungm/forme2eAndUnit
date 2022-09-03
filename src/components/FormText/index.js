import { TextField } from '@mui/material';
const FormTextInput = ({ ...props }) => {
  return (
    <div className='elementContainer'>
      <TextField {...props} />
      <div className='error'>{props.errorMessage || props.error}</div>
    </div>
  );
};

export default FormTextInput;
