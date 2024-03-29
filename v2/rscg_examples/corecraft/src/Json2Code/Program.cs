﻿using CoreCraft;
using CoreCraft.ChangesTracking;
using CoreCraft.Subscription;
using Json2Code.Person;
using Json2Code.Person.Entities;
var model = new DomainModel(new[] { new Json2Code.Person.PersonShardModelShard() });

// Subscribe to Items collection change events 
using var subscription = model.For<IPersonShardChangesFrame>()
    .With(x => x.Persons)
    .Subscribe(OnItemChanged);

// Observe changes
void OnItemChanged(Change<ICollectionChangeSet<Person, PersonProperties>> changes)
{
    foreach (var c in changes.Hunk)
    {
        Console.WriteLine($"Entity [{c.Entity}] has been {c.Action}ed.");
        Console.WriteLine($"   Old data: {c.OldData}");
        Console.WriteLine($"   New data: {c.NewData}");
    }
}


await model.Run<IMutablePersonShardModelShard> (
    (shard, _) =>
    {
        shard.Persons.Add(new() { FirstName = "A", LastName = "B" });
        //shard.Persons.Remove(shard.Persons.First());
    });
await model.Run<IMutablePersonShardModelShard>(
    (shard, _) =>
    {        
        shard.Persons.Modify(shard.Persons.First(), p => p with { FirstName = "C" });
    });

await model.Run<IMutablePersonShardModelShard>(
    (shard, _) =>
    {
        shard.Persons.Remove(shard.Persons.First());
    });



Console.WriteLine("Press any key to exit...");
Console.ReadKey();
