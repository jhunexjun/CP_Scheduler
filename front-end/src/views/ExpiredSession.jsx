import icon from '../assets/compuTant/img/pngaaa.com-1282647.png'


export default function ExpiredSession() {
	return (
		<div className='container'>
			<div className="row">
				<div className="d-flex justify-content-center">
					<table style={{height: '500px'}}>
						<tbody>
							<tr>
								<td className="align-middle text-center">
									<img src={icon} style={{maxWidth: '30%'}} />
									<h1>Expired Session</h1>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}