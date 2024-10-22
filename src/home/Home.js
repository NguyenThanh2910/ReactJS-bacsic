import React from "react";
const Home = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Lập trình ReactJS
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Tất cả bài tập cần làm
        </h2>
        <ul className="list-disc list-inside text-left space-y-2 text-gray-600">
          <li>Làm máy tính tính toán</li>
          <li>Làm trang dự báo thời tiết</li>
          <li>Làm Todo List</li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
