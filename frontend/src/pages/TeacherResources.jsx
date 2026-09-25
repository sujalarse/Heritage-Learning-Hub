import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherResources() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    imageUrl: '',
    historicalPeriod: '',
    lessonContent: ''
  });

  const [quiz, setQuiz] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index][field] = value;
    setQuiz(updatedQuiz);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[qIndex].options[oIndex] = value;
    setQuiz(updatedQuiz);
  };

  const addQuestion = () => {
    setQuiz([...quiz, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    const updatedQuiz = quiz.filter((_, i) => i !== index);
    setQuiz(updatedQuiz);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://heritage-learning-hub.onrender.com/api/heritage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, quiz })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Heritage site published successfully!');
        setTimeout(() => navigate('/explore'), 1500);
      } else {
        setMessage(data.message || 'Failed to publish site.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error during upload.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-amber-900">Teacher Upload Portal</h1>
        <p className="mb-6 text-gray-600">Publish a new historical site and interactive quiz for students.</p>

        {message && (
          <div className={`p-3 mb-6 text-sm text-center text-white rounded ${message.includes('successfully') ? 'bg-green-600' : 'bg-red-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Site Title</label>
              <input 
                type="text" 
                name="title" 
                required 
                value={formData.title} 
                onChange={handleChange}
                placeholder="e.g. Qutub Minar"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                name="location" 
                required 
                value={formData.location} 
                onChange={handleChange}
                placeholder="e.g. New Delhi"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
              <input 
                type="url" 
                name="imageUrl" 
                required 
                value={formData.imageUrl} 
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Historical Period</label>
              <input 
                type="text" 
                name="historicalPeriod" 
                value={formData.historicalPeriod} 
                onChange={handleChange}
                placeholder="e.g. Delhi Sultanate (1199 CE)"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Short Description</label>
            <textarea 
              name="description" 
              rows="2" 
              required 
              value={formData.description} 
              onChange={handleChange}
              placeholder="Brief summary for card view..."
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Lesson Content</label>
            <textarea 
              name="lessonContent" 
              rows="5" 
              required 
              value={formData.lessonContent} 
              onChange={handleChange}
              placeholder="Detailed historical background..."
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Quiz Builder Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Quiz Builder</h2>
              <button 
                type="button" 
                onClick={addQuestion}
                className="px-3 py-1.5 text-sm font-bold text-white bg-amber-700 rounded hover:bg-amber-800"
              >
                + Add Question
              </button>
            </div>

            {quiz.map((q, qIndex) => (
              <div key={qIndex} className="p-4 mb-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-amber-900">Question {qIndex + 1}</span>
                  {quiz.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(qIndex)} className="text-xs font-semibold text-red-600 hover:underline">
                      Remove
                    </button>
                  )}
                </div>

                <input 
                  type="text" 
                  required 
                  placeholder="Enter question text"
                  value={q.question}
                  onChange={(e) => handleQuizChange(qIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 mb-3 text-sm bg-white border rounded-md"
                />

                <div className="grid grid-cols-1 gap-2 mb-3 md:grid-cols-2">
                  {q.options.map((opt, oIndex) => (
                    <input 
                      key={oIndex}
                      type="text" 
                      required 
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      className="px-3 py-1.5 text-sm bg-white border rounded-md"
                    />
                  ))}
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">Correct Answer (Must match one option exactly)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Exact correct answer string"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuizChange(qIndex, 'correctAnswer', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm bg-white border rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full py-3 font-bold text-white transition-colors rounded-md bg-amber-700 hover:bg-amber-800"
          >
            Publish Site & Quiz
          </button>
        </form>
      </div>
    </div>
  );
}