import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [liveProfile, setLiveProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      
      // Fetch the live database profile to get updated scores
      fetch('https://heritage-learning-hub.onrender.com/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setLiveProfile(data))
        .catch(err => console.error("Error fetching live profile:", err));
    }
  }, [navigate]);

  if (!user) return null; 

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-2 text-3xl font-bold text-amber-900">
          Welcome back, {user.name}!
        </h1>
        <p className="mb-8 text-gray-600">
          You are logged in as a <span className="font-semibold text-amber-700">{user.role}</span>.
        </p>

        {/* --- STUDENT DASHBOARD --- */}
        {user.role === 'Student' && (
          <div className="p-6 bg-white border-t-4 rounded shadow-sm border-amber-600">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Your Learning Progress</h2>
            
            {/* Conditional Rendering: Show table if scores exist, else show placeholder */}
            {!liveProfile?.scores || liveProfile.scores.length === 0 ? (
              <p className="text-gray-600">You haven't completed any quizzes yet. Head over to the Explore page to start learning!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="p-3 font-semibold text-gray-700">Monument / Lesson</th>
                      <th className="p-3 font-semibold text-gray-700">Quiz Score</th>
                      <th className="p-3 font-semibold text-gray-700">Date Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveProfile.scores.map((record, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium text-amber-900">{record.siteTitle}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${record.score === record.total ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {record.score} / {record.total}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- TEACHER DASHBOARD --- */}
        {user.role === 'Teacher' && (
          <div className="p-6 bg-white border-t-4 border-blue-600 rounded shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Teacher Hub</h2>
            <p className="text-gray-700">Use the Upload Site tab in the navigation bar to publish new heritage modules for your students.</p>
          </div>
        )}

        {/* --- ADMIN DASHBOARD --- */}
        {user.role === 'Admin' && (
          <div className="p-6 text-white bg-gray-800 border-t-4 border-red-600 rounded shadow-sm">
            <h2 className="mb-4 text-xl font-bold">System Administration</h2>
            <p className="text-gray-300">You have full administrative privileges over the Heritage Learning Hub infrastructure.</p>
          </div>
        )}

      </div>
    </div>
  );
}