FROM python:3.10-slim
RUN pip install fastapi uvicorn
COPY main.py /app/main.py
WORKDIR /app
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]