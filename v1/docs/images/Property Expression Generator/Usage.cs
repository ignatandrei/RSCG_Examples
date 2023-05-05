var queryCnt = Metadata_Person.expr_FirstName_Contains("9");             
var pers= await cnt.Person.Where(queryCnt).ToArrayAsync();
Console.WriteLine(pers.Length);


queryCnt = Metadata_Person.expr_LastName_NullOrWhite();
pers = await cnt.Person.Where(queryCnt).ToArrayAsync();
Console.WriteLine(pers.Length);


var queryID = Metadata_Person.expr_ID_Equal(7);
var pId = await cnt.Person.FirstOrDefaultAsync(queryID);
Console.WriteLine(pId.FirstName);


queryID = Metadata_Person.expr_ID_Contains(7,9);
pers = await cnt.Person.Where(queryID).ToArrayAsync();
Console.WriteLine(pers.Length);


var nullBirthDateQuery = Metadata_Person.expr_DateOfBirth_Null();
var birthNull = await cnt.Person.Where(nullBirthDateQuery).ToArrayAsync();
Console.WriteLine(birthNull.Length);

var query = Metadata_Person.FindEx("ID", SearchCriteria.Equal, 99);
pers = await cnt.Person.Where(query).ToArrayAsync();
Console.WriteLine(pers.Length);

query = Metadata_Person.FindEx("DateOfBirth", SearchCriteria.FindNull);
pers = await cnt.Person.Where(query).ToArrayAsync();
Console.WriteLine(pers.Length);