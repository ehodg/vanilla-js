const currencyElement_one = document.getElementById('currency-one');
const ammountElement_one = document.getElementById('amount-one');
const currencyElement_two = document.getElementById('currency-two');
const ammountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
const calculate = () => {
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const rate = data.rates[currency_two];
        // console.log(rate)
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        ammountElement_two.value = (ammountElement_one.value * rate).toFixed(2);
    })
}

// Event listeners
currencyElement_one.addEventListener('change', calculate);
ammountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
ammountElement_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
})

calculate()