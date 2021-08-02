gitLink=$1
fileName=$2

cd runnables
mkdir $fileName
cd $fileName
git init
git pull $gitLink



echo "Creating virtual environment(venv)..."
python3 -m venv .venv
echo "Installing Python packages"
bash update.bash .
echo "Gathering resources"