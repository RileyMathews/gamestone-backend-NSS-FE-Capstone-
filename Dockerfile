FROM python:3.7 as base

WORKDIR /app

FROM base as dev

ENTRYPOINT [""]
CMD ["bash"]

FROM dev as release
COPY . .
RUN pip install -r requirements.txt
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "-b", "0.0.0.0:8000", "gamestone.wsgi"]
