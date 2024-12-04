import { ContractData } from '../types/contract';  

const escapeLatex = (text: string): string => {  
    return text.replace(/[&$%#_{}~^\\]/g, '\\$&'); 
};  

const formatListItems = (items: string[]): string => {  
    if (items.length === 0) return '  \\item None'; // Use 'None' instead of '-' for clarity
    return items.map(item => `  \\item ${escapeLatex(item)}`).join('\n');  
};  

export const generateLatexCode = (data: ContractData): string => {  
    const paramString = data.operation.parameters.length > 0  
        ? `(${data.operation.parameters.map(escapeLatex).join(', ')})`  
        : '';  

    const crossRefs = data.crossReferences.length > 0  
        ? escapeLatex(data.crossReferences.join(', '))  
        : '-';  

    return `
\\documentclass{article} 
\\usepackage{array} 
\\usepackage{booktabs} 
\\usepackage[table]{xcolor} 
\\usepackage{multirow} 
\\usepackage{enumitem}  

\\begin{document}  

\\begin{table}[h] 
\\renewcommand{\\arraystretch}{1.5} 
\\begin{tabular}{|p{0.25\\textwidth}|p{0.75\\textwidth}|} 
\\hline 
\\rowcolor{gray!10} 
\\textbf{Operation:} & ${escapeLatex(data.operation.name)}${paramString} \\\\ 
\\hline 
\\rowcolor{gray!5} 
\\textbf{Cross References:} & ${crossRefs} \\\\ 
\\hline 
\\multirow{-1}{*}{\\textbf{Preconditions:}} & \\begin{itemize}[leftmargin=*] 
${formatListItems(data.preconditions)} 
\\end{itemize} \\\\ 
\\hline 
\\multirow{-1}{*}{\\textbf{Postconditions:}} & \\begin{itemize}[leftmargin=*] 
${formatListItems(data.postconditions)} 
\\end{itemize} \\\\ 
\\hline 
\\end{tabular} 
\\caption{Contract ${escapeLatex(data.contractNumber)}${data.title ? ': ' + escapeLatex(data.title) : ''}} 
\\end{table}  

\\end{document}  
`;  
};
