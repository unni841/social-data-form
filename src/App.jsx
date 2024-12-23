import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    date: '',
    unknownYear: false,
    title: '',
    name: '',
    occasion: '',
    relationship: '',
    remarks: '',
    group: ''
  });

  const [occasions, setOccasions] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [groups, setGroups] = useState([]);

  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxcoyrV1yNPo8_mblCMUO3Us4SfN5kPJssRGSmvblqEmVfwAxnr3zNxW5q5AsNhgjGXDQ/exec';  // Make sure this has your actual URL

  useEffect(() => {
    fetch(WEBAPP_URL)
      .then(response => response.json())
      .then(data => {
        setOccasions(data.occasions);
        setRelationships(data.relationships);
        setGroups(data.groups);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const dateObj = new Date(selectedDate);
    
    if (formData.unknownYear) {
      dateObj.setFullYear(1900);
    }
    
    setFormData(prev => ({
      ...prev,
      date: dateObj.toISOString().split('T')[0]
    }));
  };

  const handleUnknownYearChange = (e) => {
    const checked = e.target.checked;
    
    if (formData.date) {
      const dateObj = new Date(formData.date);
      if (checked) {
        dateObj.setFullYear(1900);
      }
      
      setFormData(prev => ({
        ...prev,
        unknownYear: checked,
        date: dateObj.toISOString().split('T')[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        unknownYear: checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(formData)
      });
      
      if (response.type === 'opaque') {
        alert('Data added successfully!');
        setFormData({
          date: '',
          unknownYear: false,
          title: '',
          name: '',
          occasion: '',
          relationship: '',
          remarks: '',
          group: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-4">Add Social Calendar Entry</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date</label>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="unknownYear"
                  checked={formData.unknownYear}
                  onChange={handleUnknownYearChange}
                  className="rounded border-gray-300"
                />
                <label htmlFor="unknownYear" className="text-sm">
                  Unknown year
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Occasion</label>
            <select
              value={formData.occasion}
              onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select Occasion</option>
              {occasions.map(occasion => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Group</label>
            <select
              value={formData.group}
              onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select Group</option>
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select Relationship</option>
              {relationships.map(relationship => (
                <option key={relationship} value={relationship}>{relationship}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
              className="border rounded p-2 w-full"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;