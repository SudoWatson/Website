@echo off
echo Updating pip for %1's venv
runnables\%1\.venv\Scripts\python.exe -m pip install --upgrade pip
echo Installing %1's packages
runnables\%1\.venv\Scripts\python.exe -m pip install -r runnables\%1\requirements.txt
echo Finished updating %1