import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "./Firebase";

const Like: React.FC = () => {
  const [likes, setLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch likes on initial load
    fetchLikes();
  }, []);

  const fetchLikes = async (): Promise<void> => {
    try {
      const docRef = doc(db, "userInput", 'doc1');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("resource", data.age);
        setLikes(parseInt(data.age) || 0);
      } else {
        // Document doesn't exist, initialize it
        await setDoc(docRef, { age: 0 });
        setLikes(0);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const incrementLikes = async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newLikes = likes + 1;
      const docRef = doc(db, "userInput", 'doc1');

      await setDoc(docRef, {
        age: newLikes
      });

      setLikes(newLikes);
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <div className="text-lg font-mono mb-4">
        Likes: <span className="text-sky-500 font-bold">{likes}</span>
      </div>
      <button
        onClick={incrementLikes}
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600 text-white hover:scale-105'
        }`}
      >
        {isLoading ? 'Loading...' : '❤️ Like'}
      </button>
    </div>
  );
};

export default Like;