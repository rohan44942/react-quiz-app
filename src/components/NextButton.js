
function NextButton({ dispatch, answer }) {
  if (answer === null) return null;

  return (<button className="btn btn-ui" onClick={() => dispatch({ type: "newQuestion" })}>
    next
  </button>);   
}
 
export default NextButton;
