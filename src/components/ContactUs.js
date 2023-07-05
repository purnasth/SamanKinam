import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmissionError(
          "Error submitting the form. Please try again later."
        );
      }
    } catch (error) {
      setSubmissionError("Error submitting the form. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center pb-6">
        Contact
        <span className="text-orange-700"> Us</span>
      </h2>
      {submissionSuccess ? (
        <div className="text-green-500 mb-4">
          Thank you for your message! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          {submissionError && (
            <div className="text-red-500 mb-4">{submissionError}</div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-700"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-700"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-700"
              rows={4}
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-700 text-white py-2 px-4 rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
};

export default ContactUs;
