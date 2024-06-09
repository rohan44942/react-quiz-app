function StartScreen({numQuestions , dispatch}) {
    return (
        <div className="start">
            <h2>
                welcome to the react quiz
            </h2>
            <h3>
            {numQuestions} number of questions are there in this quiz
            </h3>
            <button className="btn btn-ui" onClick={()=>{dispatch({type:"start"})}}>
                click here to start 
            </button>
        </div>
    )
}

export default StartScreen
