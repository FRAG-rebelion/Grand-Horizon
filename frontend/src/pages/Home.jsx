import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { FaBed, FaUtensils, FaSpa } from "react-icons/fa";
import hotelShot from "../assets/hotelshot.jpg"; 
import eventVenues from "../assets/eventvenues.jpg"; 
import activitiesHotel from "../assets/activitieshotel.jpg"; 

function Home() {

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const loggedIn = user && token;

  const features = [
    {
      title: "Luxurious Rooms",
      desc: "Spacious, elegant rooms featuring premium amenities and chic décor.",
      icon: <FaBed className="feature-icon" />,
    },
    {
      title: "Fine Dining",
      desc: "Gourmet dishes crafted by world-renowned chefs in an ambient setting.",
      icon: <FaUtensils className="feature-icon" />,
    },
    {
      title: "Exclusive Spa",
      desc: "Unwind with our luxurious spa treatments and holistic wellness programs.",
      icon: <FaSpa className="feature-icon" />,
    },
  ];

  const highlights = [
    {
      title: "Event Venues",
      desc: "Elegant halls and outdoor spaces, perfect for weddings, conferences, and special occasions.",
      backgroundImage: `url(${eventVenues})`,
    },
    {
      title: "Adventure Tours",
      desc: "Explore breathtaking landscapes and curated excursions that inspire awe.",
      backgroundImage: `url(${activitiesHotel})`,
    },
  ];

  const testimonials = [
    {
      testimonial:
        "The stay at Grand Horizon was exceptional. Every detail was attended to with professionalism and care.",
      author: "Sara D.",
    },
    {
      testimonial:
        "An unforgettable experience! The ambiance, service, and attention to detail were beyond our expectations.",
      author: "Mounir R.",
    },
    {
      testimonial:
        "From the moment we arrived until our departure, the service was impeccable and truly luxurious.",
      author: "Lise L.",
    },
  ];

 
  const redirectPath = loggedIn ? "/book" : "/register";

  return (
    <>
      <style>
        {`
          body, html, .home-container {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .hero {
            position: relative;
            width: 100%;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            margin-top: 80px; /* to account for fixed header */
          }
          .hero-content {
            text-align: center;
            color: white;
            padding: 0 24px;
          }
          .hero-title {
            font-size: 3rem;
            margin-bottom: 16px;
          }
          .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 32px;
          }
          .cta-button {
            display: inline-block;
            padding: 16px 40px;
            background: #3f51b5;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.25rem;
            transition: background 0.3s;
          }
          .cta-button:hover {
            background: #303f9f;
          }
          .section-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
          }
          .features-section {
            padding: 80px 0;
            background: #f5f5f5;
          }
          .section-title {
            text-align: center;
            margin-bottom: 48px;
            font-size: 2.5rem;
            color: #333;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
          .feature-card {
            background: white;
            padding: 32px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .feature-card:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .feature-icon {
            font-size: 3rem;
            color: #3f51b5;
            margin-bottom: 16px;
          }
          .highlights-section {
            padding: 80px 0;
          }
          .highlights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
          .highlight-card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: box-shadow 0.3s;
          }
          .highlight-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .highlight-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.4);
          }
          .highlight-content {
            position: absolute;
            bottom: 16px;
            left: 16px;
            color: white;
          }
          .testimonials-section {
            padding: 80px 0;
            background: #f5f5f5;
          }
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
          }
          .testimonial-card {
            background: white;
            padding: 32px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: box-shadow 0.3s;
          }
          .testimonial-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .testimonial-text {
            font-style: italic;
            margin-bottom: 16px;
          }
          .testimonial-author {
            text-align: right;
            font-weight: bold;
          }
          .cta-section {
            padding: 80px 0;
            text-align: center;
          }
          .footer {
            background: #333;
            color: #bbb;
            padding: 32px 0;
            text-align: center;
          }
        `}
      </style>

      <div className="home-container">
        
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${hotelShot})`,
          }}
        >
          <div className="hero-content">
            <Typography variant="h1" component="h1" className="hero-title">
              Welcome to Grand Horizon
            </Typography>
            <Typography variant="h4" component="p" className="hero-subtitle">
              Where Luxury Meets Serenity
            </Typography>
            <Link
              to={redirectPath}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cta-button"
            >
              Book Your Stay Now
            </Link>
          </div>
        </section>

        <section className="features-section">
          <div className="section-container">
            <Typography variant="h2" className="section-title">
              Our Exclusive Amenities
            </Typography>
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <div>{feature.icon}</div>
                  <Typography
                    variant="h5"
                    style={{ margin: "16px 0", fontWeight: "bold" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">{feature.desc}</Typography>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="highlights-section">
          <div className="section-container">
            <Typography variant="h2" className="section-title">
              Amenities & Highlights
            </Typography>
            <div className="highlights-grid">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="highlight-card"
                  style={{
                    backgroundImage: item.backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                  }}
                >
                  <div className="highlight-overlay"></div>
                  <div className="highlight-content">
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-container">
            <Typography variant="h2" className="section-title">
              What Our Guests Say
            </Typography>
            <div className="testimonials-grid">
              {testimonials.map((item, idx) => (
                <div key={idx} className="testimonial-card">
                  <Typography variant="body1" className="testimonial-text">
                    “{item.testimonial}”
                  </Typography>
                  <Typography variant="subtitle1" className="testimonial-author">
                    - {item.author}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section className="cta-section">
          <div className="section-container">
            <Typography variant="h2" className="section-title">
              Ready for an Unforgettable Stay?
            </Typography>
            <Link
              to={redirectPath}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cta-button"
            >
              Book Your Stay Now
            </Link>
          </div>
        </section>

   
        <footer className="footer">
          <div className="section-container">
            <Typography variant="body1">
              Enjoy the best vacation of your life
            </Typography>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;