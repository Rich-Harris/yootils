export default function linear(domain: [number, number], range: [number, number]): ((num: number) => number) & {
    inverse: () => ((num: number) => number) & any;
};
