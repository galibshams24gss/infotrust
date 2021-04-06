
import './App.css';
import BarChart from './components/BarChart';

// import {makeStyles,Input,Table,TableContainer,TableBody,TableHead, TableRow, TableCell} from '@material-ui/core'

import HomePage from './components/HomePage'
function App(){
  return(
    <div className="App">
      <HomePage/>
      <BarChart/>
    </div>
  );
}

export default App;
