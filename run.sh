CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "${CYAN} ===> Installing Frontend dependencies${NC}"
yarn
echo "${CYAN} ===> Installing backend dependencies${NC}"
cd backend && cp .env.example .env && npm i
cd ..
yarn add -D concurrently
yarn start
