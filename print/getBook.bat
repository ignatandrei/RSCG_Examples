rem docker build -t ignatandrei/print_rscg .. -f ./exportPDF.txt  
rem docker run -d --name print_rscg  ignatandrei/print_rscg
rem docker cp print_rscg:/usr/src/book.pdf .
rem docker container kill print_rscg
rem docker container rm print_rscg

rem pandoc.exe -f markdown -s -o index.docx ../book/about.md ../book/whatIs.md ../ApplicationVersion/README.md --metadata title="RSCG examples" --toc
rem  pandoc.exe  -d pandocHTML.yaml > ../docs/index.html
rem  pandoc.exe -d .\pandocHTML.yaml
pandoc.exe -d pandocHTML.yaml -o ../docs/index.docx
pandoc.exe -d pandocHTML.yaml -o ../docs/index.md -t gfm
