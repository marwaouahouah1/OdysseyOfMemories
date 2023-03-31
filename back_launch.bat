@echo off
start /b backend\api\venv\Scripts\activate
start /b frontend\front_launch
python backend\server.py