

export default function InvoiceTpl() {
	



	return (
		`<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Bootstrap demo</title>
		<style type="text/css">
			.container {
				display: grid;
				grid-auto-columns: minmax(15rem, auto);
				grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
				grid-gap: 1rem;
			}
			.item {
				background: #f1e9f7;
				border: 3px solid #a579cc;
				color: #a579cc;
				padding: 2rem;
				font-size: 2rem;
				text-align: center;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="item">long content long content long content long content long content</div>
			<div class="item">1</div>
			<div class="item">2</div>
			<div class="item">3</div>
			<div class="item">4</div>
			<div class="item">5</div>
			<div class="item">6</div>
			<div class="item">7</div>
			<div class="item">8</div>
		</div>
	</body>
</html>
`
	);
}