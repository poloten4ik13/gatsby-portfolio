import React from 'react';
import { useForm, ValidationError } from '@formspree/react';



const ContactForm = () => {
  const [state, handleSubmit] = useForm("mpzbdllv");
  if (state.succeeded) {
    return <p>Thanks for texting!</p>;
  }
  return (
    <div className="form-container">
    <form  onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        name="email"
        placeholder='name@example.com'
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
        placeholder="Your massage!"
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
    </div>
  );
}


export default ContactForm;