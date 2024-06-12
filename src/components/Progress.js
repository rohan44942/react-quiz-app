function Progress({index, numQuestions,points, maxpoints,answer}) {
    return (
            <header className="progress">
                <progress value={index +Number(answer!==null)}  max={numQuestions}></progress>
                <p><strong>question</strong> <strong>{index}/{numQuestions}</strong> </p>       
                <p><strong>{points}</strong>/ <strong>{maxpoints}</strong></p>
            </header>
    )
}

export default Progress
