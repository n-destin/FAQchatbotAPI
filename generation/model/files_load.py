import json  
import openpyxl  
import os  
  
def export_to_jsonl(excel_path, jsonl_path, sheet_name="Sheet1"):  
    '''  
    Loads data from an excel file and saves it as a JSON Lines (jsonl) file.  
    '''  
    workbook = openpyxl.load_workbook(excel_path)  
    excel_sheet = workbook[sheet_name]  
    data = []  
    header_row = [cell.value for cell in excel_sheet[1]]  
    num_columns = len(header_row)  
      
    for row in excel_sheet.iter_rows(min_row=2):  
        row_data = {} 
        individual_data = []
        for index in range(min(num_columns, len(row))):  
            cell = row[index]  
            column_name = header_row[index]
            if column_name == "Message  (Email)":
                individual_data.append({"role" : "user", "content" : cell.value})
            if column_name == "Response - FAQ AI":
                individual_data.append({"role" : "assistant", "content" : cell.value})
        row_data["messages"] = individual_data
        data.append(row_data)  
      
    with open(jsonl_path, 'w') as file:  
        for entry in data:  
            file.write(json.dumps(entry) + '\n')  
  
excel_path = "C:\\Users\\K626106\\Downloads\\data_1.xlsx"  
jsonl_path = "./exported.jsonl"  
export_to_jsonl(excel_path, jsonl_path)  
print(f"Exported data to {jsonl_path}")  
