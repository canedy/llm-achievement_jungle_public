import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const HomePage = () => {
  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-6xl mb-6">Empower Your Path to Excellence</h1>
          <h2 className="text-2xl text-white/60 mb-6">Employee Review Co-pilot is designed to help managers and employees 
            conduct performance reviews by providing a holistic, accurate view of contributions, achievements, and areas 
            of development over a span of a year. This platform aims to make annual reviews more actionable, meaningful, and objectiv
            utilizing AI and constant feedback.
          </h2>
      
          <div>
            <Link to={routes.signup()} className="bg-blue-600 px-4 py-2 rounded-lg text-xl">get started</Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
