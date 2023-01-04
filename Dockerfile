FROM python:3.7 as base

FROM base as dev

WORKDIR /code

CMD [ "/bin/bash" ]

FROM dev as release

COPY . .
RUN pip install -r requirements.txt

CMD ["gunicorn", "-b", ":8000", "gamestone.wsgi"]
