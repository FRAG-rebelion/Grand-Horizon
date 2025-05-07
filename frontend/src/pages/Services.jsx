import { Link } from "react-router-dom";
import spaImg from "../assets/spa.jpg";
import diningImg from "../assets/dining.jpg";
import eventImg from "../assets/event.jpg";
import fitnessImg from "../assets/fitness.jpg";
import poolImg from "../assets/pool.jpg";
import conciergeImg from "../assets/concierge.jpg";

function Services() {
  return (
    <div className="container mx-auto text-center mt-10 space-y-16 px-4">
      {/* Slogan and Introduction */}
      <div className="space-y-6">
        <h2 className="text-6xl font-bold text-prime tracking-wide">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-second mx-auto rounded-full"></div>
        <p className="text-2xl italic text-text mt-4">
          Indulge in Unmatched Luxury and Comfort
        </p>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Grand Horizon, we offer a wide range of premium services designed to elevate your stay. From world-class dining to personalized wellness experiences, every detail is crafted to perfection.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        
        {[
          { img: spaImg, title: "Spa & Wellness", desc: "Rejuvenate your mind and body with our luxurious spa treatments, including massages, facials, and holistic therapies." },
          { img: diningImg, title: "Gourmet Dining", desc: "Savor exquisite dishes crafted by award-winning chefs, featuring locally sourced ingredients and global flavors." },
          { img: eventImg, title: "Conference & Events", desc: "Host unforgettable events in our elegant venues, equipped with state-of-the-art technology and personalized service." },
          { img: fitnessImg, title: "Fitness Center", desc: "Stay active with our fully equipped fitness center, offering cutting-edge equipment and expert trainers." },
          { img: poolImg, title: "Luxury Pool", desc: "Relax by our infinity pool, offering breathtaking views and a serene atmosphere." },
          { img: conciergeImg, title: "Personalized Concierge", desc: "Let our dedicated concierge team take care of every detail, from travel arrangements to exclusive experiences." },
        ].map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-xl group transform transition-all duration-500 hover:scale-105 bg-white"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-56 object-cover group-hover:opacity-80 transition-all duration-500"
            />
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-prime">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
          </div>
        ))}
      </div>

     
      <div className="mt-16 space-y-6">
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to experience the ultimate in luxury? Book your stay today and let us take care of the rest.
        </p>
        <Link
          to="/book-now"
          className="inline-block bg-second text-BC px-10 py-4 rounded-full text-xl font-bold hover:bg-H hover:text-BC transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default Services;
