export  const currencyFormatter = (num) => {
    const formatter = Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    })
    return formatter.format(num)
}