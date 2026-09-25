import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function HeritageDetail() {
  const { id } = useParams(); // Grabs the site ID from the URL
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const response = await fetch(`https://heritage-learning-hub.onrender.com/api/heritage/${id}`);
        const data = await response.json();
        setSite(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setLoading(false);
      }
    };
    fetchSiteDetails();
  }, [id]);

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const submitQuiz = async () => {
    let currentScore = 0;
    site.quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);

    // Grab the logged-in user's token
    const token = localStorage.getItem('token');
    
    // If they are logged in, send the score to the database silently in the background
    if (token) {
      try {
        await fetch('https://heritage-learning-hub.onrender.com/api/auth/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            siteTitle: site.title,
            score: currentScore,
            total: site.quiz.length
          })
        });
      } catch (error) {
        console.error("Failed to save score:", error);
      }
    }
  };

  if (loading) return <div className="mt-20 text-xl text-center">Loading lesson...</div>;
  if (!site) return <div className="mt-20 text-xl text-center text-red-600">Site not found!</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        
        {/* Lesson Header */}
        <button onClick={() => navigate('/explore')} className="mb-4 text-sm font-bold text-amber-600 hover:underline">
          ← Back to Explore
        </button>
        <img src={site.imageUrl} alt={site.title} className="object-cover w-full h-64 mb-6 rounded" />
        <h1 className="mb-2 text-4xl font-bold text-amber-900">{site.title}</h1>
        <p className="mb-6 font-semibold text-gray-500">{site.location} | {site.historicalPeriod}</p>
        
        {/* Lesson Content */}
        <div className="py-6 mb-8 text-lg leading-relaxed text-gray-700 border-t border-b border-gray-200">
          {site.lessonContent}
        </div>

        {/* Quiz Section */}
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Knowledge Check</h2>
        {site.quiz.map((q, qIndex) => (
          <div key={qIndex} className="p-4 mb-4 bg-gray-100 rounded-lg">
            <p className="mb-3 font-semibold text-gray-800">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((option, oIndex) => (
                <label key={oIndex} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name={`question-${qIndex}`} 
                    value={option}
                    onChange={() => handleOptionSelect(qIndex, option)}
                    className="w-4 h-4 text-amber-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Quiz Results */}
        {score === null ? (
          <button onClick={submitQuiz} className="px-6 py-2 mt-4 font-bold text-white rounded bg-amber-700 hover:bg-amber-800">
            Submit Answers
          </button>
        ) : (
          <div className={`p-4 mt-4 font-bold text-center rounded text-white ${score === site.quiz.length ? 'bg-green-600' : 'bg-amber-600'}`}>
            You scored {score} out of {site.quiz.length}!
          </div>
        )}

      </div>
    </div>
  );
}