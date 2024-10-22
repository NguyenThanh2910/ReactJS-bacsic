import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(""); // Separate state for the result
  const [isResult, setIsResult] = useState(false);

  const isValidInput = (value) => {
    const invalidPatterns = [
      /\*\*/g,
      /\*\/|\/\*/g,
      /\+\*/g,
      /\-\*/g,
      /\*\+/g,
      /\/\//g,
      /\-\//g,
      /\+\//g,
      /\/\+/g,
      /\+\+/g,
      /\-\-/g,
      /\-\+/g,
    ];
    return !invalidPatterns.some((pattern) => pattern.test(value));
  };

  const handleButtonClick = (value) => {
    if (isResult) {
      if (["+", "-", "*", "/"].includes(value)) {
        setInput(input + value);
        setResult(""); // Clear result when a new operation starts
      } else {
        setInput(value);
        setResult(""); // Clear result when starting a new input
      }
      setIsResult(false);
    } else {
      const newInput = input + value;
      if (newInput.length <= 15 && isValidInput(newInput)) {
        setInput(newInput);
      }
    }
  };

  const calculateResult = () => {
    try {
      const evaluatedResult = eval(input.replace(/,/g, '.'));
      const formattedResult =
        Math.abs(evaluatedResult) > 9999999999
          ? evaluatedResult.toExponential(7)
          : parseFloat(evaluatedResult.toFixed(14));

      setResult(formattedResult.toString().replace(/\./g, ',')); // Display the result
      setIsResult(true);
    } catch {
      setResult("error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult(""); // Clear the result on clear
    setIsResult(false);
  };

  const handleOperation = (operation) => {
    try {
      let value;

      // If the input is empty or has only the result, set it to the previous result
      if (input === "") {
        value = eval(result); // Use the result if input is empty
      } else {
        value = eval(input); // Evaluate the current input
      }

      if (operation === "square") {
        value = value * value;
        setInput(value.toString()); // Update the input with the squared value
      } else if (operation === "sqrt" && value >= 0) {
        value = Math.sqrt(value);
        setInput(value.toString()); // Update the input with the square root value
      } else {
        throw new Error();
      }

      const formattedResult =
        Math.abs(value) > 9999999999
          ? value.toExponential(5)
          : parseFloat(value.toFixed(10));

      setResult(formattedResult.toString()); // Display the result
      setIsResult(true);
    } catch {
      setResult("error");
    }
  };

  const Button = ({ label, onClick, className }) => (
    <button
      className={`text-black p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none transition duration-200 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-xs mt-7 mx-auto bg-slate-600 p-6 rounded-lg shadow-lg backdrop-blur-lg bg-opacity-50">
      <div className="flex flex-col mb-4">
        <div className="border border-gray-300 p-4 text-right text-2xl bg-gray-200 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">
        <p className="text-right text-lg">{input || "0"}</p>
          {result} 
        </div>
    
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Button label="C" className="bg-red-500 hover:bg-red-700" onClick={clearInput} />
        <Button label="√" className="bg-purple-500 hover:bg-purple-600" onClick={() => handleOperation("sqrt")} />
        <Button label="x²" className="bg-purple-500 hover:bg-purple-600" onClick={() => handleOperation("square")} />
        <Button label="+" className="bg-green-500 hover:bg-green-600" onClick={() => handleButtonClick("+")} />
        {["1", "2", "3"].map((val) => (
          <Button key={val} label={val} className="bg-white hover:bg-stone-200" onClick={() => handleButtonClick(val)} />
        ))}
        <Button label="-" className="bg-yellow-500 hover:bg-yellow-600" onClick={() => handleButtonClick("-")} />
        {["4", "5", "6"].map((val) => (
          <Button key={val} label={val} className="bg-white hover:bg-stone-200" onClick={() => handleButtonClick(val)} />
        ))}
        <Button label="*" className="bg-pink-500 hover:bg-pink-600" onClick={() => handleButtonClick("*")} />
        {["7", "8", "9"].map((val) => (
          <Button key={val} label={val} className="bg-white hover:bg-stone-200" onClick={() => handleButtonClick(val)} />
        ))}
        <Button label="/" className="bg-teal-500 hover:bg-teal-600" onClick={() => handleButtonClick("/")} />
        <Button label="." className="bg-orange-500 hover:bg-orange-600" onClick={() => handleButtonClick(",")} />
        <Button label="0" className="bg-white hover:bg-stone-200" onClick={() => handleButtonClick("0")} />
        <Button label="=" className="col-span-2 bg-cyan-500 hover:bg-cyan-700" onClick={calculateResult} />
      </div>
    </div>
  );
};

export default Calculator;
