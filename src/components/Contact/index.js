import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';

function ContactForm() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');


    //handles form inputs
    function handleChange(e) {

        //validation
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else { //if input is not email field, then just check for any length
            if (!e.target.value.length) {
              setErrorMessage(`${e.target.name} is required.`);
            } else {
              setErrorMessage('');
            }
          }

        //updates state
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
          }
        // console.log('errorMessage', errorMessage);
    }
    
    // console.log(formState);

    //handle form SUBMIT
    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
      }

    return (
        <section>
          <h1 data-testid="h1">Contact me</h1>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" defaultValue={name} onBlur={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email address:</label>
                <input type="email" name="email" defaultValue={email} onBlur={handleChange} />
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea name="message" rows="5"  defaultValue={message} onBlur={handleChange} />
            </div>
             {/* jsx equiv to if statement:  */}
            {errorMessage && (
                <div>
                    <p className="error-text">{errorMessage}</p>
                </div>
                )}
            <button data-testid="button" type="submit">Submit</button>
          </form>
        </section>
      )

}

export default ContactForm;