import React from 'react';
import {Line} from 'react-chartjs-2';
export default function Chart(props) {

    const [lowerLimit, upperLimit] = [new Date(props.startDate).getTime(),new Date(props.endDate).getTime()]
    const dates = [];
    const counters = [];
    props.list.forEach((data)=>{
        if(data.date>=lowerLimit && data.date<=upperLimit){
            dates.push(new Date(data.date).toISOString().split('T')[0]);
            counters.push(data.size);
        }
    })

    const data={
        labels: dates,
        datasets: [
            {
                label: 'Enquiries',
                data: counters,
                borderColor: 'rgba(0,0,0,0.5)',
                backgroundColor: 'white',

                
            }
        ]
    };
    return <Line data={data} width={910} height={360} />     
}
