import { shallow, mount } from 'enzyme';

import App from './index';
let mockData = {
  mutation: {
    isLoading: false,
    error: false,
    data: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    mutateAsync: jest.fn(),
  },
  query: {
    isLoading: false,
    error: false,
    data: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  },
};

function resetData() {
  // mockData = JSON.parse(JSON.stringify(defaultData));
}

jest.mock('react-query', () => {
  return {
    useQuery: () => mockData.query,
    useMutation: () => mockData.mutation,
  };
});

describe('Renders snapshot', () => {
  it('SHOULD render the form with components', () => {
    const result = shallow(<App />);
    expect(result).toMatchSnapshot();
    expect(result.find('h3').length).toBe(1);
    expect(result.find('FormTextInput').length).toBe(2);
    expect(result.find('FormControl').length).toBe(1);
  });
});

describe('When API is loading', () => {
  afterEach(() => {
    resetData();
  });
  it('SHOULD show loading', () => {
    mockData.query.isLoading = true;
    const result = shallow(<App />);
    expect(result).toMatchSnapshot();
    expect(result.find('div').text()).toBe('Loading');
  });
});

describe('When form is submitted', () => {
  beforeEach(() => {
    mockData.query.isLoading = false;
  });
  describe('AND when the fields are NOT filled', () => {
    it('SHOULD show error', async () => {
      const result = shallow(<App />);
      expect(result).toMatchSnapshot();

      const form = result.find('form');
      await form.simulate('submit');
      console.log(mockData.mutation);
      expect(mockData.mutation.mutateAsync).toHaveBeenCalledTimes(0);
    });
  });

  describe('AND when the fields are filled', () => {
    it('SHOULD show error', async () => {
      mockData.query.isLoading = false;

      const result = shallow(<App />);
      expect(result).toMatchSnapshot();

      const form = result.find('form');
      await form.simulate('submit');
      console.log(mockData.mutation);
      expect(mockData.mutation.mutateAsync).toHaveBeenCalledTimes(0);
    });
  });
});
