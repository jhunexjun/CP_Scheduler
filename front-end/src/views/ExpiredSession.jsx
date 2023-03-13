import icon from '../assets/compuTant/img/pngaaa.com-1282647.png'


export default function ExpiredSession() {
	return (
		<div className='container'>
			<div className="row">
				<div className="col">
					<div className="d-flex align-items-center justify-content-center" style={{height: '500px'}}>
						<img src={icon} style={{maxWidth: '30%', marginRight: '12px'}} />
						<h1 style={{marginBottom: '0'}}>Expired Session</h1>
					</div>
				</div>				
			</div>
		</div>
	);
}