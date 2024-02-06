// export default function Item(data) {
//   console.log('data: ', data);

//   return (
//     <div className="product-name" style={{fontWeight: 'bold'}}>{ `fsdfsdfs` }</div>
//   )
// }

export default function itemTemplate(data) {
  return `<div id="cmpt-sched-filter-by">${data.text}</div>`;
}