import React from 'react';
import Banner from './Homepage/Banner';
import Aboutcake from '/playstation_image.png'; // Ensure this path is correct
import Services from './Homepage/Services';





function AboutUs() {
  return (
    <section className="w-full py-16 mt-12 px-6 md:px-20 title">

     <div className="flex flex-col items-center justify-between mx-auto lg:flex-row gap-10 max-w-7xl">   
      <div className="">
        <img src={Aboutcake} alt="about cake img" className='md:w-[500px] h-[400px]'
          data-aos="fade-up" 
            data-aos-duration='1300'
        />
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--secondary-color)] mb-6" data-aos="fade-up" 
            data-aos-duration='1000'>About Us</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          At <span className="font-semibold text-[var(--primary-color)]"> our book store website</span>, we believe every celebration deserves a special cake.
          Our journey started with a simple passion for baking, and today, we're proud to create
          custom cakes that bring joy, color, and flavor to your most memorable moments.
        </p>
        <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From birthdays to weddings, every one of our creations is handmade with love,
          using the finest ingredients and a touch of magic. Whether you want a classic
          chocolate cake or a colorful creation filled with surprises — we make it happen.
        </p>
      </div>
     </div>
      {/* Services Section */}
      <Services />
      {/* Banner section */}
      <Banner />    
    </section>
  );
}

export default AboutUs;
