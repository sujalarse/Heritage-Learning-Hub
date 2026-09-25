import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the heritage sites from the backend when the page loads
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch('/api/heritage');
        const data = await response.json();
        setSites(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sites:", error);
        setLoading(false);
      }
    };
    
    fetchSites();
  }, []);

  if (loading) {
    return <div className="mt-20 text-xl text-center text-amber-900">Loading heritage sites...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-amber-900">
          Explore Historical Sites
        </h1>
        
        {/* CSS Grid to create a responsive card layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div key={site._id} className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200">
              <img 
                src={site.imageUrl} 
                alt={site.title} 
                className="object-cover w-full h-48"
              />
              <div className="p-5">
                <h2 className="mb-1 text-2xl font-bold text-gray-900">{site.title}</h2>
                <p className="mb-3 text-sm font-semibold text-amber-700">📍 {site.location}</p>
                <p className="mb-5 text-gray-600 line-clamp-3">{site.description}</p>
                
                {/* This button will eventually link to the specific lesson page */}
                <Link 
                  to={`/heritage/${site._id}`} 
                  className="inline-block w-full py-2 font-bold text-center text-white transition-colors rounded bg-amber-700 hover:bg-amber-800"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}