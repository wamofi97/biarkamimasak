const ShimmeringText = ({ text = "Hover me!", className="inline-block" }) => {
    return (
      <div className={`relative w-fit ${className}`}>
        {/* Base text */}
        <span className="relative z-10 font-bold cursor-pointer 
          bg-gradient-to-r from-yellow-300 to-orange-500 
          bg-clip-text text-transparent 
          transition-all duration-300
          opacity-0">
          {text}
        </span>
        
        {/* Shimmer effect overlay */}
        <span className="absolute inset-0 z-0 font-bold cursor-pointer
          bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300
          bg-clip-text text-transparent
          bg-[length:200%_100%] opacity-100
          animate-[shimmer_8s_infinite]">
          {text}
        </span>
      </div>
    );
  };

  export default ShimmeringText;