export default function queue(max?: number): {
    add(fn: () => Promise<any>): Promise<{}>;
    close(): Promise<{}>;
};
