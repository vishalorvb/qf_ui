# Use an official Nginx runtime as the base image
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the health.html file and your React build into the Nginx web root
COPY health.html /usr/share/nginx/html/
COPY build /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Set up the health check command
HEALTHCHECK --interval=30s --timeout=5s CMD curl --fail http://localhost/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
