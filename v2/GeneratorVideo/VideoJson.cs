namespace GeneratorVideo;
internal class VideoJson
{
    public string scriptName { get; set; }= string.Empty;
    public Step[] steps { get; set; } = [];

    public newStep[] realSteps=[];
    public async static Task<VideoJson?> Deserialize(string fileName)
    {
        var json = await File.ReadAllTextAsync(fileName);
        
        var opt = new JsonSerializerOptions(JsonSerializerOptions.Default);
        opt.AllowTrailingCommas = true;
        var data = JsonSerializer.Deserialize<VideoJson>(json, opt);
        if (data == null) return null;
        List<newStep> steps = new List<newStep>();

        for(var i = 0; i < data.steps.Length; i++)
        {
            var step = data.steps[i];
            var newStep= GeneratorVideo.newStep.Parse("step_"+ i + "_"+step.typeStep + GeneratorVideo.newStep.esc + step.arg, null);
            newStep.OriginalFileNameFromWhereTheStepIsComing = fileName;

            steps.Add(newStep);
        }
        data.realSteps= steps.ToArray();
        return data;
    }
}
