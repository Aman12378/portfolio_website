import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './ParticleBackground';
import './CarLandingPage.css';

gsap.registerPlugin(ScrollTrigger);

// Car Video Component
function CarVideo({ videoSrc, posterSrc, autoPlay = true }) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoplay prevented'));
    }
  }, []);

  return (
    <div className="car-video-container">
      <video
        ref={videoRef}
        className="car-video"
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  
  const heroVideos = [
    {
      video: "https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_30fps.mp4",
      poster: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "BMW M8 Competition",
      subtitle: "The Ultimate Driving Machine"
    },
    {
      video: "https://videos.pexels.com/video-files/854745/854745-hd_1920_1080_25fps.mp4",
      poster: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Mercedes AMG GT",
      subtitle: "Performance Perfected"
    },
    {
      video: "https://videos.pexels.com/video-files/855793/855793-hd_1920_1080_25fps.mp4",
      poster: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Porsche 911 Turbo S",
      subtitle: "Timeless Sports Car Icon"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, delay: 0.3, ease: "easeOut" }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="hero-section">
      <div className="hero-video-background">
        <CarVideo 
          videoSrc={heroVideos[currentCarIndex].video}
          posterSrc={heroVideos[currentCarIndex].poster}
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <motion.h1 
            key={currentCarIndex}
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hero-title"
          >
            LUXURY
            <span className="gradient-text">CARS</span>
          </motion.h1>
          
          <motion.h2
            key={`subtitle-${currentCarIndex}`}
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hero-car-title"
          >
            {heroVideos[currentCarIndex].title}
          </motion.h2>
          
          <motion.p 
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hero-subtitle"
          >
            {heroVideos[currentCarIndex].subtitle}
          </motion.p>
          
          <motion.div 
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hero-buttons"
          >
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 68, 68, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Test Drive
            </motion.button>
          </motion.div>
        </div>
        
        <div className="hero-indicators">
          {heroVideos.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentCarIndex ? 'active' : ''}`}
              onClick={() => setCurrentCarIndex(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="scroll-indicator">
        <motion.div 
          className="scroll-arrow"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}

// Car Card Component
function CarCard({ car, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="car-card"
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="car-card-image">
        <img 
          src={car.image}
          alt={car.name}
          className="car-image"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        {!imageLoaded && <div className="image-placeholder">Loading...</div>}
        <div className="car-badge">{car.badge}</div>
      </div>
      
      <div className="car-card-content">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-price">${car.price}</p>
        <p className="car-description">{car.description}</p>
        
        <div className="car-specs">
          <div className="spec-row">
            <span className="spec-label">Engine:</span>
            <span className="spec-value">{car.engine}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Power:</span>
            <span className="spec-value">{car.power}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">0-60 mph:</span>
            <span className="spec-value">{car.acceleration}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Top Speed:</span>
            <span className="spec-value">{car.maxSpeed}</span>
          </div>
        </div>
        
        <motion.button 
          className="btn-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

// Brand Showcase Component
function BrandShowcase() {
  const brands = [
    {
      name: "Rolls Royce",
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Rolls-Royce-Logo.png",
      tagline: "The Ultimate in Luxury"
    },
    {
      name: "BMW M",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
      tagline: "The Ultimate Driving Machine"
    },
    {
      name: "Mercedes AMG",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Mercedes-Logo.png",
      tagline: "Engineered by Racing"
    },
    {
      name: "Porsche",
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Porsche-Logo.png",
      tagline: "Sports Car Heritage"
    },
    {
      name: "Ferrari",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Ferrari-Logo.png",
      tagline: "The Prancing Horse"
    },
    {
      name: "Lamborghini",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Lamborghini-Logo.png",
      tagline: "Expect the Unexpected"
    },
    {
      name: "McLaren",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/McLaren-Logo.png",
      tagline: "Racing is in our DNA"
    },
    {
      name: "Aston Martin",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Aston-Martin-Logo.png",
      tagline: "Power, Beauty, Soul"
    }
  ];

  return (
    <section className="brand-showcase">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Premium Brands
        </motion.h2>
        
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="brand-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
              <p className="brand-tagline">{brand.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Car Landing Page Component
function CarLandingPage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const cars = [
    {
      name: "Rolls Royce Phantom",
      price: "460,000",
      description: "The pinnacle of automotive luxury and craftsmanship",
      engine: "6.75L V12 Twin-Turbo",
      power: "563 HP",
      acceleration: "5.3s",
      maxSpeed: "155 mph",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "ULTRA LUXURY"
    },
    {
      name: "BMW M4 Competition",
      price: "75,000",
      description: "Pure performance with everyday usability",
      engine: "3.0L I6 Twin-Turbo",
      power: "503 HP",
      acceleration: "3.8s",
      maxSpeed: "180 mph",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "M POWER"
    },
    {
      name: "Mercedes AMG GT",
      price: "118,000",
      description: "Racing-bred grand tourer with AMG DNA",
      engine: "4.0L V8 Biturbo",
      power: "469 HP",
      acceleration: "3.9s",
      maxSpeed: "189 mph",
      image: "https://images.unsplash.com/photo-1606016159991-5de2c8e4821a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "AMG"
    },
    {
      name: "Porsche 911 Carrera S",
      price: "120,000",
      description: "Iconic sports car perfection redefined",
      engine: "3.0L Flat-6 Twin-Turbo",
      power: "443 HP",
      acceleration: "3.5s",
      maxSpeed: "191 mph",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "CARRERA S"
    },
    {
      name: "Lamborghini Huracán",
      price: "248,000",
      description: "Italian supercar with breathtaking performance",
      engine: "5.2L V10 Naturally Aspirated",
      power: "631 HP",
      acceleration: "2.9s",
      maxSpeed: "202 mph",
      image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "SUPERCAR"
    },
    {
      name: "Ferrari 488 GTB",
      price: "262,000",
      description: "Prancing horse with twin-turbo fury",
      engine: "3.9L V8 Twin-Turbo",
      power: "661 HP",
      acceleration: "3.0s",
      maxSpeed: "205 mph",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "FERRARI"
    },
    {
      name: "McLaren 720S",
      price: "299,000",
      description: "British engineering excellence in carbon fiber",
      engine: "4.0L V8 Twin-Turbo",
      power: "710 HP",
      acceleration: "2.8s",
      maxSpeed: "212 mph",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "MCLAREN"
    },
    {
      name: "Aston Martin DB11",
      price: "205,000",
      description: "British grand tourer with timeless elegance",
      engine: "4.0L V8 Twin-Turbo",
      power: "528 HP",
      acceleration: "3.9s",
      maxSpeed: "187 mph",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "ASTON MARTIN"
    },
    {
      name: "Bentley Continental GT",
      price: "231,000",
      description: "Handcrafted luxury with impressive performance",
      engine: "6.0L W12 Twin-Turbo",
      power: "626 HP",
      acceleration: "3.6s",
      maxSpeed: "207 mph",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "BENTLEY"
    }
  ];

  useEffect(() => {
    // GSAP ScrollTrigger animations
    gsap.fromTo(".stats-number", 
      { textContent: 0 },
      { 
        textContent: (i, target) => target.getAttribute("data-value"),
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        snap: { textContent: 1 },
        stagger: 0.2
      }
    );
  }, []);

  return (
    <div className="car-landing-page">
      <ParticleBackground />
      <motion.div 
        className="background-gradient"
        style={{ y: backgroundY }}
      />
      
      <HeroSection />
      
      <BrandShowcase />
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stats-number" data-value="50">0</div>
              <div className="stat-label">Premium Models</div>
            </div>
            <div className="stat-item">
              <div className="stats-number" data-value="15000">0</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stats-number" data-value="25">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stats-number" data-value="99">0</div>
              <div className="stat-label">% Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="featured-cars-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Featured Collection
          </motion.h2>
          
          <div className="cars-grid">
            {cars.map((car, index) => (
              <CarCard key={index} car={car} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="cta-title">Ready to Drive Your Dream Car?</h2>
            <p className="cta-subtitle">
              Schedule a test drive today and experience luxury like never before
            </p>
            <motion.button 
              className="btn-cta"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 15px 35px rgba(255, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              Schedule Test Drive
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CarLandingPage;
