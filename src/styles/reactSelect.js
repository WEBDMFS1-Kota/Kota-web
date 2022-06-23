const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(75 85 99)',
    color: 'white',
    borderColor: 'rgb(107 114 128)',
  }),

  container: (provided) => ({
    ...provided,
    color: 'transparent',
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(75 85 99)',
    borderColor: 'rgb(107 114 128)',
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
