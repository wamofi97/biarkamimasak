const ShiningText = ({
  text = "Shine Bright!",
  color = "text-yellow-500 dark:text-yellow-300",
  className = "inline-block",
}) => {
  return (
    <div
      className={`relative top-2 w-fit bg-neutral-100 dark:bg-neutral-800 overflow-hidden rounded-full px-2 pt-1 ${className}`}
    >
      <span className={`font-bold ${color}`}>{text}</span>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-0 -left-[100%] w-1/2 h-full 
          bg-gradient-to-r from-transparent via-neutral-300 to-transparent
          animate-[shine_3s_ease-in-out_infinite]
          transform rotate-2 opacity-50"
        />

        <div className="absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-500 dark:bg-yellow-200 rounded-full
            animate-[twinkle_2s_ease-in-out_infinite]"
          />
          <div
            className="absolute top-3/4 left-2/3 w-1 h-1 bg-yellow-500 dark:bg-yellow-200 rounded-full
            animate-[twinkle_2s_ease-in-out_0.5s_infinite]"
          />
          <div
            className="absolute top-1/2 left-1/3 w-1 h-1 bg-yellow-500 dark:bg-yellow-200 rounded-full
            animate-[twinkle_2s_ease-in-out_1s_infinite]"
          />
        </div>
      </div>
    </div>
  );
};

export default ShiningText;
