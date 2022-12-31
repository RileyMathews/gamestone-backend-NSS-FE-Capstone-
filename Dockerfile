FROM python:3.11 as base

FROM base as dev

WORKDIR /code

CMD [ "/bin/bash" ]

FROM dev as release

RUN pip install pipenv
COPY Pipfile* .
RUN pipenv install
COPY . .
RUN tailwindcss -i static/src/css/index.css -o static/dist/css/index.css --minify
RUN pipenv run python manage.py collectstatic --no-input --settings config.settings.collectstatic

CMD ["pipenv", "run", "gunicorn", "-b", ":8000", "config.wsgi"]