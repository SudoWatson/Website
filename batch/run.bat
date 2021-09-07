echo off
cd runnables\%1
.venv\Scripts\python.exe %2
echo Finished running %1