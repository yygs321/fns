FROM nginx
WORKDIR /app
RUN mkdir ./build
ADD ./build ./build
RUN rm -rf /etc/nginx/nginx.conf
COPY ./react-nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
