@echo off
echo Creating new Virtual Environment for %1
python -m venv .\runnables\%1\.venv

batch\update.bat %1