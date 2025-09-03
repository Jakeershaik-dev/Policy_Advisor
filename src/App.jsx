import React, { useEffect, useRef, useState } from 'react';

const policiesData = [
  { id: 'health-cocure', type: 'Health', company: 'Cocure Insurance', name: 'Cocure Health Plan', shortDescription: 'Comprehensive health coverage.', priceRange: '5,000 - 20,000 / year', benefits: ['Cashless hospitalization'], exclusions: ['Pre-existing diseases first 3 years'], eligibility: ['Age: 18-65 years'], rating: 4.5, reviewsCount: 1200 },
  { id: 'term-lifeshield', type: 'Term', company: 'Life Shield Insurance', name: 'Life Shield Term Plan', shortDescription: 'Financial security for your loved ones.', priceRange: '10,000 - 30,000 / year', benefits: ['High sum assured'], exclusions: ['Suicide within 12 months'], eligibility: ['Age: 18-60 years'], rating: 4.7, reviewsCount: 950 },
  { id: 'motor-driveprotect', type: 'Motor', company: 'DriveProtect Insurance', name: 'DriveProtect Comprehensive', shortDescription: 'All-round protection for your car.', priceRange: '3,000 - 15,000 / year', benefits: ['Third-party liability'], exclusions: ['Wear and tear'], eligibility: ['Valid driving license'], rating: 4.3, reviewsCount: 2500 }
];

const TopBar = ({ showBackButton, onBackClick, title, isChatScreen, onMenuClick }) => (
  <div className="fixed top-0 left-0 right-0 p-4 bg-white shadow-sm text-sm text-gray-700 flex items-center z-10 w-full rounded-b-xl">
    <div className="flex items-center">
      {showBackButton && (
        <button onClick={onBackClick} className="p-1 mr-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex items-baseline">
        {title ? (
          <span className="text-base font-medium text-gray-800 flex-grow">{title}</span>
        ) : (
          <h1 className="text-xl font-bold text-blue-600">✓ PolicyAdvise</h1>
        )}
      </div>
    </div>
    {isChatScreen && (
      <div className="flex items-center space-x-2 ml-auto">
        <button onClick={onMenuClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">Menu</button>
      </div>
    )}
  </div>
);

const SelectionScreen = ({ selectedPolicyType, onSelectPolicyType, selectedBudget, onSelectBudget, onGetPlans }) => {
  const budgetValue = Number.isFinite(parseInt(selectedBudget)) ? parseInt(selectedBudget) : 5000;
  const ensureAmount = selectedBudget ? (parseInt(selectedBudget) * 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '₹5,00,000';
  const monthlyPremium = selectedBudget ? (parseInt(selectedBudget) / 12).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '₹417';
  const totalCoverAmount = selectedBudget ? (parseInt(selectedBudget) * 1000).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '₹50,00,000';
  
  return (
    <div className="flex flex-col h-full bg-white w-full max-w-5xl mx-auto rounded-xl shadow-lg border border-gray-200 overflow-y-auto">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">Customize Your Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {['Health', 'Term', 'Motor'].map((type) => (
            <button
              key={type}
              onClick={() => onSelectPolicyType(type)}
              className={`flex flex-col items-center p-3 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 ${selectedPolicyType === type ? 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-lg ring-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-blue-400'}`}
            >
              <span className="text-base font-semibold text-gray-800">{type}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 sm:p-8 text-center bg-gray-50 mt-8 mb-8 rounded-xl shadow-inner border border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Select Your Budget</h2>
        <div className="max-w-lg mx-auto">
          <p className="text-xl font-bold text-gray-800 mb-4">{Number.isFinite(parseInt(selectedBudget)) ? parseInt(selectedBudget).toLocaleString('en-IN') : '5,000'}</p>
          <input
            type="range"
            min="5000"
            max="50000"
            step="5000"
            value={budgetValue}
            onChange={(e) => onSelectBudget(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-400"
            style={{ '--thumb-color': '#3B82F6' }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>5,000</span>
            <span>50,000</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-gray-800">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="font-semibold text-sm">Ensure</p>
              <p className="text-lg font-bold text-blue-600">{ensureAmount}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="font-semibold text-sm">Monthly</p>
              <p className="text-lg font-bold text-blue-600">{monthlyPremium}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="font-semibold text-sm">Total Cover</p>
              <p className="text-lg font-bold text-blue-600">{totalCoverAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8 border-t border-gray-200 flex justify-center rounded-b-xl">
        <button
          onClick={onGetPlans}
          disabled={!selectedPolicyType || !selectedBudget}
          className={`font-bold py-2 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ${selectedPolicyType && selectedBudget ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Get Plans
        </button>
      </div>
    </div>
  );
};

const PolicyAdvisorChat = ({ messages, onSendMessage, initialBotMessageText, selectedPolicyType }) => {
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    const trimmed = (inputMessage || '').trim();
    if (!trimmed) return;
    onSendMessage(trimmed, 'user');
    setInputMessage('');
    setTimeout(() => {
      const botResponseText = `Thank you for asking about "${trimmed}". I'm here to help with your policy questions. What else can I assist with?`;
      onSendMessage(botResponseText, 'bot');
    }, 600);
  };

  const suggestedQuestions = selectedPolicyType === 'Health'
    ? ['What health coverage options are available?', 'How to choose the right health plan?']
    : selectedPolicyType === 'Term'
      ? ['How much term life cover do I need?', 'Term vs whole life?']
      : selectedPolicyType === 'Motor'
        ? ['What affects car insurance premiums?', 'What add-ons are useful?']
        : ['What types of insurance do I need?', 'How do I choose the right policy?'];

  return (
    <div className="flex flex-col h-full bg-slate-50 flex-grow rounded-xl shadow-lg border border-gray-200 relative min-h-[calc(100vh-6rem)]">
      <div className="flex flex-col items-center justify-end flex-grow p-4 min-h-0 pb-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Hello, Policy Advisor</h1>
          {messages.length === 0 && (
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md">{initialBotMessageText}</p>
          )}
          <div className="p-4 overflow-y-auto space-y-4 w-full">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-xl max-w-[80%] break-words shadow-sm ${message.sender === 'user' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      {messages.length <= 1 && (
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2 text-center">Suggested questions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  onSendMessage(question, 'user');
                  setInputMessage('');
                  setTimeout(() => {
                    const botResponseText = `Thank you for asking about "${question}". I'm here to help with your policy questions. What else can I assist with?`;
                    onSendMessage(botResponseText, 'bot');
                  }, 600);
                }}
                className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 px-3 rounded-full transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="p-4 pb-32 bg-slate-50 border-t border-gray-200 flex justify-center rounded-b-xl">
        <div className="w-full max-w-2xl flex items-center border border-gray-300 rounded-2xl bg-white shadow-sm px-2 py-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <span className="text-gray-500 font-medium text-sm mr-2">Tools</span>
          <input
            type="text"
            placeholder="Ask Policy Advisor..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
            className="flex-grow p-2 rounded-2xl focus:outline-none bg-transparent font-inter"
          />
          {inputMessage.trim() ? (
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          ) : (
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a4 4 0 11-8 0v2m8-2a4 4 0 108 0v2M5 19l2-2m-2 2l-2-2m7-10l-2-2m2 2l2-2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('selectionScreen');
  const [selectedPolicyType, setSelectedPolicyType] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState('5000');

  const initialChatId = 'chat-initial-' + Date.now();
  const [chatHistories, setChatHistories] = useState([
    { id: initialChatId, title: 'New Chat', messages: [{ id: 1, text: 'Hello! I\'m your Policy Advisor. I can help you with insurance decisions. What types of policies are you interested in?', sender: 'bot' }] }
  ]);
  const [currentChatId, setCurrentChatId] = useState(initialChatId);

  const handleNewMessage = (message, sender) => {
    setChatHistories((prev) => prev.map((chat) => chat.id === currentChatId
      ? { ...chat, messages: [...chat.messages, { id: chat.messages.length + 1, text: message, sender }], title: chat.title === 'New Chat' && sender === 'user' ? (message.substring(0, 30) + (message.length > 30 ? '...' : '')) : chat.title }
      : chat
    ));
  };

  const navigateTo = (screen) => setCurrentScreen(screen);

  const getScreenTitle = () => currentScreen === 'selectionScreen' ? 'Customize Your Plan' : currentScreen === 'policyAdvisorChat' ? '' : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-inter text-gray-800">
      <script src="https://cdn.tailwindcss.com"></script>
      <TopBar
        showBackButton={currentScreen !== 'selectionScreen'}
        onBackClick={() => navigateTo('selectionScreen')}
        title={getScreenTitle()}
        isChatScreen={currentScreen === 'policyAdvisorChat'}
        onMenuClick={() => navigateTo('selectionScreen')}
      />
      <div className="flex-grow w-full mt-16 flex flex-col p-4 sm:p-6 md:p-8">
        {currentScreen === 'selectionScreen' && (
          <SelectionScreen
            selectedPolicyType={selectedPolicyType}
            onSelectPolicyType={setSelectedPolicyType}
            selectedBudget={selectedBudget}
            onSelectBudget={setSelectedBudget}
            onGetPlans={() => navigateTo('policyAdvisorChat')}
          />
        )}
        {currentScreen === 'policyAdvisorChat' && (
          <PolicyAdvisorChat
            messages={chatHistories.find((c) => c.id === currentChatId)?.messages || []}
            onSendMessage={handleNewMessage}
            initialBotMessageText={`Hello! I\'m your Policy Advisor. I can help you with ${selectedPolicyType ? selectedPolicyType.toLowerCase() : 'insurance'} decisions. What would you like to know about ${selectedPolicyType || 'insurance'} with a budget around ${(parseInt(selectedBudget) || 5000).toLocaleString('en-IN')}?`}
            selectedPolicyType={selectedPolicyType}
          />
        )}
      </div>
    </div>
  );
};

export default App;