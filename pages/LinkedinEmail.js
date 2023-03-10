import React from "react";
import { useState } from "react";
import loading from "public/Load.json";
import Lottie from "lottie-react";
import Navigation from "./components/navigation";
import TextareaAutosize from "react-textarea-autosize";

const LinkedinEmail = () => {
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  function handleChange(event) {
    setUserInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const prompt = userInput;
    setIsLoading(true);
    setGeneratedText("");
    if (!prompt) {
      alert("Please fill out the form");
      setIsLoading(false);
      return;
    } else {
      generateText(prompt);
    }
  }

  async function generateText(prompt) {
    const response = await fetch("/api/text-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setGeneratedText(data.text);
    setIsLoading(false);
  }

  console.log(userInput);
  return (
    <div className="flex flex-col justify-center items-center ">
      <Navigation />
      <header className="items-center flex flex-col py-14 text-[#f3f4f8]">
        <div>
          <h1 className="text-4xl max-sm:text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
              ProWriteAI
            </span>
          </h1>
        </div>
        <div>
          <p className="text-xl m max-sm:text-sm max-sm:px-10 pt-7 font-semibold">
            Stop staring at a blank screen and start writing with ProWrite AI
          </p>
        </div>
      </header>
      <div className="w-[650px] max-sm:w-[300px] max-lg:w-[450px] pt-5">
        <div className="text-[#f3f4f8]">
          <p></p>
        </div>
        <TextareaAutosize
          type="text"
          id="prompt"
          name="prompt"
          onChange={handleChange}
          placeholder={`Provide a brief overview of your email's purpose and audience to generate a targeted and personalized email using our AI-powered tool.\nFor example:\n- Ask about a job interview\n- Ask about a job recommendation\n- Ask about a job referral\n- Ask about a pay rise`}
          className=" w-full min-h-[200px] bg-gray-800 text-[#f3f4f8] p-4 block border border-gray-700 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-base"
          rows={7}
          maxRows={200}
        />{" "}
        {isLoading ? (
          <Lottie animationData={loading} className="w-16 mt-9 ml-auto" />
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center text-[#f3f4f8] font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline bg-gray-800 hover:bg-gray-700 ml-auto mt-3 max-sm:text-sm mb-10"
          >
            Generate Email
          </button>
        )}
        {generatedText ? (
          <div className="mt-5 text-[#f3f4f8] whitespace-pre-line ">
            <p className="text-lg font-bold">Generated Text:</p>
            <TextareaAutosize
              className=" w-full min-h-[200px] bg-gray-800 text-[#f3f4f8] p-4 block border border-gray-700 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-base mb-10"
              maxRows={200}
              style={{ resize: "none" }}
            >
              {generatedText}
            </TextareaAutosize>
            <a
              href="https://tsredimaster.gatsbyjs.io/"
              className="lg:fixed bottom-5 left-10 px-3 py-2 rounded-3xl transition transform hover:scale-105 text-[#f3f4f8] flex items-center justify-center"
            >
              <img src="/whitelogo.png" className="w-32 h-20 mb-2" />
            </a>
          </div>
        ) : userInput.length > 350 ? (
          <a
            href="https://tsredimaster.gatsbyjs.io/"
            className="fixed max-md:static bottom-5 left-10 px-3 py-2 rounded-3xl transition transform hover:scale-105 text-[#f3f4f8]  "
          >
            <img src="whitelogo.png" className="w-32 h-20 mb-2" />
          </a>
        ) : (
          <a
            href="https://tsredimaster.gatsbyjs.io/"
            className="fixed max-sm:absolute bottom-5 left-10 px-3 py-2 rounded-3xl transition transform hover:scale-105 text-[#f3f4f8]  "
          >
            <img src="whitelogo.png" className="w-32 h-20 mb-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default LinkedinEmail;
