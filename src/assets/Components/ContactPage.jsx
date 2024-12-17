import { useState, useEffect, useRef } from "react";
import { Mail, MapPin, Phone, ArrowRight } from "react-feather";

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState("contact");
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowToast(true);
    setIsSubmitting(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setShowToast(false), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 300) {
        setActiveSection("contact");
      } else if (scrollPosition < 800) {
        setActiveSection("form");
      } else {
        setActiveSection("info");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
          speed: Math.random() * 0.5 + 0.1,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          particle.y += particle.speed;
          if (particle.y > canvas.height) {
            particle.y = 0;
          }
        });
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    resizeCanvas();
    drawParticles();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Header Section */}
      <div className="relative container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <span className="text-[#B34518] text-sm tracking-wider uppercase font-medium">
            get in touch
          </span>
          <h1 className="text-[#0F1218] text-6xl font-light mt-4 mb-8 leading-tight sm:text-7xl">
            <span className="relative inline-block my-2">
              Inspire
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#F4D575]"></span>
            </span>
            <br />
            <span className="relative inline-block my-2">
              Collaborate
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#B34518]"></span>
            </span>
            <br />
            <span className="relative inline-block my-2">
              Create
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3F6E43]"></span>
            </span>
          </h1>
          <p className="text-lg text-[#0F1218]/70 max-w-2xl leading-relaxed sm:text-xl">
            Join us in our mission to support artists and bring extraordinary
            art to the world. Your journey in the art world begins with a simple
            hello.
          </p>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden lg:block">
          <div className="w-64 h-64 border-2 border-[#F4D575]/30 rounded-full flex items-center justify-center animate-spin-slow">
            <span className="text-[#B34518] text-sm tracking-widest uppercase">
              Art • Passion • Connection
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-8 space-y-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-1 relative">
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="outline-none peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#0F1218]/10 focus:border-[#B34518] focus:ring-0 transition-colors placeholder-transparent"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-[#0F1218]/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#B34518] peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="space-y-1 relative">
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="outline-none peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#0F1218]/10 focus:border-[#B34518] focus:ring-0 transition-colors placeholder-transparent"
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-[#0F1218]/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#B34518] peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="space-y-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="outline-none peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#0F1218]/10 focus:border-[#B34518] focus:ring-0 transition-colors placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-[#0F1218]/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#B34518] peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="space-y-1 relative">
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="outline-none peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#0F1218]/10 focus:border-[#B34518] focus:ring-0 transition-colors placeholder-transparent"
                    placeholder="Subject"
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-0 -top-3.5 text-[#0F1218]/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#B34518] peer-focus:text-sm"
                  >
                    Subject
                  </label>
                </div>

                <div className="space-y-1 relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="outline-none peer w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#0F1218]/10 focus:border-[#B34518] focus:ring-0 transition-colors resize-none placeholder-transparent"
                    placeholder="Your Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-[#0F1218]/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#B34518] peer-focus:text-sm"
                  >
                    Your Message
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-[#0F1218] hover:bg-[#B34518] text-white text-sm font-medium transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-4 space-y-16">
              <div className="relative">
                <div className="relative space-y-8">
                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-[#3F6E43] rounded-full flex items-center justify-center group-hover:bg-[#8FBBEB] transition-colors duration-300">
                      <Mail className="h-5 w-5 text-[#F8F3F3] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0F1218] mb-1">
                        Email Us
                      </h3>
                      <p className="text-[#0F1218]/70 group-hover:text-[#8FBBEB] transition-colors">
                        info@artofreason.art
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-[#B34518] rounded-full flex items-center justify-center group-hover:bg-[#8FBBEB] transition-colors duration-300">
                      <MapPin className="h-5 w-12 text-[#F8F3F3] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0F1218] mb-1">
                        Visit Us
                      </h3>
                      <p className="text-[#0F1218]/70 group-hover:text-[#8FBBEB] transition-colors">
                        123 Art Street, Gallery District, City, State 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-[#F4D575] rounded-full flex items-center justify-center group-hover:bg-[#8FBBEB] transition-colors duration-300">
                      <Phone className="h-5 w-5 text-[#F8F3F3] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0F1218] mb-1">
                        Call Us
                      </h3>
                      <p className="text-[#0F1218]/70 group-hover:text-[#8FBBEB] transition-colors">
                        +1 (123) 456-7890
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#8FBBEB]/10 rounded-full" />
                <div className="relative p-8 bg-[#0F1218]/5 backdrop-blur-sm">
                  <h3 className="text-lg font-medium text-[#0F1218] mb-4">
                    Gallery Hours
                  </h3>
                  <div className="space-y-3 text-[#0F1218]/70">
                    <p className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>10am - 6pm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Saturday</span>
                      <span>11am - 5pm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#3F6E43] text-white px-6 py-4 rounded-sm shadow-lg animate-fade-in-up">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm mt-1">We will get back to you soon.</p>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="space-y-4">
          {["contact", "form", "info"].map((section) => (
            <div
              key={section}
              className={`w-2 h-2 rounded-full ${
                activeSection === section ? "bg-[#B34518]" : "bg-[#0F1218]/20"
              } transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
