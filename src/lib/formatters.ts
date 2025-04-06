
function formatCurrency(number: number): string {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
    }).format(number)

}

export default formatCurrency
