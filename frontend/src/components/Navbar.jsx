import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  // Check if a user is currently logged in by looking for their digital key
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Function to wipe the local storage and log the user out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="p-4 text-white shadow-md bg-amber-800">
      <div className="container flex items-center justify-between mx-auto">
        
        {/* Brand Logo/Title */}
        <Link to="/" className="text-xl font-bold tracking-wider">
          Heritage Learning Hub
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="transition-colors hover:text-amber-200">Home</Link>
          <Link to="/explore" className="transition-colors hover:text-amber-200">Explore</Link>
          
          {/* Conditional Rendering: What to show if logged IN vs logged OUT */}
          {token ? (
            <>
              <Link to="/dashboard" className="transition-colors hover:text-amber-200">Dashboard</Link>
              
              {/* --- TEACHER / ADMIN UPLOAD LINK --- */}
              {user?.role === 'Teacher' || user?.role === 'Admin' ? (
                <Link to="/teacher/upload" className="transition-colors hover:text-amber-200">Upload Site</Link>
              ) : null}

              <span className="pl-4 ml-2 text-sm border-l border-amber-600 text-amber-300">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="px-3 py-1 transition-colors rounded bg-amber-900 hover:bg-amber-950"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="transition-colors hover:text-amber-200">Log In</Link>
              <Link to="/register" className="px-3 py-1 transition-colors rounded bg-amber-600 hover:bg-amber-500">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}