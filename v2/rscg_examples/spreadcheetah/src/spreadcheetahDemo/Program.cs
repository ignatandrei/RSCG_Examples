﻿using SpreadCheetah;
using spreadcheetahDemo;

using var stream = File.Create("a.xlsx");
using var spreadsheet = await Spreadsheet.CreateNewAsync(stream);

// A spreadsheet must contain at least one worksheet.
await spreadsheet.StartWorksheetAsync("Sheet 1");

// Cells are inserted row by row.
var row = new List<Cell>();
row.Add(new Cell("Answer to the ultimate question:"));
row.Add(new Cell(42));

// Rows are inserted from top to bottom.
await spreadsheet.AddRowAsync(row);
var p=new Person();
p.FirstName = "Andrei";
p.LastName = "Ignat";
await spreadsheet.AddAsRowAsync(p, PersonRowContext.Default.Person);

// Remember to call Finish before disposing.
// This is important to properly finalize the XLSX file.
await spreadsheet.FinishAsync();
Console.WriteLine("see a.xlsx");
