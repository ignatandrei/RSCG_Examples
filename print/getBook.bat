docker build -t ignatandrei/print_rscg .. -f ./exportPDF.txt  
docker run -d --name print_rscg  ignatandrei/print_rscg
docker cp print_rscg:/usr/src/book.pdf .
docker container kill print_rscg
docker container rm print_rscg

rem pandoc.exe -f markdown -s -o index.docx ../book/about.md ../book/whatIs.md ../ApplicationVersion/README.md --metadata title="RSCG examples" --toc
# pandoc.exe  -d pandocHTML.yaml > ../docs/index.html
pandoc.exe -d .\pandocHTML.yaml