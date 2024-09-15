export const addToHistory = (data: Record<string, string>) => {
    const key = 'RGC-history';
    const existData = localStorage.getItem('RGC-history') || '';

    const timestamp: number = Date.now();
    const newData = existData.length
        ? [...JSON.parse(existData), { ...data, timestamp }]
        : [{ ...data, timestamp }];

    localStorage.setItem(key, JSON.stringify(newData));
};
