gitLink=$1
fileName=$2

echo "test"
git config user.name "SudoWatson"
cd runnables
mkdir $fileName
cd $fileName
git init
git pull $gitLink



echo "Creating virtual environment(venv)..."
python3 -m venv .venv