import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
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
        setResult("");
      } else {
        setInput(value);
        setResult(""); 
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

      setResult(formattedResult.toString().replace(/\./g, ',')); 
      setIsResult(true);
    } catch {
      setResult("error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult(""); 
    setIsResult(false);
  };

  const handleOperation = (operation) => {
    try {
      let value;
      if (input === "") {
        value = eval(result); 
      } else {
        value = eval(input); 
      }

      if (operation === "square") {
        value = value * value;
        setInput(value.toString()); 
      } else if (operation === "sqrt" && value >= 0) {
        value = Math.sqrt(value);
        setInput(value.toString());
      } else {
        throw new Error();
      }
      const formattedResult =
        Math.abs(value) > 9999999999
          ? value.toExponential(5)
          : parseFloat(value.toFixed(10));
      setResult(formattedResult.toString()); 
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
        <div className="border border-gray-300 p-4 text-right text-2xl bg-gray-200 rounded-md overflow-hidden">
          <p className="text-right text-base">{input || "0"}</p>
          <p className="text-right text-3xl h-8 overflow-hidden">{result}</p> 
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
