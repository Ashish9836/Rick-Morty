// src/components/ui/Spinner.js
import React from "react";

const Spinner = () => (
  <svg
    className={`animate-spin h-40 w-40 text-gray-700`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
    ></path>
  </svg>
);

export default Spinner;
