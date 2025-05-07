function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-BG p-6">
      <div className="w-full max-w-4xl bg-BC p-8 shadow-xl rounded-2xl border border-gray-100">
        {/* Heading and Introduction */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-prime">Contact Us</h2>
          <p className="text-xl text-text mt-4">
            We&apos;d love to hear from you! Whether you have a question, feedback, or
            just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-second rounded-full text-BC">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-prime">Address</h3>
                <p className="text-gray-600">
                  Los Angeles
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-second rounded-full text-BC">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-prime">Phone</h3>
                <p className="text-gray-600">+1 (646) 736-1779</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-second rounded-full text-BC">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-prime">Email</h3>
                <p className="text-gray-600">info@grandhorizon.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-H focus:outline-none transition-all placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-second text-BC py-3 rounded-lg font-semibold hover:bg-H hover:text-BC transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.0233047803193!2d-118.41703318478303!3d34.0810128731467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc13a5cb8c7f%3A0xa94e7f677a30212!2sThe%20Beverly%20Hills%20Hotel!5e0!3m2!1sen!2sus!4v1714935045163!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;