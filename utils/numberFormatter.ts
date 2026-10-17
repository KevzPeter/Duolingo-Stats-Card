const formatter = Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2
});

export const numberFormatter = (data: number) => formatter.format(data);
