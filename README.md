npm create vite@latest

docker compose up -d

docker exec -it django /bin/bash

python manage.py migrate

exit

git pull

docker compose up -d

docker exec -it front /bin/sh