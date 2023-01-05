FROM python:3.11 as base
RUN curl -sSL https://install.python-poetry.org | python -
ENV PATH="${PATH}:/root/.local/bin"

FROM base as dev

WORKDIR /code

CMD [ "/bin/bash" ]

FROM dev as release

ADD poetry.lock pyproject.toml ./
RUN poetry install

COPY . .

CMD ["poetry", "run", "gunicorn", "-b", ":8000", "config.wsgi"]
