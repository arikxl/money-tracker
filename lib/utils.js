export  const currencyFormatter = (num) => {
    const formatter = Intl.NumberFormat('en-IL', {
        currency: 'ILS',
        style: 'currency'
    })
    return formatter.format(num)
}