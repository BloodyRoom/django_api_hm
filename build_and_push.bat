@echo off

echo Dokcer logining
docker login

echo Build and Push api
cd "Django API/atbapi"
docker build -t bloodyroom/django_api:latest .
docker push bloodyroom/django_api:latest
cd ..
cd ..

echo Build and Push front
cd vite-django
docker build -t bloodyroom/django_react_front:latest .
docker push bloodyroom/django_react_front:latest
cd ..

echo === DONE ===
pause
