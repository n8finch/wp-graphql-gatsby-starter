import React from "react";

const ContactForm = () => (
  <>
    <h1>Contact</h1>
    <div className="contact-form">
      <p>I look forward to hearing from you!</p>

      <form
        name="contact-form-wpgraphql-starter"
        method="POST"
        netlify-honeypot="bot-field"
        data-netlify="true"
      >
        <input
          type="hidden"
          name="form-name"
          value="contact-form-wpgraphql-starter"
        />
        <p className="sr-only">
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        <p>
          <label>
            Email:
            <br /> <input type="text" name="email" />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br /> <textarea name="message" rows="6"></textarea>
          </label>
        </p>
        <p>
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </p>
      </form>
    </div>
  </>
);

export default ContactForm;
