const list = document.querySelector('#list')
const cart = document.querySelector('#cart-items')
const totalDisplay = document.getElementById('total');
const cartlocale = {
  banan: { price: 20 },
  ananas: { price: 35 },
  apple: { price: 10 },
  meat: {price: 50}
};
const userCart = {}
function render() {
  Object.entries(cartlocale).forEach(([key, item]) => {
  list.insertAdjacentHTML('beforeend', `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>Продукт: ${key}</span>
      <span>Цена: ${item.price}₽</span>
      <span class="btn btn-sm btn-success" data-key="${key}">&check;</span>
    </li>
    `);
  });
}
  // const html = Object.entries(cartlocale)
  //   .map(([key, item]) => {
  //     return `
  //       <li class="list-group-item d-flex justify-content-between align-items-center">
  //         <span>Продукт: ${key}</span>
  //         <span>Цена: ${item.price}₽</span>
  //         <span class="btn btn-sm btn-success" data-key="${key}">&check;</span>
  //       </li>
  //     `;
  //   })
  //   .join(''); // объединяем все элементы в одну строку

  // list.innerHTML = html; // вставляем в HTML
  // var entries = Object.entries(cartlocale)
  // for (let [key,item ] of entries) {
  //   list.insertAdjacentHTML('beforeend', add(key, item))
  // }
  


//update with cycle
// function updateCart() {
//   cart.innerHTML = '';
//   let total = 0;
    
//   for (let [key, count] of Object.entries(userCart)) {
//     const item = cartlocale[key]
//     const totalprice = item.price * count
//     total += totalprice
//     cart.insertAdjacentHTML('beforeend', `
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//     <span data-type="remove" data-key="${key}" class="btn btn-small btn-danger">remove</span>
//     <span>${key} x ${count}</span>
//     <span>${totalprice} ₽</span>
//     </li>
//     `);
//   }
//     totalDisplay.textContent = total;
// }
//update with map and reduce 
function updateCart() {
  const entries = Object.entries(userCart);

  // С помощью map создаём массив HTML-строк
  const itemsHTML = entries.map(([key, count]) => {
    const item = cartlocale[key];
    const totalprice = item.price * count;
    return `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span data-type="remove" data-key="${key}" class="btn btn-small btn-danger">remove</span>
        <span>${key} x ${count}</span>
        <span>${totalprice} ₽</span>
      </li>
    `;
  });

  // С помощью reduce считаем общую сумму
  const total = entries.reduce((sum, [key, count]) => {
    return sum + cartlocale[key].price * count;
  }, 0);

  // Обновляем корзину
  cart.innerHTML = itemsHTML.join('');
  totalDisplay.textContent = total;
}
list.addEventListener('click', (event) => {
  const target = event.target;

  // Только если у элемента есть data-key
  if (target.dataset.key) {
    const key = target.dataset.key;

    if (userCart[key]) {
      userCart[key]++;
    } else {
      userCart[key] = 1;
    }

    updateCart();
  }
});
cart.addEventListener('click',(event) => {
  const target = event.target;
  if (target.dataset.type === 'remove') {
    const key = target.dataset.key;
    const count = userCart[key];

    if (count > 1) {
      userCart[key] -= 1;
    } else {
      delete userCart[key];  // удаляем товар полностью
    }

    updateCart();
  }
})


render()