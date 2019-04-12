import React from 'react';
import "./styles.css";

class Loader extends  React.Component {
	render(){
		return(
		<div className="loader">
		  <div className="figure">
		    <div className="part1"></div>
		    <div className="part2"></div>
		    <div className="part3"></div>
		    <div className="part4"></div>
		  </div>
		 </div> 
			)
	}
}
export default Loader