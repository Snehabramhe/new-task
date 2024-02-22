import React, { useState } from "react";
import "./style.css";

const initialData = {
  name: "",
  city: "",
  contacts: [
    {
      email: "",
      phone: "",
    },
  ],
};

const ContactForm = ({ index, ind, adContacts, length, forms, setForms }) => {
  const [contact, setContact] = useState({ ...initialData.contacts[0] });

  const onChange = (e, index, ind) => {
    const { value, name } = e.target;
    const newObj = { ...contact, [name]: value };
    setContact(newObj);
    const newData = [...forms];
    newData[index].contacts[ind] = newObj;

    setForms(newData);
  };

  return (
    <div className="contacts">
      <div className="city-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={contact.email}
          onChange={(e) => onChange(e, index, ind)}
        />
      </div>

      <div className="city-field">
        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          name="phone"
          id="phone"
          value={contact.phone}
          onChange={(e) => onChange(e, index, ind)}
        />
      </div>

      {length === ind && (
        <button
          type="button"
          className="plus-button"
          onClick={() => adContacts(index)}
        >
          +
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [forms, setForms] = useState([{ ...initialData }]);

  const onChange = (e, index, ind) => {
    const newData = [...forms];
    const { value, name } = e.target;

    if (ind) {
      newData[index].contacts[ind][name] = value;
    } else newData[index][name] = value;

    setForms(newData);
  };

  const adContacts = (index) => {
    const newData = [...forms];
    newData[index].contacts = [
      ...newData[index].contacts,
      initialData.contacts,
    ];

    setForms(newData);
  };

  const adForm = () => {
    const newData = [...forms, initialData];
    setForms(newData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(forms, 'forms');
  };

  return (
    <div className="contact-form">
      <form onSubmit={submitHandler}>
        {forms.map((item, index) => (
          <>
            <div className="wrapper">
              <div className="name-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={item.name}
                  onChange={(e) => onChange(e, index)}
                />
              </div>
              <div className="city-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={item.city}
                  onChange={(e) => onChange(e, index)}
                />
              </div>
            </div>
            {item.contacts.map((it, ind) => (
              <ContactForm
                setForms={setForms}
                length={item.contacts.length - 1}
                ind={ind}
                index={index}
                forms={forms}
                adContacts={adContacts}
              />
            ))}
          </>
        ))}

        <button onClick={adForm} className="add-more">
          Add another form
        </button>

        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
