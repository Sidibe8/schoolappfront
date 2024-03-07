import { combineReducers } from "@reduxjs/toolkit";
import eleveReducer from './eleveReducer'
import matiereReducer from './matiereReducer'
import noteReducer from './noteReducer'
import professeurReducer from './professeurReducer'
import trimestreReducer from './trimestreReducer'
import classeReducer from './classeReducer'
import elevesByClasseReducer from './AllStudentByClasseReducer'
import userReducer from './userReducer'
import eleveByIdReducer from './eleveByIdReducer'
import professeurByIdReducer from './professeurByIdReducer'
import classeByIdReducer from './classeByIdReducer'
import profInClasseReducer from './progInCLasseReducer'
export default combineReducers({
  eleveReducer,
  matiereReducer,
  noteReducer,
  professeurReducer,
  trimestreReducer, 
  classeReducer,
  elevesByClasseReducer,
  userReducer,
  eleveByIdReducer,
  professeurByIdReducer,
  classeByIdReducer,
  profInClasseReducer,
});
