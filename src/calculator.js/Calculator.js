import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isResult, setIsResult] = useState(false);

  const isValidInput = (value) => {
    const invalidPatterns = [
      /\*\*/,
      /\*\/|\/\*/,
      /\+\*/g,
      /\-\*/g,
      /\*\+/g,
      /\/\//,
      /\-\//,
      /\+\//,
      /\/\+/g,
      /\+\+/g,
      /\-\-/g,
      /\-\+/g,
    ];
    return !invalidPatterns.some((parent)=> parent.test(value));
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
        if (isValidInput(newInput)) {
          setInput(newInput);
        }
      }
  };
  const calculatorResult =()=>{
    try {
        const evaluatedResult = eval(input);
        setResult(evaluatedResult);
        setIsResult(true); 
      } catch (error) {
        setResult("error");
      }
  }
  const clearInput=()=>{
    setInput('');
    setResult('');
    setIsResult(false);
  }
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
  

  return (
    <div className="max-w-xs mt-7 mx-auto bg-slate-600 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col mb-4">
        <div className="border border-gray-300 p-4 text-right text-2xl bg-gray-100 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">
          {input}
        </div>
        <div className="border border-gray-300 p-4 text-right text-2xl text-gray-600 bg-gray-200 rounded-md overflow-x-auto whitespace-nowrap text-ellipsis">
          {result}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("*")}
        >
          *
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleSquareRoot()}
        >
          √
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleSquare()}
        >
          x²
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
        <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200 col-span-2" onClick={calculatorResult}>
          =
        </button>
        <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200" onClick={clearInput}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
