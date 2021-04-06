import Highcharts from 'highcharts';
import HighchartsReacts from 'highcharts-react-official' ;
import { Component } from 'react';

const options = {
    series:[
        {
        name:'Profit',
        data:[100,20,120,50,120,40]
    }
]
}
class Graph extends Component{
    render(){
       return(
        <div className="Graph">
        <HighchartsReacts Highcharts={Highcharts} options={{options}} />
      </div>
       );
    }
}
export default Graph;