interface Variable {
    name: string;
    value: string;
}

export const replaceVariablesInJson = (json: string, vars: Variable[]): string => {
    vars.forEach((variable) => {
        const regex = new RegExp(`{{${variable.name}}}`, 'g');
        let replacement: string;

        if (isValidJson(variable.value)) {
            replacement = variable.value;
        } else {
            replacement = `"${variable.value}"`;
        }
        json = json.replace(regex, replacement);
    });
    return json;
};

const isValidJson = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};
