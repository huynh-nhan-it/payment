export function formattedNumber (number: number) {
    return number.toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        useGrouping: true,
    });
}