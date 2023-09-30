import React from 'react';

const domainAndPath = 'http://localhost:8080/public/img';


class ResourceCell extends React.PureComponent {
	render() {
		const { data: { color, text, data: { avatar, age, phone1 } } } = this.props;

		return (
			<div className="dx-template-wrapper">
				<div className="name" style={{ background: color }}>
					<h3>{text}</h3>
				</div>
				<div className="avatar">
					<img src={domainAndPath + `/` + avatar} />
				</div>
				<div className="info" style={{ color }}>
					<br />
					<b>{phone1}</b>
				</div>
			</div>
		);
	}
}

export default ResourceCell;
