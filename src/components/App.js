import { useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import { useEffect } from "react";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./footer";
import Timer from "./Timer";
// import { useDispatch } from 'react-redux';

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  console.log("Reducer action:", action); // Log dispatched actions
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "setfinish":
      return {
        ...state,
        status: "finish",
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error("Action is unknown ");
  }
}

export default function App() {
  // const { state, dispatch } = useReducer(reducer, initialState);

  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => {console.log(data); dispatch({ type: "dataReceived", payload: data })})
  //     .catch((err) => {
  //       console.error("Error fetching or processing data:", err);
  //     });
  // }, [dispatch]);
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxpoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(() => {
    console.log("Dispatch:", dispatch); // Check dispatch
    fetch("http://localhost:8000/questions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "dataFailed" });
        // console.error("Error fetching or processing data:", err);
      });
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxpoints={maxpoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Footer>
            <Timer />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />  
              
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish points={points} maxpoints={maxpoints} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
