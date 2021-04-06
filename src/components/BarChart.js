import React from 'react';
import { Line} from 'react-chartjs-2'
const BarChart = () =>{
    return(
        <Line
            data={{
                labels: ['Security Policies',
                 'Organisation of information security',
                 'Human resource security',
                 'Asset management',
                  'Access control',
                   'Cryptography',
                   'Physical and environmental security',
                   'Operations security',
                   'Communications security',
                   'System acquisition, development and maintenance',
                   'Supplier relationships'
                   ],
                datasets: [{
                    label: '# of Votes',
                    data: [0.10,0.00,0.03,0.00,0.06,0.00,0.16,0.25,0.29,0.13,0.28],
                    backgroundColor: 'orange',
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
                }]
            }}
            height={400}
            width={600}
            options = {{
                maintainAspectRatio: false,
                scales:{
                    yAxes: [
                        {
                            ticks:{
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }}
        />
    );
}
export default BarChart;