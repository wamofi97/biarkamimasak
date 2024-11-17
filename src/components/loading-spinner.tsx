const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-0"></div>
        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-200"></div>
        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-300"></div>
        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-600"></div>
        <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-800"></div>
      </div>
      <div className="mt-4">Processing with AI (let him cook... 👀)</div>
    </div>
  );
};

export default LoadingSpinner;
