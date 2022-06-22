const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: 'white',
  }),

  container: (provided) => ({
    ...provided,
    color: 'transparent',
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),

  option: (provided, { isFocused }) => ({
    ...provided,
    color: isFocused ? 'black' : 'white',
  }),
};

export default customStyles;
