import { FaRocket, FaUsers, FaChartLine, FaShieldAlt, FaComments, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useRef } from 'react';

const LandingPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const featuresRef = useRef(null);

  const features = [
    {
      icon: <FaUsers className="text-4xl text-indigo-600" />,
      title: "Team Management",
      description: "Easily onboard team members, assign roles, and manage permissions."
    },
    {
      icon: <FaChartLine className="text-4xl text-indigo-600" />,
      title: "Advanced Analytics",
      description: "Track productivity, identify bottlenecks, and optimize workflows."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-indigo-600" />,
      title: "Secure Platform",
      description: "Enterprise-grade security to keep your data safe and compliant."
    },
    {
      icon: <FaComments className="text-4xl text-indigo-600" />,
      title: "Real-time Chat",
      description: "Built-in messaging for seamless team communication."
    },
    {
      icon: <FaRocket className="text-4xl text-indigo-600" />,
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive interface."
    },
    {
      icon: <FaStar className="text-4xl text-indigo-600" />,
      title: "Customizable",
      description: "Tailor the platform to match your team's unique workflow."
    }
  ];

  const scrollToFeature = (index) => {
    setCurrentFeature(index);
    if (featuresRef.current) {
      const featureElement = featuresRef.current.children[index];
      featureElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const nextFeature = () => {
    const next = currentFeature === features.length - 1 ? 0 : currentFeature + 1;
    scrollToFeature(next);
  };

  const prevFeature = () => {
    const prev = currentFeature === 0 ? features.length - 1 : currentFeature - 1;
    scrollToFeature(prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TD</span>
            </div>
            <span className="text-xl font-bold text-indigo-900">TeamDock</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-indigo-700 hover:text-indigo-900 transition">Features</a>
            <a href="#testimonials" className="text-indigo-700 hover:text-indigo-900 transition">Testimonials</a>
            <a href="#contact" className="text-indigo-700 hover:text-indigo-900 transition">Contact</a>
          </div>
          <div className="flex space-x-4">
            <a href="/login" className="px-4 py-2 text-indigo-700 hover:text-indigo-900 transition">Login</a>
            <a href="/register" className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition shadow-md">Register</a>
          </div>
        </div>
      </nav>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-indigo-900 mb-6 leading-tight">
            Streamline Your Team's <span className="text-indigo-700">Productivity</span>
          </h1>
          <p className="text-xl text-indigo-800 mb-10 max-w-2xl mx-auto">
            TeamDock helps you manage projects, track tasks, and collaborate with your team effortlessly.
          </p>
          <div className="space-x-4">
            <a href="/register" className="px-8 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition shadow-lg font-medium text-lg">
              Get Started Free
            </a>
            <a href="#features" className="px-8 py-3 border border-indigo-700 text-indigo-700 rounded-lg hover:bg-indigo-50 transition font-medium text-lg">
              Learn More
            </a>
          </div>
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-indigo-100">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Team collaboration" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-indigo-800 max-w-2xl mx-auto">
              Everything you need to manage your team effectively
            </p>
          </div>
          
          <div className="md:hidden relative">
            <div 
              ref={featuresRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 pb-8 -mx-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-full snap-center px-2"
                  style={{ width: 'calc(100% - 1rem)' }}
                >
                  <div className="bg-indigo-50 rounded-xl p-8 h-full">
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-3">{feature.title}</h3>
                    <p className="text-indigo-800">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={prevFeature}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-indigo-700 hover:bg-indigo-100 transition"
              aria-label="Previous feature"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextFeature}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-indigo-700 hover:bg-indigo-100 transition"
              aria-label="Next feature"
            >
              <FaChevronRight />
            </button>
            <div className="flex justify-center space-x-2 mt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToFeature(index)}
                  className={`w-3 h-3 rounded-full ${currentFeature === index ? 'bg-indigo-700' : 'bg-indigo-300'}`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-indigo-50 rounded-xl p-8 hover:shadow-lg transition">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-indigo-900 mb-3">{feature.title}</h3>
                <p className="text-indigo-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-indigo-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Trusted by Teams Worldwide</h2>
            <p className="text-lg text-indigo-800 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our customers say
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "TeamDock has transformed how we collaborate. Our productivity increased by 40% in the first month!",
                author: "Sarah Johnson",
                role: "CEO, TechSolutions Inc.",
                stars: 5
              },
              {
                quote: "The intuitive interface made adoption seamless across our global teams. Support is exceptional.",
                author: "Michael Chen",
                role: "CTO, Global Innovations",
                stars: 5
              },
              {
                quote: "Finally a tool that scales with our growing startup. The analytics alone are worth the price.",
                author: "Emma Rodriguez",
                role: "Product Manager, StartUpX",
                stars: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-indigo-800 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-indigo-900">{testimonial.author}</p>
                  <p className="text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Team's Productivity?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of teams who trust TeamDock to streamline their workflow.
          </p>
          <div className="space-x-4">
            <a href="/register" className="px-8 py-3 bg-white text-indigo-800 rounded-lg hover:bg-indigo-100 transition shadow-lg font-medium text-lg">
              Start Free Trial
            </a>
            <a href="#contact" className="px-8 py-3 border border-white text-white rounded-lg hover:bg-indigo-800 transition font-medium text-lg">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-indigo-800 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-indigo-800 font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-indigo-800 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-indigo-800 font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button type="submit" className="px-8 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition font-medium text-lg">
                  Send Message
                </button>
              </form>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-indigo-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900 mb-1">Phone</h4>
                    <p className="text-indigo-800">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900 mb-1">Email</h4>
                    <p className="text-indigo-800">support@teamdock.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900 mb-1">Address</h4>
                    <p className="text-indigo-800">123 Tech Street, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-indigo-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-indigo-800 font-bold">TD</span>
                </div>
                <span className="text-xl font-bold">TeamDock</span>
              </div>
              <p className="text-indigo-200">
                Empowering teams to work smarter, not harder.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-200 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">Webinars</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition">API Docs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 mb-4 md:mb-0">
              © 2025 TeamDock. Created by Maharaja Prabhu.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;