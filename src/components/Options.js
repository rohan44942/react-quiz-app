function Options({ question, dispatch, answer }) {
  const isAnswerd = answer != null;
  return (
    <div className="option">
      {question.options.map((option, index) => (
        <button
          className={` btn btn-option ${answer === index ? "answer" : ""} ${
            isAnswerd
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={option}
           disabled={isAnswerd} 
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
