var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.TestSignalRHub_ApiService>("apiservice");

builder.AddProject<Projects.SignalRChatClient>("chatWindows");
builder.AddProject<Projects.TestSignalRConsole>("consoleHub");

builder.Build().Run();
