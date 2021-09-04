echo "Creating venv now"
pwd
python -m venv ./runnables/$1/.venv
source ./runnables/$1/.venv/bin/activate
python -m pip install -r ./runnables/$1/requirements.txt
echo "Finished venvv-----------------------------------------------"