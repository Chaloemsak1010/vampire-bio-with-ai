"use client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Image from "next/image";

export default function VampireDating() {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    setLoading(true);
    setBio(""); // Clear previous bio

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, interests }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.result) {
        throw new Error("Server did not return a bio.");
      }

      setBio(data.result);
    } catch (error) {
      console.error(error);
      setBio("🦇 Oops! Could not generate your vampire bio. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-100 flex flex-col items-center justify-center font-serif p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Vampire image - responsive sizing */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <Image
          src="/dating-vampire.jpg"
          alt="Vampire"
          width={400} 
          height={400}
          className="rounded-full border-4 border-red-600 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover"
        />
      </div>

      {/* Title - responsive text sizing */}
      <h1 style={{ fontFamily: 'var(--font-dracutaz), Arial, sans-serif' }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 font-bold text-red-600 text-center px-2">
        🦇 Vampire Dating Bio Generator
      </h1>

      {/* Form container - responsive width */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl space-y-3 sm:space-y-4">
        <input
          type="text"
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-red-950 text-white text-sm sm:text-base placeholder:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="text"
          placeholder="Your Interests (comma separated)..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-red-950 text-white text-sm sm:text-base placeholder:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          onClick={generateBio}
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-lg mt-3 text-sm sm:text-base md:text-lg transition-colors"
        >
          {loading ? (
            <span className="flex justify-center">
              <Skeleton width={200} height={24} baseColor="#7f1d1d" highlightColor="#991b1b" />
            </span>
          ) : (
            "Generate My Vampire Bio 🩸"
          )}
        </button>
      </div>

      {/* Bio output - responsive sizing and padding */}
      <div className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-6 md:p-8 bg-red-950 rounded-xl text-center shadow-xl border border-red-800 min-h-[120px] sm:min-h-[150px] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {loading ? (
          <Skeleton count={4} baseColor="#7f1d1d" highlightColor="#991b1b" />
        ) : bio ? (
          <p className="whitespace-pre-line text-sm sm:text-base md:text-lg leading-relaxed">
            {bio}
          </p>
        ) : (
          <p className="text-red-400 text-xs sm:text-sm md:text-base italic">
            Your vampire bio will appear here...
          </p>
        )}
      </div>
    </div>
  );
}