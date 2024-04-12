import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { NavLink } from 'react-router-dom';
const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
  });


  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [showAgeCondition, setShowAgeCondition] = useState(false);
  const [responseText, setResponseText] = useState('');


  useEffect(() => {
    const countries = Country.getAllCountries();
    setCountryOptions(countries.map((country) => ({ value: country.isoCode, label: country.name })));
  }, []);

  const handleCountryChange = (selectedOption) => {
    const countryCode = selectedOption.value;
    setFormData({ ...formData, country: countryCode, state: '', city: '' });

    const states = State.getStatesOfCountry(countryCode);
    setStateOptions(states.map((state) => ({ value: state.isoCode, label: state.name })));
  };

  const handleStateChange = (selectedOption) => {
    const stateCode = selectedOption.value;
    setFormData({ ...formData, state: stateCode, city: '' });

    const cities = City.getCitiesOfState(formData.country, stateCode);
    setCityOptions(cities.map((city) => ({ value: city.name, label: city.name })));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let age = formData.age;

    const selectedCountryOption = countryOptions.find((country) => country.value === formData.country);
    const selectedStateOption = stateOptions.find((state) => state.value === formData.state);
    const selectedCityOption = cityOptions.find((city) => city.value === formData.city);

    // Extract the inner text from the selected options
    const selectedCountry = selectedCountryOption ? selectedCountryOption.label : '';
    const selectedState = selectedStateOption ? selectedStateOption.label : '';
    const selectedCity = selectedCityOption ? selectedCityOption.label : '';

    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 14 || age >= 99) {
        setShowAgeCondition(true);
      } else {
        setShowAgeCondition(false);
      }

    }

    setFormData({ ...formData, [name]: value, age, selectedCountry, selectedState, selectedCity });

    if (value.trim() === '') {
      setFormErrors({
        ...formErrors,
        [`${name}Error`]: '',
      });
    } else if (name === 'firstName' || name === 'lastName') {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        setFormErrors({
          ...formErrors,
          [`${name}Error`]: `Only alphabetic characters allowed`,
        });
      } else {
        setFormErrors({
          ...formErrors,
          [`${name}Error`]: '',
        });
      }
    } else if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setFormErrors({
          ...formErrors,
          [`${name}Error`]: 'Invalid email format',
        });
      } else {
        setFormErrors({
          ...formErrors,
          [`${name}Error`]: '',
        });
      }
    }


  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);


    try {
      const response = await fetch('http://localhost:4500/api/users/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseText(data.message);
      data.message && setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        state: '',
        city: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        selectedCountry: '',
        selectedState: '',
        selectedCity: ''
      });

      console.log(data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <NavLink to="list-users" className="navigateLink">Saved Users</NavLink>

      <form onSubmit={handleSubmit}>
        <div className="NameWrapper">
          <div className="left">
            <label htmlFor="firstNameInput">First Name:</label>
            <input
              type="text"
              id="firstNameInput"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {formErrors.firstNameError && <div className="nameEmailErrMsg">{formErrors.firstNameError}</div>}
          </div>
          <div className="right">
            <label htmlFor="lastNameInput">Last Name:</label>
            <input
              type="text"
              id="lastNameInput"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {formErrors.lastNameError && <div className="nameEmailErrMsg">{formErrors.lastNameError}</div>}
          </div>
        </div>

        <label htmlFor="emailInput">E-Mail:</label>
        <input
          type="email"
          id="emailInput"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required 
        />
        {formErrors.emailError && <div className='nameEmailErrMsg'>{formErrors.emailError}</div>}

        <label htmlFor="countrySelect">Country:</label>
        <select
          id="countrySelect"
          name="country"
          value={formData.country}
          onChange={(e) => handleCountryChange({ value: e.target.value })}
          required 
        >
          <option value="">Select Country</option>
          {countryOptions.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>

        <label htmlFor="stateSelect">State:</label>
        <select
          id="stateSelect"
          name="state"
          value={formData.state}
          onChange={(e) => handleStateChange({ value: e.target.value })}
          required // Ensures the state field is selected
        >
          <option value="">Select State</option>
          {stateOptions.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>

        <label htmlFor="citySelect">City:</label>
        <select
          id="citySelect"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required 
        >
          <option value="">Select City</option>
          {cityOptions.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>

        <label htmlFor="genderRadio">Gender:</label>
        <div className="genderContainer">
          <label htmlFor="maleRadio">Male</label>
          <input
            type="radio"
            id="maleRadio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
            required
          />
          <label htmlFor="femaleRadio">Female</label>
          <input
            type="radio"
            id="femaleRadio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="dobInput">Date of Birth:</label>
        <input
          type="date"
          id="dobInput"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <label htmlFor="ageInput">Age:</label>
        <input
          type="text"
          id="ageInput"
          name="age"
          value={formData.age}
          readOnly 
        />

        {showAgeCondition && (
          <span style={{ color: 'red' }}>
            Age must be older than 14 years and less than 99 years.
          </span>
        )}

        <button type="submit">Submit</button>
      </form>
      {responseText && <p className='respMsg'>{responseText}</p>} 
    </>
  );
};

export default MyForm;
