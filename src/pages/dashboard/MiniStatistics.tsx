import React from "react";
import { Card } from "@aws-amplify/ui-react";


/* meilleurs notes */
interface MiniStatisticProps {
  title: string;
  amount: string;
  eleve: string;
  classe: string;
  icon?: JSX.Element;
  percentage?: number;
}

const MielleurNote = (props: MiniStatisticProps) => {
  return (
    <Card height="100%" borderRadius="15px" className="bg-gradient-red">
      <div className="card-content">
        <div className="card-title"> {props.title} </div>
        {/* <div className="card-statistics-amount" style={{fontSize:18}}>{props.amount}</div> */}
        <br />
        <small className="" style={{fontSize: 40}}>{props.classe}</small>
        {/* <small className="" style={{fontSize:24}}>{props.eleve}</small> */}
        <div className="card-statistics-icon">{props.icon}</div>
      </div>
    </Card>
  );
};

export default MielleurNote;



/*  */