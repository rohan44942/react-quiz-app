function Finish({ points, maxpoints, dispatch }) {
  const percentage = (points / maxpoints) * 100;
  return (
    <>
      <p className="result">
        your score is {points} out of {maxpoints} ({Math.ceil(percentage)}%){" "}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Finish;
