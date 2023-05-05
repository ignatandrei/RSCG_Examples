
function ReplaceWithAuto([string]$m )
{
    $m=$m.Trim();
    $firstpart= $method
    $secondPart =""
    #Write-Host $method 
    # do it fast now. Find first ( , name method is before that 
    #( could be done better: find from the last :  add 1when found ( , add -1 when found ), stop at 0 )
    # find first space before
    $nr = ([regex]::Matches($m,  [regex]::Escape(")") )).count
    if($nr -gt 1){

        $characters = [char[]]$method;
        $nrOpen=0;
        $iterator= $characters.Length;
        do{
            $iterator--;
            if($characters[$iterator] -eq '('){
                $nrOpen++;        
                }

            if($characters[$iterator] -eq ')'){
                $nrOpen--;        
                }
            
        }while(($iterator -gt 0) -and ($nrOpen -ne 0))
        $firstpart = $m.Substring(0,$iterator).Trim()
          #return $firstpart 
        

        
        $spaceArr= $firstpart.Split(' ');
        $firstpart =$spaceArr[$spaceArr.Length-1]
        #return $firstpart 
        

    }
    $arr = $firstpart.Split("(");
    #Write-Host $arr[0]
    $splitSpace = $arr[0].Split(" ")
    $nameMethod = $splitSpace[$splitSpace.Length-1]
    #Write-Host $nameMethod 
    [regex]$pattern = $nameMethod
    $method= $pattern.Replace($method,("auto"+$nameMethod),1)
    #Write-Host $method 
    return $method

}

function VerifyFolder()
{
    Write-Host "starting"
    $fileName = Get-ChildItem "*.cs" -Recurse
    #$varItem = [regex]::Escape( "AOPMarkerMethod") 
    $varItem =  "AOPMarkerMethod"
    $filename | %{
 
	     
        $fileContent = gc $_
        $x=  ($fileContent  -imatch "AOPMarkerMethod" )
        #Write-Host $x.Length
        if($x.Length -gt 0){
            Write-Host $_.fullname
            $LineNumbers =@( Select-String $_ -Pattern $varItem| Select-Object -ExpandProperty 'LineNumber')
            Foreach ($LineNumber in $LineNumbers){
				
                $method = $fileContent[$LineNumber]

                Write-Host "Line where string is found: "$LineNumber
                Write-Host $method
                                
                #Write-Host ReplaceWithAuto $method 
                $fileContent[$LineNumber] = ReplaceWithAuto($method)
				
				Write-Host $fileContent[$LineNumber]
				
            }
            $fileContent |Set-Content $_.fullname




        }
	    #(gc $_) -replace $varItem,"auto" |Set-Content $_.fullname

    }
}

VerifyFolder
