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
        setInput(result + value);
      } else {
        setInput(value);
      }
      setResult("");
      setIsResult(false);
    } else {
      const newInput = input + value;
      if (newInput.length <= 18 && isValidInput(newInput)) {
        setInput(newInput);
      }
    }
  };

  const calculateResult = () => {
    try {
      const evaluatedResult = eval(input);
      setResult(evaluatedResult);
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

  const handleSquare=()=>{
    try {
        if(input){
            const evaluatedResult=eval(input);
            const squared = evaluatedResult *evaluatedResult;
            setResult(squared);
            setInput('');
            setIsResult(true); 
        }else if(result){
            const square = result * result;
            setResult(square);
            setIsResult(true); 
        }
    } catch (error) {
        setResult('error')
    }
  } 
   
  const handleSquareRoot=()=>{
    const num =parseFloat(input);
    try {
        if(!isNaN(num)&& num>=0){
            setResult(Math.sqrt(num).toFixed(2));
            setInput('');
            setIsResult(true); 
        }else if(result){
            setResult(Math.sqrt(result).toFixed(2));
            setInput('')
            setIsResult(true); 
        }
    } catch (error) {
        setInput("error")
    }
  }

  const Button = ({ label, onClick, className }) => (
    <button
      className={`bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-xs mt-7 mx-auto bg-slate-600 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col mb-4">
        <div className="border border-gray-300 p-4 text-right text-2xl bg-gray-200 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">
          {input}
        </div>
        <div className="border border-gray-300 p-4 text-right text-2xl bg-gray-200 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">
          {result}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {["1", "2", "3", "+"].map((val) => (
          <Button key={val} label={val} onClick={() => handleButtonClick(val)} />
        ))}
        {["4", "5", "6", "-"].map((val) => (
          <Button key={val} label={val} onClick={() => handleButtonClick(val)} />
        ))}
        {["7", "8", "9", "*"].map((val) => (
          <Button key={val} label={val} onClick={() => handleButtonClick(val)} />
        ))}
        <Button label="0" onClick={() => handleButtonClick("0")} />
        <Button label="√" onClick={() => handleSquareRoot()} />
        <Button label="x²" onClick={() => handleSquare()} />
        <Button label="/" onClick={() => handleButtonClick("/")} />
        <Button label="=" className="col-span-2 bg-green-500 hover:bg-green-700 " onClick={calculateResult} />
        <Button label="C" className='bg-red-500 hover:bg-red-700' onClick={clearInput} />
      </div>
    </div>
  );
};

export default Calculator;
