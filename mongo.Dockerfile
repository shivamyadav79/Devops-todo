FROM mongo:7.0.9-jammy

RUN apt-get update && apt-get upgrade -y && apt-get clean