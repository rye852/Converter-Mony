let buttonDown = document.querySelectorAll('.bar span');
let hello;
fetch(
  'https://api.currencyfreaks.com/latest?apikey=0945278809e74910b66f4d199fc0a1dc'
)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    return data.rates;
  })
  .then((rates) => {
    rates['USD'] = '1';
    return rates;
  })
  .then((rates) => {
    let bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length; i++) {
      let ul = document.createElement('ul');
      let li;
      let text;
      for (let i in rates) {
        li = document.createElement('li');
        text = document.createTextNode(i);
        li.append(text);
        ul.append(li);
      }
      ul.classList.add('coins');
      bars[i].after(ul);
    }
    let lis = document.querySelectorAll('.coins li');

    lis.forEach((li) => {
      li.addEventListener('click', (e) => {
        lis.forEach((li2) => {
          li2.classList.remove('chosen');
        });
        e.target.classList.add('chosen');
        e.target.parentElement.classList.remove('show');
        let symbol =
          e.target.parentElement.previousElementSibling.firstElementChild;
        symbol.innerText = e.target.textContent;
      });
    });
    return rates;
  })
  .then((rates) => {
    let icons = document.querySelectorAll('.bar span');
    icons.forEach((icon) => {
      icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('svg-inline--fa')) {
          e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
            'show'
          );
        } else if (e.target.classList.contains('chek')) {
          e.target.parentElement.nextElementSibling.classList.toggle('show');
        } else {
          e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle(
            'show'
          );
        }
        console.log(e.target);
      });
    });
    return rates;
  })
  .then((rates) => {
    let convert = document.querySelector('.convert');
    convert.addEventListener('click', () => {
      let inputValue = document.querySelector('.base input').value;
      let baseSymbole = document.querySelector('.base .symbole').textContent;
      let convertSymbole =
        document.querySelector('.result .symbole').textContent;

      let newprice = (
        (inputValue * rates[convertSymbole]) /
        rates[baseSymbole]
      ).toFixed(2);
      document.querySelector('.new-price').innerText = newprice;
    });
  });

let copy = document.querySelector('.copy');
copy.addEventListener('click', () => {
  let baseValue = document.querySelector('.base input').value;
  let baseSymbole = document.querySelector('.base .symbole').textContent;
  let result = document.querySelector('.new-price').innerText;
  let resultSymbole = document.querySelector('.result .symbole').textContent;
  if (result == '') {
    return;
  }
  let theText =
    (document.value = `${baseValue} ${baseSymbole} = ${result} ${resultSymbole}`);
  let copyText = document.createElement('input');
  copyText.classList.add('to-delete');
  copyText.style.cssText = 'opacity:0; font-size:24px;';
  copyText.append(theText);
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(theText);

  copyText.remove();
  // now you need to add theText to a pop up
  let pop = document.querySelector('.pop');

  pop.style.cssText = 'top: 20px;';
  let text = document.querySelector('.pop span');
  text.innerText = theText;
  setTimeout(() => {
    const rect = pop.getBoundingClientRect();
    let height = Math.ceil(-rect.height);
    pop.style.cssText = `top: ${height * 2}px`;
  }, 3000);
});
