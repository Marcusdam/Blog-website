import React from "react";
import services from '/src/data/services.js';


const Services = () => {
   
      

  return (
    <div className="max-w-5xl mx-auto p-4 mt-28">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
