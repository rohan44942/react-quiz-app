function Options({question}) {
    return (
        <div className="option">
            <h2>these are the options</h2>
        {question.options.map((option) => (
          <button className="btn  btn-option" key={option}>{option}</button>
        ))}
      </div>
    )
}

export default Options
