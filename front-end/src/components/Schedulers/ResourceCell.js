import React from 'react';

const domainAndPath = `${process.env.REACT_APP_API_DOMAIN}/public/img`;


function ResourceCell(e, selectedView){
	const { data: { color, text, data: { avatar, age, phone1 } } } = e;

	function returnView() {
		if (selectedView === 'Month') {
			return (
				<>
		      <div className="cmpt-scheduler-name" style={{ background: color }}>
		        <h2>{text}</h2>
		      </div>
		      <div className="avatar">
		        <img src={`${domainAndPath}/${avatar}`} />
		      </div>
		      <div className="info" style={{ color }}>
		      	{
		      		phone1 ?? 'Phone: ' + phone1
		      	}
		      </div>
		    </>
			);
		}

		if (selectedView === 'Day' || selectedView === 'Week') {
			return (
				<>
					<div className="avatar">
		        <img src={`${domainAndPath}/${avatar}`} />
		      </div>
					<h6 style={{ background: color }}>{text}</h6>
				</>
			)
		}
	}

	return (
		<div className="dx-template-wrapper">
			{ returnView() }
		</div>
	);
}

export default ResourceCell;
