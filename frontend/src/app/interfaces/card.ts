export interface CardOptions {
    id: number;
    name: string;
    color: string;
    axis: Array<number>;
    size: Array<number>;
    serviceId: number;
    serviceServiceId: number;
}

export const Colors = ['border-dark', 'border-info', 'border-warning', 'border-danger', 'border-success', 'border-primary', 'border-secondary'];

export const Cards = [
    {
        id: 0,
        name: 'card-1',
        title: "Card 1",
        subtitle: "Some example text 1",
        color: "card border-secondary mb-3",
        content: '',
        axis: [0, 0]
    },
    {
        id: 0,
        name: 'card-2',
        title: "Card 2",
        subtitle: "Some example text 2",
        color: "card border-success mb-3",
        content: '',
        axis: [0, 0]
    }
];

// color : border-dark border-light border-info border-warning border-danger border-success border-primary border-secondary