import { useState } from 'react';
// import FormText from '../FormText';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import FormControl from '../FormControl';
import TextField from '../FormText';
import Map from '../Map';
const Form = () => {
  const defaultValues = {
    title: '',
    body: '',
    userId: '',
  };

  const [formData, setFormData] = useState(defaultValues);
  const { title, body, userId } = formData;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  console.log(useQuery);
  const { isLoading, error, data } = useQuery(
    'getUsers',
    async () => await axios.get('https://jsonplaceholder.typicode.com/users')
  );

  const {
    mutateAsync,
    isError,
    isLoading: createLoading,
  } = useMutation((data) =>
    axios.post('https://jsonplaceholder.typicode.com/users', data)
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  const runValidation = (event) => {
    const noError = event.target.reportValidity();
    console.log({ noError });
    if (noError) {
      delete errors[event.target.name];
    } else {
      errors[event.target.name] = 'Invalid input';
    }
    setErrors({ ...errors });
  };

  const onChange = (event) => {
    event.preventDefault();
    runValidation(event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const isFormValid = () => {
    let isFormValid = true;
    for (let value in formData) {
      if (formData[value].trim() === '') {
        isFormValid = false;
        errors[value] = 'This is required';
      }
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!isFormValid()) {
        return;
      }
      const data = { userId, body, title };

      await mutateAsync(data);
      setSuccess('Success');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <h3>Form Demo</h3>
        <div className='success'>{success}</div>
        <FormControl
          onChange={onChange}
          label={'Choose userId'}
          items={data.data}
          name='userId'
          value={userId}
          required
          error={errors.userId}
          errorMessage={'Please select one'}
        />
        <TextField
          label={'Enter title'}
          name={'title'}
          value={title}
          onChange={onChange}
          variant='outlined'
          fullWidth
          required
          error={errors.title}
        />
        <TextField
          label='Enter body'
          name={'body'}
          value={body}
          onChange={onChange}
          fullWidth
          required
          error={errors.body}
        />
        <Button disabled={createLoading} type='submit' variant='outlined'>
          {createLoading ? 'Loading' : 'Submit'}
        </Button>
      </form>
      <Map />
    </>
  );
};

export default Form;
