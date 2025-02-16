const GAME_DATA = {
    groups: [
      {
        category: "2022 THINGS",
        words: ["KARMAN", "NOTEIT", "ESCAPE THE DARKNESS", "VIVARIUM"],
        color: "bg-pink-200"
      },
      {
        category: "STUFF I BOUGHT YOU",
        words: ["PERFUME", "TIFFANY NECKLACE", "PANDORA", "FOOD"],
        color: "bg-red-200"
      },
      {
        category: "DREAM DATES",
        words: ["PICNIC", "ICE SKATING", "LEGO", "MINI GOLF"],
        color: "bg-purple-200"
      },
      {
        category: "THINGS THAT REMIND ME OF U",
        words: ["STARS", "FLOWERS", "PINK", "STRAWBERRIES"],
        color: "bg-rose-200"
      }
    ]
  };
  
  const ConnectionsGame = () => {
    const [selectedWords, setSelectedWords] = React.useState([]);
    const [solvedGroups, setSolvedGroups] = React.useState([]);
    const [attempts, setAttempts] = React.useState(4);
    const [gameOver, setGameOver] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [shuffledWords, setShuffledWords] = React.useState([]);
    const [shake, setShake] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
  
    React.useEffect(() => {
      const allWords = GAME_DATA.groups.flatMap(group => 
        group.words.map(word => ({
          word,
          category: group.category,
          color: group.color
        }))
      );
      setShuffledWords(shuffleArray([...allWords]));
    }, []);
  
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const handleWordClick = (wordObj) => {
      if (solvedGroups.some(group => group.words.includes(wordObj.word))) return;
      
      if (selectedWords.includes(wordObj)) {
        setSelectedWords(selectedWords.filter(w => w !== wordObj));
      } else if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, wordObj]);
      }
    };
  
    const checkSelection = () => {
      if (selectedWords.length !== 4) return;
  
      const categories = selectedWords.map(w => w.category);
      const isCorrectGroup = categories.every(cat => cat === categories[0]);
  
      if (isCorrectGroup) {
        setCorrect(true);
        setTimeout(() => {
          const group = GAME_DATA.groups.find(g => g.category === categories[0]);
          setSolvedGroups([...solvedGroups, {
            category: group.category,
            words: selectedWords.map(w => w.word),
            color: group.color
          }]);
          setSelectedWords([]);
          setCorrect(false);
          
          if (solvedGroups.length === 3) {
            setGameOver(true);
            setShowSuccess(true);
            setTimeout(() => {
              completeGame();
            }, 2000);
          }
        }, 500);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setAttempts(attempts - 1);
          if (attempts <= 1) {
            setGameOver(true);
          }
          setSelectedWords([]);
        }, 500);
      }
    };
  
    const completeGame = () => {
      document.getElementById('connections-container').style.display = 'none';
      document.getElementById('dialogue-box').style.display = 'block';
      window.continueDialogue();
    };
  
    return (
      <div className="w-full max-w-2xl mx-auto p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-4">
          Connections
        </h1>
        <div className="mb-6 text-lg font-bold text-pink-600 text-center">
          Hearts remaining: {'❤️'.repeat(attempts)}
        </div>
  
        {/* Solved Groups */}
        <div className="space-y-3 mb-6">
          {solvedGroups.map((group, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-lg ${group.color} shadow-md transition-all duration-500 animate-fadeIn`}
            >
              <div className="font-bold text-pink-800 mb-2">{group.category}</div>
              <div className="grid grid-cols-4 gap-2">
                {group.words.map((word, wordIdx) => (
                  <div 
                    key={wordIdx} 
                    className="text-center p-2 bg-white bg-opacity-70 rounded-lg shadow-sm"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Game Grid */}
        <div className={`grid grid-cols-4 gap-2 ${shake ? 'animate-shake' : ''} ${correct ? 'animate-success' : ''}`}>
          {shuffledWords.map((wordObj, idx) => {
            const isSolved = solvedGroups.some(group => 
              group.words.includes(wordObj.word)
            );
            const isSelected = selectedWords.includes(wordObj);
  
            if (isSolved) return null;
  
            return (
              <button
                key={idx}
                onClick={() => handleWordClick(wordObj)}
                className={`p-3 text-center rounded-lg font-medium
                  transition-all duration-200 transform hover:scale-105
                  ${isSelected 
                    ? 'bg-pink-500 text-white shadow-lg scale-105' 
                    : 'bg-white hover:bg-pink-100 shadow-md'
                  }`}
                disabled={gameOver}
              >
                {wordObj.word}
              </button>
            );
          })}
        </div>
  
        {/* Submit Button */}
        <button
          onClick={checkSelection}
          disabled={selectedWords.length !== 4 || gameOver}
          className={`mt-6 w-full p-3 rounded-lg font-bold transition-all duration-200
            ${selectedWords.length === 4 && !gameOver
              ? 'bg-pink-500 text-white shadow-lg hover:bg-pink-600'
              : 'bg-gray-200'
            }`}
        >
          Submit
        </button>
  
        {/* Game Over Dialog */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl max-w-md mx-auto">
              <h2 className="text-2xl text-pink-600 text-center mb-4">
                {showSuccess ? "💝 LETS GOOOOOOO!!! 💝" : "Wtf..."}
              </h2>
              <p className="text-center text-gray-700">
                {showSuccess 
                  ? "YOU fricking did it! :D ❤️" 
                  : "You suck man.. try again."}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  function renderConnectionsGame() {
    ReactDOM.render(
      <ConnectionsGame />,
      document.getElementById('connections-container')
    );
  }
