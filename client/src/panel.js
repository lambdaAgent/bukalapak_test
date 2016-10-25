import React from "react";


const Panel = (props) => {
	if(!props.data) return (<div></div>);

	const loop = props.data.categories.map((c,index) => {
		return( 
			<li key={index} onClick={() => props.onClick(c)} style={{listStyleType: "none", cursor: "pointer"}}>
				<div className="icon-plus">&nbsp;</div>
				{' '}
				<span>{c.name}  </span> 
       			<span style={{float:"right"}}>{c.count}</span>
			</li>
		)

	});

	return(
		<div className="panel panel-danger" 
		     style={Object.assign({}, props.style)}>
		  <div className="panel-heading" style={{backgroundColor:"red"}}>
		  	<img src="/img/logo.png"/> <div className="icon-refresh" style={{display: "inline-block", float:"right"}}></div>
		  </div>

		  <div className="panel-body">
		   <div>Klik tanda silang untuk tutup <CloseButton close={props.closePanel}/></div>
		   {loop}
		  </div>
		</div>
	)
}

module.exports = Panel;


const CloseButton = (props) => {

	return(
		<div className="icon-close" onClick={props.close} style={{float: "right"}}></div>
	)
}