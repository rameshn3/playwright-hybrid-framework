import fs from 'fs';
import {parse} from 'csv-parse/sync';

export function readCSVData<T>(filePath:string): any {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        // Assuming the CSV has only one record, return the first one. Adjust as needed for multiple records.
      //  return records[0] as T;
      //assuming the CSV has multiple records, return all of them as an array of type Tests
        return records as T;
    } catch (error) {
        console.error(`Error reading CSV data from ${filePath}:`, error);
        throw error;
    }
}