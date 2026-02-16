import React from "react";

const ContactUs = () => {
  return (
    <div className="container-fluid py-5 text-white" style={{ backgroundColor: "#162032" }}>

      <div className="row">
        <div className="col-sm-9 mx-auto">
          <div className="row">
            {/* HEADER */}
            <div className="text-center mb-5">
              <h1 className="fw-bold">Contact Us</h1>
              <p className=" fs-5 mt-2">
                Get in touch with us for queries, feedback, or visit information.
              </p>
            </div>

            <div className="row">

              {/* CONTACT DETAILS */}
              <div className="col-md-5 my-auto">
                <h4 className="fw-bold mb-3">Contact Information</h4>

                <ul className="list-unstyled mt-4">
                  <li className="mb-3">
                    <strong>📍 Address:</strong><br />
                    Gomti Riverfront, Near Hardoi Road,<br />
                    Lucknow, Uttar Pradesh
                  </li>

                  <li className="mb-3">
                    <strong>🕒 Visiting Hours:</strong><br />
                    <span>11:00 AM – 8:00 PM (Closed on Mondays)</span>
                  </li>

                  <li className="mb-3">
                    <strong>📧 Email : </strong>
                    <span> info@rashtriyaprernasthal.in</span>
                  </li>

                  <li className="mb-3">
                    <strong>📞 Phone : </strong>
                    +91 77068 92928
                  </li>
                </ul>
              </div>

              {/* CONTACT FORM */}
              <div className="col-md-7">
                <h4 className="fw-bold mb-3">Send a Message</h4>

                <form className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100 px-5 py-2">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* MAP */}
            <div className="row mt-5">
              <div className="col-12">
                <h4 className="fw-bold mb-3">Location Map</h4>

                <div className=" rounded overflow-hidden shadow-sm">
                  <iframe
                    title="Rashtriya Prerna Sthal Map"
                    src="https://www.google.com/maps?q=Rashtriya%20Prerna%20Sthal%20Lucknow&output=embed"
                    loading="lazy"
                    height={"300px"}
                    width={"100%"}
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
};

export default ContactUs;
