// export default function Item(data) {
//   console.log('data: ', data);

//   return (
//     <div className="product-name" style={{fontWeight: 'bold'}}>{ `fsdfsdfs` }</div>
//   )
// }

export default function Item(data) {
  console.log('data: ', data)

  return (
      <div className="fw-bolder">{ data.text + 'sdfsfsd' }</div>
  );
}